import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { timeAgo } from '../../utils/date';
import { colors, fontSize, fontWeight, radius, spacing } from '../../theme';

// Visual de cada tipo de notificação retornado pela API.
export const NOTIFICATION_TYPES = {
  emergencia: { label: 'Emergência', icon: 'alert-circle', color: colors.danger, background: '#fee2e2' },
  alerta: { label: 'Alerta', icon: 'warning', color: colors.warning, background: colors.warningLight },
  utilidade_publica: { label: 'Utilidade pública', icon: 'information-circle', color: colors.primary, background: colors.primaryLight },
  campanha: { label: 'Campanha', icon: 'megaphone', color: colors.success, background: colors.successLight },
};

const DEFAULT_TYPE = { label: 'Aviso', icon: 'notifications', color: colors.primary, background: colors.primaryLight };

export function getNotificationType(tipo) {
  return NOTIFICATION_TYPES[tipo] ?? DEFAULT_TYPE;
}

// Card de notificação (tela de Notificações). "Saiba mais" abre o detalhe da notificação.
export default function NotificationCard({ notification, onPress }) {
  const type = getNotificationType(notification.tipo);

  return (
    <View style={[styles.card, { borderLeftColor: type.color }]}>
      <View style={styles.top}>
        <View style={[styles.tag, { backgroundColor: type.background }]}>
          <Ionicons name={type.icon} size={12} color={type.color} />
          <Text style={[styles.tagText, { color: type.color }]}>{type.label}</Text>
        </View>
        <Text style={styles.date}>{timeAgo(notification.enviado_em)}</Text>
      </View>

      <Text style={styles.title}>{notification.titulo}</Text>
      <Text style={styles.message} numberOfLines={2}>
        {notification.mensagem}
      </Text>

      <TouchableOpacity onPress={onPress} hitSlop={8}>
        <Text style={styles.link}>Saiba mais</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
  },
  tagText: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.semibold,
  },
  date: {
    fontSize: fontSize.xxs,
    color: colors.textPlaceholder,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  message: {
    fontSize: fontSize.sm,
    lineHeight: 18,
    color: colors.textMuted,
  },
  link: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
});
