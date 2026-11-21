// Converte uma data ISO em texto relativo: "Há 5 min", "Há 3 h", "Ontem", "Há 4 dias" ou a data.
export function timeAgo(iso) {
  const date = new Date(iso);
  const minutes = (Date.now() - date.getTime()) / 60000;

  if (minutes < 0) return formatDate(iso);
  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `Há ${Math.floor(minutes)} min`;

  const hours = minutes / 60;
  if (hours < 24) return `Há ${Math.floor(hours)} h`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'Ontem';
  if (days < 7) return `Há ${days} dias`;

  return formatDate(iso);
}

// Data no formato dd/mm/aaaa.
export function formatDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}
