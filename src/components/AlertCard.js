import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function AlertCard({ title, message }) {
  return (
    <View style={styles.card}>
      <Ionicons name="warning" size={22} color={colors.warning} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.warningLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginTop: spacing.xxs,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.warningDark,
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
});
