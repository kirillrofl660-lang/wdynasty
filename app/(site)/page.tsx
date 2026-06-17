'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Flex,
  Icon,
  Image,
  Link,
  Separator, Wrap
} from '@chakra-ui/react'
import {
  Code,
  Server,
  Database,
  Layout,
  GitBranch,
  ExternalLink,
  Mail,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Clock,
  CheckCircle,
  MessageSquare,
  Settings,
  Users,
  FileCode,
  Terminal,
  Calendar,
} from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { StaggerContainer } from '../components/StaggerContainer'
import { MagneticButton } from '../components/MagneticButton'
import { CountUp } from '../components/CountUp'
import { FloatingElements } from '../components/FloatingElements'
import { HeroAnimation } from '../components/HeroAnimation'
import { LeadForm } from '@/src/widgets/lead/ui/LeadForm'

// Simple SVG icon components
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.54a2.25 2.25 0 0 0 .124 4.238l4.078 1.2 1.65 5.193a1.5 1.5 0 0 0 2.634.59l2.35-3.13 4.612 3.41a2.25 2.25 0 0 0 3.535-1.234l2.287-14.985a2.242 2.242 0 0 0-1.048-2.664z"/>
    <path d="m9.5 13.5 8-5.5"/>
    <path d="m9.5 13.5 2.5 7"/>
  </svg>
)

const skills = [
  { name: '1С-Битрикс', category: 'backend', proficiency: 98, icon: Code, iconPath: 'https://upload.wikimedia.org/wikipedia/ru/5/51/1c_bitrix_logo.svg' },
  { name: 'Битрикс24', category: 'backend', proficiency: 95, icon: Server },
  { name: 'Laravel', category: 'backend', proficiency: 92, icon: Code, iconPath: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg' },
  { name: 'Lumen', category: 'backend', proficiency: 88, icon: Server, iconPath: '/icons/lumen.svg' },
  { name: 'React', category: 'frontend', proficiency: 90, icon: Code, iconPath: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { name: 'Next.js', category: 'frontend', proficiency: 85, icon: Code, iconPath: "" },
  { name: 'MySQL', category: 'database', proficiency: 94, icon: Database, iconPath: 'https://upload.wikimedia.org/wikipedia/ru/6/62/MySQL.svg' },
  { name: 'DevOps', category: 'devops', proficiency: 87, icon: Server, iconPath: '/icons/devops.svg' },
  { name: 'Docker', category: 'devops', proficiency: 82, icon: Server, iconPath: 'https://img.icons8.ru/?size=100&id=cdYUlRaag9G9&format=png&color=000000' },
  { name: 'PHP', category: 'backend', proficiency: 96, icon: Code, iconPath: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
  { name: 'CI/CD', category: 'devops', proficiency: 80, icon: GitBranch, iconPath: '/icons/cicd.svg' },
  { name: 'CouchDB', category: 'database', proficiency: 78, icon: Database, iconPath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Apache_CouchDB_logo.svg' },
]

// Услуги вместо портфолио
const services = [
  {
    title: '1С-Битрикс',
    description: 'Разработка и доработка корпоративных порталов, интернет-магазинов, интеграции. Кастомные компоненты и модули под ваши задачи.',
    price: 'от 150 000 ₽',
    timeframe: '2-8 недель',
    technologies: ['Битрикс', 'PHP', 'MySQL', 'API'],
    icon: Code,
  },
  {
    title: 'Битрикс24',
    description: 'Внедрение CRM, настройка бизнес-процессов, интеграция с 1С и внешними сервисами. Автоматизация продаж и работы с клиентами.',
    price: 'от 80 000 ₽',
    timeframe: '1-4 недели',
    technologies: ['Б24', 'REST API', 'Бизнес-процессы'],
    icon: Settings,
  },
  {
    title: 'Laravel + React',
    description: 'Современные веб-приложения с мощным бэкендом на Laravel и отзывчивым фронтендом на React. API-first архитектура.',
    price: 'от 200 000 ₽',
    timeframe: '3-12 недель',
    technologies: ['Laravel', 'React', 'API', 'MySQL'],
    icon: Globe,
  },
  {
    title: 'DevOps',
    description: 'Настройка CI/CD, Docker-контейнеризация, мониторинг, миграция на облака. Оптимизация инфраструктуры.',
    price: 'от 100 000 ₽',
    timeframe: '1-3 недели',
    technologies: ['Docker', 'GitLab CI', 'AWS', 'Nginx'],
    icon: Terminal,
  },
]

// Процесс работы
const processSteps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Обсуждение',
    description: 'Бесплатная консультация. Разбираем вашу задачу, предлагаем решение, оцениваем сроки и бюджет.',
  },
  {
    icon: FileCode,
    step: '02',
    title: 'Техническое задание',
    description: 'Детализируем требования, прописываем функционал, согласовываем этапы и оплату.',
  },
  {
    icon: Settings,
    step: '03',
    title: 'Разработка',
    description: 'Работаем по Agile с еженедельными демо. Постоянная коммуникация в Telegram/Slack.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Запуск',
    description: 'Деплой, тестирование, обучение. Гарантийная поддержка 1 месяц бесплатно.',
  },
]

// Почему выбирают нас (вместо кейсов)
const advantages = [
  {
    icon: Clock,
    title: 'Опыт 5+ лет',
    description: 'Работаем с 1С-Битрикс и Laravel с 2019 года. Знаем все нюансы и подводные камни.',
  },
  {
    icon: Users,
    title: 'Команда профи',
    description: 'Только senior-разработчики. Не передаем проекты джунам и не срываем сроки.',
  },
  {
    icon: Shield,
    title: 'Честная смета',
    description: 'Фиксируем цену в договоре. Никаких «допов» на 50% в процессе. Прозрачность превыше всего.',
  },
  {
    icon: Zap,
    title: 'Быстрый старт',
    description: 'Начинаем работу через 2-3 дня после обращения. Не тянем с оценкой и согласованиями.',
  },
]

// FAQ
const faqItems = [
  {
    question: 'Работаете ли вы по договору и с НДС?',
    answer: 'Да, работаем по договору оказания услуг. Для юрлиц — с НДС, для ИП и физлиц — без НДС.',
  },
  {
    question: 'Какая у вас система оплаты?',
    answer: '50% предоплата, 50% после сдачи. Для крупных проектов — поэтапная оплата (раз в 2 недели).',
  },
  {
    question: 'Беретесь ли за небольшие задачи?',
    answer: 'Да, минимальная стоимость задачи — 20 000 ₽. Мелкие доработки и багфиксы — по часовой ставке.',
  },
  {
    question: 'Предоставляете ли поддержку после сдачи?',
    answer: 'Да, гарантийный период — 1 месяц (исправляем баги бесплатно). Дальше — абонентское обслуживание от 30 000 ₽/мес.',
  },
]

export default function HomePage() {
  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box
        bg="brand.950"
        color="white"
        py={32}
        px={4}
        position="relative"
        overflow="hidden"
      >
        <FloatingElements />
        <Container maxW="6xl" position="relative" zIndex={1}>
          <HeroAnimation>
            <VStack gap={6} textAlign="center" align="center">
              <Badge
                className="hero-badge"
                size="lg"
                colorPalette="accent"
                px={4}
                py={2}
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="bold"
              >
                Династия разработчиков — Разработка под ключ
              </Badge>

              <Heading
                className="hero-heading"
                as="h1"
                fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                fontWeight="bold"
                lineHeight="shorter"
              >
                Династия{' '}
                <Text as="span" color="brand.400">
                  Разработчиков
                </Text>
                <br />
                <Text fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} color="whiteAlpha.900" mt={4} fontWeight="medium">
                  Корпоративная разработка
                </Text>
              </Heading>

              <Text
                className="hero-description"
                fontSize={{ base: 'lg', md: 'xl' }}
                color="whiteAlpha.800"
                maxW="2xl"
                lineHeight="relaxed"
              >
                Команда с 5+ годами опыта в корпоративной разработке. 
                Битрикс, Битрикс24, Laravel, React и DevOps-решения 
                для бизнеса любого масштаба.
              </Text>

              <HStack className="hero-buttons" gap={4} pt={4} wrap="wrap" justify="center">
                <MagneticButton
                  size="lg"
                  colorPalette="brand"
                  onClick={() => window.open('https://t.me/evilsleepyowl', '_blank', 'noopener,noreferrer')}
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
            </VStack>
          </HeroAnimation>
        </Container>

        {/* Background decoration */}
        <Box
          position="absolute"
          top="0"
          right="0"
          width="500px"
          height="500px"
          bg="brand.500"
          opacity={0.1}
          borderRadius="full"
          filter="blur(100px)"
          transform="translate(30%, -30%)"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="400px"
          height="400px"
          bg="accent.500"
          opacity={0.1}
          borderRadius="full"
          filter="blur(100px)"
          transform="translate(-30%, 30%)"
        />
      </Box>

      {/* Услуги вместо портфолио */}
      <Box py={24} px={4}>
        <Container maxW="6xl">
          <VStack gap={16}>
            <ScrollReveal>
              <VStack gap={4} textAlign="center">
                <Badge colorPalette="brand" size="md">Что мы делаем</Badge>
                <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                  Наши{' '}
                  <Text as="span" color="brand.500">услуги</Text>
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Четкие предложения с прозрачной ценой. Без скрытых платежей и неожиданных «допов».
                </Text>
              </VStack>
            </ScrollReveal>

            <StaggerContainer stagger={0.15}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full">
                {services.map((service, index) => (
                  <Card.Root key={index} variant="outline" overflow="hidden">
                    <CardBody p={6}>
                      <VStack gap={4} align="start">
                        <HStack gap={3}>
                          <Flex
                            w={12}
                            h={12}
                            bg="brand.50"
                            borderRadius="xl"
                            align="center"
                            justify="center"
                          >
                            <Icon as={service.icon} boxSize={6} color="brand.500" />
                          </Flex>
                          <Box>
                            <Heading size="lg">{service.title}</Heading>
                            <HStack gap={2} mt={1}>
                              <Text fontSize="sm" color="brand.500" fontWeight="semibold">
                                {service.price}
                              </Text>
                              <Text fontSize="sm" color="gray.400">•</Text>
                              <Text fontSize="sm" color="gray.500">
                                {service.timeframe}
                              </Text>
                            </HStack>
                          </Box>
                        </HStack>
                        
                        <Text color="gray.600">{service.description}</Text>
                        
                        <HStack gap={2} wrap="wrap">
                          {service.technologies.map((tech) => (
                            <Badge key={tech} size="sm" colorPalette="gray" variant="subtle">
                              {tech}
                            </Badge>
                          ))}
                        </HStack>
                        {/*
                        
                                                <MagneticButton 
                          variant="ghost"
                          size="md"
                        >
                          Подробнее <Icon as={ArrowRight} boxSize={4} ml={2}/>
                        </MagneticButton>
                        */}

                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </StaggerContainer>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* Процесс работы */}
      <Box py={24} px={4} bg="gray.50">
        <Container maxW="6xl">
          <VStack gap={16}>
            <ScrollReveal>
              <VStack gap={4} textAlign="center">
                <Badge colorPalette="accent" size="md">Как мы работаем</Badge>
                <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                  Процесс от идеи до{' '}
                  <Text as="span" color="accent.500">запуска</Text>
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Прозрачный процесс без сюрпризов. Вы всегда знаете, на каком этапе проект.
                </Text>
              </VStack>
            </ScrollReveal>

            <StaggerContainer stagger={0.2}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="full">
                {processSteps.map((step, index) => (
                  <Card.Root key={index} variant="outline" bg="white">
                    <CardBody p={6}>
                      <VStack gap={4} align="start">
                        <HStack justify="space-between" w="full">
                          <Flex
                            w={12}
                            h={12}
                            bg="brand.50"
                            borderRadius="xl"
                            align="center"
                            justify="center"
                          >
                            <Icon as={step.icon} boxSize={6} color="brand.500" />
                          </Flex>
                          <Text 
                            fontSize="3xl" 
                            fontWeight="bold" 
                            color="gray.200"
                            lineHeight={1}
                          >
                            {step.step}
                          </Text>
                        </HStack>
                        <Box>
                          <Heading size="md" mb={2}>{step.title}</Heading>
                          <Text fontSize="sm" color="gray.600">{step.description}</Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </StaggerContainer>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* Почему мы */}
      <Box py={24} px={4}>
        <Container maxW="6xl">
          <VStack gap={16}>
            <ScrollReveal>
              <VStack gap={4} textAlign="center">
                <Badge colorPalette="brand" size="md">Почему мы</Badge>
                <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                  Работать с нами — {' '}
                  <Text as="span" color="brand.500">выгодно</Text>
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Не показываем чужие кейсы. Вместо этого — честные условия и реальный опыт.
                </Text>
              </VStack>
            </ScrollReveal>

            <StaggerContainer stagger={0.1}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="full">
                {advantages.map((item, index) => (
                  <Card.Root key={index} variant="outline">
                    <CardBody p={6}>
                      <VStack gap={4} align="start">
                        <Flex
                          w={12}
                          h={12}
                          bg="brand.50"
                          borderRadius="xl"
                          align="center"
                          justify="center"
                        >
                          <Icon as={item.icon} boxSize={6} color="brand.500" />
                        </Flex>
                        <Heading size="md">{item.title}</Heading>
                        <Text fontSize="sm" color="gray.600">{item.description}</Text>
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </StaggerContainer>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* Специализации */}
      <Box py={24} px={4} bg="brand.950" color="white">
        <Container maxW="6xl">
          <VStack gap={16}>
            <ScrollReveal>
              <VStack gap={4} textAlign="center">
                <Badge colorPalette="accent" size="md" bg="accent.500" color="white">Направления</Badge>
                <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                  Что мы{' '}
                  <Text as="span" color="accent.400">разрабатываем</Text>
                </Heading>
                <Text color="whiteAlpha.800" maxW="2xl">
                  От интернет-магазинов до высоконагруженных корпоративных систем. 
                  Используем PayloadCMS, 1С-Битрикс и современный стек.
                </Text>
              </VStack>
            </ScrollReveal>

            <StaggerContainer stagger={0.15}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="full">
                {/* E-commerce */}
                <Card.Root bg="whiteAlpha.100" borderColor="whiteAlpha.200" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack gap={4} align="start">
                      <Flex w={14} h={14} bg="accent.500" borderRadius="xl" align="center" justify="center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                          <line x1="3" y1="6" x2="21" y2="6"/>
                          <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                      </Flex>
                      <Box>
                        <Heading size="md" mb={2} color="white">E-commerce</Heading>
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Интернет-магазины на 1С-Битрикс и headless-решения. 
                          Интеграция с платёжными системами, 1С, складским учётом. 
                          От 1000 до 100 000+ товаров.
                        </Text>
                      </Box>
                      <HStack gap={2} flexWrap="wrap">
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Битрикс</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">React</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Next.js</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">1С</Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>

                {/* Highload + PayloadCMS */}
                <Card.Root bg="whiteAlpha.100" borderColor="whiteAlpha.200" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack gap={4} align="start">
                      <Flex w={14} h={14} bg="accent.500" borderRadius="xl" align="center" justify="center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                      </Flex>
                      <Box>
                        <Heading size="md" mb={2} color="white">Highload проекты</Heading>
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Высоконагруженные системы на PayloadCMS. Headless CMS с 
                          кастомными админками, API-first архитектура, масштабирование 
                          под миллионы запросов.
                        </Text>
                      </Box>
                      <HStack gap={2} flexWrap="wrap">
                        <Badge size="sm" bg="whiteAlpha.200" color="white">PayloadCMS</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Next.js</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">MongoDB</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Redis</Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>

                {/* Корпоративные порталы */}
                <Card.Root bg="whiteAlpha.100" borderColor="whiteAlpha.200" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack gap={4} align="start">
                      <Flex w={14} h={14} bg="accent.500" borderRadius="xl" align="center" justify="center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </Flex>
                      <Box>
                        <Heading size="md" mb={2} color="white">Корпоративные порталы</Heading>
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Битрикс24 и корпоративные порталы. Автоматизация бизнес-процессов, 
                          интеграция с ERP, CRM, телефонией. Кастомные приложения 
                          для вашей компании.
                        </Text>
                      </Box>
                      <HStack gap={2} flexWrap="wrap">
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Битрикс24</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Ларавел</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">API</Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>

                {/* Интеграции */}
                <Card.Root bg="whiteAlpha.100" borderColor="whiteAlpha.200" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack gap={4} align="start">
                      <Flex w={14} h={14} bg="accent.500" borderRadius="xl" align="center" justify="center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                      </Flex>
                      <Box>
                        <Heading size="md" mb={2} color="white">Интеграции</Heading>
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Связь любых систем. API-интеграции, обмен данными между 
                          1С, CRM, складом, маркетплейсами. REST, SOAP, GraphQL.
                        </Text>
                      </Box>
                      <HStack gap={2} flexWrap="wrap">
                        <Badge size="sm" bg="whiteAlpha.200" color="white">REST API</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">GraphQL</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Webhook</Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>

                {/* DevOps */}
                <Card.Root bg="whiteAlpha.100" borderColor="whiteAlpha.200" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack gap={4} align="start">
                      <Flex w={14} h={14} bg="accent.500" borderRadius="xl" align="center" justify="center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                          <line x1="6" y1="6" x2="6.01" y2="6"/>
                          <line x1="6" y1="18" x2="6.01" y2="18"/>
                        </svg>
                      </Flex>
                      <Box>
                        <Heading size="md" mb={2} color="white">DevOps & CI/CD</Heading>
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Контейнеризация, оркестрация, автоматизация деплоя. 
                          Docker, Kubernetes, GitHub Actions. Мониторинг и 
                          автоматическое масштабирование.
                        </Text>
                      </Box>
                      <HStack gap={2} flexWrap="wrap">
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Docker</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">K8s</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">CI/CD</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">AWS</Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>

                {/* Мобильные приложения 
                <Card.Root bg="whiteAlpha.100" borderColor="whiteAlpha.200" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack gap={4} align="start">
                      <Flex w={14} h={14} bg="accent.500" borderRadius="xl" align="center" justify="center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="white">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                          <line x1="12" y1="18" x2="12.01" y2="18"/>
                        </svg>
                      </Flex>
                      <Box>
                        <Heading size="md" mb={2} color="white">PWA & Мобильные</Heading>
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Прогрессивные веб-приложения и мобильные версии. 
                          React Native, PWA, адаптивный дизайн. 
                          Работа офлайн, push-уведомления.
                        </Text>
                      </Box>
                      <HStack gap={2} flexWrap="wrap">
                        <Badge size="sm" bg="whiteAlpha.200" color="white">PWA</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">React Native</Badge>
                        <Badge size="sm" bg="whiteAlpha.200" color="white">Capacitor</Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>
                */}
              </SimpleGrid>
            </StaggerContainer>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* Стек технологий */}
      <Box py={24} px={4} bg="gray.50">
        <Container maxW="6xl">
          <VStack gap={16}>
            <ScrollReveal>
              <VStack gap={4} textAlign="center">
                <Badge colorPalette="brand" size="md">Экспертиза</Badge>
                <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                  Наш стек{' '}
                  <Text as="span" color="brand.500">технологий</Text>
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  Глубокая экспертиза в каждой технологии. Не беремся за то, в чем не сильны.
                </Text>
              </VStack>
            </ScrollReveal>

            <StaggerContainer stagger={0.08}>
              <Wrap columns={{ base: 1, md: 2, lg: 3, xl: 5 }} gap={6} w="full" mx="auto" justifyContent="center">
                {skills.map((skill, index) => (
                  <Card.Root key={index} variant="outline" bg="white">
                    <CardBody p={5}>
                      <VStack gap={3} align="stretch">
                        <HStack justify="space-between">
                          <HStack gap={3}>
                            {skill.iconPath ? (
                              skill.iconPath.startsWith('http') ? (
                                <img src={skill.iconPath} alt={skill.name} style={{ width: '24px', height: '24px', objectFit: 'contain', display: 'block', margin: 'auto' }} />
                              ) : (
                                <Image src={skill.iconPath} alt={skill.name} boxSize="24px" objectFit="contain" mx="auto" />
                              )
                            ) : (
                              <Icon as={skill.icon} boxSize={5} color="brand.500" />
                            )}
                            <Text fontWeight="semibold" fontSize="sm">{skill.name}</Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            <CountUp end={skill.proficiency} suffix="%" />
                          </Text>
                        </HStack>
                        <Box w="full" h={2} bg="gray.100" borderRadius="full" overflow="hidden">
                          <Box
                            w={`${skill.proficiency}%`}
                            h="full"
                            bg="brand.500"
                            borderRadius="full"
                            transition="width 1s ease"
                          />
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))}
              </Wrap>
            </StaggerContainer>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* FAQ */}
      <Box py={24} px={4}>
        <Container maxW="4xl">
          <VStack gap={16}>
            <ScrollReveal>
              <VStack gap={4} textAlign="center">
                <Badge colorPalette="accent" size="md">Вопросы</Badge>
                <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                  Часто задаваемые{' '}
                  <Text as="span" color="accent.500">вопросы</Text>
                </Heading>
              </VStack>
            </ScrollReveal>

            <StaggerContainer stagger={0.1}>
              <VStack gap={4} w="full">
                {faqItems.map((item, index) => (
                  <Card.Root key={index} variant="outline" w="full">
                    <CardBody p={6}>
                      <VStack gap={3} align="start">
                        <Heading size="md">{item.question}</Heading>
                        <Text color="gray.600">{item.answer}</Text>
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))}
              </VStack>
            </StaggerContainer>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* CTA Section */}
      <Box py={24} px={4}>
        <Container maxW="4xl">
          <ScrollReveal>
            <Card.Root bg="brand.950" color="white" borderRadius="2xl" overflow="hidden">
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack gap={6} textAlign="center">
                  <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                    Готовы обсудить ваш проект?
                  </Heading>
                  <Text fontSize="lg" color="gray.300" maxW="2xl">
                    Бесплатная консультация. Расскажем, как решить вашу задачу 
                    и сколько это будет стоить. Оставьте заявку — мы свяжемся с вами.
                  </Text>
                  <Box w="full" pt={4}>
                    <LeadForm />
                  </Box>
                </VStack>
              </CardBody>
            </Card.Root>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={12} px={4} borderTopWidth="1px" borderColor="gray.200">
        <Container maxW="6xl">
          <VStack gap={6}>
            <HStack gap={6}>
              <Link href="/blog" color="gray.500" _hover={{ color: 'brand.500' }} fontSize="sm">
                Блог
              </Link>
              <Link href="https://t.me/evilsleepyowl" color="gray.500" _hover={{ color: 'brand.500' }}>
                <Box boxSize={5}><TelegramIcon /></Box>
              </Link>
            </HStack>
            <Text color="gray.500" fontSize="sm" textAlign="center">
              © {new Date().getFullYear()} <strong>Династия разработчиков</strong>. Корпоративная разработка.
              <br />
              1С-Битрикс • Laravel • React • DevOps • Работаем по договору
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
