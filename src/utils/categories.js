import { colors } from '../theme';

const CATEGORY_COLORS = {
  Obras: { background: colors.warningLight, text: colors.warningDark },
  Saúde: { background: colors.primaryLight, text: colors.primary },
  Educação: { background: colors.successLight, text: colors.success },
};

const DEFAULT_COLORS = { background: colors.primaryLight, text: colors.primary };

export function getCategoryColors(category) {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLORS;
}
