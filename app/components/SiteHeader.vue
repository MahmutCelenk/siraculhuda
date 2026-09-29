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
        <div class="group relative">
          <button
            class="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium text-on-surface transition hover:bg-surface-container-low hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            type="button"
            aria-disabled="true"
            aria-describedby="language-tooltip"
          >
          <svg class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M12 3c2.2 2.4 3.4 5.4 3.4 9S14.2 18.6 12 21c-2.2-2.4-3.4-5.4-3.4-9S9.8 5.4 12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          </svg>
            Dil
          </button>
          <span
            id="language-tooltip"
            role="tooltip"
            class="pointer-events-none absolute right-0 top-full z-20 mt-2 w-max translate-y-1 rounded bg-primary px-2.5 py-1.5 text-[11px] font-medium text-on-primary opacity-0 shadow-lg transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            Yakında eklenecektir
          </span>
        </div>
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

<style scoped>
.desktop-navigation { display: flex; align-items: center; gap: 18px; }
.mobile-menu-toggle, .mobile-navigation { display: none; }
@media (max-width: 959.98px) {
  .desktop-navigation { display: none; }
  .mobile-menu-toggle { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; padding: 10px; border: 1px solid #dce5df; border-radius: 10px; background: #fff; color: #004532; cursor: pointer; }
  .mobile-menu-toggle svg { width: 22px; height: 22px; }
  .mobile-menu-toggle:hover, .mobile-menu-toggle[aria-expanded="true"] { background: #eaf3ed; border-color: #b8cebf; }
  .mobile-menu-toggle:focus-visible, .mobile-navigation-link:focus-visible { outline: 2px solid #065f46; outline-offset: 3px; }
  .mobile-navigation { display: block; position: absolute; top: 100%; right: 0; left: 0; max-height: calc(100dvh - 57px); overflow-y: auto; overscroll-behavior: contain; border-top: 1px solid #e4eae5; border-bottom: 1px solid #d7e2d9; background: #f9f9f8; box-shadow: 0 14px 24px #183e2814; }
  .mobile-navigation-links { display: grid; gap: 4px; padding: 12px 16px 16px; }
  .mobile-navigation-link { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 46px; padding: 12px 14px; border-radius: 8px; color: #3f4944; font-size: 14px; font-weight: 500; text-decoration: none; }
  .mobile-navigation-link span { color: #6a8173; }
  .mobile-navigation-link:hover, .mobile-navigation-link.is-active { background: #e7f0e9; color: #004532; }
  .mobile-navigation-link.is-active { font-weight: 700; }
}
</style>
