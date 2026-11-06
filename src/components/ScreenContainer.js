import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

// Base de todas as telas: área segura superior + rolagem opcional.
export default function ScreenContainer({ children, header, scroll = true, contentStyle }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, contentStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {header}
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, contentStyle]}>
          {header}
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  fill: {
    flex: 1,
  },
});
