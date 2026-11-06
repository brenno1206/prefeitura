import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, shadows, spacing } from '../theme';

// Header principal da Home: marca, notificações e um slot (children) para a busca.
export default function AppHeader({ hasNotifications = true, onNotificationPress, children }) {
  return (
    <View style={styles.header}>
      <View style={[styles.top, children && styles.topWithContent]}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <FontAwesome5 name="city" size={18} color={colors.white} />
          </View>
          <View>
            <Text style={styles.welcome}>Bem-vindo ao</Text>
            <Text style={styles.title}>Minha Prefeitura</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
          accessibilityLabel="Notificações"
        >
          <Ionicons name="notifications-outline" size={20} color={colors.white} />
          {hasNotifications && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
    ...shadows.header,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topWithContent: {
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
  title: {
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
});
