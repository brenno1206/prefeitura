import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';

export default function PollScreen({ navigation }) {
  return (
    <ScreenContainer
      header={<ScreenHeader title="Enquetes" subtitle="Sua opinião ajuda a cidade" onBack={navigation.goBack} />}
    />
  );
}
