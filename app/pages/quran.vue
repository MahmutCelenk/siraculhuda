<template>
  <main
    class="quran-reader"
    :style="readerStyle"
  >
    <header class="reader-header">
      <NuxtLink to="/" class="reader-back" aria-label="Siteye dön">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Siteye dön
      </NuxtLink>

      <div class="reader-brand">
        <strong>KUR'AN-I KERİM</strong>
        <span>Kur'an ve meal okuma alanı</span>
      </div>

      <nav class="reader-navigation" aria-label="Kur'an konumu">
        <div class="reader-picker reader-picker-surah" data-reader-picker>
          <span class="reader-control-label">Sûre</span>
          <button
            id="surah-picker-trigger"
            type="button"
            class="reader-picker-trigger"
            aria-haspopup="listbox"
            :aria-expanded="openPicker === 'surah'"
            aria-controls="surah-picker-menu"
            @click="togglePicker('surah')"
          >
            <span><b>{{ currentSurah?.id }}.</b> {{ currentSurah?.name }}</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div v-if="openPicker === 'surah'" id="surah-picker-menu" class="reader-picker-menu" role="listbox" aria-labelledby="surah-picker-trigger">
            <label class="reader-picker-search">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" stroke-width="1.5" />
                <path d="m12.2 12.2 3.3 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <input v-model="surahSearch" type="search" placeholder="Sûre ara..." autocomplete="off" autofocus>
            </label>

            <div class="reader-picker-options reader-surah-options">
              <button
                v-for="surah in filteredSurahs"
                :key="surah.id"
                type="button"
                role="option"
                :aria-selected="currentSurah?.id === surah.id"
                :class="{ active: currentSurah?.id === surah.id }"
                @click="selectSurah(surah.id)"
              >
                <span><b>{{ surah.id }}</b><strong>{{ surah.name }}</strong></span>
                <small dir="rtl" lang="ar">{{ surah.arabicName }}</small>
              </button>
              <p v-if="filteredSurahs.length === 0" class="reader-picker-empty">Eşleşen sûre bulunamadı.</p>
            </div>
          </div>
        </div>

        <div class="reader-picker reader-picker-ayah" data-reader-picker>
          <span class="reader-control-label">Âyet</span>
          <button
            id="ayah-picker-trigger"
            type="button"
            class="reader-picker-trigger"
            aria-haspopup="listbox"
            :aria-expanded="openPicker === 'ayah'"
            aria-controls="ayah-picker-menu"
            @click="togglePicker('ayah')"
          >
            <span>{{ currentAyah }}</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div v-if="openPicker === 'ayah'" id="ayah-picker-menu" class="reader-picker-menu reader-picker-menu-ayah" role="listbox" aria-labelledby="ayah-picker-trigger">
            <div class="reader-picker-menu-title">
              <strong>Âyet seç</strong>
              <span>{{ activeSurahVerseCount }} âyet</span>
            </div>
            <div class="reader-picker-options reader-ayah-options">
              <button
                v-for="ayah in activeSurahVerseCount"
                :key="ayah"
                type="button"
                role="option"
                :aria-selected="currentAyah === ayah"
                :class="{ active: currentAyah === ayah }"
                @click="selectAyah(ayah)"
              >
                {{ ayah }}
              </button>
            </div>
          </div>
        </div>

        <div class="reader-view-switch" role="group" aria-label="Okuma görünümü">
          <button
            type="button"
            :class="{ active: readerView === 'spread' }"
            :aria-pressed="readerView === 'spread'"
            title="Kur'an ve meali birlikte göster"
            @click="selectReaderView('spread')"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2.5" y="4" width="6.2" height="12" rx="1.4" stroke="currentColor" stroke-width="1.4" />
              <rect x="11.3" y="4" width="6.2" height="12" rx="1.4" stroke="currentColor" stroke-width="1.4" />
            </svg>
            <span>İki Sayfa</span>
          </button>
          <button
            type="button"
            :class="{ active: readerView === 'arabic' }"
            :aria-pressed="readerView === 'arabic'"
            title="Yalnızca Kur'an sayfasını göster"
            @click="selectReaderView('arabic')"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="4.5" y="3" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.4" />
              <path d="M7.5 7h5M7.5 10h5M7.5 13h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
            <span>Kur'an</span>
          </button>
          <button
            type="button"
            :class="{ active: readerView === 'meal' }"
            :aria-pressed="readerView === 'meal'"
            title="Yalnızca meal sayfasını göster"
            @click="selectReaderView('meal')"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="4.5" y="3" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.4" />
              <path d="M7.5 7h5M7.5 10h5M7.5 13h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
            <span>Meal</span>
          </button>
        </div>

      </nav>

      <div class="reader-font-controls" aria-label="Yazı boyutu">
        <button type="button" :disabled="readerFontScale <= 0.9" aria-label="Yazıyı küçült" @click="changeFontScale(-0.1)">A−</button>
        <button type="button" :disabled="readerFontScale >= 1.2" aria-label="Yazıyı büyüt" @click="changeFontScale(0.1)">A+</button>
      </div>
    </header>

    <div class="reader-mobile-tabs" role="tablist" aria-label="Okuma paneli">
      <button
        id="arabic-tab"
        type="button"
        role="tab"
        :aria-selected="mobilePanel === 'arabic'"
        aria-controls="arabic-panel"
        :class="{ active: mobilePanel === 'arabic' }"
        @click="selectReaderView('arabic')"
      >
        Kur'an
      </button>
      <button
        id="meal-tab"
        type="button"
        role="tab"
        :aria-selected="mobilePanel === 'meal'"
        aria-controls="meal-panel"
        :class="{ active: mobilePanel === 'meal' }"
        @click="selectReaderView('meal')"
      >
        Meal
      </button>
    </div>

    <section class="reader-workspace" :class="`view-${readerView}`" aria-label="Mushaf ve meal">
      <article
        id="arabic-panel"
        class="reader-panel reader-panel-arabic"
        :class="{ 'mobile-panel-active': mobilePanel === 'arabic' }"
        role="tabpanel"
        aria-labelledby="arabic-tab"
      >
        <header class="reader-panel-header">
          <span>Kur'an-ı Kerim</span>
          <strong>{{ pageTitleTurkish }}</strong>
          <span>{{ focusedSelection ? selectionDescription : `${currentPage} / ${totalPages}` }}</span>
        </header>

        <div ref="arabicPanelBody" class="reader-panel-body arabic-page" dir="rtl" lang="ar">
          <section v-for="group in pageGroups" :key="`arabic-${group.surahId}`" class="arabic-surah-section">
            <div v-if="group.beginsHere || focusedSelection" class="surah-opening">
              <strong dir="ltr" lang="tr">{{ group.surahName }} Sûresi</strong>
              <p v-if="group.beginsHere && group.surahId !== 1 && group.surahId !== 9">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>

            <div class="arabic-verse-flow">
              <button
                v-for="verse in group.verses"
                :id="`arabic-verse-${verse.surahId}-${verse.number}`"
                :key="`${verse.surahId}-${verse.number}`"
                type="button"
                class="arabic-verse"
                :class="{ active: isArabicVerseActive(verse.surahId, verse.number) }"
                :aria-pressed="isArabicVerseActive(verse.surahId, verse.number)"
                :aria-label="`${verse.surahName} Sûresi ${verse.number}. âyet`"
                @click="activateVerse(verse.surahId, verse.number, 'arabic')"
              >
                <span>{{ verse.arabic }}</span>
                <b aria-hidden="true">{{ toArabicNumber(verse.number) }}</b>
              </button>
            </div>
          </section>
        </div>

        <footer class="reader-panel-footer">{{ focusedSelection ? selectionDescription : currentPage }}</footer>
      </article>

      <article
        id="meal-panel"
        class="reader-panel reader-panel-meal"
        :class="{ 'mobile-panel-active': mobilePanel === 'meal' }"
        role="tabpanel"
        aria-labelledby="meal-tab"
      >
        <header class="reader-panel-header">
          <span>Kur'an Yolu Meali</span>
          <strong>{{ pageTitleTurkish }}</strong>
          <span>{{ focusedSelection ? selectionDescription : currentPage }}</span>
        </header>

        <div ref="mealPanelBody" class="reader-panel-body meal-page">
          <section v-for="group in pageMealGroups" :key="`meal-${group.surahId}`" class="meal-surah-section">
            <div v-if="group.beginsHere || focusedSelection" class="meal-surah-heading">
              <strong>{{ group.surahName }} Sûresi</strong>
              <span>{{ group.verseCount }} âyet</span>
            </div>

            <button
              v-for="segment in group.segments"
              :id="`meal-segment-${group.surahId}-${segment.start}`"
              :key="`${group.surahId}-${segment.start}-${segment.end}`"
              type="button"
              class="meal-segment"
              :class="{ active: isMealSegmentActive(group.surahId, segment.start, segment.end) }"
              :aria-pressed="isMealSegmentActive(group.surahId, segment.start, segment.end)"
              @click="activateVerse(group.surahId, segment.visibleStart, 'meal')"
            >
              <b>{{ segment.start === segment.end ? segment.start : `${segment.start}–${segment.end}` }}.</b>
              <span>{{ segment.text }}</span>
            </button>
          </section>
        </div>

        <footer class="reader-panel-footer">Meal · {{ focusedSelection ? selectionDescription : currentPage }}</footer>
      </article>
    </section>

    <form ref="readerPagination" class="reader-pagination" aria-label="Sayfa navigasyonu" @submit.prevent="goToInputPage">
      <button type="button" :disabled="!canGoBack" aria-label="Önceki sayfa" title="Önceki sayfa" @click="previousPosition">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="reader-pagination-status">
        <span v-if="hasSelectedAyah" class="reader-ayah-position" aria-live="polite">Âyet {{ currentAyah }} / {{ activeSurahVerseCount }}</span>
        <label for="reader-bottom-page">Sayfa</label>
        <input
          id="reader-bottom-page"
          v-model="pageInput"
          inputmode="numeric"
          enterkeyhint="go"
          aria-label="Gitmek istediğin sayfa"
          @focus="selectInputText"
          @change="goToInputPage"
        >
        <span>/</span>
        <output>{{ totalPages }}</output>
      </div>

      <button type="button" :disabled="!canGoForward" aria-label="Sonraki sayfa" title="Sonraki sayfa" @click="nextPosition">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { quranPageIndex } from '~/data/quranPageIndex'
import { quranYoluMeal } from '~/data/quranYoluMeal'
import { surahs } from '~/data/surahs'
import { normalizeSearch } from '~/utils/siteSearch'

definePageMeta({
  layout: false,
  path: '/kuran'
})

type QuranVerse = {
  surahId: number
  surahName: string
  arabicName: string
  verseCount: number
  number: number
  arabic: string
}

type ActiveVerse = {
  surahId: number
  ayah: number
}

type FocusedSelection = { surahId: number; ayah?: number }

const route = useRoute()
const router = useRouter()
const totalPages = quranPageIndex.length
const readerView = ref<'spread' | 'arabic' | 'meal'>('spread')
const mobilePanel = ref<'arabic' | 'meal'>('arabic')
const readerFontScale = ref(1)
const pageInput = ref('')
const arabicPanelBody = ref<HTMLElement | null>(null)
const mealPanelBody = ref<HTMLElement | null>(null)
const readerPagination = ref<HTMLElement | null>(null)
const activeVerse = ref<ActiveVerse | null>(null)
const openPicker = ref<'surah' | 'ayah' | null>(null)
const surahSearch = ref('')

const allVerses = new Map<string, QuranVerse>()
for (const surah of surahs) {
  for (const verse of surah.verses) {
    allVerses.set(`${surah.id}:${verse.number}`, {
      surahId: surah.id,
      surahName: surah.name,
      arabicName: surah.arabicName,
      verseCount: surah.verseCount,
      number: verse.number,
      arabic: verse.arabic
    })
  }
}

const normalizePage = (value: unknown) => {
  const page = Number(value)
  if (!Number.isFinite(page)) return 1
  return Math.min(Math.max(Math.trunc(page), 1), totalPages)
}

function findPageForVerse(surahId: number, ayah: number) {
  const pageIndex = quranPageIndex.findIndex(ranges => ranges.some(
    range => range.s === surahId && ayah >= range.a && ayah <= range.b
  ))
  return pageIndex >= 0 ? pageIndex + 1 : 1
}

function routeSelection(): FocusedSelection | null {
  if (typeof route.query.sure !== 'string') return null
  const name = normalizeSearch(route.query.sure)
  const surah = surahs.find(item => String(item.id) === route.query.sure
    || normalizeSearch(item.name) === name || normalizeSearch(item.slug) === name)
  if (!surah) return null
  const ayah = typeof route.query.ayet === 'string' ? Number(route.query.ayet) : NaN
  return Number.isInteger(ayah) && ayah >= 1 && ayah <= surah.verseCount
    ? { surahId: surah.id, ayah }
    : { surahId: surah.id }
}

const focusedSelection = ref<FocusedSelection | null>(routeSelection())
const currentPage = ref(focusedSelection.value
  ? findPageForVerse(focusedSelection.value.surahId, focusedSelection.value.ayah ?? 1)
  : normalizePage(route.query.sayfa))
pageInput.value = String(currentPage.value)
if (focusedSelection.value) {
  activeVerse.value = { surahId: focusedSelection.value.surahId, ayah: focusedSelection.value.ayah ?? 1 }
}

const versesForPage = (page: number) => {
  const verses: QuranVerse[] = []
  const ranges = quranPageIndex[normalizePage(page) - 1] ?? []

  for (const range of ranges) {
    for (let ayah = range.a; ayah <= range.b; ayah += 1) {
      const verse = allVerses.get(`${range.s}:${ayah}`)
      if (verse) verses.push(verse)
    }
  }

  return verses
}

const pageVerses = computed(() => {
  const selection = focusedSelection.value
  if (!selection) return versesForPage(currentPage.value)
  const surah = surahs.find(item => item.id === selection.surahId)
  return (surah?.verses ?? [])
    .flatMap(verse => {
      const item = allVerses.get(`${selection.surahId}:${verse.number}`)
      return item ? [item] : []
    })
})
const pageGroups = computed(() => {
  const groups: Array<{
    surahId: number
    surahName: string
    arabicName: string
    verseCount: number
    beginsHere: boolean
    verses: QuranVerse[]
  }> = []

  for (const verse of pageVerses.value) {
    const current = groups[groups.length - 1]
    if (!current || current.surahId !== verse.surahId) {
      groups.push({
        surahId: verse.surahId,
        surahName: verse.surahName,
        arabicName: verse.arabicName,
        verseCount: verse.verseCount,
        beginsHere: verse.number === 1,
        verses: [verse]
      })
    } else {
      current.verses.push(verse)
    }
  }

  return groups
})

const pageMealGroups = computed(() => pageGroups.value.map((group) => {
  const firstVerse = group.verses[0]?.number ?? 0
  const lastVerse = group.verses[group.verses.length - 1]?.number ?? 0

  return {
    ...group,
    segments: (quranYoluMeal[group.surahId] ?? [])
      .filter(segment => segment.end >= firstVerse && segment.start <= lastVerse)
      .map(segment => ({
        ...segment,
        visibleStart: Math.max(segment.start, firstVerse),
        visibleEnd: Math.min(segment.end, lastVerse)
      }))
  }
}))

const activeMealRange = computed(() => {
  if (!activeVerse.value) return null
  const group = pageMealGroups.value.find(item => item.surahId === activeVerse.value?.surahId)
  const segment = group?.segments.find(
    item => activeVerse.value && item.start <= activeVerse.value.ayah && item.end >= activeVerse.value.ayah
  )

  return segment ? { surahId: group?.surahId ?? 0, start: segment.start, end: segment.end } : null
})

const pageTitleTurkish = computed(() => [...new Set(pageVerses.value.map(verse => verse.surahName))].join(' / '))
const activeSurahVerseCount = computed(() => {
  const surahId = activeVerse.value?.surahId ?? pageVerses.value[0]?.surahId ?? 1
  return surahs.find(surah => surah.id === surahId)?.verseCount ?? 1
})
const currentSurah = computed(() => {
  const surahId = activeVerse.value?.surahId ?? pageVerses.value[0]?.surahId ?? 1
  return surahs.find(surah => surah.id === surahId) ?? surahs[0]
})
const currentAyah = computed(() => activeVerse.value?.ayah ?? pageVerses.value[0]?.number ?? 1)
const selectionDescription = computed(() => focusedSelection.value?.ayah
  ? `${focusedSelection.value.ayah}. âyet seçili`
  : `${currentSurah.value?.verseCount ?? 0} âyet`)
const hasSelectedAyah = computed(() => focusedSelection.value?.ayah !== undefined)
const canGoBack = computed(() => currentPage.value > 1)
const canGoForward = computed(() => currentPage.value < totalPages)
const filteredSurahs = computed(() => {
  const query = surahSearch.value
    .trim()
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  if (!query) return surahs

  return surahs.filter((surah) => {
    const name = surah.name
      .toLocaleLowerCase('tr-TR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return String(surah.id).includes(query) || name.includes(query) || surah.arabicName.includes(query)
  })
})

const readerStyle = computed(() => ({
  '--reader-arabic-size': `${25 * readerFontScale.value}px`,
  '--reader-arabic-line': `${58 * readerFontScale.value}px`,
  '--reader-mobile-arabic-size': `${27 * readerFontScale.value}px`,
  '--reader-mobile-arabic-line': `${62 * readerFontScale.value}px`,
  '--reader-meal-size': `${15 * readerFontScale.value}px`,
  '--reader-mobile-meal-size': `${16 * readerFontScale.value}px`,
  '--reader-opening-title-size': `${26.4 * readerFontScale.value}px`,
  '--reader-opening-text-size': `${20.48 * readerFontScale.value}px`
}))

const isArabicVerseActive = (surahId: number, ayah: number) => {
  if (focusedSelection.value?.ayah !== undefined) {
    return activeVerse.value?.surahId === surahId && activeVerse.value.ayah === ayah
  }
  const range = activeMealRange.value
  if (range) return range.surahId === surahId && ayah >= range.start && ayah <= range.end
  return activeVerse.value?.surahId === surahId && activeVerse.value.ayah === ayah
}

const isMealSegmentActive = (surahId: number, start: number, end: number) => {
  return activeVerse.value?.surahId === surahId
    && activeVerse.value.ayah >= start
    && activeVerse.value.ayah <= end
}

const scrollWithinPanel = (element: HTMLElement | null, selector: string, behavior: ScrollBehavior = 'smooth') => {
  // Hidden mobile tabs must not move the visible panel or the document.
  if (!element || element.getClientRects().length === 0) return
  const target = element.querySelector<HTMLElement>(selector)
  if (!target) return
  const targetRect = target.getBoundingClientRect()
  const panelRect = element.getBoundingClientRect()
  const viewportTop = window.visualViewport?.offsetTop ?? 0
  const viewportBottom = Math.min(
    viewportTop + (window.visualViewport?.height ?? window.innerHeight),
    readerPagination.value?.getBoundingClientRect().top ?? Infinity
  )
  const scrollsDocument = window.getComputedStyle(element).overflowY === 'visible'
  const visibleTop = scrollsDocument ? viewportTop : Math.max(viewportTop, panelRect.top + element.clientTop)
  const visibleBottom = scrollsDocument
    ? viewportBottom
    : Math.min(viewportBottom, panelRect.top + element.clientTop + element.clientHeight)
  const visibleHeight = visibleBottom - visibleTop
  if (visibleHeight <= 0) return

  // Do not move an ayah that is already fully inside the usable reading area.
  if (targetRect.top >= visibleTop + 16 && targetRect.bottom <= visibleBottom - 16) return
  const inset = Math.max(16, (visibleHeight - targetRect.height) / 2)
  const offset = targetRect.top - (visibleTop + inset)
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : behavior
  if (scrollsDocument) {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight)
    window.scrollTo({ top: Math.min(maxScroll, Math.max(0, window.scrollY + offset)), behavior: motion })
  } else {
    const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight)
    element.scrollTo({ top: Math.min(maxScroll, Math.max(0, element.scrollTop + offset)), behavior: motion })
  }
}

const scrollToActiveVerse = async (behavior: ScrollBehavior = 'smooth') => {
  await nextTick()
  const verse = activeVerse.value
  if (!verse) return
  scrollWithinPanel(arabicPanelBody.value, `#arabic-verse-${verse.surahId}-${verse.ayah}`, behavior)
  const segment = activeMealRange.value
  if (segment) scrollWithinPanel(mealPanelBody.value, `#meal-segment-${verse.surahId}-${segment.start}`, behavior)
}

const activateVerse = async (surahId: number, ayah: number, source: 'arabic' | 'meal') => {
  activeVerse.value = { surahId, ayah }
  if (focusedSelection.value) {
    focusedSelection.value = { surahId, ayah }
    currentPage.value = findPageForVerse(surahId, ayah)
    pageInput.value = String(currentPage.value)
    updateReaderLocation()
  }
  await nextTick()

  if (source === 'arabic') {
    const segment = activeMealRange.value
    if (segment) scrollWithinPanel(mealPanelBody.value, `#meal-segment-${surahId}-${segment.start}`)
  } else {
    scrollWithinPanel(arabicPanelBody.value, `#arabic-verse-${surahId}-${ayah}`)
  }
}

const resetPanelScroll = () => {
  void nextTick(() => {
    arabicPanelBody.value?.scrollTo({ top: 0 })
    mealPanelBody.value?.scrollTo({ top: 0 })
    const visiblePanel = [arabicPanelBody.value, mealPanelBody.value]
      .find(panel => panel && panel.getClientRects().length > 0)
    if (visiblePanel && window.getComputedStyle(visiblePanel).overflowY === 'visible') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  })
}

const updateReaderLocation = () => {
  const query: typeof route.query = { ...route.query, sayfa: String(currentPage.value) }
  delete query.sure
  delete query.ayet
  if (focusedSelection.value) {
    query.sure = String(focusedSelection.value.surahId)
    if (focusedSelection.value.ayah) query.ayet = String(focusedSelection.value.ayah)
  }
  void router.replace({ query })
}

const commitPage = (page: number) => {
  const normalized = normalizePage(page)
  focusedSelection.value = null
  currentPage.value = normalized
  pageInput.value = String(normalized)
  const firstVerse = versesForPage(normalized)[0]
  activeVerse.value = firstVerse ? { surahId: firstVerse.surahId, ayah: firstVerse.number } : null
  openPicker.value = null
  resetPanelScroll()
  updateReaderLocation()
}

const commitSelection = (surahId: number, ayah?: number) => {
  focusedSelection.value = { surahId, ...(ayah === undefined ? {} : { ayah }) }
  currentPage.value = findPageForVerse(surahId, ayah ?? 1)
  pageInput.value = String(currentPage.value)
  activeVerse.value = { surahId, ayah: ayah ?? 1 }
  openPicker.value = null
  if (ayah === undefined) resetPanelScroll()
  else void scrollToActiveVerse()
  updateReaderLocation()
}

const selectSurah = (surahId: number) => {
  commitSelection(surahId)
  surahSearch.value = ''
}

const selectAyah = (ayah: number) => {
  commitSelection(currentSurah.value?.id ?? 1, ayah)
}

const togglePicker = (picker: 'surah' | 'ayah') => {
  openPicker.value = openPicker.value === picker ? null : picker
  if (picker !== 'surah') surahSearch.value = ''
}

const selectReaderView = (view: 'spread' | 'arabic' | 'meal') => {
  readerView.value = view
  if (view !== 'spread') mobilePanel.value = view
  if (import.meta.client) localStorage.setItem('siraculhuda:quran-view', view)
  if (focusedSelection.value?.ayah !== undefined) void scrollToActiveVerse('auto')
}

const goToInputPage = () => commitPage(normalizePage(pageInput.value))
const navigatePosition = (direction: -1 | 1) => {
  if (direction === -1 ? !canGoBack.value : !canGoForward.value) return
  commitPage(currentPage.value + direction)
}
const previousPosition = () => navigatePosition(-1)
const nextPosition = () => navigatePosition(1)

const selectInputText = (event: FocusEvent) => {
  (event.target as HTMLInputElement).select()
}

const changeFontScale = (change: number) => {
  readerFontScale.value = Math.min(1.2, Math.max(0.9, Number((readerFontScale.value + change).toFixed(1))))
}

const toArabicNumber = (value: number) => String(value).replace(/\d/g, digit => '٠١٢٣٤٥٦٧٨٩'[Number(digit)] ?? digit)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && openPicker.value) {
    openPicker.value = null
    return
  }

  const target = event.target as HTMLElement | null
  if (target?.matches('input, textarea, button')) return
  if (event.key === 'ArrowLeft') previousPosition()
  if (event.key === 'ArrowRight') nextPosition()
}

const handleOutsidePicker = (event: PointerEvent) => {
  const target = event.target
  if (target instanceof Element && !target.closest('[data-reader-picker]')) openPicker.value = null
}

watch(() => [route.query.sayfa, route.query.sure, route.query.ayet], () => {
  const selection = routeSelection()
  const page = selection ? findPageForVerse(selection.surahId, selection.ayah ?? 1) : normalizePage(route.query.sayfa)
  if (page === currentPage.value
    && selection?.surahId === focusedSelection.value?.surahId
    && selection?.ayah === focusedSelection.value?.ayah) return
  focusedSelection.value = selection
  currentPage.value = page
  pageInput.value = String(page)
  const firstVerse = pageVerses.value[0]
  activeVerse.value = selection
    ? { surahId: selection.surahId, ayah: selection.ayah ?? 1 }
    : firstVerse ? { surahId: firstVerse.surahId, ayah: firstVerse.number } : null
  openPicker.value = null
  if (selection?.ayah !== undefined) void scrollToActiveVerse('auto')
  else resetPanelScroll()
})

onMounted(() => {
  const savedView = localStorage.getItem('siraculhuda:quran-view')
  if (savedView === 'spread' || savedView === 'arabic' || savedView === 'meal') selectReaderView(savedView)
  const firstVerse = pageVerses.value[0]
  if (focusedSelection.value) {
    activeVerse.value = { surahId: focusedSelection.value.surahId, ayah: focusedSelection.value.ayah ?? 1 }
    if (focusedSelection.value.ayah !== undefined) void scrollToActiveVerse('auto')
  } else if (firstVerse) {
    activeVerse.value = { surahId: firstVerse.surahId, ayah: firstVerse.number }
  }
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handleOutsidePicker)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handleOutsidePicker)
})

useSeoMeta({
  title: "Kur'an Oku",
  description: "Kur'an-ı Kerim'i Arapça metin ve Kur'an Yolu mealiyle, eşleşen ayet vurgusuyla oku."
})
</script>
