import React from 'react';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';

// Tela de Mapa (placeholder), aberta pelo serviço "Mapa".
export default function MapScreen({ navigation }) {
  return (
    <ScreenContainer
      header={<ScreenHeader title="Mapa" subtitle="Unidades e pontos de atendimento" onBack={navigation.goBack} />}
    />
  );
}
