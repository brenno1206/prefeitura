import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import CityMap from '../components/CityMap';
import { initialRegion, mapPoints } from '../data/mapPoints';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function MapScreen({ navigation }) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <ScreenContainer
      scroll={false}
      header={<ScreenHeader title="Mapa" subtitle="Unidades e pontos de atendimento" onBack={navigation.goBack} />}
    >
      <View style={styles.mapWrapper}>
        <CityMap initialRegion={initialRegion} points={mapPoints} onSelectPoint={setSelectedPoint} />
      </View>

      {selectedPoint && (
        <View style={styles.infoCard}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <View style={styles.infoTexts}>
            <Text style={styles.infoTitle}>{selectedPoint.title}</Text>
            <Text style={styles.infoDescription}>{selectedPoint.description}</Text>
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    flex: 1,
    margin: spacing.xl,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  infoTexts: {
    marginLeft: spacing.md,
    flex: 1,
  },
  infoTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  infoDescription: {
    fontSize: fontSize.xs,
    color: colors.textPlaceholder,
    marginTop: spacing.xxs,
  },
});
