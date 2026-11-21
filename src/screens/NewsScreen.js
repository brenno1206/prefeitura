import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import NewsCard from '../components/news/NewsCard';
import StateMessage from '../components/ui/StateMessage';
import { useNoticias } from '../hooks/useNewsApi';
import { timeAgo } from '../utils/date';
import { ROUTES } from '../navigation/routes';
import { spacing } from '../theme';

// Aba Notícias: lista as notícias da API, abrindo o detalhe ao tocar em uma.
export default function NewsScreen({ navigation }) {
  const { data: news, loading, error, reload } = useNoticias();

  return (
    <ScreenContainer header={<ScreenHeader title="Notícias" subtitle="Comunicados da prefeitura" />}>
      <Section>
        <StateMessage
          loading={loading}
          error={error}
          onRetry={reload}
          empty={news?.length === 0}
          emptyText="Nenhuma notícia publicada."
        />
        {!loading && !error && (
          <View style={styles.list}>
            {news.map((item) => (
              <NewsCard
                key={item.id}
                title={item.titulo}
                timeAgo={timeAgo(item.publicado_em)}
                image={item.imagem_capa_url}
                onPress={() => navigation.navigate(ROUTES.NEWS_DETAIL, { slug: item.slug })}
              />
            ))}
          </View>
        )}
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
});
