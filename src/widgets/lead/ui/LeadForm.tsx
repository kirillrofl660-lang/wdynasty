'use client'

import { useState, useRef } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  Icon,
  Center,
} from '@chakra-ui/react'

interface FormState {
  name: string
  contact: string
  message: string
  website: string // honeypot: реальные пользователи это поле не видят
}

const initialState: FormState = { name: '', contact: '', message: '', website: '' }

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  // Момент монтирования формы — для time-trap на сервере
  const mountedAt = useRef<number>(Date.now())

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) {
      setError('Укажите имя и контакт для связи')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          elapsed: Date.now() - mountedAt.current,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Не удалось отправить заявку')
      }

      setStatus('success')
      setForm(initialState)
      mountedAt.current = Date.now()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <Center py={10}>
        <VStack gap={4}>
          <Center w={16} h={16} bg="green.500" borderRadius="full">
            <Icon as={CheckCircle} w={8} h={8} color="white" />
          </Center>
          <Text fontSize="xl" fontWeight="semibold" color="white">
            Заявка отправлена!
          </Text>
          <Text color="gray.300" textAlign="center" maxW="sm">
            Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
          </Text>
          <Button
            variant="outline"
            colorPalette="gray"
            color="brand.400"
            onClick={() => setStatus('idle')}
          >
            Отправить ещё одну
          </Button>
        </VStack>
      </Center>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="lg" mx="auto">
      <VStack gap={4} align="stretch">
        {/* Honeypot: скрытое поле-ловушка для ботов. Не видно людям. */}
        <Input
          name="website"
          value={form.website}
          onChange={handleChange('website')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          position="absolute"
          left="-9999px"
          width="1px"
          height="1px"
          opacity={0}
          pointerEvents="none"
        />
        <Input
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange('name')}
          size="lg"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ borderColor: 'brand.400', boxShadow: 'none' }}
        />
        <Input
          placeholder="Email, телефон или Telegram"
          value={form.contact}
          onChange={handleChange('contact')}
          size="lg"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ borderColor: 'brand.400', boxShadow: 'none' }}
        />
        <Textarea
          placeholder="Расскажите о вашей задаче (необязательно)"
          value={form.message}
          onChange={handleChange('message')}
          rows={4}
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ borderColor: 'brand.400', boxShadow: 'none' }}
        />

        {status === 'error' && error && (
          <Text color="red.300" fontSize="sm">
            {error}
          </Text>
        )}

        <Button
          type="submit"
          size="lg"
          colorPalette="brand"
          loading={status === 'loading'}
          loadingText="Отправка..."
        >
          <HStack gap={2}>
            <Text>Отправить заявку</Text>
            <Icon as={Send} w={4} h={4} />
          </HStack>
        </Button>

        <Text color="gray.400" fontSize="xs" textAlign="center">
          Нажимая кнопку, вы соглашаетесь на обработку данных.
          Никакого спама и навязчивых продаж.
        </Text>
      </VStack>
    </Box>
  )
}
