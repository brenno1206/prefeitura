import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, spacing } from '../theme';

// react-native-maps não tem suporte à web; exibimos um aviso no lugar do mapa.
export default function CityMap() {
  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={40} color={colors.textPlaceholder} />
      <Text style={styles.text}>O mapa está disponível apenas no aplicativo Android/iOS.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  text: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
