// Ponto de entrada do mapa. O bundler escolhe o arquivo pela plataforma:
//   map.android.js / map.ios.js → MapNative.js (react-native-maps)
//   map.web.js                  → MapWeb.js (Leaflet)
// Este map.js só é usado se a plataforma não tiver arquivo próprio.
export { default } from './MapNative';
