import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';

export default function App() {

  const [currentScreen, setCurrentScreen] = React.useState('events');

  // Renderiza a Interface
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <SafeAreaView style={styles.container}>
      
      {/* Conteúdo Principal com Rolagem */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Principal */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerBrand}>
              <View style={styles.logoIconContainer}>
                <FontAwesome5 name="city" size={18} color="#fff" />
              </View>
              <View>
                <Text style={styles.welcomeText}>Bem-vindo ao</Text>
                <Text style={styles.appTitle}>Minha Prefeitura</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Barra de Busca Rápida */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
            <TextInput 
              placeholder="Buscar serviços ou notícias..." 
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Alerta / Comunicado Oficial Urgente */}
        <View style={styles.sectionContainer}>
          <View style={styles.alertCard}>
            <Ionicons name="warning" size={22} color="#d97706" style={{ marginTop: 2 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.alertTitle}>AVISO DE UTILIDADE PÚBLICA</Text>
              <Text style={styles.alertText}>Fique atento aos comunicados oficiais da administração municipal.</Text>
            </View>
          </View>
        </View>

        {/* Seção de Utilidades */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Serviços e Utilidades</Text>
            <Text style={styles.sectionAction}>Ver todos</Text>
          </View>

          <View style={styles.utilitiesGrid}>
            
           {/* Enquetes */}
            <TouchableOpacity style={styles.utilityItem}>
              <View style={[styles.utilityIconBox, { backgroundColor: '#dcfce7' }]}>
                <AntDesign name="audit" size={22} color="#15803d" />
              </View>
              <Text style={styles.utilityText}>Enquetes</Text>
            </TouchableOpacity>

            {/* Eventos da Prefeitura */}
            <TouchableOpacity 
              style={styles.utilityItem}
              onPress={() => setCurrentScreen('events')}
            >
              <View style={[styles.utilityIconBox, { backgroundColor: '#d6deff' }]}>
                <MaterialIcons name="event" size={22} color="#2945c2" />
              </View>
              <Text style={styles.utilityText}>Eventos</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.utilityItem}>
              <View style={[styles.utilityIconBox, { backgroundColor: '#e0f2fe' }]}>
                <Fontisto name="map" size={22} color="#0369a1"/>
              </View>
              <Text style={styles.utilityText}>Mapa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed de Notícias e Avisos */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimas Notícias</Text>
            <Text style={styles.sectionAction}>Ver mais</Text>
          </View>

          <View style={styles.newsList}>
            {/* Card Notícia 1 */}
            <TouchableOpacity style={styles.newsCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=200&q=80' }} 
                style={styles.newsImage} 
              />
              <View style={styles.newsInfo}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Saúde</Text>
                </View>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  Campanha de Vacinação municipal começa na próxima semana
                </Text>
                <Text style={styles.newsDate}>
                  <Ionicons name="time-outline" size={12} color="#9ca3af" /> Há 2 horas
                </Text>
              </View>
            </TouchableOpacity>

            {/* Card Notícia 2 */}
            <TouchableOpacity style={styles.newsCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=200&q=80' }} 
                style={styles.newsImage} 
              />
              <View style={styles.newsInfo}>
                <View style={[styles.tagContainer, { backgroundColor: '#fef3c7' }]}>
                  <Text style={[styles.tagText, { color: '#b45309' }]}>Obras</Text>
                </View>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  Manutenção e recapeamento asfáltico avançam em novas vias
                </Text>
                <Text style={styles.newsDate}>
                  <Ionicons name="time-outline" size={12} color="#9ca3af" /> Há 5 horas
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Barra de Navegação Inferior (Bottom Bar) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#1d4ed8" />
          <Text style={[styles.navText, { color: '#1d4ed8', fontWeight: 'bold' }]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={22} color="#9ca3af" />
          <Text style={styles.navText}>Serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="newspaper-outline" size={22} color="#9ca3af" />
          <Text style={styles.navText}>Notícias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#9ca3af" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  welcomeText: {
    fontSize: 11,
    color: '#bfdbfe',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationBtn: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1d4ed8',
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    height: 40,
    borderRadius: 10,
    paddingLeft: 38,
    paddingRight: 14,
    fontSize: 13,
    color: '#1f2937',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  alertCard: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#b45309',
  },
  alertText: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionAction: {
    fontSize: 12,
    color: '#1d4ed8',
    fontWeight: '600',
  },
  utilitiesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  utilityItem: {
    width: 88,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  utilityIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  utilityText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  newsList: {
    gap: 10,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  newsImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  newsInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  newsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  newsDate: {
    fontSize: 10,
    color: '#9ca3af',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
  },
});