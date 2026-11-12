import React from 'react';
import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

const FAMILIES = {
  AntDesign,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
};

// Ícone genérico que recebe { family, name } dos dados mockados (usado na Home e no ListItem).
export default function Icon({ family = 'Ionicons', name, size = 22, color, style }) {
  const IconComponent = FAMILIES[family] ?? Ionicons;
  return <IconComponent name={name} size={size} color={color} style={style} />;
}
