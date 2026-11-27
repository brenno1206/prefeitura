import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import Section from '../components/layout/Section';

import buscarMunicipalCulturalEvents from '../services/mapaCultural'
import { colors, fontSize, fontWeight, radius, spacing } from '../theme'
import EventCard from '../components/events/EventCard';

// Linha reutilizável p exibir informações do evento
function DetailRow({ icon, label, value }) {
  return (

    <View style={StyleSheet.detailRow}>

      <Ionicons name={icon} size={19} color={colors.primary} />

      <View style={styles.detailInfo}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>

    </View>
  )
}

// Tela de Eventos (placeholder), aberta pelo serviço "Eventos".
export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Consulta a API e atualiza os estados da tela
  const loadEvents = useCallback(async () => {

    try {
      setLoading(true)
      setError(null)

      const data = await buscarMunicipalCulturalEvents()

      setEvents(data)
    }
    catch (err) {
      setError(err.message || 'Não foi possível carregar os Eventos.')
    }
    finally {
      setLoading(false)
    }
  }, [])

  // Executa a primeira consulta quando a tela é aberta
  useEffect(() => { loadEvents() }, [loadEvents])

  async function openSource(url) {

    try { await Linking.openURL(url) }
    catch {
      Alert.alert (
        'Não foi possível abrir',
        'Verifique sua conexão e tente novamente.'
      )
    }
  }

  return (
    
    <ScreenContainer
      header={ <ScreenHeader title="Eventos" subtitle="Agenda Oficial da Prefeitura" onBack={navigation.goBack} />}
    >
      <Section>
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color={colors.primary}
            />
          </View>

          <Text style={styles.introText}>
            Consulte eventos publicados pela Secretaria Municipal de Cultura no Mapa Cultural do Espírito Santo.
          </Text>
        </View>

        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>Agenda Cultural</Text>

            {!loading && !error && (
              <Text style={styles.count}>
                {events.length}{' '}
                {events.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadEvents}
            disabled={loading}
            accessibilityRole='button'
            accessibilityLabel='Atualizar eventos'
          >
            <Ionicons
              name='refresh'
              size={19}
              color={loading ? colors.textPlaceholder : colors.primary}
            />
          </TouchableOpacity>
        </View>

        // Estado de Carregamento
        {loading && (

          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={colors.primary} />

            <Text style={styles.stateText}>
              Buscando eventos na API...
            </Text>
          </View>
        )}

        // Estado de Erro
        {!loading && error && (

          <View style={styles.stateContainer}>
            <Ionicons
              name="cloud-offline-outline"
              size={38}
              color={colors.textPlaceholder}
            />

            <Text style={styles.stateTitle}>
              Não foi possível carregar os eventos
            </Text>

            <Text style={styles.stateText}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadEvents}
              accessibilityRole='button'
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        // Estado sem Resultados
        {!loading && !error && events.length === 0 && (

          <View style={styles.stateContainer}>
            <Ionicons
              name="calendar-outline"
              size={38}
              color={colors.textPlaceholder}
            />

            <Text style={styles.stateTitle}>
              Nenhum evento encontrado
            </Text>

            <Text style={styles.stateText}>
              Não foram encontrados eventos publicados para este responsável na plataforma. 
            </Text>
          </View>
        )}

        // Lista de Eventos recebidos da API
        {!loading && !error && events.length > 0 && (

          <View style={styles.eventList}>

            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => setSelectedEvent(event)}
              />
            ))}

          </View>
        )}

        <Text style={styles.source}>
          Fonte: Mapa Cultural ES · Dados consultados pela API
        </Text>

      </Section>

      // Detalhes do Evento Selecionado
      <Modal
        visible={Boolean(selectedEvent)}
        transparent
        animationType='fade'
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>

            {selectedEvent && (

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.category}>CULTURA</Text>

                  <TouchableOpacity
                    onPress={() => setSelectedEvent(null)}
                    accessibilityRole='button'
                    accessibilityLabel='Fechar Detalhes'
                  >
                    <Ionicons
                      name="close-circle"
                      size={27}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>
                  {selectedEvent.title}
                </Text>

                <Text style={styles.modalDescription}>
                  {selectedEvent.description}
                </Text>

                <View style={styles.detailList}>
                  <Text style={styles.occurrencesTitle}>
                    Datas e Locais
                  </Text>
                  
                  {selectedEvent.occurrences.map((occurrence) => (

                    <DetailRow
                      key={occurrence.id}
                      icon="calendar-outline"
                      label={occurrence.place}
                      value={occurrence.dateDescription || 'Data não informada'}
                    />
                  ))}

                  <DetailRow
                    icon="business-outline"
                    label="Responsável pelo Cadastro"
                    value={selectedEvent.organizer}
                  />
                </View>

                <TouchableOpacity
                  style={styles.sourceButton}
                  onPress={() => openSource(selectedEvent.sourceUrl)}
                  accessibilityRole='link'
                >
                  <Ionicons
                    name="open-outline"
                    size={17}
                    color={colors.primary}
                  />

                  <Text style={styles.sourceButtonText}>
                    Ver publicação no Mapa Cultural - ES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedEvent(null)}
                  accessibilityRole='button'
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}

          </View>
        </View>
      </Modal>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  intro: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl
  },

  introIcon: {
    alignSelf: 'flex-start'
  },

  introText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 19
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },

  sectionTitle: {
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    fontWeight: fontWeight.bold
  },

  count: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs
  },

  refreshButton: {
    width: 38,
    height: 38,
    borderRadius: radius.round,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },

  eventList: {
    gap: spacing.md
  },

  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxxl,
    gap: spacing.md
  },

  stateTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },

  stateText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },

  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },

  retryText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold
  },

  source: {
    color: colors.textPlaceholder,
    fontSize: fontSize.xxs,
    textAlign: 'center',
    marginTop: spacing.xl
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl
  },

  modalCard: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '85%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl
  },

  modalContent: {
    paddingBottom: spacing.sm
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },

  modalTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md
  },

  modalDescription: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 21
  },

  detailList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.md
  },

  occurrencesTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md
  },

  detailInfo: {
    flex: 1,
    gap: spacing.xxs
  },

  detailLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold
  },

  detailValue: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    lineHeight: 20
  },

  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: spacing.xl,
  },

  sourceButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },

  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },

  closeButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  }
})