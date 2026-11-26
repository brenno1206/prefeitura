'use dom';

// Mapa único para web e celular (Expo DOM Component).
// Na web, renderiza normalmente; no Android/iOS, o Expo roda este mesmo componente dentro de uma WebView.
// Por isso as props precisam ser dados simples (objetos, arrays, strings, números).
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';

const CENTRO_VV = [-20.34, -40.296];

// Dentro do MapContainer temos acesso à instância do Leaflet via useMap().
function Controle({ selecionado, markersRef }) {
  const map = useMap();

  // Corrige tiles cinzas quando o container ainda não tinha o tamanho final na montagem.
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 0);
    return () => clearTimeout(t);
  }, [map]);

  // Aproxima e abre o balão do local escolhido na lista.
  useEffect(() => {
    if (!selecionado) return;
    map.flyTo([selecionado.lat, selecionado.lon], 17, { duration: 0.6 });
    markersRef.current[selecionado.id]?.openPopup();
  }, [selecionado, map, markersRef]);

  return null;
}

export default function Mapa({ locais = [], usuario, selecionado }) {
  const markersRef = useRef({});

  return (
    <MapContainer center={CENTRO_VV} zoom={14} style={styles.mapa}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Controle selecionado={selecionado} markersRef={markersRef} />

      {locais.map((l) => (
        <CircleMarker
          key={l.id}
          ref={(r) => (markersRef.current[l.id] = r)}
          center={[l.lat, l.lon]}
          radius={9}
          pathOptions={{ color: '#ffffff', weight: 2, fillColor: '#1d4ed8', fillOpacity: 0.9 }}
        >
          <Popup>
            <strong>{l.nome}</strong>
            <br />
            {l.endereco}
          </Popup>
        </CircleMarker>
      ))}

      {usuario && (
        <CircleMarker
          center={[usuario.lat, usuario.lon]}
          radius={9}
          pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#16a34a', fillOpacity: 1 }}
        >
          <Popup>Você está aqui</Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}

// Ocupa todo o espaço disponível (o container na web, a WebView no celular).
const styles = {
  mapa: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
};
