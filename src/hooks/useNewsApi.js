import { useEffect, useState } from 'react';

const BASE_URL = 'https://news-api.uat.i9tasks.com.br/api/v1';
const TENANT = 'vila-velha';

// Faz um GET na API e devolve o campo `data` da resposta.
// Em caso de erro, lança um Error com uma mensagem pronta para mostrar ao usuário.
async function request(path) {
  let resp;
  try {
    resp = await fetch(`${BASE_URL}/tenants/${TENANT}${path}`);
  } catch {
    throw new Error('Sem conexão com o servidor. Verifique sua internet.');
  }

  const json = await resp.json().catch(() => null);

  if (!resp.ok) {
    if (resp.status >= 500) throw new Error('Erro interno no servidor. Tente novamente em alguns minutos.');
    throw new Error(json?.error?.message ?? `Erro ao carregar os dados (${resp.status}).`);
  }

  return json.data;
}

// Busca `path` ao montar a tela (e de novo se `path` mudar).
// Retorna { data, loading, error, reload }.
function useRequest(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    request(path)
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [path, attempt]);

  return { data, loading, error, reload: () => setAttempt((n) => n + 1) };
}

// Lista de notícias publicadas.
export const useNoticias = () => useRequest('/noticias?per_page=50');

// Uma notícia (a API identifica notícias pelo slug).
export const useNoticia = (slug) => useRequest(`/noticias/${encodeURIComponent(slug)}`);

// Lista de notificações ativas.
export const useNotificacoes = () => useRequest('/notificacoes?per_page=50');

// Uma notificação (a API identifica notificações pelo id).
export const useNotificacao = (id) => useRequest(`/notificacoes/${encodeURIComponent(id)}`);
