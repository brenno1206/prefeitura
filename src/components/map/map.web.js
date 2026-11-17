import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { CATEGORIAS } from './categorias';

// Mapa para web (Leaflet + OpenStreetMap). A versão Android/iOS está em map.native.js.
// Usamos CircleMarker porque o ícone padrão do Leaflet aparece quebrado com o bundler do Expo.

// Componente auxiliar: dentro do MapContainer temos acesso à instância do mapa via useMap().
function Controle({ lat, lon, selecionado, markersRef }) {
  const map = useMap();

  // O Leaflet calcula o tamanho na montagem; no layout do React Native Web o container pode
  // ainda não ter altura final, o que deixa tiles cinzas. invalidateSize corrige.
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 0);
    return () => clearTimeout(t);
  }, [map]);

  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);

  useEffect(() => {
    if (!selecionado) return;
    map.flyTo([selecionado.lat, selecionado.lon], 17, { duration: 0.6 });
    markersRef.current[selecionado.id]?.openPopup();
  }, [selecionado, map, markersRef]);

  return null;
}

export default function Map({ lat, lon, real, locals, selecionado, onSelecionar }) {
  const markersRef = useRef({});

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapContainer center={[lat, lon]} zoom={15} style={styles.mapa}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Controle lat={lat} lon={lon} selecionado={selecionado} markersRef={markersRef} />

        {real && (
          <CircleMarker
            center={[lat, lon]}
            radius={9}
            pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }}
          >
            <Popup>Você está aqui</Popup>
          </CircleMarker>
        )}

        {locals.map(l => (
          <CircleMarker
            key={l.id}
            ref={r => (markersRef.current[l.id] = r)}
            center={[l.lat, l.lon]}
            radius={8}
            pathOptions={{ color: '#ffffff', weight: 2, fillColor: CATEGORIAS[l.categoria].cor, fillOpacity: 0.9 }}
            eventHandlers={{ click: () => onSelecionar?.(l) }}
          >
            <Popup>
              <strong>{l.nome}</strong>
              <br />
              {CATEGORIAS[l.categoria].nome}
              {l.endereco ? (
                <>
                  <br />
                  {l.endereco}
                </>
              ) : null}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </View>
  );
}

const styles = {
  mapa: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
};
