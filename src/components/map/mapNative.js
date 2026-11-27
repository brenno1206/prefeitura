import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CENTRO_VV } from '../../data/locais';

// Mapa para Android/iOS (react-native-maps, já incluso no Expo Go/Snack).
// A versão web está em MapWeb.js; a escolha por plataforma é feita pelos arquivos map.*.js.
export default function Map({ locais, selecionado, usuario }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Aproxima e abre o balão do local escolhido na lista.
  useEffect(() => {
    if (!selecionado) return;
    mapRef.current?.animateToRegion(
      { latitude: selecionado.lat, longitude: selecionado.lon, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      500
    );
    const t = setTimeout(() => markersRef.current[selecionado.id]?.showCallout(), 550);
    return () => clearTimeout(t);
  }, [selecionado]);

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={{ latitude: CENTRO_VV.lat, longitude: CENTRO_VV.lon, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
    >
      {locais.map((l) => (
        <Marker
          key={l.id}
          ref={(r) => (markersRef.current[l.id] = r)}
          coordinate={{ latitude: l.lat, longitude: l.lon }}
          title={l.nome}
          description={l.endereco}
        />
      ))}

      {usuario && (
        <Marker coordinate={{ latitude: usuario.lat, longitude: usuario.lon }} title="Você está aqui" pinColor="green" />
      )}
    </MapView>
  );
}
