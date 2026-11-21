// Remove acentos e caixa para a busca não depender de "saúde" vs "saude".
export function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function matchesQuery(query, ...fields) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;
  return fields.some((field) => normalizeText(field).includes(normalizedQuery));
}

// Converte o HTML do conteúdo da notícia em texto simples, mantendo os parágrafos.
export function htmlToText(html = '') {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
