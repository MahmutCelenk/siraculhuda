<template>
  <header ref="headerElement" class="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/95 backdrop-blur" @keydown.esc="closeMenu(true)" @focusout="onHeaderFocusOut">
    <nav class="container-shell flex h-14 items-center justify-between" aria-label="Ana gezinme">
      <BrandLogo @click="closeMenu()" />

      <div class="desktop-navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="border-b border-transparent py-1.5 text-xs font-medium text-on-surface transition hover:border-primary hover:text-primary"
          active-class="border-primary text-primary"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <button
          ref="menuButton"
          class="mobile-menu-toggle"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="isMenuOpen ? 'Gezinme menüsünü kapat' : 'Gezinme menüsünü aç'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path v-if="isMenuOpen" d="m6 6 12 12M6 18 18 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path v-else d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </nav>
    <nav id="mobile-navigation" v-show="isMenuOpen" class="mobile-navigation" aria-label="Mobil gezinme">
      <div class="mobile-navigation-links">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-navigation-link"
          :class="{ 'is-active': isNavItemActive(item.to) }"
          :aria-current="isNavItemActive(item.to) ? (item.to.includes('#') ? 'location' : 'page') : undefined"
          @click="closeMenu()"
        >
          {{ item.label }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)
const headerElement = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLButtonElement | null>(null)
let desktopQuery: MediaQueryList | undefined

function closeMenu(restoreFocus = false) {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  if (restoreFocus) menuButton.value?.focus()
}

function isNavItemActive(to: string) {
  return to.includes('#') ? `${route.path}${route.hash}` === to : route.path === to
}

function onOutsidePointerDown(event: PointerEvent) {
  if (event.target instanceof Node && !headerElement.value?.contains(event.target)) closeMenu()
}

function onHeaderFocusOut(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && !headerElement.value?.contains(event.relatedTarget)) closeMenu()
}

function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}

watch(() => route.fullPath, () => closeMenu())

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 768px)')
  desktopQuery.addEventListener('change', onDesktopChange)
  document.addEventListener('pointerdown', onOutsidePointerDown)
})

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener('change', onDesktopChange)
  document.removeEventListener('pointerdown', onOutsidePointerDown)
})

const navItems = [
  { label: 'Öğrenme Yolları', to: '/#start' },
  { label: '32 Farz', to: '/temel-bilgiler' },
  { label: 'Sureler', to: '/sureler' },
  { label: "Kur'an", to: '/kuran' },
  { label: 'Hadis', to: '/hadis' },
  { label: 'Namaz', to: '/namaz' }
]
</script>

<style scoped src="~/assets/css/components/site-header.css"></style>
