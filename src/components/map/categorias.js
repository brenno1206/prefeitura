export const CATEGORIAS = {
  mercado:  { nome: 'Mercado',  cor: '#16a34a', filtro: '["shop"~"supermarket|convenience"]', testa: t => /supermarket|convenience/.test(t.shop ?? '') },
  farmacia: { nome: 'Farmácia', cor: '#dc2626', filtro: '["amenity"="pharmacy"]',             testa: t => t.amenity === 'pharmacy' },
  hospital: { nome: 'Saúde',    cor: '#2563eb', filtro: '["amenity"~"hospital|clinic|doctors"]', testa: t => /hospital|clinic|doctors/.test(t.amenity ?? '') },
  escola:   { nome: 'Escola',   cor: '#ca8a04', filtro: '["amenity"="school"]',               testa: t => t.amenity === 'school' },
  banco:    { nome: 'Banco',    cor: '#7c3aed', filtro: '["amenity"="bank"]',                 testa: t => t.amenity === 'bank' },
  policia:  { nome: 'Polícia',  cor: '#0f172a', filtro: '["amenity"="police"]',               testa: t => t.amenity === 'police' },
};