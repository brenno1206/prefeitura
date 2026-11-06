import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCategoryColors } from '../utils/categories';
import { fontSize, fontWeight, radius, spacing } from '../theme';

export default function Tag({ label }) {
  const { background, text } = getCategoryColors(label);
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
  },
  text: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.semibold,
  },
});
