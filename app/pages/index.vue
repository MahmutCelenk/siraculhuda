<template>
  <main>
    <HomeHero
      v-model="search"
      :placeholder="homeSearchPlaceholder"
      :learning-routes="learningRoutes"
      :suggestions="searchSuggestions"
      :search-status="searchStatus"
      @submit="submitSearch"
    />
    <HomeStartPaths :paths="startPaths" />
    <HomeArticleGrid :articles="sortedArticles" />
  </main>
</template>

<script setup lang="ts">
import { articleGuides } from '~/data/articleGuides'
import { siteSearchIndex } from '~/data/siteSearch'
import { findSearchResults, normalizeSearch, pageSearchItems, type SearchItem } from '~/utils/siteSearch'

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

const sortedArticles = computed(() => [...articleList.value].sort((a, b) => a.order - b.order))

const articleSearchItems = computed<SearchItem[]>(() => articleList.value.map(article => ({
  title: article.title,
  description: article.description,
  to: article.path,
  kind: 'Makale',
  keywords: [article.title, article.description, article.category],
  priority: 80
})))

const searchSuggestions = computed(() => findSearchResults(
  [...pageSearchItems, ...siteSearchIndex, ...articleSearchItems.value], search.value
))
const searchStatus = computed(() => {
  if (normalizeSearch(search.value).length < 2 || searchSuggestions.value.length) return ''
  return 'Bu arama için içerik bulunamadı. Bir sure, hadis veya konu adı deneyebilirsin.'
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

async function submitSearch() {
  const firstSuggestion = searchSuggestions.value[0]
  if (firstSuggestion) await router.push(firstSuggestion.to)
}
</script>

