import type { Metadata } from 'next'
import { Box } from '@chakra-ui/react/box'
import { Container } from '@chakra-ui/react/container'
import { Heading } from '@chakra-ui/react/heading'
import { Text } from '@chakra-ui/react/text'
import { VStack } from '@chakra-ui/react/stack'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | WebDynasty',
  description: 'Политика обработки персональных данных и использования файлов cookie',
}

export default function PrivacyPage() {
  return (
    <Box className="wd-root" bg="#fafafa" minH="100vh" py={16}>
      <Container maxW="3xl" px={{ base: 4, md: 8 }}>
        <VStack gap={8} align="start">
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="700"
            color="#111"
            lineHeight="1.2"
          >
            Политика конфиденциальности
          </Heading>

          <Text color="#555" lineHeight="1.8">
            Настоящая политика конфиденциальности описывает, какие данные собираются на сайте,
            как они используются и какие права есть у пользователей.
          </Text>

          <Box>
            <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={2}>
              1. Какие данные собираются
            </Heading>
            <Text color="#555" lineHeight="1.8">
              При заполнении формы обратной связи мы получаем имя, контактные данные и описание задачи.
              Также сайт использует файлы cookie и сервисы веб-аналитики (Яндекс.Метрика) для сбора
              обезличенной статистики о посещениях.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={2}>
              2. Цели обработки
            </Heading>
            <Text color="#555" lineHeight="1.8">
              Персональные данные используются исключительно для связи с вами, подготовки коммерческого
              предложения и ведения проекта. Мы не передаём данные третьим лицам, кроме случаев,
              предусмотренных законодательством.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={2}>
              3. Cookie и аналитика
            </Heading>
            <Text color="#555" lineHeight="1.8">
              Файлы cookie помогают сайту корректно работать и собирать обезличенную статистику.
              Вы можете отключить cookie в настройках браузера, однако в этом случае часть функций
              сайта может стать недоступна.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={2}>
              4. Хранение данных
            </Heading>
            <Text color="#555" lineHeight="1.8">
              Данные хранятся на защищённых серверах в течение срока, необходимого для реализации
              целей обработки. По вашему запросу данные могут быть удалены.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={2}>
              5. Контакты
            </Heading>
            <Text color="#555" lineHeight="1.8">
              По вопросам обработки данных пишите на{' '}
              <a href="mailto:company@wdynasty.ru" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                company@wdynasty.ru
              </a>
              .
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
