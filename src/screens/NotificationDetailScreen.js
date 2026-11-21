import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import StateMessage from '../components/ui/StateMessage';
import { getNotificationType } from '../components/notifications/NotificationCard';
import { useNotificacao } from '../hooks/useNewsApi';
import { formatDate } from '../utils/date';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

// Detalhe de uma notificação, buscada na API pelo id recebido na rota.
export default function NotificationDetailScreen({ navigation, route }) {
  const { data: item, loading, error, reload } = useNotificacao(route.params?.id);
  const type = item ? getNotificationType(item.tipo) : null;

  return (
    <ScreenContainer header={<ScreenHeader title="Notificação" onBack={navigation.goBack} />}>
      <Section>
        <StateMessage loading={loading} error={error} onRetry={reload} />
        {item && !loading && !error && (
          <View style={[styles.card, { borderTopColor: type.color }]}>
            <View style={[styles.tag, { backgroundColor: type.background }]}>
              <Ionicons name={type.icon} size={14} color={type.color} />
              <Text style={[styles.tagText, { color: type.color }]}>{type.label}</Text>
            </View>

            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.message}>{item.mensagem}</Text>

            <View style={styles.dates}>
              <Text style={styles.date}>Enviada em {formatDate(item.enviado_em)}</Text>
              {item.expira_em ? <Text style={styles.date}>Válida até {formatDate(item.expira_em)}</Text> : null}
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
    borderTopWidth: 4,
    padding: spacing.lg,
    gap: spacing.md,
  },
  tag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  message: {
    fontSize: fontSize.md,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  dates: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    gap: spacing.xxs,
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.textPlaceholder,
  },
});
