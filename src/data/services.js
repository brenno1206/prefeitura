import { ROUTES } from '../navigation/routes';

// `route` indica a tela de destino; serviços sem rota ainda não foram implementados.
const SERVICES = {
  polls: {
    id: 'polls',
    label: 'Enquetes',
    description: 'Participe das consultas públicas',
    icon: { family: 'AntDesign', name: 'audit' },
    color: '#15803d',
    background: '#dcfce7',
    route: ROUTES.POLL,
  },
  events: {
    id: 'events',
    label: 'Eventos',
    description: 'Agenda oficial da prefeitura',
    icon: { family: 'MaterialIcons', name: 'event' },
    color: '#2945c2',
    background: '#d6deff',
    route: ROUTES.EVENTS,
  },
  map: {
    id: 'map',
    label: 'Mapa',
    description: 'Unidades e pontos de atendimento',
    icon: { family: 'Fontisto', name: 'map' },
    color: '#0369a1',
    background: '#e0f2fe',
    route: ROUTES.MAP,
  },
  ombudsman: {
    id: 'ombudsman',
    label: 'Ouvidoria',
    description: 'Sugestões, reclamações e elogios',
    icon: { family: 'Ionicons', name: 'chatbubbles-outline' },
    color: '#7c3aed',
    background: '#ede9fe',
  },
};

// Atalhos da grade "Serviços e Utilidades" na Home.
export const featuredServices = [SERVICES.polls, SERVICES.events, SERVICES.map];

// Lista exibida na aba Serviços.
export const services = [SERVICES.polls, SERVICES.events, SERVICES.map, SERVICES.ombudsman];
