import React from 'react';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';

export default function PollScreen({ navigation }) {
  return (
    <ScreenContainer
      header={<ScreenHeader title="Enquetes" subtitle="Sua opinião ajuda a cidade" onBack={navigation.goBack} />}
    />
  );
}
