import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#f0f9ff' },
          100: { value: '#e0f2fe' },
          200: { value: '#bae6fd' },
          300: { value: '#7dd3fc' },
          400: { value: '#38bdf8' },
          500: { value: '#0ea5e9' },
          600: { value: '#0284c7' },
          700: { value: '#0369a1' },
          800: { value: '#075985' },
          900: { value: '#0c4a6e' },
          950: { value: '#082f49' },
        },
        accent: {
          50: { value: '#fdf4ff' },
          100: { value: '#fae8ff' },
          200: { value: '#f5d0fe' },
          300: { value: '#f0abfc' },
          400: { value: '#e879f9' },
          500: { value: '#d946ef' },
          600: { value: '#c026d3' },
          700: { value: '#a21caf' },
          800: { value: '#86198f' },
          900: { value: '#701a75' },
          950: { value: '#4a044e' },
        },
      },
      fonts: {
        heading: { value: 'Inter, system-ui, sans-serif' },
        body: { value: 'Inter, system-ui, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        'chakra-body-bg': { value: '{colors.gray.50}' },
        'chakra-body-text': { value: '{colors.gray.800}' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
