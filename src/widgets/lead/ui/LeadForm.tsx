'use client'

import { useState, useRef } from 'react'
import { Phone, CheckCircle, ShieldCheck, Clock } from 'lucide-react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Icon,
  Center,
} from '@chakra-ui/react'

interface FormState {
  name: string
  contact: string
  website: string // honeypot: скрытое поле-ловушка для ботов
}

const initialState: FormState = { name: '', contact: '', website: '' }

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const mountedAt = useRef<number>(Date.now())

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) {
      setError('Укажите имя и телефон/email')
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
          <Text fontSize="xl" fontWeight="semibold" color="white" textAlign="center">
            Заявка принята!
          </Text>
          <Text color="gray.300" textAlign="center" maxW="sm">
            Перезвоним в течение 10 минут в рабочее время.
          </Text>
          <Button
            variant="outline"
            colorPalette="gray"
            color="brand.400"
            onClick={() => setStatus('idle')}
          >
            Отправить ещё
          </Button>
        </VStack>
      </Center>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="lg" mx="auto">
      <VStack gap={4} align="stretch">
        {/* Honeypot: скрытое поле-ловушка для ботов */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange('website')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        />

        <Input
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange('name')}
          size="lg"
          minH="56px"
          fontSize="md"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ borderColor: 'brand.400', boxShadow: 'none' }}
        />

        <Input
          name="contact"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Телефон"
          value={form.contact}
          onChange={handleChange('contact')}
          size="lg"
          minH="56px"
          fontSize="md"
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
          minH="56px"
          colorPalette="brand"
          loading={status === 'loading'}
          loadingText="Соединяем..."
        >
          <HStack gap={2}>
            <Icon as={Phone} w={5} h={5} />
            <Text fontSize="md" fontWeight="600">Получить консультацию</Text>
          </HStack>
        </Button>

        <HStack gap={3} justify="center" wrap="wrap">
          <HStack gap={1.5}>
            <Icon as={ShieldCheck} w={4} h={4} color="gray.400" />
            <Text color="gray.400" fontSize="xs">
              Данные в безопасности
            </Text>
          </HStack>
          <HStack gap={1.5}>
            <Icon as={Clock} w={4} h={4} color="gray.400" />
            <Text color="gray.400" fontSize="xs">
              Перезвоним за 10 минут
            </Text>
          </HStack>
        </HStack>

        <Text color="gray.400" fontSize="xs" textAlign="center" lineHeight="1.6">
          Нажимая кнопку, вы соглашаетесь на передачу и обработку персональных данных.
          Никакого спама и навязчивых продаж.
        </Text>
      </VStack>
    </Box>
  )
}
