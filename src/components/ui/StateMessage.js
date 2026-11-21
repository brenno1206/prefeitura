import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

// Mostra o estado de uma requisição: carregando, erro (com "Tentar novamente") ou lista vazia.
// Não renderiza nada se não houver estado para mostrar.
export default function StateMessage({ loading, error, onRetry, empty, emptyText = 'Nada por aqui.' }) {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Ionicons name="cloud-offline-outline" size={28} color={colors.textPlaceholder} />
        <Text style={styles.text}>{error}</Text>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} hitSlop={8}>
            <Text style={styles.retry}>Tentar novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.container}>
        <Ionicons name="search-outline" size={28} color={colors.textPlaceholder} />
        <Text style={styles.text}>{emptyText}</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.textPlaceholder,
    textAlign: 'center',
  },
  retry: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
});
