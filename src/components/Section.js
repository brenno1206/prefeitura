import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme';

// Bloco com o recuo e espaçamento padrão entre seções.
export default function Section({ children, style }) {
  return <View style={[styles.section, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
});
