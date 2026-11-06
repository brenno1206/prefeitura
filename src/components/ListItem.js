import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from './Icon';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

// Linha de lista com ícone, título, descrição opcional e seta (usada em Serviços e Perfil).
export default function ListItem({
  title,
  description,
  icon,
  iconColor = colors.primary,
  iconBackground = colors.primaryLight,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} accessibilityRole="button">
      {icon && (
        <View style={[styles.iconBox, { backgroundColor: iconBackground }]}>
          <Icon family={icon.family} name={icon.name} size={20} color={iconColor} />
        </View>
      )}
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textPlaceholder} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.textPlaceholder,
    marginTop: spacing.xxs,
  },
});
