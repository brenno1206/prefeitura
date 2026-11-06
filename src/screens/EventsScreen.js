import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';

export default function EventsScreen({ navigation }) {
  return (
    <ScreenContainer
      header={<ScreenHeader title="Eventos" subtitle="Agenda oficial da prefeitura" onBack={navigation.goBack} />}
    />
  );
}
