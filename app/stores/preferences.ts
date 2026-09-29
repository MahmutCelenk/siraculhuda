import { defineStore } from 'pinia'

type FontScale = 'normal' | 'large'

interface LocalPreferences {
  fontScale: FontScale
  showArabic: boolean
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): LocalPreferences => ({
    fontScale: 'normal',
    showArabic: true
  }),
  actions: {
    setFontScale(fontScale: FontScale) {
      this.fontScale = fontScale
      localStorage.setItem('siraculhuda:font-scale', fontScale)
    },
    setShowArabic(showArabic: boolean) {
      this.showArabic = showArabic
      localStorage.setItem('siraculhuda:show-arabic', String(showArabic))
    },
    hydrate() {
      const fontScale = localStorage.getItem('siraculhuda:font-scale')
      const showArabic = localStorage.getItem('siraculhuda:show-arabic')

      if (fontScale === 'normal' || fontScale === 'large') {
        this.fontScale = fontScale
      }

      if (showArabic !== null) {
        this.showArabic = showArabic === 'true'
      }
    }
  }
})
