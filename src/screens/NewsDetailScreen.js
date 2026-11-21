import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import StateMessage from '../components/ui/StateMessage';
import { useNoticia } from '../hooks/useNewsApi';
import { formatDate } from '../utils/date';
import { htmlToText } from '../utils/text';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

// Detalhe de uma notícia, buscada na API pelo slug recebido na rota.
export default function NewsDetailScreen({ navigation, route }) {
  const slug = route.params?.slug;
  const { data: item, loading, error, reload } = useNoticia(slug);

  return (
    <ScreenContainer header={<ScreenHeader title="Notícia" onBack={navigation.goBack} />}>
      <Section>
        <StateMessage loading={loading} error={error} onRetry={reload} />
        {item && !loading && !error && (
          <View style={styles.card}>
            {item.imagem_capa_url ? <Image source={{ uri: item.imagem_capa_url }} style={styles.image} /> : null}
            <View style={styles.content}>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.date}>
                <Ionicons name="time-outline" size={12} color={colors.textPlaceholder} />{' '}
                {formatDate(item.publicado_em)}
              </Text>
              {item.resumo ? <Text style={styles.summary}>{item.resumo}</Text> : null}
              <Text style={styles.body}>{htmlToText(item.conteudo)}</Text>
            </View>
          </View>
        )}
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
  summary: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  body: {
    fontSize: fontSize.md,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
