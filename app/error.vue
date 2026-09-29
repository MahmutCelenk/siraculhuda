<template>
  <main class="min-h-screen overflow-hidden bg-background text-on-surface">
    <div class="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,242,209,0.42),transparent_58%)]" />

    <div class="relative">
      <header class="border-b border-outline-variant/40 bg-surface/80 backdrop-blur">
        <nav class="container-shell flex h-14 items-center justify-between">
          <button class="font-display text-xl font-bold text-primary" type="button" @click="goHome">
            Sirâcü'l-Hüdâ
          </button>

          <button
            class="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-bold text-on-primary shadow-manuscript-raised transition hover:bg-primary-container"
            type="button"
            @click="goHome"
          >
            Ana sayfa
          </button>
        </nav>
      </header>

      <section class="container-shell grid min-h-[calc(100vh-56px)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.86fr]">
        <div class="max-w-3xl">
          <p class="mb-4 inline-flex rounded-full border border-primary-fixed-dim/70 bg-surface-container-lowest px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary shadow-manuscript">
            {{ statusCode }} hata
          </p>

          <h1 class="font-display text-5xl font-bold leading-[0.95] text-primary sm:text-6xl lg:text-7xl">
            {{ pageTitle }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            {{ pageDescription }}
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              class="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-on-primary shadow-manuscript-raised transition hover:bg-primary-container"
              type="button"
              @click="goHome"
            >
              Ana sayfaya dön
            </button>

            <button
              class="inline-flex h-12 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest px-6 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary-fixed/30"
              type="button"
              @click="goTo('/namaz')"
            >
              Namaz rehberine git
            </button>
          </div>
        </div>

        <aside class="surface-card border border-outline-variant/60 p-5 sm:p-6">
          <div class="mb-6 flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-wide text-primary">Yolunu seç</p>
              <h2 class="mt-2 font-display text-2xl font-bold text-on-surface">Buradan devam edebilirsin</h2>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6.5c2.8-.9 5.4-.6 8 1.1 2.6-1.7 5.2-2 8-1.1v11.8c-2.8-.9-5.4-.6-8 1.1-2.6-1.7-5.2-2-8-1.1V6.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                <path d="M12 7.6v11.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </div>
          </div>

          <div class="grid gap-3">
            <button
              v-for="link in quickLinks"
              :key="link.to"
              class="group flex items-center justify-between rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-4 text-left transition hover:border-primary hover:bg-primary-fixed/25"
              type="button"
              @click="goTo(link.to)"
            >
              <span>
                <span class="block text-sm font-bold text-on-surface">{{ link.label }}</span>
                <span class="mt-1 block text-sm leading-6 text-on-surface-variant">{{ link.description }}</span>
              </span>
              <svg class="h-5 w-5 shrink-0 text-primary transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </aside>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error.statusCode || 500)

const pageTitle = computed(() => {
  if (statusCode.value === 404) {
    return 'Aradığın sayfa bulunamadı'
  }

  return 'Beklenmeyen bir hata oluştu'
})

const pageDescription = computed(() => {
  if (statusCode.value === 404) {
    return 'Girdiğin adres sitede karşılık bulamadı. Ana sayfadan devam edebilir, sureler, hadisler veya namaz rehberi üzerinden aradığın konuya ulaşabilirsin.'
  }

  return 'Sayfa yüklenirken bir sorun oluştu. Ana sayfaya dönüp yeniden deneyebilirsin.'
})

const quickLinks = [
  {
    label: 'Öğrenme yolları',
    description: 'Temel konulardan sakin bir başlangıç yap.',
    to: '/#start'
  },
  {
    label: 'Sureler',
    description: 'Arapça metin, okunuş ve Türkçe anlam ile oku.',
    to: '/sureler'
  },
  {
    label: 'Hadis kütüphanesi',
    description: 'Sahih hadis seçkisi içinde konuya göre ilerle.',
    to: '/hadis'
  }
]

const goHome = async () => {
  await clearError({ redirect: '/' })
}

const goTo = async (path: string) => {
  await clearError({ redirect: path })
}
</script>
