import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Versão nativa (Android/iOS). Na web o Metro usa CityMap.web.js.
export default function CityMap({ initialRegion, points, onSelectPoint }) {
  return (
    <MapView style={styles.map} initialRegion={initialRegion} showsUserLocation={false}>
      {points.map((point) => (
        <Marker
          key={point.id}
          coordinate={point.coordinate}
          title={point.title}
          description={point.description}
          onPress={() => onSelectPoint?.(point)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
