export const POLL_CATEGORIES = [
  'Todas',
  'Infraestrutura',
  'Saúde',
  'Educação',
  'Cultura e Lazer',
  'Mobilidade',
];

export const INITIAL_IDEAS = [
  {
    id: '1',
    title: 'Ciclovia interligando os bairros do centro à orla',
    description: 'Criação de faixa exclusiva para bicicletas com iluminação em LED e bicicletários próximos aos pontos de ônibus.',
    category: 'Mobilidade',
    author: 'Carlos Eduardo',
    votes: 42,
    voted: false,
    createdAt: 'Há 2 dias',
  },
  {
    id: '2',
    title: 'Horário estendido nas Unidades Básicas de Saúde (UBS)',
    description: 'Atendimento até as 21h em pelo menos duas unidades da cidade para trabalhadores que não conseguem ir durante o dia.',
    category: 'Saúde',
    author: 'Mariana Silva',
    votes: 87,
    voted: true,
    createdAt: 'Há 5 dias',
  },
  {
    id: '3',
    title: 'Cinema ao ar livre nas praças nos fins de semana',
    description: 'Exibição gratuita de filmes nacionais e infantis nas praças dos bairros uma vez por mês.',
    category: 'Cultura e Lazer',
    author: 'João Pedro',
    votes: 29,
    voted: false,
    createdAt: 'Há 1 semana',
  },
];