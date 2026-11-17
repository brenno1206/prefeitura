// Categorias do mapa.
//
// grupo 'publico' → busca em TODA Vila Velha (são poucos locais e o cidadão precisa achá-los de qualquer lugar).
// grupo 'perto'   → busca num raio em volta do usuário.
//
// filtros: seletores do OpenStreetMap usados na consulta à Overpass API (https://wiki.openstreetmap.org/wiki/Map_features).
// testa:   recebe as tags de um local e diz se ele pertence à categoria.
// icone:   nome do ícone do MaterialCommunityIcons.
//
// A ordem importa: um local é classificado na PRIMEIRA categoria selecionada cujo `testa` for verdadeiro
// (por isso a Câmara vem antes da Prefeitura, já que ambas podem ter amenity=townhall).

export const GRUPOS = {
  publico: 'Serviços públicos',
  perto: 'Perto de você',
};

export const CATEGORIAS = {
  // --- Serviços públicos (toda a cidade) ---
  camara: {
    nome: 'Câmara Municipal',
    grupo: 'publico',
    cor: '#9333ea',
    icone: 'account-group',
    filtros: ['["amenity"="townhall"]["townhall:type"="council"]', '["office"="government"]["government"="legislative"]'],
    testa: t => t['townhall:type'] === 'council' || t.government === 'legislative',
  },
  prefeitura: {
    nome: 'Prefeitura e órgãos públicos',
    grupo: 'publico',
    cor: '#1d4ed8',
    icone: 'office-building',
    filtros: ['["amenity"="townhall"]', '["office"="government"]'],
    testa: t => t.amenity === 'townhall' || t.office === 'government',
  },
  justica: {
    nome: 'Fórum / Justiça',
    grupo: 'publico',
    cor: '#92400e',
    icone: 'scale-balance',
    filtros: ['["amenity"="courthouse"]'],
    testa: t => t.amenity === 'courthouse',
  },
  correios: {
    nome: 'Correios',
    grupo: 'publico',
    cor: '#ca8a04',
    icone: 'email',
    filtros: ['["amenity"="post_office"]'],
    testa: t => t.amenity === 'post_office',
  },
  seguranca: {
    nome: 'Polícia e bombeiros',
    grupo: 'publico',
    cor: '#0f172a',
    icone: 'shield-account',
    filtros: ['["amenity"~"^(police|fire_station)$"]'],
    testa: t => /^(police|fire_station)$/.test(t.amenity ?? ''),
  },

  // --- Perto de você (raio em volta do usuário) ---
  mercado: {
    nome: 'Mercado',
    grupo: 'perto',
    cor: '#16a34a',
    icone: 'cart',
    filtros: ['["shop"~"^(supermarket|convenience)$"]'],
    testa: t => /^(supermarket|convenience)$/.test(t.shop ?? ''),
  },
  farmacia: {
    nome: 'Farmácia',
    grupo: 'perto',
    cor: '#dc2626',
    icone: 'pill',
    filtros: ['["amenity"="pharmacy"]'],
    testa: t => t.amenity === 'pharmacy',
  },
  saude: {
    nome: 'Saúde',
    grupo: 'perto',
    cor: '#0891b2',
    icone: 'hospital-box',
    filtros: ['["amenity"~"^(hospital|clinic|doctors)$"]'],
    testa: t => /^(hospital|clinic|doctors)$/.test(t.amenity ?? ''),
  },
  escola: {
    nome: 'Escola',
    grupo: 'perto',
    cor: '#ea580c',
    icone: 'school',
    filtros: ['["amenity"="school"]'],
    testa: t => t.amenity === 'school',
  },
  banco: {
    nome: 'Banco',
    grupo: 'perto',
    cor: '#7c3aed',
    icone: 'bank',
    filtros: ['["amenity"="bank"]'],
    testa: t => t.amenity === 'bank',
  },
};
