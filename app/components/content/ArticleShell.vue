<template>
  <article>
    <nav class="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
      <NuxtLink to="/" class="transition hover:text-primary">Ana Sayfa</NuxtLink>
      <span>/</span>
      <span class="text-primary">{{ category }}</span>
    </nav>

    <header>
      <div class="max-w-6xl">
        <div class="mb-6 flex flex-wrap items-center gap-3">
          <span class="rounded-full bg-primary-fixed px-4 py-2 text-sm font-semibold text-primary">{{ category }}</span>
          <span class="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface-variant">{{ readTime }}</span>
        </div>
        <h1 class="max-w-5xl font-display text-4xl font-bold leading-[1.08] text-primary md:text-6xl lg:text-7xl">
          {{ title }}
        </h1>
        <p class="mt-7 max-w-4xl text-lg leading-8 text-on-surface-variant md:text-xl md:leading-9">
          {{ description }}
        </p>
      </div>
    </header>

    <div class="relative mt-10 overflow-hidden rounded-[24px] bg-surface-container shadow-manuscript">
      <img :src="image" :alt="imageAlt" class="aspect-[16/7] w-full object-cover">
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent p-6">
        <div class="inline-flex rounded-full bg-surface-container-lowest/90 px-4 py-2 text-sm font-semibold text-primary shadow-manuscript">
          Sirâcü'l-Hüdâ Rehberleri
        </div>
      </div>
    </div>

    <div class="mt-12 grid gap-gutter lg:grid-cols-12">
      <div class="lg:col-span-8">
        <div class="article-content prose prose-stone max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:text-tertiary prose-h2:mt-14 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-5 prose-h2:text-3xl prose-p:text-[17px] prose-p:leading-8 prose-ul:rounded-xl prose-ul:bg-surface-container-lowest prose-ul:p-6 prose-ul:shadow-manuscript prose-ol:rounded-xl prose-ol:bg-surface-container-lowest prose-ol:p-6 prose-ol:shadow-manuscript prose-li:my-2 prose-li:text-[17px] prose-li:leading-8 prose-a:text-primary prose-blockquote:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary-fixed/25 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-on-surface-variant">
          <slot />
        </div>
      </div>

      <aside class="lg:col-span-4">
        <div class="sticky top-28 space-y-6">
          <div class="rounded-[24px] bg-surface-container-low p-8">
            <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">İçindekiler</p>
            <h2 class="mb-6 font-display text-2xl font-semibold text-primary">Bu makalede</h2>
            <nav class="space-y-3">
              <a v-for="item in toc" :key="item.href" :href="item.href" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant transition hover:bg-surface-container-lowest hover:text-primary">
                <span class="h-2 w-2 rounded-full bg-primary-container" />
                {{ item.label }}
              </a>
            </nav>
          </div>

          <ArticleFaq
            v-if="faqs?.length"
            :items="faqs"
            compact
          />
        </div>
      </aside>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  category: string
  readTime: string
  image: string
  imageAlt: string
  toc: Array<{ label: string; href: string }>
  faqs?: Array<{ question: string; answer: string }>
}>()
</script>
