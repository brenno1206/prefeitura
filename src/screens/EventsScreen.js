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
                  
                  >

                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}

          </View>
        </View>
      </Modal>

    </ScreenContainer>
  );
}
