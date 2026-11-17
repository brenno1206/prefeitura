import { useEffect, useState } from 'react';
import { CATEGORIAS } from './categorias';

// Overpass API: consulta os dados do OpenStreetMap. Gratuita e sem chave, mas é um serviço público:
// evite consultas repetidas (por isso o debounce abaixo).
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Limite do município de Vila Velha no OpenStreetMap.
const AREA_VV = 'area["name"="Vila Velha"]["admin_level"="8"]["boundary"="administrative"]->.vv;';

function montarQuery(lat, lon, cats, raio) {
  const partes = cats.flatMap(c => {
    const { grupo, filtros } = CATEGORIAS[c];
    const alcance = grupo === 'publico' ? '(area.vv)' : `(around:${raio},${lat},${lon})`;
    return filtros.map(f => `nwr${f}${alcance};`);
  });
  return `[out:json][timeout:25];${AREA_VV}(${partes.join('')});out center tags;`;
}

// Distância em km entre dois pontos (fórmula de Haversine).
export function distanciaKm(lat1, lon1, lat2, lon2) {
  const rad = x => (x * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatarDistancia(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace('.', ',')} km`;
}

// Converte a resposta da Overpass no formato usado pelo app, já ordenado por distância.
function converter(elements, cats, lat, lon) {
  const vistos = new Set();
  const locais = [];

  for (const e of elements) {
    const id = `${e.type}/${e.id}`;
    const eLat = e.lat ?? e.center?.lat;
    const eLon = e.lon ?? e.center?.lon;
    if (vistos.has(id) || eLat == null || eLon == null) continue;

    const tags = e.tags ?? {};
    const categoria = cats.find(c => CATEGORIAS[c].testa(tags));
    if (!categoria) continue;

    vistos.add(id);
    locais.push({
      id,
      nome: tags.name ?? tags.official_name ?? CATEGORIAS[categoria].nome,
      endereco: [tags['addr:street'], tags['addr:housenumber']].filter(Boolean).join(', '),
      lat: eLat,
      lon: eLon,
      categoria,
      distancia: distanciaKm(lat, lon, eLat, eLon),
    });
  }

  return locais.sort((a, b) => a.distancia - b.distancia);
}

// Traduz a falha da requisição numa mensagem para o usuário.
function mensagemDeErro(e) {
  if (e.status >= 500) return 'Erro interno no servidor de mapa. Tente novamente em alguns minutos.';
  if (e.status === 429) return 'Muitas consultas ao servidor de mapa. Aguarde um pouco e tente novamente.';
  if (e.status) return `Erro ao consultar o servidor de mapa (${e.status}).`;
  // Na web, um 502/504 do servidor costuma vir sem cabeçalho CORS e chega aqui como falha de rede.
  return 'Não foi possível conectar ao servidor de mapa. Verifique sua internet ou tente mais tarde.';
}

// Busca os locais das categorias selecionadas.
// Retorna { locals, carregando, erro, recarregar }.
export function useLocals(lat, lon, cats, raio = 2000) {
  const [locals, setLocals] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);
  const chave = cats.join(',');

  useEffect(() => {
    if (!cats.length) {
      setLocals([]);
      setErro(null);
      return;
    }

    const ctrl = new AbortController();
    // Espera o usuário parar de clicar nos filtros antes de consultar a API.
    const timer = setTimeout(async () => {
      setCarregando(true);
      setErro(null);
      try {
        const resp = await fetch(OVERPASS_URL, {
          method: 'POST',
          body: 'data=' + encodeURIComponent(montarQuery(lat, lon, cats, raio)),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          signal: ctrl.signal,
        });
        if (!resp.ok) {
          const err = new Error(`Overpass respondeu ${resp.status}`);
          err.status = resp.status;
          throw err;
        }
        const json = await resp.json();
        setLocals(converter(json.elements ?? [], cats, lat, lon));
      } catch (e) {
        if (e.name === 'AbortError') return;
        console.warn('Overpass:', e);
        setErro(mensagemDeErro(e));
      } finally {
        if (!ctrl.signal.aborted) setCarregando(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [lat, lon, chave, raio, tentativa]);

  return { locals, carregando, erro, recarregar: () => setTentativa(t => t + 1) };
}
