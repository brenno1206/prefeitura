import React from 'react';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';

// Tela de Eventos (placeholder), aberta pelo serviço "Eventos".
export default function EventsScreen({ navigation }) {
  return (
    <ScreenContainer
      header={<ScreenHeader title="Eventos" subtitle="Agenda oficial da prefeitura" onBack={navigation.goBack} />}
    />
  );
}
