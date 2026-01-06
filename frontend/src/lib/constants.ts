// ============================================================================
// DESIGN TOKENS - Shared Color Palette
// ============================================================================

export const COLORS = {
  // Primary
  primary: '#E67E22',
  primaryLight: '#F5A623',
  primaryDark: '#D35400',

  // Secondary
  secondary: '#3498DB',

  // Status
  success: '#27AE60',
  successLight: '#58D68D',
  warning: '#F39C12',
  danger: '#E74C3C',

  // Backgrounds
  background: '#FDF6E3',
  card: '#FFFFFF',

  // Text
  text: '#2C3E50',
  textLight: '#7F8C8D',

  // Borders
  border: '#E8E0D5',

  // Special
  streak: '#FF6B35',
} as const;

export type ColorKey = keyof typeof COLORS;
