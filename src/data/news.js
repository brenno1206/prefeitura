export const news = [
  {
    id: 'news-1',
    title: 'Campanha de Vacinação municipal começa na próxima semana',
    category: 'Saúde',
    timeAgo: 'Há 2 horas',
    image:
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=200&q=80',
    imageLarge:
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    body:
      'A Secretaria Municipal de Saúde inicia na próxima semana a campanha de vacinação. ' +
      'As doses estarão disponíveis em todas as Unidades Básicas de Saúde, de segunda a sexta, das 8h às 17h. ' +
      'Leve documento com foto e a caderneta de vacinação.',
  },
  {
    id: 'news-2',
    title: 'Manutenção e recapeamento asfáltico avançam em novas vias',
    category: 'Obras',
    timeAgo: 'Há 5 horas',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=200&q=80',
    imageLarge:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    body:
      'As obras de recapeamento chegam a novos bairros nesta semana. ' +
      'Durante a execução, algumas vias terão o trânsito parcialmente interditado. ' +
      'Respeite a sinalização e, se possível, utilize rotas alternativas.',
  },
  {
    id: 'news-3',
    title: 'Matrículas para a rede municipal de ensino estão abertas',
    category: 'Educação',
    timeAgo: 'Ontem',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=200&q=80',
    imageLarge:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    body:
      'Pais e responsáveis já podem realizar a matrícula de crianças e jovens na rede municipal. ' +
      'O atendimento é feito nas próprias escolas ou pelo portal da prefeitura.',
  },
];

// A Home exibe apenas as notícias mais recentes.
export const HOME_NEWS_LIMIT = 2;