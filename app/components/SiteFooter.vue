<template>
  <footer class="border-t border-outline-variant bg-surface-container-low">
    <div class="container-shell grid gap-gutter py-16 md:grid-cols-3">
      <div class="space-y-4">
        <BrandLogo />
        <p class="text-base leading-7 text-on-surface-variant">
          Geleneksel ilmi modern teknolojiyle buluşturan sakin öğrenme alanı.
        </p>
      </div>

      <div v-for="group in footerGroups" :key="group.title">
        <h2 class="mb-5 text-sm font-bold text-tertiary">{{ group.title }}</h2>
        <ul class="space-y-3">
          <li v-for="link in group.links" :key="link.label">
            <a
              v-if="link.href"
              :href="link.href"
              class="inline-flex break-all text-sm font-semibold text-on-surface-variant transition hover:text-primary"
            >
              {{ link.label }}
            </a>
            <NuxtLink v-else :to="link.to" class="text-xs font-semibold uppercase tracking-wide text-on-surface-variant transition hover:text-primary">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-outline-variant/60">
      <div class="container-shell py-5">
        <p class="text-xs font-semibold text-on-surface-variant">
          © {{ currentYear }} Sirâcü'l-Hüdâ. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type FooterLink = {
  label: string
  to?: string
  href?: string
}

type FooterGroup = {
  title: string
  links: FooterLink[]
}

const footerGroups: FooterGroup[] = [
  {
    title: 'Eğitim',
    links: [
      { label: 'Öğrenme Yolları', to: '/#start' },
      { label: 'Makaleler', to: '/#articles' },
      { label: 'Sureler', to: '/sureler' },
      { label: '32 Farz', to: '/temel-bilgiler' },
      { label: 'Hadis Kütüphanesi', to: '/hadis' },
      { label: 'Namaz Rehberi', to: '/namaz' }
    ]
  },
  {
    title: 'İletişim',
    links: [
      { label: 'mahmut.celenk01@gmail.com', href: 'mailto:mahmut.celenk01@gmail.com' }
    ]
  }
]

const currentYear = new Date().getFullYear()
</script>
