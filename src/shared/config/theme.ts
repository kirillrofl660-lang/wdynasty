import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Crimson — основной бренд (глубокий тёмно-красный #8b1c2c)
        brand: {
          50:  { value: '#fff0f1' },
          100: { value: '#fce4e7' },
          200: { value: '#f9c1c9' },
          300: { value: '#f39aa7' },
          400: { value: '#e86078' },
          500: { value: '#8b1c2c' }, // PRIMARY — кнопки, акценты
          600: { value: '#7a1827' },
          700: { value: '#6e1420' }, // footer, тёмные секции
          800: { value: '#5a1019' },
          900: { value: '#450c14' },
          950: { value: '#2a070c' },
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
        heading: { value: "'Philosopher', Georgia, serif" },
        body:    { value: "'Manrope', system-ui, sans-serif" },
        display: { value: "'Yeseva One', Georgia, serif" },
      },
    },
    semanticTokens: {
      colors: {
        'chakra-body-bg':   { value: '#f5f0e6' },
        'chakra-body-text': { value: '#1a0f0a' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
