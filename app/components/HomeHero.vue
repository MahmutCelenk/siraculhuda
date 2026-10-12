<template>
  <section class="border-b border-outline-variant/35 bg-[radial-gradient(circle_at_92%_18%,rgba(254,214,91,0.22),transparent_28%),radial-gradient(circle_at_7%_84%,rgba(166,242,209,0.22),transparent_26%),linear-gradient(180deg,#eef8f3_0%,#f6fbf8_100%)]">
    <div class="container-shell flex min-h-[calc(74vh-56px)] flex-col items-center justify-center py-16 text-center md:py-24">
      <h1 class="max-w-4xl font-display text-4xl font-bold leading-[0.98] text-primary md:text-5xl lg:text-6xl">
        İslam'ı sade, güvenilir ve adım adım öğren
      </h1>

      <form class="mt-8 w-full max-w-xl" role="search" @submit.prevent="$emit('submit')">
        <label class="sr-only" for="home-search">İçerik ara</label>
        <div class="relative">
          <div class="group/search flex min-h-12 items-center gap-3 rounded-full border border-outline-variant/45 bg-surface-container-lowest px-4 py-1.5 shadow-manuscript-raised transition duration-300 focus-within:-translate-y-0.5 focus-within:border-primary focus-within:shadow-manuscript-raised focus-within:ring-2 focus-within:ring-primary-fixed/80">
            <svg class="h-4 w-4 shrink-0 text-primary transition duration-300 group-focus-within/search:scale-110 group-focus-within/search:rotate-[-8deg]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <input
              id="home-search"
              :value="modelValue"
              class="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/70 focus:border-0 focus:outline-none focus:ring-0"
              type="search"
              :placeholder="placeholder"
              autocomplete="off"
              aria-controls="home-search-suggestions"
              :aria-describedby="searchStatus ? 'home-search-status' : undefined"
              :aria-expanded="showSuggestions"
              @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            >
            <button class="min-h-9 shrink-0 rounded-full bg-primary px-6 text-xs font-semibold text-on-primary transition duration-300 hover:bg-primary-container group-focus-within/search:px-7" type="submit">
              Ara
            </button>
          </div>

          <div
            v-if="showSuggestions"
            id="home-search-suggestions"
            class="absolute left-0 right-0 top-[calc(100%+12px)] z-20 overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest text-left shadow-manuscript-raised"
          >
            <NuxtLink
              v-for="suggestion in suggestions"
              :key="`${suggestion.kind}-${suggestion.to}`"
              :to="suggestion.to"
              class="group/suggestion grid gap-1 border-b border-outline-variant/35 px-5 py-4 transition last:border-b-0 hover:bg-surface-container-low"
            >
              <span class="flex items-center justify-between gap-3">
                <span class="text-sm font-bold text-on-surface group-hover/suggestion:text-primary">{{ suggestion.title }}</span>
                <span class="rounded-full bg-primary-fixed/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">{{ suggestion.kind }}</span>
              </span>
              <span class="line-clamp-2 text-xs leading-5 text-on-surface-variant">{{ suggestion.description }}</span>
            </NuxtLink>
          </div>
        </div>
        <p v-if="searchStatus" id="home-search-status" role="status" class="mt-3 text-sm leading-6 text-on-surface-variant">
          {{ searchStatus }}
        </p>
      </form>

      <div id="start" class="mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        <NuxtLink
          v-for="route in learningRoutes"
          :key="route.title"
          :to="route.to"
          class="group inline-flex min-h-9 items-center gap-2 rounded-full border border-outline-variant/50 bg-surface-container-lowest/55 px-4 text-xs font-semibold text-on-surface shadow-sm backdrop-blur transition hover:border-primary-fixed-dim hover:bg-surface-container-lowest hover:text-primary"
        >
          <span class="flex h-4 w-4 shrink-0 items-center justify-center text-primary">
            <svg v-if="route.icon === 'prayer'" class="h-4 w-4" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 8l12 10v22H12V18L24 8Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
              <path d="M19 40V27a5 5 0 0 1 10 0v13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
            </svg>
            <svg v-else-if="route.icon === 'pillars'" class="h-4 w-4" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M10 40h28M12 16h24M15 16v24M24 16v24M33 16v24M24 7l15 9H9l15-9Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else-if="route.icon === 'faith'" class="h-4 w-4" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 7l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.6L24 31.2l-9.4 5 1.8-10.6-7.7-7.5 10.6-1.5L24 7Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
            </svg>
            <svg v-else-if="route.icon === 'water'" class="h-4 w-4" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 6s12 13.1 12 24a12 12 0 0 1-24 0C12 19.1 24 6 24 6Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
              <path d="M19 31a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
            </svg>
            <svg v-else class="h-4 w-4" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M10 12h12a6 6 0 0 1 6 6v26a6 6 0 0 0-6-6H10V12ZM38 12H28a6 6 0 0 0-6 6" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
              <path d="M38 12v26H28a6 6 0 0 0-6 6" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
            </svg>
          </span>
          {{ route.title }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type LearningRoute = {
  icon: string
  title: string
  to: string
}

type SearchSuggestion = {
  title: string
  description: string
  to: string
  kind: string
}

const props = defineProps<{
  modelValue: string
  placeholder: string
  learningRoutes: LearningRoute[]
  suggestions: SearchSuggestion[]
  searchStatus?: string
}>()

const showSuggestions = computed(() => props.modelValue.trim().length > 1 && props.suggestions.length > 0)

defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()
</script>
