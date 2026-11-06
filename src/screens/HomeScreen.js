import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import AlertCard from '../components/AlertCard';
import Section from '../components/Section';
import SectionHeader from '../components/SectionHeader';
import UtilityItem from '../components/UtilityItem';
import NewsCard from '../components/NewsCard';
import EmptyState from '../components/EmptyState';
import { publicAlert } from '../data/alerts';
import { featuredServices } from '../data/services';
import { news, HOME_NEWS_LIMIT } from '../data/news';
import { matchesQuery } from '../utils/text';
import { ROUTES } from '../navigation/routes';
import { spacing } from '../theme';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');

  // Sem busca, mostra o destaque padrão; com busca, procura em todas as notícias.
  const visibleNews = useMemo(() => {
    if (!query) return news.slice(0, HOME_NEWS_LIMIT);
    return news.filter((item) => matchesQuery(query, item.title, item.category));
  }, [query]);

  const visibleServices = useMemo(
    () => featuredServices.filter((service) => matchesQuery(query, service.label)),
    [query]
  );

  return (
    <ScreenContainer
      header={
        <AppHeader>
          <SearchBar value={query} onChangeText={setQuery} />
        </AppHeader>
      }
    >
      <Section>
        <AlertCard title={publicAlert.title} message={publicAlert.message} />
      </Section>

      {visibleServices.length > 0 && (
        <Section>
          <SectionHeader
            title="Serviços e Utilidades"
            actionLabel="Ver todos"
            onActionPress={() => navigation.navigate(ROUTES.SERVICES)}
          />
          <View style={styles.utilitiesGrid}>
            {visibleServices.map((service) => (
              <UtilityItem
                key={service.id}
                label={service.label}
                icon={service.icon}
                color={service.color}
                background={service.background}
                onPress={() => navigation.navigate(service.route)}
              />
            ))}
          </View>
        </Section>
      )}

      <Section>
        <SectionHeader
          title="Últimas Notícias"
          actionLabel="Ver mais"
          onActionPress={() => navigation.navigate(ROUTES.NEWS)}
        />
        <View style={styles.list}>
          {visibleNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              category={item.category}
              timeAgo={item.timeAgo}
              image={item.image}
              onPress={() => navigation.navigate(ROUTES.NEWS_DETAIL, { newsId: item.id })}
            />
          ))}
          {visibleNews.length === 0 && <EmptyState message="Nenhum resultado para sua busca." />}
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  utilitiesGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
});
