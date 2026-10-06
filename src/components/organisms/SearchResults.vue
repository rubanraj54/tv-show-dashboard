<script setup lang="ts">
import type { SearchResult } from '@/api/types'
import AppSpinner from '@/components/atoms/AppSpinner.vue'
import ShowCard from '@/components/molecules/ShowCard.vue'

defineProps<{
  query: string
  results: SearchResult[]
  isLoading: boolean
  isError: boolean
}>()
</script>

<template>
  <section class="search-results" aria-labelledby="search-results-heading" aria-live="polite">
    <h2 id="search-results-heading" class="search-results__title">Search results</h2>

    <AppSpinner v-if="isLoading" />

    <p v-else-if="isError" class="state-message state-message--error" role="alert">
      Something went wrong while searching. Please try again.
    </p>

    <p v-else-if="results.length === 0" class="state-message">
      No shows found for "{{ query }}".
    </p>

    <ul v-else class="search-results__list">
      <li v-for="{ show } in results" :key="show.id" class="search-results__item">
        <ShowCard :show="show" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search-results {
  margin-bottom: var(--space-xl);
}

.search-results__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.search-results__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin: 0;
  padding: 0;
  list-style: none;
}

.search-results__item {
  list-style: none;
}
</style>
