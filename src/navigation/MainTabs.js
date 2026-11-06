import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ROUTES } from './routes';
import { colors, fontSize, fontWeight } from '../theme';

const Tab = createBottomTabNavigator();

// Ícone preenchido quando a aba está ativa, contorno quando inativa (igual à barra original).
const TAB_ICONS = {
  [ROUTES.HOME]: 'home',
  [ROUTES.SERVICES]: 'grid',
  [ROUTES.NEWS]: 'newspaper',
  [ROUTES.PROFILE]: 'person',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textPlaceholder,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ focused, color }) => {
          const name = TAB_ICONS[route.name];
          return <Ionicons name={focused ? name : `${name}-outline`} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name={ROUTES.SERVICES} component={ServicesScreen} options={{ title: 'Serviços' }} />
      <Tab.Screen name={ROUTES.NEWS} component={NewsScreen} options={{ title: 'Notícias' }} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  label: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.semibold,
    marginTop: 2,
  },
});
