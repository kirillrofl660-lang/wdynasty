import type { Metadata } from 'next'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Flex,
  List,
  Separator,
} from '@chakra-ui/react'
import {
  CheckCircle,
  ShoppingCart,
  Zap,
  Shield,
  BarChart,
  ArrowRight,
  Package,
  Truck,
  CreditCard,
  Users,
  Settings,
} from 'lucide-react'
import { ScrollReveal } from '../../../components/ScrollReveal'
import { MagneticButton } from '../../../components/MagneticButton'
import { LeadForm } from '@/src/widgets/lead/ui/LeadForm'

export const metadata: Metadata = {
  title: 'Интернет-магазин на 1С-Битрикс | Династия Разработчиков',
  description: 'Разработка интернет-магазинов на 1С-Битрикс с интеграцией 1С. E-commerce решения под ключ — каталог, корзина, оплата, доставка, CRM.',
  keywords: ['интернет-магазин 1С-Битрикс', 'разработка магазина битрикс', 'e-commerce битрикс', 'битрикс интеграция 1С'],
  alternates: {
    canonical: 'https://wdynasty.ru/uslugi/ecommerce-1c-bitrix',
  },
  openGraph: {
    title: 'Интернет-магазин на 1С-Битрикс — Династия Разработчиков',
    description: 'Разработка интернет-магазинов на 1С-Битрикс с интеграцией 1С под ключ.',
    url: 'https://wdynasty.ru/uslugi/ecommerce-1c-bitrix',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
}

const features = [
  {
    icon: ShoppingCart,
    title: 'Каталог и корзина',
    description: 'Многоуровневый каталог, фильтры, сравнение, избранное. Быстрая корзина с AJAX-обновлением.',
  },
  {
    icon: CreditCard,
    title: 'Оплата и эквайринг',
    description: 'Подключение Tinkoff, СБП, ЮKassa, Сбер, рассрочка. Автоматические чеки по 54-ФЗ.',
  },
  {
    icon: Truck,
    title: 'Доставка',
    description: 'СДЭК, Boxberry, Почта России, DPD. Расчёт стоимости, трекинг, ПВЗ на карте.',
  },
  {
    icon: Package,
    title: 'Интеграция с 1С',
    description: 'Двусторонняя синхронизация товаров, остатков, цен и заказов с 1С:Предприятие.',
  },
  {
    icon: BarChart,
    title: 'Аналитика и CRM',
    description: 'Передача целей в Метрику и GA4, интеграция с Битрикс24 CRM, воронки продаж.',
  },
  {
    icon: Zap,
    title: 'Производительность',
    description: 'Кеширование, CDN, оптимизация изображений. Скорость загрузки < 1.5 сек.',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'SSL, защита от DDoS, WAF, регулярные бэкапы, GDPR и 152-ФЗ соответствие.',
  },
  {
    icon: Users,
    title: 'Личный кабинет',
    description: 'История заказов, бонусная программа, профиль, адреса доставки, списки рассылки.',
  },
  {
    icon: Settings,
    title: 'Управление контентом',
    description: 'Акции, баннеры, промокоды, скидки, подарки — всё управляется из админки без разработчика.',
  },
]

const workStages = [
  { num: '01', title: 'Брифинг и анализ', desc: 'Изучаем нишу, конкурентов, согласуем структуру каталога и бизнес-процессы.' },
  { num: '02', title: 'Дизайн и прототип', desc: 'Разрабатываем UX/UI макеты, учитывая конверсию и мобильные устройства.' },
  { num: '03', title: 'Разработка', desc: 'Верстка, программирование функционала, подключение платёжных систем и служб доставки.' },
  { num: '04', title: 'Интеграция 1С', desc: 'Настройка модуля обмена, проверка синхронизации товаров, цен и заказов.' },
  { num: '05', title: 'Тестирование', desc: 'Функциональное, нагрузочное, кроссбраузерное тестирование. Проверка всех сценариев оплаты.' },
  { num: '06', title: 'Запуск и поддержка', desc: 'Перенос на боевой сервер, SEO-настройка, обучение персонала. Гарантия 1 месяц.' },
]

const includedInPrice = [
  'Лицензия 1С-Битрикс: Малый бизнес или Стандарт',
  'Адаптивный дизайн (мобильный + десктоп)',
  'Настройка одного платёжного шлюза',
  'Интеграция с одной службой доставки',
  'Базовая SEO-оптимизация',
  'Обучение работе с админкой',
  'Гарантийная поддержка 1 месяц',
]

const prices = [
  {
    name: 'Старт',
    price: 'от 150 000 ₽',
    term: 'от 4 недель',
    color: 'gray',
    features: [
      'До 500 товаров',
      'Готовый шаблон + доработка',
      '1 способ оплаты',
      '1 служба доставки',
      'Базовая интеграция 1С',
    ],
  },
  {
    name: 'Бизнес',
    price: 'от 350 000 ₽',
    term: 'от 8 недель',
    color: 'brand',
    popular: true,
    features: [
      'Неограниченный каталог',
      'Индивидуальный дизайн',
      'Все способы оплаты',
      'Все службы доставки',
      'Полная интеграция 1С',
      'Личный кабинет',
      'Бонусная программа',
    ],
  },
  {
    name: 'Highload',
    price: 'от 700 000 ₽',
    term: 'от 12 недель',
    color: 'gray',
    features: [
      'Высоконагруженные решения',
      'Мультисклад и регионы',
      'B2B кабинет',
      'Маркетплейс-логика',
      'DevOps и CI/CD',
      'Выделенная поддержка',
    ],
  },
]

export default function EcommerceBitrixPage() {
  return (
    <>
      {/* Hero */}
      <Box bg="brand.950" color="white" py={{ base: 20, md: 28 }} px={4} position="relative" overflow="hidden">
        <Box position="absolute" top="0" right="0" w="50%" h="full" bg="brand.500" opacity="0.08" style={{ filter: 'blur(100px)' }} pointerEvents="none" />
        <Container maxW="6xl" position="relative">
          <VStack gap={6} textAlign="center" align="center">
            <Badge colorPalette="brand" size="lg" px={4} py={1} borderRadius="full">
              1С-Битрикс · E-commerce
            </Badge>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight="bold"
              lineHeight="1.1"
              maxW="4xl"
            >
              Интернет-магазин{' '}
              <Text as="span" color="brand.400">
                на 1С-Битрикс
              </Text>{' '}
              под ключ
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="whiteAlpha.800" maxW="2xl">
              Разрабатываем e-commerce платформы с интеграцией 1С, платёжными системами и службами доставки.
              5+ лет опыта в корпоративной e-commerce разработке.
            </Text>
            <HStack gap={4} pt={2} wrap="wrap" justify="center">
              <MagneticButton
                size="lg"
                colorPalette="brand"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Обсудить проект
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="outline"
                colorPalette="gray"
                color="brand.400"
                onClick={() => window.open('https://t.me/evilsleepyowl', '_blank', 'noopener,noreferrer')}
              >
                Написать в Telegram
              </MagneticButton>
            </HStack>
            <HStack gap={8} pt={4} wrap="wrap" justify="center">
              {[
                { value: '5+', label: 'лет в e-commerce' },
                { value: '80+', label: 'магазинов запущено' },
                { value: '1 мес', label: 'гарантия' },
              ].map((s) => (
                <VStack key={s.label} gap={0}>
                  <Text fontSize="3xl" fontWeight="bold" color="brand.400">{s.value}</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">{s.label}</Text>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* Что включено */}
      <Box py={20} px={4} bg="white">
        <Container maxW="6xl">
          <ScrollReveal>
            <VStack gap={12}>
              <VStack gap={3} textAlign="center">
                <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>
                  Что входит в разработку
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Полный цикл — от дизайна до запуска и поддержки
                </Text>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
                {features.map((f) => (
                  <ScrollReveal key={f.title}>
                    <Card.Root h="full" border="1px solid" borderColor="gray.100" _hover={{ borderColor: 'brand.200', shadow: 'md' }} transition="all 0.2s">
                      <CardBody p={6}>
                        <VStack align="start" gap={3}>
                          <Flex w={12} h={12} borderRadius="xl" bg="brand.50" align="center" justify="center">
                            <f.icon size={22} color="var(--color-brand-500)" />
                          </Flex>
                          <Heading as="h3" fontSize="lg" fontWeight="semibold">{f.title}</Heading>
                          <Text color="gray.600" fontSize="sm">{f.description}</Text>
                        </VStack>
                      </CardBody>
                    </Card.Root>
                  </ScrollReveal>
                ))}
              </SimpleGrid>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Separator />

      {/* Этапы работы */}
      <Box py={20} px={4} bg="gray.50">
        <Container maxW="5xl">
          <ScrollReveal>
            <VStack gap={12}>
              <VStack gap={3} textAlign="center">
                <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>
                  Как мы работаем
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Прозрачный процесс без сюрпризов
                </Text>
              </VStack>
              <VStack gap={0} w="full">
                {workStages.map((s, i) => (
                  <ScrollReveal key={s.num}>
                    <HStack
                      gap={6}
                      align="start"
                      py={6}
                      borderBottomWidth={i < workStages.length - 1 ? '1px' : '0'}
                      borderColor="gray.200"
                      w="full"
                    >
                      <Flex
                        minW={12}
                        h={12}
                        borderRadius="full"
                        bg="brand.950"
                        color="brand.400"
                        align="center"
                        justify="center"
                        fontWeight="bold"
                        fontSize="sm"
                      >
                        {s.num}
                      </Flex>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="semibold" fontSize="lg">{s.title}</Text>
                        <Text color="gray.600">{s.desc}</Text>
                      </VStack>
                    </HStack>
                  </ScrollReveal>
                ))}
              </VStack>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Separator />

      {/* Цены */}
      <Box py={20} px={4} bg="white">
        <Container maxW="6xl">
          <ScrollReveal>
            <VStack gap={12}>
              <VStack gap={3} textAlign="center">
                <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>
                  Стоимость разработки
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Фиксированная цена. Никаких скрытых платежей
                </Text>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full" alignItems="start">
                {prices.map((p) => (
                  <Card.Root
                    key={p.name}
                    border="2px solid"
                    borderColor={p.popular ? 'brand.500' : 'gray.100'}
                    position="relative"
                    _hover={{ shadow: 'lg' }}
                    transition="all 0.2s"
                  >
                    {p.popular && (
                      <Badge
                        colorPalette="brand"
                        position="absolute"
                        top="-3"
                        left="50%"
                        transform="translateX(-50%)"
                        px={4}
                        borderRadius="full"
                      >
                        Популярный
                      </Badge>
                    )}
                    <CardBody p={8}>
                      <VStack align="start" gap={6}>
                        <VStack align="start" gap={1}>
                          <Text fontWeight="bold" fontSize="xl">{p.name}</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="brand.500">{p.price}</Text>
                          <Text fontSize="sm" color="gray.500">{p.term}</Text>
                        </VStack>
                        <VStack align="start" gap={2} w="full">
                          {p.features.map((f) => (
                            <HStack key={f} gap={2}>
                              <CheckCircle size={16} color="var(--color-brand-500)" />
                              <Text fontSize="sm">{f}</Text>
                            </HStack>
                          ))}
                        </VStack>
                        <MagneticButton
                          w="full"
                          colorPalette={p.popular ? 'brand' : 'gray'}
                          variant={p.popular ? 'solid' : 'outline'}
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Обсудить <ArrowRight size={16} />
                        </MagneticButton>
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Separator />

      {/* Включено в цену */}
      <Box py={20} px={4} bg="brand.950" color="white">
        <Container maxW="4xl">
          <ScrollReveal>
            <VStack gap={8} textAlign="center">
              <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }}>
                В любом тарифе включено
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} w="full" textAlign="left">
                {includedInPrice.map((item) => (
                  <HStack key={item} gap={3}>
                    <CheckCircle size={18} color="#0ea5e9" style={{ flexShrink: 0 }} />
                    <Text color="whiteAlpha.900">{item}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Separator />

      {/* CTA / Форма */}
      <Box id="contact" py={24} px={4}>
        <Container maxW="4xl">
          <ScrollReveal>
            <Card.Root bg="brand.950" color="white" borderRadius="2xl" overflow="hidden">
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack gap={6} textAlign="center">
                  <Heading fontSize={{ base: '2xl', md: '3xl' }}>
                    Готовы обсудить ваш магазин?
                  </Heading>
                  <Text color="gray.300" maxW="xl">
                    Бесплатная консультация. Расскажем стоимость и сроки для вашего проекта.
                  </Text>
                  <Box w="full" pt={2}>
                    <LeadForm />
                  </Box>
                </VStack>
              </CardBody>
            </Card.Root>
          </ScrollReveal>
        </Container>
      </Box>
    </>
  )
}
