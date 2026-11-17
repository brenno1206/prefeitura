import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Icon from '../components/ui/Icon';
import Mapa from '../components/map/map';
import { CATEGORIAS, GRUPOS } from '../components/map/categorias';
import { useLocation } from '../components/map/useLocation';
import { useLocals, formatarDistancia } from '../components/map/useLocals';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

const CATEGORIAS_INICIAIS = ['mercado', 'farmacia', 'saude'];
const RAIO_METROS = 2000;

function abrirRota(local) {
  Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lon}`);
}

function Chip({ categoria, ativo, onPress }) {
  const { nome, cor, icone } = CATEGORIAS[categoria];
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, ativo ? { backgroundColor: cor, borderColor: cor } : null]}
      accessibilityRole="button"
      accessibilityState={{ selected: ativo }}
    >
      <Icon family="MaterialCommunityIcons" name={icone} size={16} color={ativo ? colors.white : cor} />
      <Text style={[styles.chipTexto, ativo && { color: colors.white }]}>{nome}</Text>
    </Pressable>
  );
}

function ItemLocal({ local, onPress }) {
  const { nome: nomeCategoria, cor, icone } = CATEGORIAS[local.categoria];
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={[styles.itemIcone, { backgroundColor: cor }]}>
        <Icon family="MaterialCommunityIcons" name={icone} size={18} color={colors.white} />
      </View>
      <View style={styles.itemTextos}>
        <Text style={styles.itemNome} numberOfLines={1}>
          {local.nome}
        </Text>
        <Text style={styles.itemDetalhe} numberOfLines={1}>
          {nomeCategoria} • {formatarDistancia(local.distancia)}
          {local.endereco ? ` • ${local.endereco}` : ''}
        </Text>
      </View>
      <Pressable style={styles.rota} onPress={() => abrirRota(local)} accessibilityLabel={`Rota até ${local.nome}`}>
        <Icon family="MaterialCommunityIcons" name="directions" size={22} color={colors.primary} />
      </Pressable>
    </Pressable>
  );
}

// Tela de Mapa: localização do usuário, serviços públicos de Vila Velha e estabelecimentos próximos.
export default function MapScreen({ navigation }) {
  const [cats, setCats] = useState(CATEGORIAS_INICIAIS);
  const [selecionado, setSelecionado] = useState(null);
  const { lat, lon, real } = useLocation();
  const { locals, carregando, erro, recarregar } = useLocals(lat, lon, cats, RAIO_METROS);

  const toggle = c => setCats(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]));

  const categoriasDoGrupo = grupo => Object.keys(CATEGORIAS).filter(c => CATEGORIAS[c].grupo === grupo);

  let status = `${locals.length} ${locals.length === 1 ? 'local' : 'locais'} • mais próximos primeiro`;
  if (!cats.length) status = 'Selecione uma categoria acima';
  else if (carregando) status = 'Buscando locais...';

  return (
    <ScreenContainer
      scroll={false}
      header={<ScreenHeader title="Mapa" subtitle="Serviços públicos e estabelecimentos" onBack={navigation.goBack} />}
    >
      {Object.entries(GRUPOS).map(([grupo, titulo]) => (
        <View key={grupo} style={styles.grupo}>
          <Text style={styles.grupoTitulo}>
            {titulo}
            {grupo === 'perto' ? ` (até ${RAIO_METROS / 1000} km)` : ' (toda Vila Velha)'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {categoriasDoGrupo(grupo).map(c => (
              <Chip key={c} categoria={c} ativo={cats.includes(c)} onPress={() => toggle(c)} />
            ))}
          </ScrollView>
        </View>
      ))}

      <View style={styles.mapa}>
        <Mapa lat={lat} lon={lon} real={real} locals={locals} selecionado={selecionado} onSelecionar={setSelecionado} />
        {carregando && (
          <View style={styles.carregando}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )}
      </View>

      {!real && <Text style={styles.aviso}>Localização não permitida: mostrando o centro de Vila Velha.</Text>}

      <View style={styles.lista}>
        {erro ? (
          <View style={styles.erro}>
            <Text style={styles.erroTexto}>{erro}</Text>
            <Pressable onPress={recarregar}>
              <Text style={styles.erroBotao}>Tentar novamente</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.status}>{status}</Text>
        )}
        <FlatList
          data={locals}
          keyExtractor={l => l.id}
          renderItem={({ item }) => <ItemLocal local={item} onPress={() => setSelecionado(item)} />}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grupo: {
    marginTop: spacing.md,
  },
  grupoTitulo: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xs,
  },
  chips: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.round,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipTexto: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  mapa: {
    flex: 1,
    minHeight: 240,
    marginTop: spacing.md,
    marginHorizontal: spacing.xl,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  carregando: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.round,
    backgroundColor: colors.surface,
    zIndex: 1000,
  },
  aviso: {
    fontSize: fontSize.xs,
    color: colors.warningDark,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xs,
  },
  lista: {
    height: 220,
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  status: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  erro: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  erroTexto: {
    fontSize: fontSize.sm,
    color: colors.danger,
  },
  erroBotao: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  itemIcone: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextos: {
    flex: 1,
  },
  itemNome: {
    fontSize: fontSize.lg,
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
  separador: {
    height: 1,
    backgroundColor: colors.border,
  },
});
