<template>
  <section class="hadith-library">
    <div class="library-shell">
      <header class="library-heading">
        <div>
          <p class="library-eyebrow">SİRÂCÜ'L-HÜDÂ / HADİS</p>
          <h1>Hadis Kütüphanesi</h1>
          <p class="library-intro">Arapça metni, Türkçe anlamı ve kaynağıyla hadisler.</p>
        </div>
        <span class="collection-count">{{ items.length }} <span>hadis</span></span>
      </header>

      <form class="library-toolbar" role="search" @submit.prevent>
        <div class="search-field">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.6" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
          <label class="visually-hidden" for="hadith-search">Hadis, râvi veya kaynak ara</label>
          <input id="hadith-search" v-model="search" type="search" placeholder="Hadis, râvi veya kaynak ara…" autocomplete="off">
          <button v-if="search" class="clear-search" type="button" aria-label="Aramayı temizle" @click="search = ''">×</button>
        </div>
        <div class="topic-field">
          <label for="hadith-topic">Konu</label>
          <select id="hadith-topic" v-model="activeTopic">
            <option value="Tümü">Tüm konular</option>
            <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
          </select>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </form>

      <div ref="resultsHeading" class="results-heading" tabindex="-1">
        <p role="status" aria-live="polite">
          <template v-if="filteredHadiths.length"><strong>{{ filteredHadiths.length }} hadis</strong><span class="results-divider">/</span>{{ firstResult }}–{{ lastResult }} gösteriliyor</template>
          <template v-else>Sonuç bulunamadı</template>
        </p>
        <button v-if="search || activeTopic !== 'Tümü'" type="button" class="reset-filters" @click="resetFilters">Filtreleri temizle</button>
        <span v-else class="page-caption">Sayfa {{ currentPage }} / {{ pageCount }}</span>
      </div>

      <div class="hadith-grid">
        <article v-for="hadith in paginatedHadiths" :key="hadith.id" class="hadith-card">
          <header class="card-heading">
            <div class="card-meta">
              <span class="hadith-number">{{ String(hadith.id).padStart(2, '0') }}</span>
              <span class="topic-tag">{{ hadith.topic }}</span>
            </div>
            <h2>{{ hadith.title }}</h2>
            <p class="narrator">{{ hadith.narrator }}</p>
          </header>

          <section class="arabic-section" aria-label="Arapça metin">
            <p class="arabic-text" dir="rtl" lang="ar">{{ hadith.arabic }}</p>
          </section>

          <div class="card-body">
            <section>
              <h3 class="section-label">Türkçe anlamı</h3>
              <p class="translation">{{ hadith.text }}</p>
            </section>
            <section class="hadith-note">
              <h3 class="section-label">Kısa açıklama</h3>
              <p>{{ hadith.meaning }}</p>
            </section>
          </div>

          <div class="card-reading-action">
            <button type="button" class="read-hadith" aria-haspopup="dialog" :aria-label="`${hadith.title}: tam metni oku`" @click="openReader(hadith)">
              Tam metni oku <span aria-hidden="true">↗</span>
            </button>
          </div>

          <footer class="card-footer">
            <div class="reference">
              <span class="section-label">Kaynak</span>
              <p>{{ hadith.reference }}</p>
            </div>
            <a :href="hadith.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-link" :aria-label="`${hadith.title}: kaynağı incele (yeni sekmede açılır)`">
              Kaynağı incele
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </footer>
        </article>
      </div>

      <div v-if="!filteredHadiths.length" class="empty-state">
        <h2>Aramana uygun hadis bulunamadı</h2>
        <p>Farklı bir kelime dene veya konu filtresini temizle.</p>
        <button type="button" class="reset-filters" @click="resetFilters">Tüm hadisleri göster</button>
      </div>

      <nav v-if="pageCount > 1" class="pagination" aria-label="Hadis sayfaları">
        <button class="page-step" type="button" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
          <span aria-hidden="true">←</span> Önceki
        </button>
        <div class="page-numbers">
          <button v-for="page in pageCount" :key="page" type="button" :class="{ 'is-current': currentPage === page }" :aria-current="currentPage === page ? 'page' : undefined" :aria-label="`${page}. sayfa`" @click="goToPage(page)">{{ page }}</button>
        </div>
        <button class="page-step" type="button" :disabled="currentPage === pageCount" @click="goToPage(currentPage + 1)">
          Sonraki <span aria-hidden="true">→</span>
        </button>
      </nav>
    </div>

    <dialog ref="readerDialog" class="hadith-reader" aria-labelledby="reader-title" @close="onReaderClose">
      <template v-if="selectedHadith">
        <div class="reader-toolbar">
          <span>{{ selectedHadith.topic }} · Tam metin</span>
          <button type="button" class="reader-close" autofocus aria-label="Okuma penceresini kapat" @click="readerDialog?.close()">Kapat <span aria-hidden="true">×</span></button>
        </div>
        <div class="reader-content">
          <header class="reader-heading">
            <h2 id="reader-title">{{ selectedHadith.title }}</h2>
            <p class="narrator">{{ selectedHadith.narrator }}</p>
          </header>
          <section class="reader-arabic" aria-label="Arapça tam metin">
            <p class="arabic-text" dir="rtl" lang="ar">{{ selectedHadith.arabic }}</p>
          </section>
          <section>
            <h3 class="section-label">Türkçe anlamı</h3>
            <p class="translation">{{ selectedHadith.text }}</p>
          </section>
          <section class="hadith-note">
            <h3 class="section-label">Kısa açıklama</h3>
            <p>{{ selectedHadith.meaning }}</p>
          </section>
          <footer class="reader-footer">
            <div class="reference">
              <span class="section-label">Kaynak</span>
              <p>{{ selectedHadith.reference }}</p>
            </div>
            <a :href="selectedHadith.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-link">Kaynağı incele <span aria-hidden="true">↗</span><span class="visually-hidden"> (yeni sekmede açılır)</span></a>
          </footer>
        </div>
      </template>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type { HadithItem } from '~/data/hadiths'

const props = defineProps<{ items: HadithItem[] }>()
const route = useRoute()
const search = ref('')
const activeTopic = ref('Tümü')
const currentPage = ref(1)
const resultsHeading = ref<HTMLElement | null>(null)
const pageSize = 6
const selectedHadith = ref<HadithItem | null>(null)
const readerDialog = ref<HTMLDialogElement | null>(null)
let previousOverflow: string | null = null

async function openReader(hadith: HadithItem) {
  selectedHadith.value = hadith
  await nextTick()
  if (!readerDialog.value || readerDialog.value.open) return
  readerDialog.value.showModal()
  readerDialog.value.scrollTop = 0
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
}

function onReaderClose() {
  selectedHadith.value = null
  if (previousOverflow !== null) {
    document.documentElement.style.overflow = previousOverflow
    previousOverflow = null
  }
}

onBeforeUnmount(onReaderClose)

function openRouteHadith(value: unknown) {
  if (typeof value !== 'string') return
  const hadith = props.items.find(item => String(item.id) === value)
  if (hadith) void openReader(hadith)
}

onMounted(() => openRouteHadith(route.query.hadis))
watch(() => route.query.hadis, openRouteHadith)

const topics = computed(() => [...new Set(props.items.map(item => item.topic))].sort((a, b) => a.localeCompare(b, 'tr')))
const filteredHadiths = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('tr-TR')
  return props.items.filter((item) => {
    const matchesTopic = activeTopic.value === 'Tümü' || item.topic === activeTopic.value
    const haystack = [item.title, item.text, item.arabic, item.narrator, item.meaning, item.topic, item.reference].join(' ').toLocaleLowerCase('tr-TR')
    return matchesTopic && (!term || haystack.includes(term))
  })
})
const pageCount = computed(() => Math.max(1, Math.ceil(filteredHadiths.value.length / pageSize)))
const firstResult = computed(() => (currentPage.value - 1) * pageSize + 1)
const lastResult = computed(() => Math.min(currentPage.value * pageSize, filteredHadiths.value.length))
const paginatedHadiths = computed(() => filteredHadiths.value.slice(firstResult.value - 1, lastResult.value))

watch([search, activeTopic], () => { currentPage.value = 1 }, { flush: 'sync' })
watch(pageCount, count => { currentPage.value = Math.min(currentPage.value, count) }, { flush: 'sync' })

function resetFilters() {
  search.value = ''
  activeTopic.value = 'Tümü'
}

async function goToPage(page: number) {
  if (page === currentPage.value || page < 1 || page > pageCount.value) return
  currentPage.value = page
  await nextTick()
  resultsHeading.value?.focus({ preventScroll: true })
  resultsHeading.value?.scrollIntoView({ block: 'start', behavior: 'auto' })
}
</script>

<style scoped src="~/assets/css/components/hadith-collection.css"></style>
