<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppButton from '@/components/atoms/AppButton.vue'
import AppSpinner from '@/components/atoms/AppSpinner.vue'
import GenreFilter from '@/components/organisms/GenreFilter.vue'
import GenreRow from '@/components/organisms/GenreRow.vue'
import SearchResults from '@/components/organisms/SearchResults.vue'
import { useShowSearch } from '@/composables/useShowSearch'
import { useShowsIndex } from '@/composables/useShowsIndex'
import { useRecentlyViewedStore } from '@/stores/recentlyViewed'

const { debouncedQuery, searchQuery, isSearching } = useShowSearch()
const {
  showsQuery,
  genreGroups,
  availableGenres,
  getShowsForGenre,
  canLoadMoreForGenre,
  isGenreLoading,
  loadMoreForGenre,
} = useShowsIndex()
const recentlyViewed = useRecentlyViewedStore()
const selectedGenres = ref<string[]>([])

const displayedGenres = computed(() => {
  if (selectedGenres.value.length > 0) {
    return [...selectedGenres.value].sort((a, b) => a.localeCompare(b))
  }

  return [...genreGroups.value.keys()]
})

function handleGenreLoadMore(genre: string) {
  void loadMoreForGenre(genre)
}
</script>

<template>
  <div class="dashboard">
    <h1 class="page-title">TV Show Dashboard</h1>

    <SearchResults
      v-if="isSearching"
      :query="debouncedQuery"
      :results="searchQuery.data.value ?? []"
      :is-loading="searchQuery.isLoading.value"
      :is-error="searchQuery.isError.value"
    />

    <template v-else>
      <section
        v-if="recentlyViewed.items.length > 0"
        class="recently-viewed"
        aria-labelledby="recently-viewed-heading"
      >
        <h2 id="recently-viewed-heading" class="recently-viewed__title">Recently viewed</h2>
        <ul class="recently-viewed__list">
          <li v-for="item in recentlyViewed.items" :key="item.id">
            <RouterLink :to="`/shows/${item.id}`" class="recently-viewed__link">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </section>

      <div class="dashboard__layout">
        <GenreFilter v-model="selectedGenres" :genres="availableGenres" />

        <section class="dashboard__content" aria-label="Shows by genre">
          <AppSpinner v-if="showsQuery.isLoading.value && !showsQuery.data.value" />

          <p v-else-if="showsQuery.isError.value" class="state-message state-message--error" role="alert">
            Failed to load shows.
            <AppButton variant="ghost" @click="showsQuery.refetch()">Try again</AppButton>
          </p>

          <template v-else>
            <GenreRow
              v-for="genre in displayedGenres"
              :key="genre"
              :genre="genre"
              :shows="getShowsForGenre(genre)"
              :is-loading="isGenreLoading(genre)"
              :can-load-more="canLoadMoreForGenre(genre)"
              @load-more="handleGenreLoadMore(genre)"
            />

            <p v-if="displayedGenres.length === 0" class="state-message">
              {{
                selectedGenres.length > 0
                  ? 'No shows match the selected genres yet.'
                  : 'No shows loaded yet.'
              }}
            </p>
          </template>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped>
.recently-viewed {
  margin-bottom: var(--space-xl);
}

.recently-viewed__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.recently-viewed__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}

.recently-viewed__link {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  font-size: 0.875rem;
}

.dashboard__layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  gap: var(--space-lg);
  align-items: start;
}

.dashboard__content {
  min-width: 0;
}

@media (max-width: 768px) {
  .dashboard__layout {
    grid-template-columns: 1fr;
  }
}
</style>
