import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import ScreenContainer from '../components/layout/ScreenContainer';
import ScreenHeader from '../components/layout/ScreenHeader';
import { colors, spacing } from '../theme';
import { INITIAL_IDEAS, POLL_CATEGORIES } from '../data/polls';

export default function PollScreen({ navigation }) {
  const [ideas, setIdeas] = useState(INITIAL_IDEAS);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infraestrutura');
  const [author, setAuthor] = useState('');

  const filteredIdeas = useMemo(() => {
    return ideas
      .filter((item) =>
        selectedCategory === 'Todas' ? true : item.category === selectedCategory
      )
      .sort((a, b) => b.votes - a.votes);
  }, [ideas, selectedCategory]);

  const handleToggleVote = (id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) => {
        if (idea.id !== id) return idea;
        const alreadyVoted = idea.voted;
        return {
          ...idea,
          voted: !alreadyVoted,
          votes: alreadyVoted ? idea.votes - 1 : idea.votes + 1,
        };
      })
    );
  };

  const handleAddIdea = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha o título e a descrição da sua ideia.');
      return;
    }

    const newIdea = {
      id: String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      category,
      author: author.trim() || 'Cidadão Anônimo',
      votes: 1,
      voted: true,
      createdAt: 'Agora mesmo',
    };

    setIdeas((prev) => [newIdea, ...prev]);
    setTitle('');
    setDescription('');
    setAuthor('');
    setShowForm(false);
  };

  return (
    <ScreenContainer
      header={
        <ScreenHeader
          title="Enquetes"
          subtitle="Sua opinião ajuda a cidade"
          onBack={navigation.goBack}
        />
      }
    >
      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.newIdeaButton, showForm && styles.cancelButton]}
          onPress={() => setShowForm(!showForm)}
          activeOpacity={0.8}
        >
          <Text style={[styles.newIdeaButtonText, showForm && styles.cancelButtonText]}>
            {showForm ? '✕ Cancelar envio' : '+ Propor Nova Ideia'}
          </Text>
        </TouchableOpacity>

        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Envie sua proposta para o município</Text>

            <Text style={styles.label}>Título da ideia *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Reforma da quadra do bairro..."
              placeholderTextColor={colors.textPlaceholder}
              value={title}
              onChangeText={setTitle}
              maxLength={80}
            />

            <Text style={styles.label}>Categoria</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {POLL_CATEGORIES.filter((c) => c !== 'Todas').map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, category === cat && styles.chipSelected]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      category === cat && styles.chipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Descrição detalhada *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Explique como essa ideia melhora a cidade..."
              placeholderTextColor={colors.textPlaceholder}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Seu nome (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Ana Paula"
              placeholderTextColor={colors.textPlaceholder}
              value={author}
              onChangeText={setAuthor}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddIdea}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Publicar Ideia</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterBar}
        >
          {POLL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterChip,
                selectedCategory === cat && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat && styles.filterTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredIdeas.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              Nenhuma ideia cadastrada nessa categoria ainda. Seja o primeiro a propor!
            </Text>
          </View>
        ) : (
          filteredIdeas.map((idea) => (
            <View key={idea.id} style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{idea.category}</Text>
                </View>
                <Text style={styles.dateText}>{idea.createdAt}</Text>
              </View>

              <Text style={styles.cardTitle}>{idea.title}</Text>
              <Text style={styles.cardDescription}>{idea.description}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.authorText}>Por: {idea.author}</Text>

                <TouchableOpacity
                  style={[styles.voteButton, idea.voted && styles.voteButtonActive]}
                  onPress={() => handleToggleVote(idea.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.voteButtonText,
                      idea.voted && styles.voteButtonTextActive,
                    ]}
                  >
                    {idea.voted ? '▲ Apoiado' : '△ Apoiar'} ({idea.votes})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: spacing.md || 16,
    paddingTop: spacing.sm || 8,
  },
  newIdeaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  newIdeaButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  cancelButtonText: {
    color: colors.textSecondary,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  textArea: {
    minHeight: 88,
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  chipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.success,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyBox: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  authorText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  voteButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  voteButtonActive: {
    backgroundColor: colors.primary,
  },
  voteButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  voteButtonTextActive: {
    color: colors.white,
  },
});
