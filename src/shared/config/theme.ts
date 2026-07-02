import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: '#faf0f1' },
          100: { value: '#f5dde1' },
          200: { value: '#e8b8c0' },
          300: { value: '#d88b98' },
          400: { value: '#b83c50' },
          500: { value: '#8b1c2c' }, // PRIMARY — кримсон, основной бренд
          600: { value: '#7a1827' },
          700: { value: '#6e1420' },
          800: { value: '#4a0e16' },
          900: { value: '#2a080d' },
          950: { value: '#1a0508' },
        },
        // Gold — дополнительный акцент. Для текста используйте 600+.
        accent: {
          50:  { value: '#fdf8f0' },
          100: { value: '#faefd8' },
          200: { value: '#f4dcac' },
          300: { value: '#eac479' },
          400: { value: '#dea94a' },
          500: { value: '#b8852a' }, // декоративный золото — на крупный текст и иконки
          600: { value: '#8a6a1a' }, // для текста на светлом фоне
          700: { value: '#6e5410' },
          800: { value: '#4a3708' },
          900: { value: '#2a1a05' },
          950: { value: '#1a0f02' },
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
