import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Icon from '../components/ui/Icon';
import Mapa from '../components/map/map';
import { useUserLocation } from '../components/map/useUserLocation';
import { locais } from '../data/locais';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

function abrirRota(local) {
  Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lon}`);
}

// Tela de Mapa: pontos fixos da Prefeitura, Fórum e Câmara (src/data/locais.js) + posição do usuário (verde).
export default function MapScreen({ navigation }) {
  const [selecionado, setSelecionado] = useState(null);
  const usuario = useUserLocation();

  return (
    <ScreenContainer
      scroll={false}
      header={<ScreenHeader title="Mapa" subtitle="Prefeitura, Fórum e Câmara" onBack={navigation.goBack} />}
    >
      <View style={styles.mapa}>
        <Mapa locais={locais} selecionado={selecionado} usuario={usuario} />
      </View>

      <View style={styles.lista}>
        {locais.map((local) => (
          <Pressable key={local.id} style={styles.item} onPress={() => setSelecionado(local)}>
            <View style={styles.itemIcone}>
              <Icon family="MaterialCommunityIcons" name="map-marker" size={18} color={colors.white} />
            </View>
            <View style={styles.itemTextos}>
              <Text style={styles.itemNome}>{local.nome}</Text>
              <Text style={styles.itemDetalhe}>{local.endereco}</Text>
            </View>
            <Pressable style={styles.rota} onPress={() => abrirRota(local)} accessibilityLabel={`Rota até ${local.nome}`}>
              <Icon family="MaterialCommunityIcons" name="directions" size={22} color={colors.primary} />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  mapa: {
    flex: 1,
    minHeight: 240,
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  lista: {
    margin: spacing.xl,
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  itemIcone: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextos: {
    flex: 1,
  },
  itemNome: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  itemDetalhe: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
  rota: {
    padding: spacing.sm,
  },
});
