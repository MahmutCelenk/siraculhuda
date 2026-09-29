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

<style scoped>
.hadith-library { min-height: 70vh; background: #f7f7f2; color: #253c34; }
.library-shell { max-width: 1240px; margin: 0 auto; padding: 48px 32px 64px; }
.library-heading { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
.library-eyebrow { margin: 0 0 12px; color: #788278; font-size: 10px; font-weight: 700; letter-spacing: .2em; }
.library-heading h1 { margin: 0; color: #174b3c; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(30px, 3.2vw, 42px); font-weight: 600; line-height: 1.2; letter-spacing: -.035em; }
.library-intro { margin: 12px 0 0; color: #68746d; font-size: 14px; line-height: 1.7; }
.collection-count { display: flex; align-items: baseline; gap: 7px; color: #174b3c; font-family: 'Source Serif 4', Georgia, serif; font-size: 30px; white-space: nowrap; }
.collection-count span { color: #768078; font-family: Inter, sans-serif; font-size: 12px; }
.library-toolbar { display: flex; align-items: stretch; gap: 16px; padding-bottom: 26px; border-bottom: 1px solid #dce2da; }
.search-field { display: flex; flex: 1; min-width: 0; align-items: center; gap: 12px; padding: 0 16px; border: 1px solid #d7ded5; border-radius: 10px; background: #fff; transition: border-color .2s, box-shadow .2s; }
.search-field:focus-within, .topic-field:focus-within { border-color: #487560; box-shadow: 0 0 0 3px #dce9de; }
.search-field > svg { width: 20px; height: 20px; flex-shrink: 0; color: #65796e; }
.search-field input { width: 100%; min-width: 0; height: 50px; padding: 0; border: 0; outline: none; background: transparent; color: #253c34; box-shadow: none; font: inherit; font-size: 14px; }
.search-field input::placeholder { color: #6b7969; }
.search-field input::-webkit-search-cancel-button { appearance: none; }
.clear-search { width: 32px; height: 32px; flex-shrink: 0; border: 0; border-radius: 6px; background: transparent; color: #52695b; font-size: 24px; cursor: pointer; }
.clear-search:hover { background: #edf2ea; }
.topic-field { display: flex; align-items: center; position: relative; width: 226px; flex-shrink: 0; border: 1px solid #d7ded5; border-radius: 10px; background: #fff; transition: border-color .2s, box-shadow .2s; }
.topic-field label { margin-left: 16px; color: #6b7969; font-size: 12px; pointer-events: none; }
.topic-field select { width: 100%; min-width: 0; height: 50px; padding: 0 34px 0 12px; appearance: none; border: 0; outline: none; background: transparent; color: #254d3b; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.topic-field svg { position: absolute; right: 12px; width: 18px; height: 18px; pointer-events: none; }
.results-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 60px; scroll-margin-top: 90px; outline: none; }
.results-heading p { margin: 0; color: #62715f; font-size: 12px; }
.results-heading strong { color: #465c4e; font-weight: 600; }
.results-divider { margin: 0 10px; color: #bac1b6; }
.page-caption { color: #62715f; font-size: 12px; }
.reset-filters { padding: 4px 0; border: 0; background: transparent; color: #285f46; font: inherit; font-size: 12px; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
.reset-filters:hover { color: #102f22; }
.hadith-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
.hadith-card { display: flex; flex-direction: column; min-width: 0; overflow: hidden; border: 1px solid #dce3d9; border-radius: 14px; background: #fff; box-shadow: 0 3px 12px #233d2b03; }
.card-heading { padding: 24px 28px 20px; }
.card-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.hadith-number { color: #97a393; font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; }
.topic-tag { padding: 4px 10px; border-radius: 5px; background: #f0f3eb; color: #576e4e; font-size: 10px; font-weight: 600; }
.card-heading h2 { margin: 0; color: #194d3b; font-family: 'Source Serif 4', Georgia, serif; font-size: 25px; font-weight: 600; line-height: 1.3; letter-spacing: -.025em; }
.narrator { margin: 8px 0 0; color: #62715f; font-size: 12px; line-height: 1.6; }
.arabic-section { margin: 0 28px; padding: 18px 0; border-top: 1px solid #e6eade; border-bottom: 1px solid #e6eade; }
.arabic-text { margin: 0; color: #264c39; font-family: 'Amiri', 'Noto Naskh Arabic', 'Traditional Arabic', serif; font-size: 29px; font-weight: 400; line-height: 2; text-align: right; letter-spacing: normal; word-spacing: normal; overflow-wrap: break-word; }
.card-body { padding: 22px 28px 26px; }
.section-label { display: block; margin: 0; color: #62715f; font-size: 11px; font-weight: 600; line-height: 1.5; letter-spacing: .04em; }
.translation { margin: 9px 0 0; color: #364b3f; font-size: 15px; line-height: 1.95; overflow-wrap: break-word; }
.hadith-note { margin-top: 20px; padding-left: 13px; border-left: 2px solid #d8ddc9; }
.hadith-note p { margin: 6px 0 0; color: #65705f; font-size: 13px; line-height: 1.85; }
.card-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: auto; padding: 18px 28px; border-top: 1px solid #e8ece3; background: #fcfdf9; }
.reference { min-width: 0; }
.reference p { margin: 4px 0 0; color: #59704e; font-size: 12px; font-weight: 500; line-height: 1.7; overflow-wrap: anywhere; }
.hadith-library .source-link { display: inline-flex; min-height: 40px; flex-shrink: 0; align-items: center; justify-content: center; gap: 8px; padding: 9px 12px; border: 1px solid #cad8c7; border-radius: 7px; background: #eef3e9; color: #28533b; font-size: 12px; font-weight: 600; line-height: 1.5; text-decoration: none; transition: background-color .18s, border-color .18s, color .18s; }
.hadith-library .source-link:hover, .hadith-library .source-link:focus-visible { border-color: #21553d; background: #21553d; color: #fff; }
.source-link svg { width: 15px; height: 15px; color: inherit; }
.source-link:focus-visible, button:focus-visible { outline: 2px solid #487560; outline-offset: 3px; }
.pagination { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #dce2da; }
.pagination button { display: inline-flex; justify-content: center; align-items: center; min-width: 36px; min-height: 40px; border: 1px solid transparent; border-radius: 7px; background: transparent; color: #5e7160; font: inherit; font-size: 12px; cursor: pointer; transition: background-color .18s, color .18s; }
.pagination button:hover:not(:disabled) { background: #e6edde; color: #1d4d35; }
.page-numbers { display: flex; gap: 4px; flex-wrap: wrap; justify-content: center; }
.pagination .is-current, .pagination .is-current:hover { background: #21553d; color: #fff; }
.pagination .page-step { gap: 8px; padding: 0 8px; }
.pagination button:disabled { opacity: .35; cursor: default; }
.empty-state { padding: 64px 20px; border: 1px dashed #cfd9c8; border-radius: 14px; text-align: center; }
.empty-state h2 { margin: 0; color: #194d3b; font-family: 'Source Serif 4', Georgia, serif; font-size: 24px; }
.empty-state p { margin: 12px 0 20px; color: #7a847c; font-size: 14px; }
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.hadith-grid { grid-auto-rows: 1fr; }
.hadith-card .arabic-section { display: flex; align-items: center; min-height: 152px; }
.hadith-card .arabic-text { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; width: 100%; }
.hadith-card .translation { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden; }
.hadith-card .hadith-note p { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
.hadith-card .card-body { padding-bottom: 12px; }
.card-reading-action { margin-top: auto; padding: 0 28px 20px; }
.hadith-card .card-footer { margin-top: 0; }
.read-hadith { display: inline-flex; align-items: center; gap: 14px; min-height: 40px; padding: 0; border: 0; background: transparent; color: #28533b; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
.read-hadith:hover { color: #102f22; text-decoration: underline; text-underline-offset: 4px; }
.read-hadith span { font-size: 18px; }
.hadith-reader { width: min(760px, calc(100% - 32px)); max-width: none; max-height: calc(100dvh - 48px); margin: auto; padding: 0; overflow-y: auto; overscroll-behavior: contain; border: 1px solid #dce3d9; border-radius: 16px; background: #fff; color: #253c34; box-shadow: 0 24px 80px #102b2940; }
.hadith-reader::backdrop { background: #142b27a6; backdrop-filter: blur(3px); }
.reader-toolbar { position: sticky; top: 0; z-index: 1; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 24px; border-bottom: 1px solid #e6eade; background: #fcfdf9; color: #62715f; font-size: 12px; }
.reader-close { display: inline-flex; align-items: center; gap: 12px; min-height: 40px; padding: 0 10px; border: 0; border-radius: 6px; background: #eef3e9; color: #28533b; font: inherit; cursor: pointer; }
.reader-close:hover { background: #dce9d8; }
.reader-close span { font-size: 23px; }
.reader-content { padding: 28px 36px; }
.reader-heading h2 { margin: 0; color: #194d3b; font: 600 30px/1.3 'Source Serif 4', Georgia, serif; }
.reader-arabic { margin: 24px 0; padding: 20px 0; border-block: 1px solid #e6eade; }
.reader-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 28px; padding-top: 20px; border-top: 1px solid #e6eade; }
@media (max-width: 900px) {
  .library-shell { padding: 32px 24px 48px; }
  .hadith-grid { gap: 18px; }
  .card-heading { padding: 22px 22px 18px; }
  .card-heading h2 { font-size: 23px; }
  .arabic-section { margin: 0 22px; }
  .arabic-text { font-size: 27px; }
  .card-body { padding: 20px 22px 24px; }
  .card-reading-action { padding-inline: 22px; }
  .card-footer { align-items: flex-start; flex-direction: column; gap: 12px; padding: 16px 22px; }
}
@media (max-width: 680px) {
  .library-shell { padding: 28px 16px 40px; }
  .library-heading { margin-bottom: 22px; gap: 12px; }
  .library-heading h1 { font-size: 30px; }
  .library-intro { font-size: 13px; max-width: 280px; }
  .collection-count { display: none; }
  .library-toolbar { flex-direction: column; gap: 10px; padding-bottom: 20px; }
  .topic-field { width: 100%; }
  .topic-field select { height: 44px; }
  .hadith-grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .hadith-grid { grid-auto-rows: auto; }
  .hadith-card .arabic-section { min-height: 0; }
  .reader-content { padding: 24px 22px; }
  .reader-toolbar { padding-inline: 12px; }
  .reader-heading h2 { font-size: 25px; }
  .reader-footer { flex-wrap: wrap; }
  .card-footer { flex-direction: row; align-items: center; }
  .pagination { flex-wrap: wrap; gap: 12px; }
  .page-numbers { order: -1; width: 100%; }
  .page-caption { display: none; }
  .results-heading p, .reset-filters { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; }
}
</style>
