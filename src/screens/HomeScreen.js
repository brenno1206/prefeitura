import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/layout/ScreenContainer';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import NewsCard from '../components/news/NewsCard';
import Icon from '../components/ui/Icon';
import StateMessage from '../components/ui/StateMessage';
import { getNotificationType } from '../components/notifications/NotificationCard';
import { featuredServices } from '../data/services';
import { useNoticias, useNotificacoes } from '../hooks/useNewsApi';
import { timeAgo } from '../utils/date';
import { matchesQuery } from '../utils/text';
import { ROUTES } from '../navigation/routes';
import { colors, fontSize, fontWeight, radius, shadows, spacing } from '../theme';

// Quantidade de notícias exibidas na Home (sem busca).
const HOME_NEWS_LIMIT = 3;

// Tela inicial (aba Início): busca, notificação em destaque, serviços e últimas notícias.
export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const newsRequest = useNoticias();
  const notificationsRequest = useNotificacoes();

  const news = newsRequest.data ?? [];
  const notifications = notificationsRequest.data ?? [];

  // Destaque: a emergência mais recente; se não houver, a notificação mais recente.
  const highlight = notifications.find((n) => n.tipo === 'emergencia') ?? notifications[0];
  const highlightType = highlight ? getNotificationType(highlight.tipo) : null;

  // Sem busca, mostra as mais recentes; com busca, procura em todas as notícias.
  const visibleNews = useMemo(() => {
    if (!query) return news.slice(0, HOME_NEWS_LIMIT);
    return news.filter((item) => matchesQuery(query, item.titulo, item.resumo));
  }, [query, news]);

  const visibleServices = useMemo(
    () => featuredServices.filter((service) => matchesQuery(query, service.label)),
    [query]
  );

  const header = (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <FontAwesome5 name="city" size={18} color={colors.white} />
          </View>
          <View>
            <Text style={styles.welcome}>Bem-vindo ao</Text>
            <Text style={styles.headerTitle}>Minha Prefeitura</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          accessibilityLabel="Notificações"
          onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
        >
          <Ionicons name="notifications-outline" size={20} color={colors.white} />
          {notifications.length > 0 && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.textPlaceholder} style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar serviços ou notícias..."
          placeholderTextColor={colors.textPlaceholder}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
    </View>
  );

  return (
    <ScreenContainer header={header}>
      {highlight && (
        <Section>
          <TouchableOpacity
            style={[styles.alert, { backgroundColor: highlightType.background, borderLeftColor: highlightType.color }]}
            onPress={() => navigation.navigate(ROUTES.NOTIFICATION_DETAIL, { id: highlight.id })}
            accessibilityRole="button"
          >
            <Ionicons name={highlightType.icon} size={22} color={highlightType.color} style={styles.alertIcon} />
            <View style={styles.alertContent}>
              <Text style={[styles.alertTitle, { color: highlightType.color }]}>{highlight.titulo}</Text>
              <Text style={styles.alertMessage} numberOfLines={2}>
                {highlight.mensagem}
              </Text>
            </View>
          </TouchableOpacity>
        </Section>
      )}

      {visibleServices.length > 0 && (
        <Section>
          <SectionHeader
            title="Serviços e Utilidades"
            actionLabel="Ver todos"
            onActionPress={() => navigation.navigate(ROUTES.SERVICES)}
          />
          <View style={styles.utilitiesGrid}>
            {visibleServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.utility}
                onPress={() => navigation.navigate(service.route)}
                accessibilityRole="button"
              >
                <View style={[styles.utilityIconBox, { backgroundColor: service.background }]}>
                  <Icon family={service.icon.family} name={service.icon.name} size={22} color={service.color} />
                </View>
                <Text style={styles.utilityLabel}>{service.label}</Text>
              </TouchableOpacity>
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
        <StateMessage loading={newsRequest.loading} error={newsRequest.error} onRetry={newsRequest.reload} />
        <View style={styles.list}>
          {visibleNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.titulo}
              timeAgo={timeAgo(item.publicado_em)}
              image={item.imagem_capa_url}
              onPress={() => navigation.navigate(ROUTES.NEWS_DETAIL, { slug: item.slug })}
            />
          ))}
          {!newsRequest.loading && !newsRequest.error && query !== '' && visibleNews.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={28} color={colors.textPlaceholder} />
              <Text style={styles.emptyText}>Nenhum resultado para sua busca.</Text>
            </View>
          )}
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
    ...shadows.header,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    backgroundColor: colors.overlayMedium,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.overlayStrong,
  },
  welcome: {
    fontSize: fontSize.xs,
    color: colors.primaryMuted,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  notificationButton: {
    width: 38,
    height: 38,
    backgroundColor: colors.overlayLight,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: colors.danger,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  // Busca
  search: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: colors.surface,
    height: 40,
    borderRadius: radius.lg,
    paddingLeft: 38,
    paddingRight: 14,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },

  // Alerta
  alert: {
    backgroundColor: colors.warningLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIcon: {
    marginTop: spacing.xxs,
  },
  alertContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  alertTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.warningDark,
  },
  alertMessage: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },

  // Serviços e Utilidades
  utilitiesGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  utility: {
    width: 88,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  utilityIconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  utilityLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Notícias
  list: {
    gap: spacing.md,
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
