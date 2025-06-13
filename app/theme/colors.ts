export const colors = {
  primary: {
    DEFAULT: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  secondary: {
    DEFAULT: '#FCD34D',
    light: '#FDE68A',
    dark: '#F59E0B',
  },
  background: {
    DEFAULT: '#111827',
    light: '#1F2937',
    lighter: '#374151',
  },
  text: {
    DEFAULT: '#F9FAFB',
    secondary: '#D1D5DB',
    muted: '#9CA3AF',
  },
  border: {
    DEFAULT: '#374151',
    light: '#4B5563',
  },
  error: {
    DEFAULT: '#EF4444',
    light: '#F87171',
  },
} as const;

export type ColorTheme = typeof colors;
