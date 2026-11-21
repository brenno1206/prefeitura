import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import NotificationCard from '../components/notifications/NotificationCard';
import StateMessage from '../components/ui/StateMessage';
import { useNotificacoes } from '../hooks/useNewsApi';
import { ROUTES } from '../navigation/routes';
import { spacing } from '../theme';

// Últimas notificações da prefeitura (aberta pelo sino da Home ou pelo Perfil).
export default function NotificationsScreen({ navigation }) {
  const { data: notifications, loading, error, reload } = useNotificacoes();

  return (
    <ScreenContainer
      header={<ScreenHeader title="Notificações" subtitle="Avisos da prefeitura" onBack={navigation.goBack} />}
    >
      <Section>
        <StateMessage
          loading={loading}
          error={error}
          onRetry={reload}
          empty={notifications?.length === 0}
          emptyText="Nenhuma notificação no momento."
        />
        {!loading && !error && (
          <View style={styles.list}>
            {notifications.map((item) => (
              <NotificationCard
                key={item.id}
                notification={item}
                onPress={() => navigation.navigate(ROUTES.NOTIFICATION_DETAIL, { id: item.id })}
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
