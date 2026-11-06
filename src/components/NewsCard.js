import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Tag from './Tag';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function NewsCard({ title, category, timeAgo, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} accessibilityRole="button">
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Tag label={category} />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.date}>
          <Ionicons name="time-outline" size={12} color={colors.textPlaceholder} /> {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: radius.md,
    backgroundColor: colors.border,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: fontSize.xxs,
    color: colors.textPlaceholder,
  },
});
