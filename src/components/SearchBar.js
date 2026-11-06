import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '../theme';

export default function SearchBar({ value, onChangeText, placeholder = 'Buscar serviços ou notícias...' }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.textPlaceholder} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 1,
  },
  input: {
    backgroundColor: colors.surface,
    height: 40,
    borderRadius: radius.lg,
    paddingLeft: 38,
    paddingRight: 14,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
