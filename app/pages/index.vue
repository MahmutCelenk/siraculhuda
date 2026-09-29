<template>
  <main>
    <HomeHero
      v-model="search"
      :placeholder="homeSearchPlaceholder"
      :learning-routes="learningRoutes"
      :suggestions="searchSuggestions"
      @submit="focusArticles"
    />
    <HomeStartPaths :paths="startPaths" />
    <HomeArticleGrid :articles="filteredArticles" />
  </main>
</template>

<script setup lang="ts">
import { articleGuides } from '~/data/articleGuides'

useSeoMeta({
  title: 'Ana Sayfa',
  description: "Sirâcü'l-Hüdâ İslami eğitim platformunun arama ve başlangıç sayfası."
})

const search = ref('')
const router = useRouter()
const homeSearchPlaceholders = [
  'Namaz nasıl kılınır?',
  'Hadis okumaya nereden başlanır?',
  'Kur’an okumaya başla',
  'Abdest nasıl alınır?',
  'Sübhaneke duası',
  'İslam’ın şartları'
]
const homeSearchPlaceholderIndex = ref(0)
const homeSearchPlaceholder = computed<string>(() => homeSearchPlaceholders[homeSearchPlaceholderIndex.value] ?? 'Namaz nasıl kılınır?')
let homeSearchPlaceholderInterval: number | undefined

onMounted(() => {
  homeSearchPlaceholderInterval = window.setInterval(() => {
    homeSearchPlaceholderIndex.value = (homeSearchPlaceholderIndex.value + 1) % homeSearchPlaceholders.length
  }, 2600)
})

onBeforeUnmount(() => {
  if (homeSearchPlaceholderInterval) {
    window.clearInterval(homeSearchPlaceholderInterval)
  }
})

const { data: articles } = await useAsyncData('home-articles', () => {
  return queryCollection('articles').all().catch(() => [])
})

type HomeArticle = {
  path: string
  title: string
  description: string
  category: string
  image: string
  imageAlt: string
  readTime: string
  order: number
}

type SearchSuggestion = {
  title: string
  description: string
  to: string
  kind: string
  keywords: string[]
  priority: number
}

const articleList = computed<HomeArticle[]>(() => {
  const collectionArticles = (articles.value ?? []).filter((article) => article.path?.startsWith('/articles/'))

  if (!collectionArticles.length) {
    return Object.entries(articleGuides).map(([slug, article]) => ({
      path: `/articles/${slug}`,
      title: article.title,
      description: article.description,
      category: article.category,
      image: article.image,
      imageAlt: article.imageAlt,
      readTime: article.readTime,
      order: article.order
    }))
  }

  return collectionArticles.map((article) => {
    const slug = article.path.split('/').pop() ?? ''
    const guide = articleGuides[slug]
    return {
      path: article.path,
      title: guide?.title ?? article.title,
      description: guide?.description ?? article.description,
      category: guide?.category ?? article.category,
      image: guide?.image ?? article.image,
      imageAlt: guide?.imageAlt ?? article.imageAlt,
      readTime: guide?.readTime ?? article.readTime,
      order: guide?.order ?? article.order
    }
  })
})

const filteredArticles = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('tr-TR')
  const sortedArticles = [...articleList.value].sort((a, b) => a.order - b.order)

  if (!term) {
    return sortedArticles
  }

  return sortedArticles.filter((article) => {
    const haystack = [
      article.title,
      article.description,
      article.category
    ].join(' ').toLocaleLowerCase('tr-TR')

    return haystack.includes(term)
  })
})

const pageSearchItems: SearchSuggestion[] = [
  {
    title: "Kur'an Oku",
    description: "Mushaf hissine yakın sayfa düzeninde Arapça metin ve Türkçe meal ile oku.",
    to: '/kuran',
    kind: 'Sayfa',
    keywords: ['kuran', 'kur’an', 'quran', 'mushaf', 'meal', 'arapça', 'oku', 'cüz'],
    priority: 100
  },
  {
    title: 'Sureler',
    description: '114 sureyi Arapça, Türkçe okunuş ve Türkçe anlamıyla incele.',
    to: '/sureler',
    kind: 'Sayfa',
    keywords: ['sure', 'sureler', 'fatiha', 'bakara', 'ihlas', 'felak', 'nas', 'ayet'],
    priority: 94
  },
  {
    title: 'Namaz Öğren',
    description: 'Vakit namazları, rekât düzeni, dualar ve adım adım kılınış rehberi.',
    to: '/namaz',
    kind: 'Sayfa',
    keywords: ['namaz', 'sabah', 'öğle', 'ikindi', 'akşam', 'yatsı', 'teravih', 'rekat', 'dua'],
    priority: 92
  },
  {
    title: 'Hadisler',
    description: 'Sahih hadis seçkisini konu başlıklarına göre oku ve ara.',
    to: '/hadis',
    kind: 'Sayfa',
    keywords: ['hadis', 'buhari', 'sahih', 'sünnet', 'ahlak', 'niyet'],
    priority: 90
  },
  {
    title: '32 Farz',
    description: "İmanın şartları, İslam'ın şartları, namaz, abdest, gusül ve teyemmüm farzları.",
    to: '/temel-bilgiler',
    kind: 'Sayfa',
    keywords: ['32 farz', 'otuz iki farz', 'iman', 'islam', 'abdest', 'gusül', 'teyemmüm', 'farz'],
    priority: 88
  }
]

const articleSearchItems = computed<SearchSuggestion[]>(() => {
  return articleList.value.map((article, index) => ({
    title: article.title,
    description: article.description,
    to: article.path,
    kind: 'Makale',
    keywords: [article.title, article.description, article.category],
    priority: 70 - index
  }))
})

const searchSuggestions = computed(() => {
  const term = normalizeSearch(search.value)

  if (term.length < 2) {
    return []
  }

  return [...pageSearchItems, ...articleSearchItems.value]
    .map((item) => {
      const haystack = normalizeSearch([
        item.title,
        item.description,
        item.kind,
        ...item.keywords
      ].join(' '))

      if (!haystack.includes(term)) {
        return null
      }

      const startsWithTitle = normalizeSearch(item.title).startsWith(term)
      return {
        ...item,
        score: item.priority + (startsWithTitle ? 30 : 0)
      }
    })
    .filter((item): item is SearchSuggestion & { score: number } => Boolean(item))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
})


const startPaths = [
  {
    icon: 'search',
    iconClass: 'bg-primary-fixed text-primary',
    title: 'İslam’ı araştırıyorum',
    description: 'Temel inanç esasları ve merak edilen sorular için sakin bir başlangıç yap.',
    action: 'Keşfet',
    to: '#articles'
  },
  {
    icon: 'prayer',
    iconClass: 'bg-secondary-container text-on-secondary-container',
    title: 'Namaz öğrenmek istiyorum',
    description: 'Görsel ve düzenli anlatımlarla adım adım namaz rehberini takip et.',
    action: 'Başla',
    to: '/namaz'
  },
  {
    icon: 'book',
    iconClass: 'bg-primary text-on-primary',
    title: 'Kur’an okumak istiyorum',
    description: 'Elif-Ba’dan başlayarak tecvidli Kur’an derslerine geç.',
    action: 'Öğren',
    to: '/kuran'
  },
  {
    icon: 'calendar',
    iconClass: 'bg-tertiary-container/20 text-tertiary',
    title: 'Günlük ibadetler',
    description: 'Zikirler, dualar ve günlük sünnetler rehberini incele.',
    action: 'İncele',
    to: '/articles/namazda-okunan-dualar'
  }
]

const learningRoutes = [
  {
    icon: 'prayer',
    tag: 'İbadet',
    title: 'Namaz Öğren',
    description: 'Hazırlık, niyet, rekât akışı ve selamı sade bir rehberle takip et.',
    to: '/namaz'
  },
  {
    icon: 'water',
    tag: 'Temizlik',
    title: 'Abdest Öğren',
    description: 'Abdestin anlamını, farzlarını ve uygulama sırasını adım adım çalış.',
    to: '/articles/abdest-nasil-alinir'
  },
  {
    icon: 'pillars',
    tag: 'Temel bilgi',
    title: '32 Farz',
    description: 'İman, İslam, namaz, abdest, gusül ve teyemmüm farzlarını birlikte gör.',
    to: '/temel-bilgiler'
  },
  {
    icon: 'book',
    tag: 'Kur’an',
    title: 'Kur’an Oku',
    description: 'Harfler, telaffuz, günlük tekrar ve anlamla bağ kurma yoluna başla.',
    to: '/kuran'
  }
]

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .replace(/[’'`´]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function focusArticles() {
  const firstSuggestion = searchSuggestions.value[0]

  if (firstSuggestion) {
    router.push(firstSuggestion.to)
    return
  }

  document.querySelector('#articles')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

