import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Crimson — основной бренд (глубокий тёмно-красный #8b1c2c)
        brand: {
          50:  { value: '#f5f3ff' },
          100: { value: '#ede9fe' },
          200: { value: '#ddd6fe' },
          300: { value: '#c4b5fd' },
          400: { value: '#a78bfa' },
          500: { value: '#8b5cf6' }, // PRIMARY — фиолетовый бренда сайта
          600: { value: '#7c3aed' },
          700: { value: '#6d28d9' },
          800: { value: '#3a2a5c' },
          900: { value: '#2a1a3a' },
          950: { value: '#1a1030' }, // тёмные секции — тёмно-сливовый, как на главной (CTA)
        },
        // Gold — дополнительный акцент (#b8852a)
        accent: {
          50:  { value: '#fdf8f0' },
          100: { value: '#faefd8' },
          200: { value: '#f4dcac' },
          300: { value: '#eac479' },
          400: { value: '#dea94a' },
          500: { value: '#b8852a' }, // PRIMARY — золото, ромбы
          600: { value: '#9c6f20' },
          700: { value: '#7e5818' },
          800: { value: '#674612' },
          900: { value: '#4e330d' },
          950: { value: '#2a1a05' },
        },
        // Cream — фоновые цвета
        cream: {
          50:  { value: '#fdfcf9' },
          100: { value: '#f5f0e6' }, // основной фон
          200: { value: '#ede7d6' }, // вторичный фон
          300: { value: '#e4dcca' },
          400: { value: '#d8cfb8' },
        },
      },
      fonts: {
        heading: { value: "'Manrope', system-ui, sans-serif" },
        body:    { value: "'Manrope', system-ui, sans-serif" },
        display: { value: "'Manrope', system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        'chakra-body-bg':   { value: '#fafafa' },
        'chakra-body-text': { value: '#111111' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
