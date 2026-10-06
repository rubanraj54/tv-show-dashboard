<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AppButton from '@/components/atoms/AppButton.vue'
import ShowDetailPanel from '@/components/organisms/ShowDetailPanel.vue'
import { fetchShow } from '@/api/tvmaze'
import type { SearchResult, TvShow } from '@/api/types'
import { useRecentlyViewedStore } from '@/stores/recentlyViewed'

const route = useRoute()
const queryClient = useQueryClient()
const recentlyViewed = useRecentlyViewedStore()

const showId = computed(() => Number(route.params.id))

function findCachedShow(id: number): TvShow | undefined {
  const indexData = queryClient.getQueryData<{ pages: TvShow[][] }>(['shows'])
  const fromIndex = indexData?.pages.flat().find((show) => show.id === id)
  if (fromIndex) {
    return fromIndex
  }

  const searchQueries = queryClient.getQueriesData<SearchResult[]>({ queryKey: ['search'] })
  for (const [, data] of searchQueries) {
    const match = data?.find((result) => result.show.id === id)?.show
    if (match) {
      return match
    }
  }

  return undefined
}

const showQuery = useQuery({
  queryKey: computed(() => ['show', showId.value]),
  queryFn: () => fetchShow(showId.value),
  enabled: computed(() => Number.isFinite(showId.value) && showId.value > 0),
  placeholderData: () => findCachedShow(showId.value),
})

const notFound = computed(
  () =>
    !showQuery.isLoading.value &&
    !showQuery.isError.value &&
    (showQuery.data.value === null || !Number.isFinite(showId.value)),
)

watch(
  () => showQuery.data.value,
  (show) => {
    if (show) {
      recentlyViewed.addShow(show)
    }
  },
  { immediate: true },
)
</script>

<template>
  <article class="show-detail-page">
    <nav class="show-detail-page__nav" aria-label="Back navigation">
      <RouterLink to="/" class="show-detail-page__back">← Back to dashboard</RouterLink>
    </nav>

    <ShowDetailPanel
      :show="showQuery.data.value ?? undefined"
      :is-loading="showQuery.isLoading.value"
      :is-error="showQuery.isError.value"
      :not-found="notFound"
    />

    <p v-if="showQuery.isError.value" class="show-detail-page__retry">
      <AppButton variant="ghost" @click="showQuery.refetch()">Try again</AppButton>
    </p>
  </article>
</template>

<style scoped>
.show-detail-page__nav {
  margin-bottom: var(--space-lg);
}

.show-detail-page__back {
  display: inline-block;
  color: var(--color-accent);
  font-weight: 500;
}

.show-detail-page__retry {
  margin-top: var(--space-md);
}
</style>
