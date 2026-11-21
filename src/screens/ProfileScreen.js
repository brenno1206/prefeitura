import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import ListItem from '../components/ui/ListItem';
import { user } from '../data/user';
import { ROUTES } from '../navigation/routes';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';
import { showAlert } from '../utils/alert';

// Campos exibidos em "Meus dados".
const USER_FIELDS = [
  { label: 'E-mail', value: user.email },
  { label: 'Telefone', value: user.phone },
  { label: 'Endereço', value: user.address },
  { label: 'Bairro', value: user.neighborhood },
  { label: 'Cidade', value: user.city },
];

// Itens com `route` navegam; os demais ainda não foram implementados.
const MENU_ITEMS = [
  { id: 'notifications', title: 'Notificações', icon: { family: 'Ionicons', name: 'notifications-outline' }, route: ROUTES.NOTIFICATIONS },
  { id: 'requests', title: 'Minhas solicitações', icon: { family: 'Ionicons', name: 'document-text-outline' } },
  { id: 'help', title: 'Ajuda', icon: { family: 'Ionicons', name: 'help-circle-outline' } },
];

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

// Aba Perfil: dados do cidadão (mockados) e menu da conta.
export default function ProfileScreen({ navigation }) {
  function handlePress(item) {
    if (item.route) {
      navigation.navigate(item.route);
      return;
    }
    showAlert(item.title, 'Funcionalidade em desenvolvimento.');
  }

  return (
    <ScreenContainer header={<ScreenHeader title="Perfil" />}>
      <Section>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{getInitials(user.name)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.detail}>Cidadão desde {user.memberSince}</Text>
          </View>
        </View>
      </Section>

      <Section>
        <SectionHeader title="Meus dados" />
        <View style={styles.dataCard}>
          {USER_FIELDS.map((field, index) => (
            <View key={field.label} style={[styles.dataRow, index > 0 && styles.dataRowBorder]}>
              <Text style={styles.dataLabel}>{field.label}</Text>
              <Text style={styles.dataValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section>
        <SectionHeader title="Conta" />
        <View style={styles.list}>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.id} title={item.title} icon={item.icon} onPress={() => handlePress(item)} />
          ))}
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  userInfo: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  detail: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
  dataCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  dataRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dataLabel: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  dataValue: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  list: {
    gap: spacing.md,
  },
});
