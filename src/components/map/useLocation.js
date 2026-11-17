import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

// Centro de Vila Velha: usado enquanto a localização não chega ou se o usuário negar a permissão.
export const CENTRO_VV = { lat: -20.3297, lon: -40.2925 };

// Retorna { lat, lon, real }. `real` indica se é a posição do usuário ou o centro da cidade.
// Na web, o navegador só libera a localização em localhost ou HTTPS.
export function useLocation() {
  const [pos, setPos] = useState({ ...CENTRO_VV, real: false });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const { coords } = await Location.getCurrentPositionAsync({});
        setPos({ lat: coords.latitude, lon: coords.longitude, real: true });
      } catch (e) {
        console.warn('Localização indisponível:', e);
      }
    })();
  }, []);

  return pos;
}
