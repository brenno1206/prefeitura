import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import Tag from '../components/news/Tag';
import { news } from '../data/news';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

// Detalhe de uma notícia, aberta a partir da Home ou da aba Notícias (recebe newsId pela rota).
export default function NewsDetailScreen({ navigation, route }) {
  const item = news.find((entry) => entry.id === route.params?.newsId);
  const header = <ScreenHeader title="Notícia" onBack={navigation.goBack} />;

  if (!item) {
    return (
      <ScreenContainer header={header}>
        <View style={styles.empty}>
          <Ionicons name="search-outline" size={28} color={colors.textPlaceholder} />
          <Text style={styles.emptyText}>Notícia não encontrada.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer header={header}>
      <Section>
        <View style={styles.card}>
          <Image source={{ uri: item.imageLarge }} style={styles.image} />
          <View style={styles.content}>
            <Tag label={item.category} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>
              <Ionicons name="time-outline" size={12} color={colors.textPlaceholder} /> {item.timeAgo}
            </Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: fontSize.xxs,
    color: colors.textPlaceholder,
  },
  body: {
    fontSize: fontSize.md,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.textPlaceholder,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
