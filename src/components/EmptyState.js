import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, spacing } from '../theme';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={28} color={colors.textPlaceholder} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.textPlaceholder,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
