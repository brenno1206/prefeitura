import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CENTRO_VV } from '../../data/locais';

// Mapa para web (Leaflet + OpenStreetMap). A versão Android/iOS está em MapNative.js.
// O Leaflet é carregado por CDN em tempo de execução (sem `import` de pacote nem de CSS),
// porque o Expo Snack não aceita importar arquivos .css.
const LEAFLET_URL = 'https://unpkg.com/leaflet@1.9.4/dist/';
let leafletPromise = null;

function carregarLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (!leafletPromise) {
    leafletPromise = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = `${LEAFLET_URL}leaflet.css`;
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.src = `${LEAFLET_URL}leaflet.js`;
      script.onload = () => resolve(window.L);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return leafletPromise;
}

const ESTILO_LOCAL = { radius: 9, color: '#ffffff', weight: 2, fillColor: '#1d4ed8', fillOpacity: 0.9 };
const ESTILO_USUARIO = { radius: 9, color: '#ffffff', weight: 3, fillColor: '#16a34a', fillOpacity: 1 };

export default function Map({ locais, selecionado, usuario }) {
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const usuarioRef = useRef(null);
  const [L, setL] = useState(null);

  useEffect(() => {
    carregarLeaflet()
      .then(setL)
      .catch((e) => console.warn('Não foi possível carregar o Leaflet:', e));
  }, []);

  // Cria o mapa e os pontos fixos quando o Leaflet terminar de carregar.
  useEffect(() => {
    if (!L || !divRef.current) return;

    const map = L.map(divRef.current).setView([CENTRO_VV.lat, CENTRO_VV.lon], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    locais.forEach((l) => {
      markersRef.current[l.id] = L.circleMarker([l.lat, l.lon], ESTILO_LOCAL)
        .bindPopup(`<strong>${l.nome}</strong><br/>${l.endereco}`)
        .addTo(map);
    });

    mapRef.current = map;
    // Corrige tiles cinzas quando o container ainda não tinha o tamanho final.
    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
      usuarioRef.current = null;
    };
  }, [L, locais]);

  // Ponto verde do usuário: cria ou move quando a posição chega/muda.
  useEffect(() => {
    if (!L || !mapRef.current || !usuario) return;
    if (usuarioRef.current) {
      usuarioRef.current.setLatLng([usuario.lat, usuario.lon]);
    } else {
      usuarioRef.current = L.circleMarker([usuario.lat, usuario.lon], ESTILO_USUARIO)
        .bindPopup('Você está aqui')
        .addTo(mapRef.current);
    }
  }, [L, usuario]);

  // Aproxima e abre o balão do local escolhido na lista.
  useEffect(() => {
    if (!mapRef.current || !selecionado) return;
    mapRef.current.flyTo([selecionado.lat, selecionado.lon], 17, { duration: 0.6 });
    markersRef.current[selecionado.id]?.openPopup();
  }, [L, selecionado]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <div ref={divRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </View>
  );
}
