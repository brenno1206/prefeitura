import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, shadows, spacing } from '../theme';

// Header das telas internas, no mesmo estilo azul da Home. `onBack` exibe o botão de voltar.
export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack} accessibilityLabel="Voltar">
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
      )}
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.header,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  subtitle: {
    fontSize: fontSize.xs,
    color: colors.primaryMuted,
    marginTop: spacing.xxs,
  },
});
