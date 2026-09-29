<template>
  <main class="container-shell py-10 md:py-12">
    <ArticleFallback v-if="fallbackSlug" :slug="fallbackSlug" />
    <ContentRenderer v-else-if="contentPage" :value="contentPage" />
    <div v-else class="surface-card p-8">
      <h1 class="font-display text-3xl font-bold text-primary">İçerik bulunamadı</h1>
      <p class="mt-3 text-on-surface-variant">Aradığınız sayfa henüz hazırlanmadı.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { articleGuides } from '~/data/articleGuides'

const route = useRoute()
const path = computed(() => `/articles/${(route.params.slug as string[]).join('/')}`)
const knownSlugs = [
  'namaz-nasil-kilinir',
  'abdest-nasil-alinir',
  'namazda-okunan-dualar',
  'kuran-okumaya-baslangic',
  'hadis-okuma-adabi'
]
const currentSlug = computed(() => (route.params.slug as string[]).join('/'))
const fallbackSlug = computed(() => knownSlugs.includes(currentSlug.value) ? currentSlug.value : '')

const { data: page } = await useAsyncData(path.value, () => {
  if (fallbackSlug.value) {
    return Promise.resolve(null)
  }

  return queryCollection('articles').path(path.value).first()
})

const contentPage = computed(() => page.value as { title?: string; description?: string } | null)
const fallbackArticle = computed(() => articleGuides[currentSlug.value])

useSeoMeta({
  title: () => contentPage.value?.title ?? fallbackArticle.value?.title ?? 'İçerik',
  description: () => contentPage.value?.description ?? fallbackArticle.value?.description ?? "Sirâcü'l-Hüdâ içerik sayfası."
})
</script>
