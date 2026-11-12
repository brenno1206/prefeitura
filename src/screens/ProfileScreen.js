import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';
import SectionHeader from '../components/layout/SectionHeader';
import ListItem from '../components/ui/ListItem';
import { user } from '../data/user';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

const MENU_ITEMS = [
  { id: 'data', title: 'Meus dados', icon: { family: 'Ionicons', name: 'person-outline' } },
  { id: 'notifications', title: 'Notificações', icon: { family: 'Ionicons', name: 'notifications-outline' } },
  { id: 'requests', title: 'Minhas solicitações', icon: { family: 'Ionicons', name: 'document-text-outline' } },
  { id: 'help', title: 'Ajuda', icon: { family: 'Ionicons', name: 'help-circle-outline' } },
];

// Aba Perfil: dados do cidadão e menu de opções da conta.
export default function ProfileScreen() {
  return (
    <ScreenContainer header={<ScreenHeader title="Perfil" />}>
      <Section>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.detail}>{user.email}</Text>
            <Text style={styles.detail}>Bairro: {user.neighborhood}</Text>
          </View>
        </View>
      </Section>

      <Section>
        <SectionHeader title="Conta" />
        <View style={styles.list}>
          {MENU_ITEMS.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={() => Alert.alert(item.title, 'Funcionalidade em desenvolvimento.')}
            />
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
  list: {
    gap: spacing.md,
  },
});
