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
