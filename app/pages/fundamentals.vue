<template>
  <main class="overflow-x-hidden bg-background text-on-surface">
    <section class="relative overflow-hidden border-b border-outline-variant/35 bg-[radial-gradient(circle_at_88%_16%,rgba(254,214,91,0.22),transparent_28%),radial-gradient(circle_at_8%_82%,rgba(166,242,209,0.24),transparent_30%),linear-gradient(180deg,#edf8f2_0%,#f9fbf9_100%)]">
      <div class="container-shell flex min-h-[540px] items-center justify-center py-20 lg:py-24">
        <div class="relative z-10 mx-auto max-w-4xl text-center">
          <p class="inline-flex rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary shadow-sm">Temel bilgiler · 6 bölüm</p>
          <h1 class="mt-6 font-display text-5xl font-bold leading-[0.94] text-primary sm:text-6xl lg:text-7xl">32 Farz</h1>
          <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg">
            İman, İslam, namaz ve temizlikle ilgili temel farzları tek bir öğrenme akışında;
            kısa açıklamalar ve uygulama görselleriyle kavra.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#iman" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-on-primary shadow-manuscript-raised transition hover:-translate-y-0.5 hover:bg-primary-container">
              Öğrenmeye başla <span aria-hidden="true">↓</span>
            </a>
            <a href="#teyemmum" class="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/20 bg-white/75 px-6 text-sm font-bold text-primary transition hover:border-primary hover:bg-white">Teyemmümü gör</a>
          </div>
        </div>
      </div>
    </section>

    <nav class="sticky top-14 z-40 border-b border-outline-variant/40 bg-surface/95 backdrop-blur-xl" aria-label="32 Farz bölüm gezinmesi">
      <div class="container-shell overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex min-w-max items-center gap-2 py-2.5">
          <a v-for="link in quickLinks" :key="link.href" :href="link.href" :aria-current="activeSection === link.id ? 'location' : undefined" :class="['rounded-full px-4 py-2 text-xs font-bold no-underline transition', activeSection === link.id ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary']">
            {{ link.label }}
          </a>
        </div>
      </div>
    </nav>

    <section id="iman" class="scroll-mt-32 py-20 md:py-28">
      <div class="container-shell">
        <div class="section-heading">
          <div>
            <p class="section-kicker text-xs font-extrabold uppercase tracking-[0.14em]">01 · İnanç</p>
            <h2 class="section-title">İmanın Şartları</h2>
            <p class="section-description">Bir Müslümanın inanması gereken altı temel esası ve her birinin ne anlama geldiğini öğren.</p>
          </div>
          <span class="section-count">6 farz</span>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="(item, index) in faithConditions" :key="item.title" class="farz-card group">
            <div class="flex items-center justify-between">
              <span class="grid size-11 place-items-center rounded-xl bg-primary/[0.08] text-xl text-primary" aria-hidden="true">{{ item.icon }}</span>
              <span class="text-xs font-black tracking-[0.18em] text-secondary">{{ pad(index + 1) }}</span>
            </div>
            <h3 class="mt-6 font-display text-2xl font-bold leading-tight text-on-surface">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-on-surface-variant">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="islam" class="scroll-mt-32 border-y border-outline-variant/30 bg-surface-container-low py-20 md:py-28">
      <div class="container-shell">
        <div class="section-heading">
          <div>
            <p class="section-kicker text-xs font-extrabold uppercase tracking-[0.14em]">02 · Teslimiyet</p>
            <h2 class="section-title">İslam'ın Şartları</h2>
            <p class="section-description">İnancı günlük hayata taşıyan beş temel ibadeti ve sorumluluğu tanı.</p>
          </div>
          <span class="section-count">5 farz</span>
        </div>
        <div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="tablist" aria-label="İslam'ın şartları">
          <button v-for="(item, index) in islamConditions" :key="item.id" type="button" role="tab" :aria-selected="selectedIslamConditionId === item.id" :class="['flex min-h-20 items-center gap-3 rounded-2xl border bg-white p-4 text-left text-primary transition hover:-translate-y-0.5 hover:border-primary', selectedIslamConditionId === item.id ? 'border-primary shadow-manuscript-raised' : 'border-outline-variant/40']" @click="selectedIslamConditionId = item.id">
            <span class="grid size-8 shrink-0 place-items-center rounded-full bg-secondary-container text-[11px] font-black text-on-secondary-container">{{ pad(index + 1) }}</span>
            <strong class="font-display text-base leading-tight">{{ item.title }}</strong>
          </button>
        </div>
        <article class="mt-4 rounded-3xl border border-primary/15 bg-white p-6 shadow-manuscript sm:p-9">
          <template v-if="selectedIslamConditionId === 'shahada'">
            <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-secondary">İslam'a giriş ifadesi</p>
                <h3 class="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{{ shahada.title }}</h3>
                <p class="mt-4 text-sm leading-7 text-on-surface-variant">{{ shahada.description }}</p>
                <div class="mt-6 grid gap-4 text-sm leading-6">
                  <p><strong class="text-primary">Okunuşu:</strong> {{ shahada.latin }}</p>
                  <p><strong class="text-primary">Anlamı:</strong> {{ shahada.meaning }}</p>
                </div>
              </div>
              <p class="rounded-2xl bg-[#f1f7f3] p-6 text-right font-['Amiri_Quran',Amiri,serif] text-[clamp(28px,3vw,42px)] leading-[1.75] text-[#082c23]" lang="ar" dir="rtl">{{ shahada.arabic }}</p>
            </div>
          </template>
          <template v-else>
            <p class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-secondary">{{ pad(selectedIslamConditionIndex + 1) }} · İslam'ın şartlarından biri</p>
            <h3 class="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{{ selectedIslamCondition.title }}</h3>
            <p class="mt-4 max-w-3xl text-base leading-8 text-on-surface-variant">{{ selectedIslamCondition.detail }}</p>
          </template>
        </article>
      </div>
    </section>

    <section id="namaz" class="scroll-mt-32 py-20 md:py-28">
      <div class="container-shell">
        <div class="section-heading">
          <div>
            <p class="section-kicker text-xs font-extrabold uppercase tracking-[0.14em]">03 · İbadet</p>
            <h2 class="section-title">Namazın Farzları</h2>
            <p class="section-description">Namaza başlamadan önceki altı şartı ve namazın içindeki altı rüknü birlikte öğren.</p>
          </div>
          <span class="section-count">12 farz</span>
        </div>
        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <article v-for="(group, groupIndex) in prayerGroups" :key="group.title" class="rounded-3xl border border-outline-variant/40 bg-white p-5 shadow-manuscript sm:p-8">
            <div class="flex items-center gap-4 border-b border-outline-variant/30 pb-6">
              <span :class="['grid size-11 shrink-0 place-items-center rounded-full font-black text-white', groupIndex === 0 ? 'bg-primary' : 'bg-secondary']">{{ groupIndex + 1 }}</span>
              <div>
                <h3 class="font-display text-2xl font-bold">{{ group.title }}</h3>
                <p class="mt-1 text-sm text-on-surface-variant">{{ group.description }}</p>
              </div>
            </div>
            <ol class="mt-5 grid list-none gap-3 p-0">
              <li v-for="(item, index) in group.items" :key="item.title" class="flex items-start gap-3 rounded-2xl bg-surface-container-low p-4">
                <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-[11px] font-black text-primary shadow-sm">{{ pad(index + 1) }}</span>
                <div><strong class="text-sm text-on-surface">{{ item.title }}</strong><p class="mt-1 text-xs leading-5 text-on-surface-variant">{{ item.description }}</p></div>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <section id="abdest" class="scroll-mt-32 border-y border-outline-variant/30 bg-surface-container-low py-20 md:py-28">
      <div class="container-shell">
        <div class="section-heading">
          <div>
            <p class="section-kicker text-xs font-extrabold uppercase tracking-[0.14em]">04 · Su ile temizlik</p>
            <h2 class="section-title">Abdestin Farzları</h2>
            <p class="section-description">Namaz için gerekli temizliği tamamlayan dört temel uygulamayı doğru sırasıyla gör.</p>
          </div>
          <span class="section-count">4 farz</span>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article v-for="(item, index) in ablutionFards" :key="item.title" class="group overflow-hidden rounded-3xl border border-outline-variant/40 bg-white shadow-manuscript transition hover:-translate-y-1 hover:shadow-manuscript-raised">
            <div class="relative aspect-[4/3] overflow-hidden bg-primary/5">
              <img class="size-full object-cover transition duration-500 group-hover:scale-[1.03]" :src="item.image" :alt="item.alt" loading="lazy">
              <span class="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-primary text-sm font-black text-white shadow-lg">{{ index + 1 }}</span>
            </div>
            <div class="p-6"><h3 class="font-display text-xl font-bold text-primary">{{ item.title }}</h3><p class="mt-3 text-sm leading-6 text-on-surface-variant">{{ item.description }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section id="gusul" class="scroll-mt-32 py-20 md:py-28">
      <div class="container-shell">
        <div class="section-heading">
          <div>
            <p class="section-kicker text-xs font-extrabold uppercase tracking-[0.14em]">05 · Beden temizliği</p>
            <h2 class="section-title">Guslün Farzları</h2>
            <p class="section-description">Guslün geçerli olması için ağız, burun ve bütün bedenle ilgili üç zorunlu adımı öğren.</p>
          </div>
          <span class="section-count">3 farz</span>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article v-for="(item, index) in ghuslFards" :key="item.title" class="farz-card relative overflow-hidden">
            <span class="absolute -right-3 -top-7 font-display text-[110px] font-bold leading-none text-primary/[0.045]" aria-hidden="true">{{ index + 1 }}</span>
            <span class="grid size-11 place-items-center rounded-xl bg-primary text-sm font-black text-white">{{ pad(index + 1) }}</span>
            <h3 class="mt-6 font-display text-2xl font-bold text-primary">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-on-surface-variant">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="teyemmum" class="scroll-mt-32 border-y border-outline-variant/30 bg-[radial-gradient(circle_at_90%_8%,rgba(254,214,91,0.16),transparent_28%),linear-gradient(180deg,#f5f5f1_0%,#fafaf8_100%)] py-20 md:py-28">
      <div class="container-shell">
        <div class="section-heading">
          <div>
            <p class="section-kicker text-xs font-extrabold uppercase tracking-[0.14em]">06 · Su kullanılamadığında</p>
            <h2 class="section-title">Teyemmümün Farzları</h2>
            <p class="section-description">Su bulunmadığında veya kullanılamadığında yapılan teyemmümün iki farzını ve uygulama sırasını öğren.</p>
          </div>
          <span class="section-count">2 farz</span>
        </div>
        <div class="mt-10 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div class="rounded-3xl bg-primary p-6 text-white shadow-manuscript-raised sm:p-8">
            <p class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary-fixed">32 farz sayımındaki yeri</p>
            <ol class="mt-6 grid list-none gap-4 p-0">
              <li v-for="(item, index) in tayammumFards" :key="item.title" class="flex gap-4 rounded-2xl bg-white/[0.08] p-4">
                <span class="grid size-9 shrink-0 place-items-center rounded-full bg-secondary-container text-xs font-black text-on-secondary-container">{{ index + 1 }}</span>
                <div><strong class="text-base">{{ item.title }}</strong><p class="mt-1.5 text-sm leading-6 text-white/75">{{ item.description }}</p></div>
              </li>
            </ol>
            <div class="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs leading-6 text-white/75">
              <strong class="text-white">Neden aşağıda 3 kart var?</strong>
              <p class="mt-1">İkinci farzın içindeki iki darb ve iki mesh hareketini uygulamada daha anlaşılır göstermek için süreç üç görsel adıma ayrıldı.</p>
            </div>
          </div>
          <div class="rounded-3xl border border-secondary/15 bg-white p-6 shadow-manuscript sm:p-8">
            <p class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-secondary">Kısa kavramlar</p>
            <dl class="mt-5 grid gap-3">
              <div class="rounded-2xl bg-surface-container-low p-4"><dt class="font-display text-xl font-bold text-primary">Darb</dt><dd class="mt-2 text-sm leading-6 text-on-surface-variant">Açık elleri temiz toprak veya toprak cinsinden bir yüzeye dokundurup kaldırmaktır.</dd></div>
              <div class="rounded-2xl bg-surface-container-low p-4"><dt class="font-display text-xl font-bold text-primary">Mesh</dt><dd class="mt-2 text-sm leading-6 text-on-surface-variant">Toprağa dokundurulan elleri yüzün ve kolların üzerine sürmektir.</dd></div>
            </dl>
            <div class="mt-5 grid gap-3">
              <div class="rounded-2xl border border-primary/10 p-4">
                <strong class="text-sm text-primary">Ne zaman yapılır?</strong>
                <p class="mt-1.5 text-sm leading-6 text-on-surface-variant">Abdest veya gusül için su bulunmadığında ya da suyu kullanmak sağlık açısından mümkün olmadığında yapılır.</p>
              </div>
              <div class="rounded-2xl border border-primary/10 p-4">
                <strong class="text-sm text-primary">Hangi yüzey uygundur?</strong>
                <p class="mt-1.5 text-sm leading-6 text-on-surface-variant">Temiz toprak, kum, taş ve toprak cinsinden doğal yüzeyler kullanılabilir.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 grid gap-5 lg:grid-cols-3">
          <article v-for="(step, index) in tayammumSteps" :key="step.title" class="group overflow-hidden rounded-3xl border border-outline-variant/40 bg-white shadow-manuscript transition hover:-translate-y-1 hover:shadow-manuscript-raised">
            <div class="relative aspect-[4/3] overflow-hidden bg-secondary/5">
              <img class="size-full object-cover transition duration-500 group-hover:scale-[1.03]" :src="step.image" :alt="step.alt" loading="lazy">
              <span class="absolute left-4 top-4 rounded-full bg-[#735c00] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white shadow-lg">{{ step.label }}</span>
            </div>
            <div class="p-6"><p class="text-[11px] font-extrabold uppercase tracking-[0.12em] text-secondary">Adım {{ index + 1 }}</p><h3 class="mt-2 font-display text-2xl font-bold text-primary">{{ step.title }}</h3><p class="mt-3 text-sm leading-7 text-on-surface-variant">{{ step.description }}</p></div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ path: '/temel-bilgiler' })

type FaithItem = { title: string; description: string; icon: string }
type TextItem = { title: string; description: string }
type IslamCondition = TextItem & { id: string; detail: string }
type IllustratedItem = TextItem & { image: string; alt: string }
type TayammumStep = IllustratedItem & { label: string }

const activeSection = ref('iman')
const selectedIslamConditionId = ref('shahada')

const farzSummary = [
  { count: 6, label: 'İman', href: '#iman' },
  { count: 5, label: 'İslam', href: '#islam' },
  { count: 12, label: 'Namaz', href: '#namaz' },
  { count: 4, label: 'Abdest', href: '#abdest' },
  { count: 3, label: 'Gusül', href: '#gusul' },
  { count: 2, label: 'Teyemmüm', href: '#teyemmum' }
]

const quickLinks = farzSummary.map(item => ({ id: item.href.slice(1), label: `${item.label} · ${item.count}`, href: item.href }))

const faithConditions: FaithItem[] = [
  { title: "Allah'a İman", description: "Her şeyi yaratan, eşi ve benzeri olmayan tek ilahın varlığına ve birliğine inanmaktır.", icon: '✦' },
  { title: 'Meleklere İman', description: "Nurdan yaratılmış, Allah'ın emirlerinden çıkmayan manevi varlıklara inanmaktır.", icon: '✧' },
  { title: 'Kitaplara İman', description: "Allah'ın peygamberleri aracılığıyla insanlara gönderdiği ilahi kitaplara inanmaktır.", icon: '◇' },
  { title: 'Peygamberlere İman', description: "Allah'ın emirlerini insanlara tebliğ etmek için seçtiği elçilere inanmaktır.", icon: '◆' },
  { title: 'Ahiret Gününe İman', description: 'Dünya hayatından sonraki ebedi hayata ve hesap gününe inanmaktır.', icon: '⌛' },
  { title: 'Kader ve Kazaya İman', description: "Hayır ve şerrin Allah'ın takdiri ile olduğuna inanmaktır.", icon: '✺' }
]

const shahada = {
  title: 'Kelime-i Şehadet',
  description: "Allah'ın birliğini ve Hz. Muhammed'in O'nun kulu ve elçisi olduğunu ifade eden şahitlik sözüdür.",
  arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
  latin: 'Eşhedü en lâ ilâhe illallah ve eşhedü enne Muhammeden abdühû ve resûlüh.',
  meaning: "Şahitlik ederim ki Allah'tan başka ilah yoktur. Yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir."
}

const islamConditions: IslamCondition[] = [
  { id: 'shahada', title: 'Kelime-i Şehadet', description: 'Allah’ın birliğine ve Peygamberimizin elçiliğine şahitlik etmektir.', detail: shahada.description },
  { id: 'prayer', title: 'Namaz', description: 'Belirli vakitlerde Allah’a yönelerek namaz kılmaktır.', detail: 'Namaz, Müslümanın gün içinde belirli vakitlerde Allah’a yönelerek yerine getirdiği ibadettir. Hazırlık, kıyam, rükû, secde ve selamdan oluşan ana akışla öğrenilebilir.' },
  { id: 'alms', title: 'Zekât', description: 'İhtiyaç sahiplerine belirlenen ölçüde vermektir.', detail: 'Zekât, mali imkânı olan Müslümanların belirli şartlarla ihtiyaç sahiplerine verdiği ibadettir. Paylaşmayı, sosyal dayanışmayı ve malın bereketini hatırlatır.' },
  { id: 'fasting', title: 'Oruç', description: 'Ramazan ayında imsak ile iftar arasında oruç tutmaktır.', detail: 'Oruç, Ramazan ayında imsak vaktinden iftara kadar yeme, içme ve orucu bozan davranışlardan uzak durmaktır. Sabır ve bilinçle geçirilen bir ibadet vaktidir.' },
  { id: 'pilgrimage', title: 'Hac', description: "Gücü yetenlerin Kâbe'yi ziyaret etmesidir.", detail: "Hac, maddi ve bedeni imkânı olan Müslümanların belirli zamanda Kâbe'yi ziyaret ederek yerine getirdiği ibadettir. Ömründe bir kez farzdır." }
]

const selectedIslamCondition = computed(() => islamConditions.find(item => item.id === selectedIslamConditionId.value) ?? islamConditions[0]!)
const selectedIslamConditionIndex = computed(() => islamConditions.findIndex(item => item.id === selectedIslamConditionId.value))

const prayerOuterFards: TextItem[] = [
  { title: 'Hadesten Taharet', description: 'Namazdan önce abdestli olmak; gerektiğinde gusül veya teyemmüm ile temizlenmektir.' },
  { title: 'Necasetten Taharet', description: 'Bedenin, elbisenin ve namaz kılınacak yerin ibadete engel kirlerden temiz olmasıdır.' },
  { title: 'Setr-i Avret', description: 'Namazda örtülmesi gereken yerleri uygun ve temiz bir kıyafetle örtmektir.' },
  { title: 'İstikbal-i Kıble', description: 'Namaza başlarken kıble yönüne, yani Kâbe’ye doğru dönmektir.' },
  { title: 'Vakit', description: 'Her namazı kendi vakti girdikten sonra kılmaktır.' },
  { title: 'Niyet', description: 'Kılınacak namazı kalben belirlemek ve hangi namaz için durduğunu bilmektir.' }
]

const prayerInnerFards: TextItem[] = [
  { title: 'İftitah Tekbiri', description: '“Allahu Ekber” denilerek namaza başlanır.' },
  { title: 'Kıyam', description: 'Gücü yeten kişinin farz namazda ayakta durmasıdır.' },
  { title: 'Kıraat', description: 'Kıyamdayken Kur’an’dan gerekli miktarda okumaktır.' },
  { title: 'Rükû', description: 'Eğilip elleri dizlere koyarak rükû hâlini yerine getirmektir.' },
  { title: 'Sücud', description: 'Alın ve burnu yere koyarak secdeye varmaktır.' },
  { title: "Ka'de-i Ahîre", description: 'Namazın sonunda Tahiyyat okuyacak kadar oturmaktır.' }
]

const prayerGroups = [
  { title: 'Namazın Dışındaki Farzlar', description: 'Namaza başlamadan önce yerine getirilen şartlar.', items: prayerOuterFards },
  { title: 'Namazın İçindeki Farzlar', description: 'Namaz esnasında yerine getirilen rükünler.', items: prayerInnerFards }
]

const ablutionFards: IllustratedItem[] = [
  { title: 'Yüzü Yıkamak', description: 'Alın saç bitiminden çene altına, kulak yumuşaklarına kadar yüzü yıkamak.', image: '/images/articles/wudu-wash-face.png', alt: 'Abdest alırken yüzü yıkamak' },
  { title: 'Kolları Yıkamak', description: 'Ellerle beraber dirsekleri de dâhil ederek kolları yıkamak.', image: '/images/articles/wudu-wash-arms.png', alt: 'Abdest alırken kolları dirseklerle birlikte yıkamak' },
  { title: 'Başa Mesh Etmek', description: 'Başın en az dörtte birini ıslak el ile mesh etmek.', image: '/images/articles/wudu-wipe-head.png', alt: 'Abdest alırken başa mesh etmek' },
  { title: 'Ayakları Yıkamak', description: 'Topuklarla birlikte ayakları yıkamak.', image: '/images/articles/wudu-wash-feet.png', alt: 'Abdest alırken ayakları topuklarla birlikte yıkamak' }
]

const ghuslFards: TextItem[] = [
  { title: 'Ağzı yıkamak', description: 'Ağza su alıp ağız içinin tamamını iyice çalkalamak.' },
  { title: 'Burnu yıkamak', description: 'Burna su çekip burnun içini temizlemek.' },
  { title: 'Bütün bedeni yıkamak', description: 'Kuru yer kalmayacak şekilde bütün bedeni yıkamak.' }
]

const tayammumFards: TextItem[] = [
  { title: 'Niyet etmek', description: 'Abdest veya gusül yerine teyemmüm yapılacağına kalben niyet etmek.' },
  { title: 'Yüzü ve kolları mesh etmek', description: 'Elleri temiz toprağa iki defa dokundurup birinci darb ile yüzü, ikinci darb ile kolları dirseklerle birlikte mesh etmek.' }
]

const tayammumSteps: TayammumStep[] = [
  { label: 'Niyet + 1. darb', title: 'Temiz zemine dokun', description: 'Niyet ettikten sonra parmakları açık biçimde iki eli temiz toprak veya toprak cinsinden bir yüzeye dokundur.', image: '/images/fundamentals/tayammum-darb.png', alt: 'Teyemmüm için iki elin temiz toprak yüzeyine dokundurulması' },
  { label: 'Yüz mesh', title: 'Yüzün tamamını mesh et', description: 'Eller fazla tozlandıysa hafifçe silkele; ardından iki elin içiyle yüzün tamamını bir defa mesh et.', image: '/images/fundamentals/tayammum-face.png', alt: 'Teyemmümde iki elle yüzün mesh edilmesi' },
  { label: '2. darb + kol mesh', title: 'Kolları dirseklere kadar mesh et', description: 'Elleri ikinci kez temiz zemine dokundur; karşı elin içiyle sağ ve sol kolu dirseklerle birlikte mesh et.', image: '/images/fundamentals/tayammum-arms.png', alt: 'Teyemmümde kolun dirsekle birlikte mesh edilmesi' }
]

const pad = (value: number) => String(value).padStart(2, '0')

const updateScrollState = () => {
  const sections = quickLinks.map(link => document.getElementById(link.id)).filter((section): section is HTMLElement => Boolean(section))
  const current = sections.findLast(section => section.getBoundingClientRect().top <= 150)
  if (current) activeSection.value = current.id
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState))

useSeoMeta({
  title: '32 Farz Rehberi',
  description: "İmanın şartları, İslam'ın şartları, namaz, abdest, gusül ve teyemmüm farzlarını görsel ve bütünlüklü bir rehberle öğren."
})
</script>

<style scoped>
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; }
.section-title { margin-top: .65rem; font-family: 'Playfair Display', serif; font-size: clamp(2.15rem, 4vw, 3.25rem); font-weight: 700; line-height: 1.05; color: #004532; }
.section-description { max-width: 42rem; margin-top: 1rem; color: #3f4944; font-size: 1rem; line-height: 1.75; }
.section-count { flex: 0 0 auto; border: 1px solid rgb(0 69 50 / .14); border-radius: 999px; background: #fff; padding: .6rem 1rem; color: #004532; font-size: .75rem; font-weight: 800; }
.farz-card { min-height: 15rem; border: 1px solid rgb(190 201 194 / .5); border-radius: 1.5rem; background: #fff; padding: 1.75rem; box-shadow: 0 4px 20px rgb(6 95 70 / .04); transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.farz-card:hover { transform: translateY(-4px); border-color: rgb(139 214 182 / .85); box-shadow: 0 12px 32px rgb(6 95 70 / .08); }
@media (max-width: 639.98px) { .section-heading { align-items: flex-start; flex-direction: column; gap: 1.25rem; } .farz-card { min-height: auto; } }
</style>
