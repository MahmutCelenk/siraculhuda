<template>
  <div class="not-prose my-10 overflow-hidden rounded-[24px] bg-surface-container-lowest shadow-manuscript">
    <div class="border-b border-outline-variant/60 px-6 py-5 md:px-8">
      <p class="text-xs font-semibold uppercase tracking-wide text-secondary">{{ eyebrow }}</p>
      <h3 class="mt-2 font-display text-2xl font-semibold text-primary">{{ title }}</h3>
      <p v-if="description" class="mt-2 text-sm leading-6 text-on-surface-variant">{{ description }}</p>
    </div>
    <ol class="divide-y divide-outline-variant/50">
      <li v-for="(step, index) in steps" :key="step.title" class="grid gap-4 px-6 py-5 md:grid-cols-[48px_1fr] md:px-8">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
          {{ index + 1 }}
        </div>
        <div>
          <h4 class="font-display text-xl font-semibold text-tertiary">{{ step.title }}</h4>
          <p class="mt-2 text-[15px] leading-7 text-on-surface-variant">{{ step.body }}</p>
          <p v-if="step.detail" class="mt-3 rounded-xl bg-surface-container-low px-4 py-3 text-sm leading-7 text-on-surface-variant">
            <span class="font-bold text-primary">Nasıl yapılır?</span>
            {{ step.detail }}
          </p>
          <p v-if="step.attention" class="mt-3 border-l-2 border-secondary bg-secondary-container/15 px-4 py-3 text-sm leading-7 text-on-surface-variant">
            <span class="font-bold text-on-secondary-container">Dikkat:</span>
            {{ step.attention }}
          </p>
          <figure v-if="step.image" class="mt-5 overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-low">
            <img :src="step.image.src" :alt="step.image.alt" class="aspect-[3/2] w-full object-cover" loading="lazy">
            <figcaption class="px-4 py-3 text-xs leading-5 text-on-surface-variant">{{ step.image.caption }}</figcaption>
          </figure>
          <div v-if="step.recitations?.length" class="mt-5 space-y-3">
            <div
              v-for="recitation in step.recitations"
              :key="recitation.title ?? recitation.arabic"
              class="rounded-2xl border border-primary-fixed-dim/50 bg-primary-fixed/20 p-5"
            >
              <p v-if="recitation.title" class="mb-3 text-xs font-bold uppercase tracking-wide text-primary">
                {{ recitation.title }}
              </p>
              <p class="recitation-arabic text-2xl leading-[2.1] text-primary md:text-3xl" dir="rtl" lang="ar">
                {{ recitation.arabic }}
              </p>
              <p v-if="recitation.latin" class="mt-4 text-sm font-semibold leading-7 text-tertiary">
                {{ recitation.latin }}
              </p>
              <p class="mt-3 border-t border-outline-variant/60 pt-3 text-sm leading-7 text-on-surface-variant">
                <span class="font-semibold text-on-surface">Meali:</span>
                {{ recitation.meaning }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  steps: Array<{
    title: string
    body: string
    detail?: string
    attention?: string
    image?: {
      src: string
      alt: string
      caption: string
    }
    recitations?: Array<{
      title?: string
      arabic: string
      latin?: string
      meaning: string
    }>
  }>
}>()
</script>

<style scoped src="~/assets/css/components/article-steps.css"></style>
