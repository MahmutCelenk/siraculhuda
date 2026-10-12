<template>
  <main>
    <section class="border-b border-outline-variant/40 bg-[linear-gradient(180deg,#f3faf6_0%,#fffdf8_100%)]">
      <div class="container-shell grid gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16">
        <div>
          <nav class="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            <NuxtLink to="/" class="transition hover:text-primary">Ana Sayfa</NuxtLink>
            <span>/</span>
            <span class="text-primary">Namaz</span>
          </nav>
          <p class="section-kicker text-sm font-semibold">Namaz Öğren</p>
          <h1 class="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.02] text-primary md:text-6xl">
            Vakit namazlarını adım adım öğren
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            Sabah, öğle, ikindi, akşam, yatsı, teravih ve bayram namazlarını; rekât sırası, okunan dualar ve dikkat noktalarıyla birlikte sakin bir öğrenme akışında takip et.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              v-for="item in quickLinks"
              :key="item.href"
              :href="item.href"
              class="inline-flex min-h-10 items-center rounded-full border border-outline-variant/60 bg-surface-container-lowest px-4 text-sm font-semibold text-on-surface transition hover:border-primary hover:text-primary"
            >
              {{ item.label }}
            </a>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-[28px] bg-surface-container shadow-manuscript-raised">
          <img src="/images/prayer-page-hero.png" alt="Namaz öğrenme sayfası için sakin mescid görseli" class="aspect-[4/3] h-full w-full object-cover lg:aspect-[16/13]">
          <div class="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/5 to-transparent" />
          <div class="absolute bottom-5 left-5 right-5 rounded-2xl bg-surface-container-lowest/90 p-5 shadow-manuscript backdrop-blur">
            <p class="text-xs font-bold uppercase tracking-wide text-secondary">Başlangıç ilkesi</p>
            <p class="mt-2 font-display text-2xl font-semibold leading-tight text-primary">Önce akışı kavra, sonra duaları parça parça sağlamlaştır.</p>
          </div>
        </div>
      </div>
    </section>

    <aside class="pointer-events-none fixed right-4 top-28 z-20 hidden w-64 2xl:block">
      <div class="pointer-events-auto rounded-[24px] border border-outline-variant/55 bg-surface-container-lowest/92 p-5 shadow-manuscript-raised backdrop-blur">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">Bu sayfada</p>
        <nav class="space-y-2">
          <a
            v-for="item in quickLinks"
            :key="item.href"
            :href="item.href"
            class="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition hover:bg-primary-fixed/45 hover:text-primary"
            :class="activeSection === item.href.slice(1) ? 'bg-primary text-on-primary shadow-sm hover:bg-primary hover:text-on-primary' : 'text-on-surface-variant'"
          >
            <span class="h-2 w-2 rounded-full transition" :class="activeSection === item.href.slice(1) ? 'bg-on-primary' : 'bg-primary-container group-hover:bg-primary'" />
            {{ item.label }}
          </a>
        </nav>
      </div>
    </aside>

    <section id="temel-akis" class="py-section-gap">
      <div class="container-shell">
        <div class="mb-8 rounded-[24px] border border-outline-variant/55 bg-surface-container-low p-4 xl:hidden">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">Bu sayfada</p>
          <nav class="flex gap-2 overflow-x-auto pb-1">
            <a
              v-for="item in quickLinks"
              :key="item.href"
              :href="item.href"
              class="min-h-9 shrink-0 rounded-full px-4 py-2 text-xs font-bold shadow-sm transition hover:text-primary"
              :class="activeSection === item.href.slice(1) ? 'bg-primary text-on-primary hover:text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant'"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>

        <div class="grid gap-6 xl:grid-cols-2 xl:items-stretch">
          <section class="flex h-full flex-col rounded-[28px] border border-outline-variant/55 bg-surface-container-lowest p-6 shadow-manuscript md:p-8">
            <p class="text-xs font-bold uppercase tracking-wide text-secondary">Temel hazırlık</p>
            <h2 class="mt-2 font-display text-3xl font-bold text-tertiary md:text-4xl">Namaza başlamadan önce</h2>
            <div class="mt-6 grid flex-1 grid-rows-3 gap-4">
              <div v-for="item in preparations" :key="item.title" class="flex min-h-[150px] flex-col rounded-2xl bg-surface-container-low p-5">
                <h3 class="font-display text-xl font-semibold text-primary">{{ item.title }}</h3>
                <p class="mt-2 text-sm leading-7 text-on-surface-variant">{{ item.body }}</p>
              </div>
            </div>
          </section>

          <section class="flex h-full flex-col rounded-[28px] border border-outline-variant/55 bg-surface-container-lowest p-6 shadow-manuscript md:p-8">
            <p class="text-xs font-bold uppercase tracking-wide text-secondary">Ortak akış</p>
            <h2 class="mt-2 font-display text-3xl font-bold text-tertiary md:text-4xl">Bir rekât nasıl kılınır?</h2>
            <ol class="mt-6 grid flex-1 grid-rows-3 gap-4">
              <li v-for="(step, index) in rakahFlow" :key="step.title" class="grid min-h-[150px] gap-4 rounded-2xl bg-surface-container-low p-5 md:grid-cols-[44px_1fr]">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">{{ index + 1 }}</span>
                <div>
                  <h3 class="font-display text-xl font-semibold text-primary">{{ step.title }}</h3>
                  <p class="mt-2 text-sm leading-7 text-on-surface-variant">{{ step.body }}</p>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </section>

    <section id="vakitler" class="bg-surface-container-low py-section-gap">
      <div class="container-shell">
        <div class="mb-10 max-w-3xl">
          <p class="section-kicker text-sm font-semibold">Vakit namazları</p>
          <h2 class="mt-3 font-display text-3xl font-bold text-tertiary md:text-5xl">Günlük namazların rekât düzeni</h2>
          <p class="mt-4 text-base leading-8 text-on-surface-variant">
            Her vakitte önce rekât sayısını gör, sonra hangi bölümde hangi sure ve duaların okunduğunu takip et.
          </p>
        </div>

        <div class="mb-6 rounded-[28px] border border-outline-variant/55 bg-surface-container-lowest p-4 shadow-manuscript md:p-5">
          <div class="grid gap-4">
            <label class="group/search flex min-h-12 items-center gap-3 rounded-full border border-outline-variant/60 bg-surface-container-low px-4 transition duration-300 focus-within:-translate-y-0.5 focus-within:border-primary focus-within:shadow-manuscript focus-within:ring-2 focus-within:ring-primary-fixed/70">
              <span class="sr-only">Namaz içinde ara</span>
              <svg class="h-4 w-4 shrink-0 text-primary transition duration-300 group-focus-within/search:scale-110 group-focus-within/search:rotate-[-8deg]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
              <input
                v-model="prayerSearch"
                class="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/70 focus:ring-0"
                type="search"
                placeholder="Sübhaneke, vitir, rükû, selam ara"
              >
            </label>

          </div>

          <div class="mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="topic in topicFilters"
              :key="topic.id"
              type="button"
              class="min-h-9 shrink-0 rounded-full border px-4 text-xs font-bold transition"
              :class="activeTopic === topic.id ? 'border-primary bg-primary-fixed text-primary' : 'border-outline-variant/60 text-on-surface-variant hover:border-primary hover:text-primary'"
              @click="activeTopic = topic.id"
            >
              {{ topic.label }}
            </button>
          </div>

          <div class="mt-4 border-t border-outline-variant/60 pt-4">
            <p class="mb-3 text-xs font-bold uppercase tracking-wide text-secondary">Dua hızlı erişim</p>
            <div class="flex gap-2 overflow-x-auto pb-1">
              <button
                v-for="shortcut in duaShortcuts"
                :key="shortcut"
                type="button"
                class="min-h-9 shrink-0 rounded-full bg-primary-fixed/35 px-4 text-xs font-bold text-primary transition hover:bg-primary-fixed"
                @click="jumpToTerm(shortcut)"
              >
                {{ shortcut }}
              </button>
            </div>
          </div>
        </div>

        <div class="mb-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <button
            v-for="prayer in dailyPrayers"
            :key="prayer.id"
            type="button"
            class="group min-h-[132px] rounded-[24px] border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-manuscript"
            :class="selectedPrayerId === prayer.id ? 'border-primary bg-primary text-on-primary shadow-manuscript-raised' : 'border-outline-variant/55 bg-surface-container-lowest text-on-surface hover:border-primary'"
            @click="selectedPrayerId = prayer.id"
          >
            <span class="block text-xs font-bold uppercase tracking-wide" :class="selectedPrayerId === prayer.id ? 'text-on-primary/75' : 'text-secondary'">
              {{ prayer.kind }}
            </span>
            <span class="mt-3 block font-display text-2xl font-bold">
              {{ prayer.name.replace(' namazı', '') }}
            </span>
          </button>
        </div>

        <div v-if="selectedPrayer" class="space-y-8">
          <article
            :id="selectedPrayer.id"
            class="scroll-mt-28 overflow-hidden rounded-[28px] bg-surface-container-lowest shadow-manuscript"
          >
            <div class="border-b border-outline-variant/60 px-6 py-6 md:px-8">
              <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ selectedPrayer.kind }}</p>
              <h3 class="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">{{ selectedPrayer.name }}</h3>
              <p class="mt-3 max-w-3xl text-base leading-8 text-on-surface-variant">{{ selectedPrayer.summary }}</p>
            </div>

            <div class="space-y-6 px-6 py-6 md:px-8">
              <section
                v-for="unit in visibleUnits"
                :key="unit.title"
                class="rounded-[24px] border border-outline-variant/55 bg-surface-container-low p-5 md:p-6"
              >
                <div class="flex flex-col gap-3 border-b border-outline-variant/60 pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ unit.rakats }}</p>
                    <h4 class="mt-1 font-display text-2xl font-bold text-tertiary">{{ unit.title }}</h4>
                    <p class="mt-2 text-sm leading-7 text-on-surface-variant">{{ unit.description }}</p>
                  </div>
                  <button
                    type="button"
                    class="inline-flex w-fit items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 text-xs font-bold text-primary shadow-sm transition hover:bg-primary-fixed"
                    @click="toggleUnitDetails(unit.title)"
                  >
                    {{ isUnitDetailsOpen(unit.title) ? 'Detayı kapat' : 'Detay' }}
                    <svg class="h-4 w-4 transition" :class="isUnitDetailsOpen(unit.title) ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>

                <ol class="mt-5 space-y-5">
                  <li v-for="(step, index) in unit.visibleSteps" :key="step.title" class="grid gap-4 md:grid-cols-[40px_1fr]">
                    <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                      {{ index + 1 }}
                    </span>
                    <div>
                      <h5 class="font-display text-xl font-semibold text-primary">{{ step.title }}</h5>
                      <p class="mt-2 text-sm leading-7 text-on-surface-variant">{{ step.body }}</p>

                      <div v-if="isUnitDetailsOpen(unit.title) && step.recitations?.length" class="mt-4 space-y-3">
                        <div
                          v-for="recitation in step.recitations"
                          :key="recitation.title"
                          class="rounded-2xl border border-primary-fixed-dim/50 bg-surface-container-lowest p-5"
                        >
                          <p class="mb-3 text-xs font-bold uppercase tracking-wide text-primary">{{ recitation.title }}</p>
                          <p class="font-serif text-2xl leading-[2.1] text-primary md:text-3xl" dir="rtl" lang="ar">{{ recitation.arabic }}</p>
                          <p class="mt-4 text-sm font-semibold leading-7 text-tertiary">{{ recitation.latin }}</p>
                          <p class="mt-3 border-t border-outline-variant/60 pt-3 text-sm leading-7 text-on-surface-variant">
                            <span class="font-semibold text-on-surface">Meali:</span>
                            {{ recitation.meaning }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </section>

              <div v-if="!visibleUnits.length" class="rounded-[24px] bg-surface-container-low p-8 text-center">
                <h4 class="font-display text-2xl font-bold text-primary">Bu filtreyle sonuç bulunamadı</h4>
                <p class="mt-2 text-sm leading-7 text-on-surface-variant">Arama kelimesini sadeleştir veya konu filtresini “Tümü” yap.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="ozel-namazlar" class="py-section-gap">
      <div class="container-shell">
        <div class="mb-10 max-w-3xl">
          <p class="section-kicker text-sm font-semibold">Özel namazlar</p>
          <h2 class="mt-3 font-display text-3xl font-bold text-tertiary md:text-5xl">Teravih ve bayram namazları</h2>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article v-for="special in specialPrayers" :key="special.name" class="rounded-[28px] border border-outline-variant/55 bg-surface-container-lowest p-6 shadow-manuscript md:p-8">
            <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ special.kind }}</p>
            <h3 class="mt-2 font-display text-3xl font-bold text-primary">{{ special.name }}</h3>
            <p class="mt-4 text-base leading-8 text-on-surface-variant">{{ special.summary }}</p>
            <ol class="mt-6 space-y-4">
              <li v-for="(step, index) in special.steps" :key="step" class="flex gap-4">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">{{ index + 1 }}</span>
                <p class="pt-1 text-sm leading-7 text-on-surface-variant">{{ step }}</p>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <section id="dualar" class="bg-surface-container-low py-section-gap">
      <div class="container-shell">
        <div class="mb-10 max-w-3xl">
          <p class="section-kicker text-sm font-semibold">Namaz duaları</p>
          <h2 class="mt-3 font-display text-3xl font-bold text-tertiary md:text-5xl">Oturuşta ve namaz içinde okunan temel dualar</h2>
          <p class="mt-4 text-base leading-8 text-on-surface-variant">
            Dualar Arapça metin, okunuş ve kısa meal ile birlikte verildi. Ezberlerken küçük parçalara ayırmak daha kalıcı olur.
          </p>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article v-for="dua in duas" :key="dua.title" class="flex min-h-[360px] flex-col rounded-[24px] border border-outline-variant/55 bg-surface-container-lowest p-6 shadow-manuscript md:p-8">
            <div class="flex items-start justify-between gap-4 border-b border-outline-variant/60 pb-5">
              <div>
                <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ dua.place }}</p>
                <h3 class="mt-1 font-display text-2xl font-bold text-primary">{{ dua.title }}</h3>
              </div>
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H11v16H6.5A2.5 2.5 0 0 0 4 22V6.5ZM20 6.5A2.5 2.5 0 0 0 17.5 4H13v16h4.5A2.5 2.5 0 0 1 20 22V6.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div class="flex flex-1 flex-col pt-6">
              <p class="font-serif text-2xl leading-[2.1] text-primary md:text-3xl" dir="rtl" lang="ar">{{ dua.arabic }}</p>
              <p class="mt-5 text-sm font-semibold leading-7 text-tertiary">{{ dua.latin }}</p>
              <p class="mt-auto border-t border-outline-variant/60 pt-4 text-sm leading-7 text-on-surface-variant">
                <span class="font-semibold text-on-surface">Meali:</span>
                {{ dua.meaning }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  path: '/namaz'
})

useSeoMeta({
  title: 'Namaz Öğren',
  description: 'Sabah, öğle, ikindi, akşam, yatsı, teravih ve bayram namazlarını adım adım öğren.'
})

const quickLinks = [
  { label: 'Temel akış', href: '#temel-akis' },
  { label: 'Vakit namazları', href: '#vakitler' },
  { label: 'Özel namazlar', href: '#ozel-namazlar' },
  { label: 'Namaz duaları', href: '#dualar' }
]

const activeSection = ref(quickLinks[0]?.href.slice(1) ?? 'temel-akis')

function updateActiveSection() {
  const sections = quickLinks
    .map((item) => document.getElementById(item.href.slice(1)))
    .filter((section): section is HTMLElement => Boolean(section))

  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 160)
    .at(-1)

  activeSection.value = current?.id ?? sections[0]?.id ?? activeSection.value
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', updateActiveSection, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSection)
})

const preparations = [
  { title: 'Abdest ve temizlik', body: 'Namaza başlamadan önce abdest alınır. Beden, elbise ve namaz kılınacak yerin temiz olmasına dikkat edilir.' },
  { title: 'Vakit ve kıble', body: 'Kılınacak namazın vaktinin girdiği kontrol edilir. Ardından Kâbe yönüne dönülerek namaz için duruş hazırlanır.' },
  { title: 'Niyet ve sakin başlangıç', body: 'Hangi namazın kılınacağı kalben bilinir. Acele etmeden, okunacak bölümleri takip edecek şekilde namaza başlanır.' }
]

const rakahFlow = [
  { title: 'Tekbir ve kıyam', body: 'Niyet edilir, eller kaldırılır ve "Allahu Ekber" denilerek başlanır. Ayakta Sübhaneke, Fatiha ve bir sure veya ayetler okunur.' },
  { title: 'Rükû, doğrulma ve secdeler', body: 'Rükûda "Sübhane Rabbiyel Azîm" denir. Doğrulup hamd söylenir, ardından iki secde yapılır.' },
  { title: 'Oturuş ve selam', body: 'Son oturuşta Ettehiyyatü, Salli, Barik ve Rabbena duaları okunur. Önce sağa, sonra sola selam verilir.' }
]

const prayerTexts = {
  takbir: {
    title: 'Tekbir',
    arabic: 'اللّٰهُ أَكْبَرُ',
    latin: 'Allahu Ekber',
    meaning: 'Allah en büyüktür.'
  },
  subhaneke: {
    title: 'Sübhaneke',
    arabic: 'سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ',
    latin: 'Subhanekallahumme ve bihamdik. Ve tebarekesmuk. Ve teala cedduk. Ve la ilahe gayruk.',
    meaning: 'Allah’ım, seni noksan sıfatlardan tenzih eder ve sana hamd ederim. İsmin mübarektir, şanın yücedir. Senden başka ilah yoktur.'
  },
  fatiha: {
    title: 'Fatiha suresi',
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ. اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ. اَلرَّحْمٰنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِينُ. اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ اَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    latin: 'Bismillahirrahmanirrahim. Elhamdulillahi rabbil alemin. Errahmanirrahim. Maliki yevmiddin. İyyake na’budu ve iyyake nesta’in. İhdinas sıratal mustakim. Sıratallezine en’amte aleyhim gayril mağdubi aleyhim veled dallin.',
    meaning: 'Rahman ve Rahim olan Allah’ın adıyla. Hamd alemlerin Rabbi Allah’a mahsustur. Yalnız sana kulluk eder, yalnız senden yardım dileriz. Bizi dosdoğru yola ilet.'
  },
  asr: {
    title: 'Zamm-ı sure örneği: Asr suresi',
    arabic: 'وَالْعَصْرِ. اِنَّ الْاِنْسَانَ لَفِي خُسْرٍ. اِلَّا الَّذِينَ اٰمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    latin: 'Vel asr. İnnel insane lefi husr. İllellezine amenu ve amilus salihati ve tevasav bil hakkı ve tevasav bis sabr.',
    meaning: 'Asra yemin olsun ki insan gerçekten ziyandadır. Ancak iman eden, salih amel işleyen, birbirine hakkı ve sabrı tavsiye edenler bunun dışındadır.'
  },
  ruku: {
    title: 'Rükû tesbihi',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    latin: 'Subhane Rabbiyel Azim',
    meaning: 'Yüce Rabbimi noksan sıfatlardan tenzih ederim.'
  },
  sajdah: {
    title: 'Secde tesbihi',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    latin: 'Subhane Rabbiyel A’la',
    meaning: 'En yüce Rabbimi noksan sıfatlardan tenzih ederim.'
  },
  tashahhud: {
    title: 'Ettehiyyatü',
    arabic: 'اَلتَّحِيَّاتُ لِلّٰهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللّٰهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    latin: 'Ettehiyyatu lillahi vessalavatu vettayyibat. Esselamu aleyke eyyuhen nebiyyu ve rahmetullahi ve berekatuh. Esselamu aleyna ve ala ibadillahis salihin. Eşhedu en la ilahe illallah ve eşhedu enne Muhammeden abduhu ve resuluh.',
    meaning: 'Bütün hürmetler, dualar ve güzel sözler Allah’a mahsustur. Selam, rahmet ve bereket sana olsun ey Nebi. Selam bize ve Allah’ın salih kullarına olsun.'
  },
  salli: {
    title: 'Salli',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allahumme salli ala Muhammedin ve ala ali Muhammed. Kema salleyte ala İbrahime ve ala ali İbrahim. İnneke hamidun mecid.',
    meaning: 'Allah’ım, İbrahim’e ve İbrahim’in ailesine rahmet ettiğin gibi Muhammed’e ve Muhammed’in ailesine de rahmet et.'
  },
  barik: {
    title: 'Barik',
    arabic: 'اَللّٰهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allahumme barik ala Muhammedin ve ala ali Muhammed. Kema barekte ala İbrahime ve ala ali İbrahim. İnneke hamidun mecid.',
    meaning: 'Allah’ım, İbrahim’e ve İbrahim’in ailesine bereket verdiğin gibi Muhammed’e ve Muhammed’in ailesine de bereket ver.'
  },
  rabbena: {
    title: 'Rabbena duaları',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    latin: 'Rabbena atina fid-dunya haseneten ve fil-ahireti haseneten ve kına azaben-nar. Rabbenağfir li ve li-valideyye ve lil-mu’minine yevme yekumul hisab.',
    meaning: 'Rabbimiz, bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru. Rabbimiz, hesabın görüleceği gün beni, anne babamı ve müminleri bağışla.'
  },
  kunut: {
    title: 'Kunut duaları',
    arabic: 'اَللّٰهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ، وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ، وَنَتَوَكَّلُ عَلَيْكَ',
    latin: 'Allahumme inna nesteinuke ve nestağfiruke ve nestehdik. Ve nu’minu bike ve netubu ileyk. Ve netevekkelu aleyk.',
    meaning: 'Allah’ım, senden yardım, bağışlanma ve hidayet dileriz. Sana inanır, sana tövbe eder ve sana güveniriz.'
  },
  salam: {
    title: 'Selam',
    arabic: 'اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ',
    latin: 'Esselamu aleykum ve rahmetullah',
    meaning: 'Allah’ın selamı ve rahmeti üzerinize olsun.'
  }
}

const twoRakatSteps = [
  { title: 'Niyet ve başlangıç tekbiri', body: 'Kalben hangi namazın kılınacağı belirlenir. Eller kaldırılır ve tekbir alınır.', recitations: [prayerTexts.takbir] },
  { title: 'Birinci rekât: Kıyam', body: 'Ayakta Sübhaneke okunur. Ardından Fatiha ve zamm-ı sure olarak örnek Asr suresi okunur.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr] },
  { title: 'Birinci rekât: Rükû ve secdeler', body: 'Allahu Ekber denilerek rükûya gidilir. Rükûdan doğrulup iki secde yapılır.', recitations: [prayerTexts.ruku, prayerTexts.sajdah] },
  { title: 'İkinci rekât: Kıyam', body: 'Ayağa kalkılır. Fatiha ve zamm-ı sure okunur.', recitations: [prayerTexts.fatiha, prayerTexts.asr] },
  { title: 'İkinci rekât: Rükû, secde ve son oturuş', body: 'Rükû ve iki secde tamamlanır. Son oturuşta Ettehiyyatü, Salli, Barik ve Rabbena duaları okunur.', recitations: [prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik, prayerTexts.rabbena] },
  { title: 'Selam', body: 'Önce sağa, sonra sola selam verilerek namaz tamamlanır.', recitations: [prayerTexts.salam] }
]

const fourRakatFardSteps = [
  { title: 'Niyet ve başlangıç tekbiri', body: 'Farza niyet edilir. Eller kaldırılır ve tekbir alınır.', recitations: [prayerTexts.takbir] },
  { title: 'Birinci rekât', body: 'Sübhaneke, Fatiha ve zamm-ı sure okunur; rükû ve iki secde yapılır.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah] },
  { title: 'İkinci rekât ve ilk oturuş', body: 'Fatiha ve zamm-ı sure okunur. Rükû ve secdelerden sonra oturulur, sadece Ettehiyyatü okunur.', recitations: [prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud] },
  { title: 'Üçüncü ve dördüncü rekât', body: 'Ayağa kalkılır. Farzların üçüncü ve dördüncü rekâtında Fatiha okunur; rükû ve secdeler yapılır.', recitations: [prayerTexts.fatiha, prayerTexts.ruku, prayerTexts.sajdah] },
  { title: 'Son oturuş ve selam', body: 'Son oturuşta Ettehiyyatü, Salli, Barik ve Rabbena okunur. Sağa ve sola selam verilir.', recitations: [prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik, prayerTexts.rabbena, prayerTexts.salam] }
]

const fourRakatSunnahSteps = [
  { title: 'Niyet ve başlangıç tekbiri', body: 'Sünnete niyet edilir. Eller kaldırılır ve tekbir alınır.', recitations: [prayerTexts.takbir] },
  { title: 'İlk iki rekât', body: 'Birinci rekâtta Sübhaneke, Fatiha ve zamm-ı sure; ikinci rekâtta Fatiha ve zamm-ı sure okunur. İkinci rekâttan sonra oturulur.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud] },
  { title: 'Üçüncü ve dördüncü rekât', body: 'Üçüncü ve dördüncü rekâtlarda Fatiha ve zamm-ı sure okunur. Rükû ve secdeler tamamlanır.', recitations: [prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah] },
  { title: 'Son oturuş ve selam', body: 'Ettehiyyatü, Salli, Barik ve Rabbena duaları okunur. Selam verilerek namaz tamamlanır.', recitations: [prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik, prayerTexts.rabbena, prayerTexts.salam] }
]

const fourRakatGhayrMuakkadSunnahSteps = [
  { title: 'Niyet ve başlangıç tekbiri', body: 'Sünnete niyet edilir. Eller kaldırılır ve tekbir alınır.', recitations: [prayerTexts.takbir] },
  { title: 'İlk iki rekât ve ilk oturuş', body: 'İlk iki rekât normal şekilde kılınır. İlk oturuşta Ettehiyyatü ile birlikte Salli ve Barik de okunur.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik] },
  { title: 'Üçüncü rekâta kalkış', body: 'Üçüncü rekâta kalkınca yeniden Sübhaneke okunur. Fatiha ve zamm-ı sure ile devam edilir.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr] },
  { title: 'Dördüncü rekât, son oturuş ve selam', body: 'Dördüncü rekât tamamlanır. Son oturuşta Ettehiyyatü, Salli, Barik ve Rabbena okunup selam verilir.', recitations: [prayerTexts.fatiha, prayerTexts.asr, prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik, prayerTexts.rabbena, prayerTexts.salam] }
]

const maghribFardSteps = [
  { title: 'Niyet ve başlangıç tekbiri', body: 'Akşam namazının farzına niyet edilir ve tekbir alınır.', recitations: [prayerTexts.takbir] },
  { title: 'İlk iki rekât ve ilk oturuş', body: 'İlk iki rekâtta Fatiha ve zamm-ı sure okunur. İkinci rekâttan sonra oturulup Ettehiyyatü okunur.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud] },
  { title: 'Üçüncü rekât', body: 'Üçüncü rekâtta Fatiha okunur. Rükû ve secdeler tamamlanır.', recitations: [prayerTexts.fatiha, prayerTexts.ruku, prayerTexts.sajdah] },
  { title: 'Son oturuş ve selam', body: 'Ettehiyyatü, Salli, Barik ve Rabbena duaları okunur. Sağa ve sola selam verilir.', recitations: [prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik, prayerTexts.rabbena, prayerTexts.salam] }
]

const witrSteps = [
  { title: 'Niyet ve başlangıç tekbiri', body: 'Vitir namazına niyet edilir ve tekbir alınır.', recitations: [prayerTexts.takbir] },
  { title: 'İlk iki rekât', body: 'İlk iki rekât iki rekâtlı namaz gibi kılınır. İkinci rekât sonunda oturulup Ettehiyyatü okunur.', recitations: [prayerTexts.subhaneke, prayerTexts.fatiha, prayerTexts.asr, prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud] },
  { title: 'Üçüncü rekât ve Kunut', body: 'Üçüncü rekâtta Fatiha ve zamm-ı sure okunur. Sonra eller kaldırılıp tekbir alınır ve Kunut duaları okunur.', recitations: [prayerTexts.fatiha, prayerTexts.asr, prayerTexts.takbir, prayerTexts.kunut] },
  { title: 'Rükû, secde, son oturuş ve selam', body: 'Kunut dualarından sonra rükû ve secdeler yapılır. Son oturuşta dualar okunup selam verilir.', recitations: [prayerTexts.ruku, prayerTexts.sajdah, prayerTexts.tashahhud, prayerTexts.salli, prayerTexts.barik, prayerTexts.rabbena, prayerTexts.salam] }
]

const dailyPrayers = [
  {
    id: 'sabah',
    kind: '2 sünnet + 2 farz',
    name: 'Sabah namazı',
    summary: 'Toplam 4 rekâttır. Önce iki rekât sünnet, ardından iki rekât farz kılınır.',
    units: [
      { title: 'Sabah namazının sünneti nasıl kılınır?', rakats: '2 rekât sünnet', description: 'Her iki rekâtta Fatiha’dan sonra zamm-ı sure okunur. Son oturuşla tamamlanır.', steps: twoRakatSteps },
      { title: 'Sabah namazının farzı nasıl kılınır?', rakats: '2 rekât farz', description: 'Sünnet gibi iki rekât kılınır. Cemaatle kılınıyorsa imama uyulur.', steps: twoRakatSteps }
    ]
  },
  {
    id: 'ogle',
    kind: '4 sünnet + 4 farz + 2 sünnet',
    name: 'Öğle namazı',
    summary: 'Toplam 10 rekâttır. İlk sünnet, farz ve son sünnet olarak üç bölümden oluşur.',
    units: [
      { title: 'Öğlenin ilk sünneti nasıl kılınır?', rakats: '4 rekât sünnet', description: 'Dört rekât kılınır. İkinci rekât sonunda ilk oturuş, dördüncü rekât sonunda son oturuş yapılır.', steps: fourRakatSunnahSteps },
      { title: 'Öğlenin farzı nasıl kılınır?', rakats: '4 rekât farz', description: 'İlk iki rekâtta Fatiha ve zamm-ı sure, son iki rekâtta Fatiha okunur.', steps: fourRakatFardSteps },
      { title: 'Öğlenin son sünneti nasıl kılınır?', rakats: '2 rekât sünnet', description: 'İki rekât olarak kılınır. Son oturuşta dualar okunur ve selam verilir.', steps: twoRakatSteps }
    ]
  },
  {
    id: 'ikindi',
    kind: '4 sünnet + 4 farz',
    name: 'İkindi namazı',
    summary: 'Toplam 8 rekâttır. Dört rekât sünnet ve dört rekât farzdan oluşur.',
    units: [
      { title: 'İkindinin sünneti nasıl kılınır?', rakats: '4 rekât sünnet', description: 'Gayr-i müekked sünnettir. İlk oturuşta Ettehiyyatü, Salli ve Barik okunur; üçüncü rekâta Sübhaneke ile başlanır.', steps: fourRakatGhayrMuakkadSunnahSteps },
      { title: 'İkindinin farzı nasıl kılınır?', rakats: '4 rekât farz', description: 'Öğlenin farzı gibi kılınır. İlk iki rekâtta zamm-ı sure, son iki rekâtta Fatiha okunur.', steps: fourRakatFardSteps }
    ]
  },
  {
    id: 'aksam',
    kind: '3 farz + 2 sünnet',
    name: 'Akşam namazı',
    summary: 'Toplam 5 rekâttır. Önce üç rekât farz, ardından iki rekât sünnet kılınır.',
    units: [
      { title: 'Akşamın farzı nasıl kılınır?', rakats: '3 rekât farz', description: 'İlk iki rekâttan sonra oturulur. Üçüncü rekâttan sonra son oturuş ve selam yapılır.', steps: maghribFardSteps },
      { title: 'Akşamın sünneti nasıl kılınır?', rakats: '2 rekât sünnet', description: 'İki rekât olarak kılınır. Son oturuşta dualar okunur ve selam verilir.', steps: twoRakatSteps }
    ]
  },
  {
    id: 'yatsi',
    kind: '4 sünnet + 4 farz + 2 sünnet + 3 vitir',
    name: 'Yatsı namazı',
    summary: 'Toplam 13 rekâttır. İlk sünnet, farz, son sünnet ve vitir namazı birlikte öğrenilir.',
    units: [
      { title: 'Yatsının ilk sünneti nasıl kılınır?', rakats: '4 rekât sünnet', description: 'İkindi sünneti gibi kılınır. İlk oturuşta Salli ve Barik okunur, üçüncü rekâta Sübhaneke ile başlanır.', steps: fourRakatGhayrMuakkadSunnahSteps },
      { title: 'Yatsının farzı nasıl kılınır?', rakats: '4 rekât farz', description: 'Öğle ve ikindi farzı gibi dört rekât kılınır.', steps: fourRakatFardSteps },
      { title: 'Yatsının son sünneti nasıl kılınır?', rakats: '2 rekât sünnet', description: 'İki rekât olarak kılınır. Son oturuşla tamamlanır.', steps: twoRakatSteps },
      { title: 'Vitir namazı nasıl kılınır?', rakats: '3 rekât vitir', description: 'Üçüncü rekâtta Fatiha ve zamm-ı sureden sonra tekbir alınır, Kunut duaları okunur.', steps: witrSteps }
    ]
  }
]

const route = useRoute()
function routePrayer(value: unknown) {
  return dailyPrayers.find(prayer => prayer.id === value)?.id
}
const selectedPrayerId = ref(routePrayer(route.query.namaz) ?? dailyPrayers[0]?.id ?? 'sabah')
watch(() => route.query.namaz, (value) => {
  const id = routePrayer(value)
  if (id) selectedPrayerId.value = id
})
const selectedPrayer = computed(() => dailyPrayers.find((prayer) => prayer.id === selectedPrayerId.value) ?? dailyPrayers[0])
const prayerSearch = ref('')
const openUnitDetails = ref<string[]>([])
const activeTopic = ref('all')

const topicFilters = [
  { id: 'all', label: 'Tümü', tokens: [] },
  { id: 'niyet', label: 'Niyet', tokens: ['niyet', 'tekbir'] },
  { id: 'kiyam', label: 'Kıyam', tokens: ['kıyam', 'fatiha', 'sübhaneke', 'sure', 'asr'] },
  { id: 'ruku', label: 'Rükû/Secde', tokens: ['rükû', 'secde', 'tesbih'] },
  { id: 'oturus', label: 'Oturuş', tokens: ['oturuş', 'ettehiyyatü', 'salli', 'barik', 'rabbena'] },
  { id: 'dua', label: 'Dualar', tokens: ['dua', 'sübhaneke', 'fatiha', 'ettehiyyatü', 'salli', 'barik', 'rabbena', 'kunut'] },
  { id: 'selam', label: 'Selam', tokens: ['selam'] }
]

const duaShortcuts = ['Sübhaneke', 'Fatiha', 'Asr', 'Ettehiyyatü', 'Salli', 'Barik', 'Rabbena', 'Kunut']

watch(selectedPrayerId, () => {
  openUnitDetails.value = []
})

const visibleUnits = computed(() => {
  return (selectedPrayer.value?.units ?? [])
    .map((unit) => ({
      ...unit,
      visibleSteps: unit.steps.filter((step) => matchesStep(step))
    }))
    .filter((unit) => unit.visibleSteps.length)
})

function jumpToTerm(term: string) {
  prayerSearch.value = term
  activeTopic.value = 'dua'
  openUnitDetails.value = (selectedPrayer.value?.units ?? []).map((unit) => unit.title)
}

function toggleUnitDetails(title: string) {
  openUnitDetails.value = isUnitDetailsOpen(title)
    ? openUnitDetails.value.filter((item) => item !== title)
    : [...openUnitDetails.value, title]
}

function isUnitDetailsOpen(title: string) {
  return openUnitDetails.value.includes(title)
}

function matchesStep(step: { title: string; body: string; recitations?: Array<{ title: string; latin: string; meaning: string }> }) {
  const haystack = normalizeText([
    step.title,
    step.body,
    ...(step.recitations ?? []).flatMap((recitation) => [
      recitation.title,
      recitation.latin,
      recitation.meaning
    ])
  ].join(' '))

  const active = topicFilters.find((topic) => topic.id === activeTopic.value)
  const topicMatches = !active?.tokens.length || active.tokens.some((token) => haystack.includes(normalizeText(token)))
  const searchTerm = normalizeText(prayerSearch.value.trim())
  const searchMatches = !searchTerm || haystack.includes(searchTerm)

  return topicMatches && searchMatches
}

function normalizeText(value: string) {
  return value.toLocaleLowerCase('tr-TR')
}

const specialPrayers = [
  {
    kind: 'Ramazan geceleri',
    name: 'Teravih namazı',
    summary: 'Teravih ramazan ayında yatsı namazından sonra kılınan sünnet namazdır. Yaygın uygulamada 20 rekât olarak, ikişer rekât halinde kılınır.',
    steps: [
      'Yatsı namazının farzı ve son sünneti kılındıktan sonra teravihe niyet edilir.',
      'İkişer rekât halinde kılınır. Her iki rekâtta selam verilir.',
      'Her rekâtta Fatiha’dan sonra sure veya ayetler okunur.',
      'Dört rekâtta bir kısa ara verilmesi geleneksel uygulamalarda görülebilir.',
      'Teravih tamamlandıktan sonra vitir namazı kılınır.'
    ]
  },
  {
    kind: 'Ramazan ve Kurban Bayramı',
    name: 'Bayram namazı',
    summary: 'Bayram namazı iki rekâttır ve cemaatle kılınır. Diğer namazlardan farkı, ilave tekbirlerin bulunmasıdır.',
    steps: [
      'İmamla birlikte bayram namazına niyet edilir.',
      'Birinci rekâtta başlangıç tekbirinden sonra Sübhaneke okunur, ardından üç ilave tekbir alınır.',
      'İmam Fatiha ve sure okur; rükû ve secdeler yapılır.',
      'İkinci rekâtta imam Fatiha ve sure okur, ardından üç ilave tekbir alınır.',
      'Dördüncü tekbirle rükûya gidilir. Secdelerden sonra oturulur, dualar okunur ve selam verilir.'
    ]
  }
]

const duas = [
  {
    place: 'Namaza başlangıç',
    title: 'Sübhaneke',
    arabic: 'سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ',
    latin: 'Subhanekallahumme ve bihamdik. Ve tebarekesmuk. Ve teala cedduk. Ve la ilahe gayruk.',
    meaning: 'Allah’ım, seni noksan sıfatlardan tenzih eder ve sana hamd ederim. İsmin mübarektir, şanın yücedir. Senden başka ilah yoktur.'
  },
  {
    place: 'Oturuş',
    title: 'Ettehiyyatü',
    arabic: 'اَلتَّحِيَّاتُ لِلّٰهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللّٰهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    latin: 'Ettehiyyatu lillahi vessalavatu vettayyibat. Esselamu aleyke eyyuhen nebiyyu ve rahmetullahi ve berekatuh. Esselamu aleyna ve ala ibadillahis salihin. Eşhedu en la ilahe illallah ve eşhedu enne Muhammeden abduhu ve resuluh.',
    meaning: 'Bütün hürmetler, dualar ve güzel sözler Allah’a mahsustur. Selam, rahmet ve bereket sana olsun ey Nebi. Selam bize ve Allah’ın salih kullarına olsun. Şahitlik ederim ki Allah’tan başka ilah yoktur; yine şahitlik ederim ki Muhammed O’nun kulu ve elçisidir.'
  },
  {
    place: 'Son oturuş',
    title: 'Salli',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allahumme salli ala Muhammedin ve ala ali Muhammed. Kema salleyte ala İbrahime ve ala ali İbrahim. İnneke hamidun mecid.',
    meaning: 'Allah’ım, İbrahim’e ve İbrahim’in ailesine rahmet ettiğin gibi Muhammed’e ve Muhammed’in ailesine de rahmet et. Şüphesiz sen övülmeye layık ve şanı yüce olansın.'
  },
  {
    place: 'Son oturuş',
    title: 'Barik',
    arabic: 'اَللّٰهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allahumme barik ala Muhammedin ve ala ali Muhammed. Kema barekte ala İbrahime ve ala ali İbrahim. İnneke hamidun mecid.',
    meaning: 'Allah’ım, İbrahim’e ve İbrahim’in ailesine bereket verdiğin gibi Muhammed’e ve Muhammed’in ailesine de bereket ver. Şüphesiz sen övülmeye layık ve şanı yüce olansın.'
  },
  {
    place: 'Son oturuş',
    title: 'Rabbena duaları',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    latin: 'Rabbena atina fid-dunya haseneten ve fil-ahireti haseneten ve kına azaben-nar. Rabbenağfir li ve li-valideyye ve lil-mu’minine yevme yekumul hisab.',
    meaning: 'Rabbimiz, bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru. Rabbimiz, hesabın görüleceği gün beni, anne babamı ve müminleri bağışla.'
  },
  {
    place: 'Vitir namazı',
    title: 'Kunut duaları',
    arabic: 'اَللّٰهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ، وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ، وَنَتَوَكَّلُ عَلَيْكَ، وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ، نَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ',
    latin: 'Allahumme inna nesteinuke ve nestağfiruke ve nestehdik. Ve nu’minu bike ve netubu ileyk. Ve netevekkelu aleyk. Ve nusni aleykel hayra kullehu. Neşkuruke ve la nekfuruk. Ve nahleu ve netruku men yefcuruk.',
    meaning: 'Allah’ım, senden yardım, bağışlanma ve hidayet dileriz. Sana inanır, sana tövbe eder ve sana güveniriz. Bütün hayırlarla seni överiz; sana şükreder, nankörlük etmeyiz. Sana karşı gelenlerden uzak dururuz.'
  }
]
</script>
