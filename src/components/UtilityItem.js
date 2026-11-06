import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

// Atalho quadrado da grade "Serviços e Utilidades".
export default function UtilityItem({ label, icon, color, background, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} accessibilityRole="button">
      <View style={[styles.iconBox, { backgroundColor: background }]}>
        <Icon family={icon.family} name={icon.name} size={22} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 88,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
