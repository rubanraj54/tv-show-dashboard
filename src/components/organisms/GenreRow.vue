<script setup lang="ts">
import { computed } from 'vue'
import type { TvShow } from '@/api/types'
import AppSpinner from '@/components/atoms/AppSpinner.vue'
import ShowCard from '@/components/molecules/ShowCard.vue'

const props = defineProps<{
  genre: string
  shows: TvShow[]
  isLoading?: boolean
  canLoadMore?: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const headingId = computed(
  () => `genre-${props.genre.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
)
</script>

<template>
  <section class="genre-row" :aria-labelledby="headingId">
    <h2 :id="headingId" class="genre-row__title">{{ genre }}</h2>

    <AppSpinner v-if="isLoading && shows.length === 0" />

    <p v-else-if="shows.length === 0" class="genre-row__empty">
      No shows found for this genre yet.
    </p>

    <div v-else class="genre-row__scroll">
      <ul class="genre-row__list">
        <li v-for="show in shows" :key="`${genre}-${show.id}`" class="genre-row__item">
          <ShowCard :show="show" />
        </li>
        <li v-if="canLoadMore" class="genre-row__item genre-row__item--more">
          <button
            type="button"
            class="genre-row__more"
            :disabled="isLoading"
            :aria-label="`Load more ${genre} shows`"
            @click="emit('loadMore')"
          >
            <AppSpinner v-if="isLoading" />
            <span v-else>Load more</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.genre-row {
  margin-bottom: var(--space-xl);
}

.genre-row__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.genre-row__empty {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.genre-row__scroll {
  position: relative;
}

.genre-row__scroll::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: var(--space-sm);
  width: 2.75rem;
  pointer-events: none;
  background: linear-gradient(to right, rgb(247 248 250 / 0%), var(--scroll-fade-color));
  box-shadow: var(--scroll-shadow);
}

.genre-row__list {
  display: flex;
  align-items: stretch;
  gap: var(--space-md);
  margin: 0;
  padding: 0 2.75rem var(--space-sm) 0;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.genre-row__item {
  flex-shrink: 0;
  scroll-snap-align: start;
}

.genre-row__item--more {
  display: flex;
  width: var(--card-width);
  scroll-snap-align: end;
}

.genre-row__more {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: var(--space-sm);
  border: 1px dashed var(--color-accent);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
}

.genre-row__more:hover:not(:disabled) {
  background: var(--color-accent-soft);
}

.genre-row__more:disabled {
  cursor: progress;
}
</style>
