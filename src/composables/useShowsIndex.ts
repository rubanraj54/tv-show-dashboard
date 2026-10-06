import { computed, ref } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { fetchShowsPage } from '@/api/tvmaze'
import { buildGenreMap, groupByGenre } from '@/utils/groupByGenre'

const MAX_PAGES_PER_LOAD = 2
const MAX_SHOWS_PER_GENRE = 100

export function useShowsIndex() {
  const loadingGenres = ref<Record<string, boolean>>({})
  let fetchQueue: Promise<unknown> = Promise.resolve()

  const showsQuery = useInfiniteQuery({
    queryKey: ['shows'],
    queryFn: ({ pageParam }) => fetchShowsPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }

      return lastPageParam + 1
    },
  })

  const shows = computed(() => showsQuery.data.value?.pages.flat() ?? [])
  const allGenreGroups = computed(() => buildGenreMap(shows.value))
  const genreGroups = computed(() => groupByGenre(shows.value))

  const availableGenres = computed(() =>
    [...allGenreGroups.value.keys()].sort((a, b) => a.localeCompare(b)),
  )

  function setGenreLoading(genre: string, loading: boolean) {
    if (loading) {
      loadingGenres.value = { ...loadingGenres.value, [genre]: true }
      return
    }

    const { [genre]: _removed, ...rest } = loadingGenres.value
    loadingGenres.value = rest
  }

  function queueFetchNextPage() {
    fetchQueue = fetchQueue.then(() => showsQuery.fetchNextPage())
    return fetchQueue
  }

  function getRawShowsForGenre(genre: string) {
    return allGenreGroups.value.get(genre) ?? []
  }

  function getShowsForGenre(genre: string) {
    return getRawShowsForGenre(genre).slice(0, MAX_SHOWS_PER_GENRE)
  }

  function canLoadMoreForGenre(genre: string) {
    if (getRawShowsForGenre(genre).length >= MAX_SHOWS_PER_GENRE) {
      return false
    }

    return showsQuery.hasNextPage.value ?? false
  }

  function isGenreLoading(genre: string) {
    return Boolean(loadingGenres.value[genre])
  }

  async function loadMoreForGenre(genre: string) {
    if (isGenreLoading(genre) || !canLoadMoreForGenre(genre)) {
      return
    }

    setGenreLoading(genre, true)

    try {
      for (let page = 0; page < MAX_PAGES_PER_LOAD; page++) {
        if (!canLoadMoreForGenre(genre)) {
          break
        }

        await queueFetchNextPage()
      }
    } finally {
      setGenreLoading(genre, false)
    }
  }

  return {
    showsQuery,
    genreGroups,
    availableGenres,
    getShowsForGenre,
    canLoadMoreForGenre,
    isGenreLoading,
    loadMoreForGenre,
  }
}
