export type SearchItem = {
  title: string
  description: string
  to: string
  kind: string
  keywords: string[]
  priority: number
}

export function normalizeSearch(value: string) {
  return value.toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[’'`´]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function findSearchResults(items: SearchItem[], query: string, limit = 6): SearchItem[] {
  const term = normalizeSearch(query)
  if (term.length < 2) return []
  const tokens = term.split(' ')
  const matchesToken = (word: string, token: string) => word === token || (token.length > 3 && word.startsWith(token))
  const matches = items.flatMap((item) => {
    const title = normalizeSearch(item.title)
    const aliases = item.keywords.map(normalizeSearch)
    const words = normalizeSearch([item.title, item.description, item.kind, ...item.keywords].join(' ')).split(' ')
    const titleWords = title.split(' ')
    if (!tokens.every(token => words.some(word => matchesToken(word, token)))) return []
    const score = item.priority
      + (title === term ? 1000 : aliases.includes(term) ? 800 : title.startsWith(term) ? 500 : 0)
      + (tokens.every(token => titleWords.some(word => matchesToken(word, token))) ? 250 : 0)
      + tokens.filter(token => titleWords.some(word => matchesToken(word, token))).length * 20
    return [{ item, score }]
  }).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'tr'))

  const seen = new Set<string>()
  return matches.filter(({ item }) => {
    if (seen.has(item.to)) return false
    seen.add(item.to)
    return true
  }).slice(0, limit).map(({ item }) => item)
}

export function surahSearchItem(surah: { id: number; name: string; slug: string; arabicName: string; meaning: string; verseCount: number }): SearchItem {
  return {
    title: `${surah.name} Suresi`,
    description: `${surah.id}. sure · ${surah.verseCount} ayet. Arapça metin, okunuş ve Türkçe meal.`,
    // The reader accepts an ID and canonicalizes it to its own name slug.
    to: `/sureler?sure=${surah.id}`,
    kind: 'Sure',
    keywords: [surah.name, surah.slug, surah.arabicName, surah.meaning, `${surah.name} suresi`, 'sure suresi suresini ayet oku okunuş meal kuran'],
    priority: 100
  }
}

export const pageSearchItems: SearchItem[] = [
  { title: 'Ana Sayfa', description: 'Arama, başlangıç yolları ve rehberler.', to: '/', kind: 'Sayfa', keywords: ['home ana sayfa başlangıç'], priority: 80 },
  { title: "Kur'an Oku", description: 'Arapça metin ve Türkçe meal ile Kur’an oku.', to: '/kuran', kind: 'Sayfa', keywords: ['kuran', 'kur’an', 'quran', 'mushaf', 'meal', 'arapça', 'cüz'], priority: 100 },
  { title: 'Sureler', description: '114 sureyi Arapça, okunuş ve Türkçe anlamıyla incele.', to: '/sureler', kind: 'Sayfa', keywords: ['sure', 'sureler', 'ayet'], priority: 94 },
  { title: 'Namaz Öğren', description: 'Vakit namazları, rekât düzeni ve kılınış rehberi.', to: '/namaz', kind: 'Sayfa', keywords: ['namaz', 'namaz öğren', 'ibadet'], priority: 92 },
  { title: 'Hadisler', description: 'Hadisleri konu başlıklarına göre oku ve ara.', to: '/hadis', kind: 'Sayfa', keywords: ['hadis', 'buhari', 'sahih', 'sünnet'], priority: 90 },
  { title: '32 Farz', description: 'İman, İslam, namaz ve temizlik farzlarını birlikte öğren.', to: '/temel-bilgiler', kind: 'Sayfa', keywords: ['32 farz', 'otuz iki farz', 'temel bilgiler'], priority: 88 },
  ...[
    ['iman', 'İmanın şartları', 'iman inanç altı 6 şart'],
    ['islam', "İslam’ın şartları", 'islam beş 5 şart kelime şehadet oruç zekat hac'],
    ['namaz', 'Namazın farzları', 'namazın içindeki dışındaki farzlar 12 kıyam kıraat rükû secde'],
    ['abdest', 'Abdestin farzları', 'abdest dört 4 farz yüz eller kollar baş ayak mesh'],
    ['gusul', 'Guslün farzları', 'gusül gusul boy abdesti üç 3 farz ağız burun beden'],
    ['teyemmum', 'Teyemmümün farzları', 'teyemmüm teyemmum iki 2 farz darb mesh niyet toprak nasıl yapılır']
  ].map(([id, title, keywords]) => ({ title: title!, description: '32 Farz rehberindeki ilgili bölümü incele.', to: `/temel-bilgiler#${id}`, kind: 'Bölüm', keywords: [keywords!, title!], priority: 85 })),
  ...[
    ['sabah', 'Sabah namazı'], ['ogle', 'Öğle namazı'], ['ikindi', 'İkindi namazı'], ['aksam', 'Akşam namazı'], ['yatsi', 'Yatsı namazı']
  ].map(([id, title]) => ({ title: title!, description: 'Rekâtları ve adım adım kılınışını öğren.', to: `/namaz?namaz=${id}#vakitler`, kind: 'Namaz', keywords: [title!, 'nasıl kılınır farz sünnet rekat'], priority: 95 })),
  { title: 'Özel namazlar', description: 'Cuma, bayram, teravih ve diğer özel namazlar.', to: '/namaz#ozel-namazlar', kind: 'Bölüm', keywords: ['cuma bayram teravih cenaze özel namazlar'], priority: 80 },
  { title: 'Namaz duaları', description: 'Namazda okunan dualar, okunuşları ve anlamları.', to: '/namaz#dualar', kind: 'Bölüm', keywords: ['dua dualar kunut vitir tesbih'], priority: 80 }
]
