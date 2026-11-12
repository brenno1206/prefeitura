import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import NewsCard from '../components/news/NewsCard';
import { news } from '../data/news';
import { ROUTES } from '../navigation/routes';
import { spacing } from '../theme';

export default function NewsScreen({ navigation }) {
  return (
    <ScreenContainer header={<ScreenHeader title="Notícias" subtitle="Comunicados da prefeitura" />}>
      <Section>
        <View style={styles.list}>
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              category={item.category}
              timeAgo={item.timeAgo}
              image={item.image}
              onPress={() => navigation.navigate(ROUTES.NEWS_DETAIL, { newsId: item.id })}
            />
          ))}
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
});
