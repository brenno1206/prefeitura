import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

// Posição do usuário: { lat, lon } ou null enquanto não chega (ou se a permissão for negada).
// Não bloqueia a tela: o mapa abre na hora e o ponto do usuário aparece quando a posição chegar.
// Na web, o navegador só libera a localização em localhost ou HTTPS.
export function useUserLocation() {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    let ativo = true;
    const salvar = (p) => ativo && p && setPos({ lat: p.coords.latitude, lon: p.coords.longitude });

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        // Última posição conhecida é instantânea; depois atualiza com a posição atual.
        salvar(await Location.getLastKnownPositionAsync());
        salvar(await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));
      } catch (e) {
        console.warn('Localização indisponível:', e);
      }
    })();

    return () => {
      ativo = false;
    };
  }, []);

  return pos;
}
