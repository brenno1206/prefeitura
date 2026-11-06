import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import PollScreen from '../screens/PollScreen';
import MapScreen from '../screens/MapScreen';
import { ROUTES } from './routes';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

// As abas ficam na base da pilha; telas de detalhe e seções secundárias são empilhadas sobre elas.
// O header nativo fica oculto porque cada tela usa o ScreenHeader no visual do app.
export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
      <Stack.Screen name={ROUTES.NEWS_DETAIL} component={NewsDetailScreen} />
      <Stack.Screen name={ROUTES.EVENTS} component={EventsScreen} />
      <Stack.Screen name={ROUTES.POLL} component={PollScreen} />
      <Stack.Screen name={ROUTES.MAP} component={MapScreen} />
    </Stack.Navigator>
  );
}
