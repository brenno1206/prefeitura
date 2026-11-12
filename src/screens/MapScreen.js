import React from 'react';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';

export default function MapScreen({ navigation }) {
  return (
    <ScreenContainer
      header={<ScreenHeader title="Mapa" subtitle="Unidades e pontos de atendimento" onBack={navigation.goBack} />}
    />
  );
}
