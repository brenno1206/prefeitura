import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CATEGORIAS } from './categorias';

// Mapa para Android/iOS. A versão web está em map.web.js; o bundler escolhe o arquivo pela extensão.
const DELTA = 0.03;

export default function Map({ lat, lon, locals, selecionado, onSelecionar }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Recentraliza quando a localização do usuário chega.
  useEffect(() => {
    mapRef.current?.animateToRegion({ latitude: lat, longitude: lon, latitudeDelta: DELTA, longitudeDelta: DELTA }, 500);
  }, [lat, lon]);

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
      showsUserLocation
      showsMyLocationButton
      initialRegion={{ latitude: lat, longitude: lon, latitudeDelta: DELTA, longitudeDelta: DELTA }}
    >
      {locals.map(l => (
        <Marker
          key={l.id}
          ref={r => (markersRef.current[l.id] = r)}
          coordinate={{ latitude: l.lat, longitude: l.lon }}
          title={l.nome}
          description={CATEGORIAS[l.categoria].nome}
          pinColor={CATEGORIAS[l.categoria].cor}
          onPress={() => onSelecionar?.(l)}
        />
      ))}
    </MapView>
  );
}
