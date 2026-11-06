import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import Section from '../components/Section';
import ListItem from '../components/ListItem';
import { services } from '../data/services';
import { spacing } from '../theme';

export default function ServicesScreen({ navigation }) {
  function handlePress(service) {
    if (service.route) {
      navigation.navigate(service.route);
      return;
    }
    Alert.alert(service.label, 'Este serviço estará disponível em breve.');
  }

  return (
    <ScreenContainer header={<ScreenHeader title="Serviços" subtitle="Tudo o que a prefeitura oferece" />}>
      <Section>
        <View style={styles.list}>
          {services.map((service) => (
            <ListItem
              key={service.id}
              title={service.label}
              description={service.description}
              icon={service.icon}
              iconColor={service.color}
              iconBackground={service.background}
              onPress={() => handlePress(service)}
            />
          ))}
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
});
