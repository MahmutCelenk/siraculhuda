<template>
  <NuxtLink
    to="/"
    class="brand-logo"
    aria-label="Sirâcü'l-Hüdâ ana sayfa"
  >
    <svg class="brand-logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="17" fill="#004532" />
      <path
        d="M13 19.5c7.8.1 14.1 2.8 19 8.1 4.9-5.3 11.2-8 19-8.1v24c-7.7.1-14 2.5-19 7.2-5-4.7-11.3-7.1-19-7.2v-24Z"
        fill="#F7FBF8"
        stroke="#A6F2D1"
        stroke-width="2.6"
        stroke-linejoin="round"
      />
      <path d="M32 27.6v23.1" stroke="#004532" stroke-width="2.6" stroke-linecap="round" />
      <path d="M24.8 14.8 22.5 11M32 13V8.7M39.2 14.8l2.3-3.8" stroke="#FED65B" stroke-width="2.8" stroke-linecap="round" />
    </svg>

    <span class="brand-logo__wordmark">
      <span>Sirâcü'l-Hüdâ</span>
      <span class="brand-logo__rule" aria-hidden="true" />
    </span>
  </NuxtLink>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: #004532;
  text-decoration: none;
}

.brand-logo__mark {
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  filter: drop-shadow(0 3px 7px rgb(0 69 50 / 0.12));
}

.brand-logo__wordmark {
  display: grid;
  gap: 0.14rem;
  font-family: 'Playfair Display', serif;
  font-size: 1.16rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
}

.brand-logo__rule {
  width: 52%;
  height: 2px;
  border-radius: 999px;
  background: #fed65b;
  transition: width 180ms ease;
}

.brand-logo:hover .brand-logo__rule {
  width: 100%;
}

.brand-logo:focus-visible {
  border-radius: 0.5rem;
  outline: 2px solid #065f46;
  outline-offset: 4px;
}

@media (min-width: 400px) {
  .brand-logo__wordmark {
    font-size: 1.24rem;
  }
}
</style>
