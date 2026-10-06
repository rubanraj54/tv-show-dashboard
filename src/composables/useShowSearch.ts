import { computed, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { searchShows } from '@/api/tvmaze'

const query = ref('')
const debouncedQuery = ref('')
let timeout: ReturnType<typeof setTimeout> | undefined

watch(query, (value) => {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    debouncedQuery.value = value.trim()
  }, 300)
})

export function useShowSearch() {
  const searchQuery = useQuery({
    queryKey: computed(() => ['search', debouncedQuery.value]),
    queryFn: () => searchShows(debouncedQuery.value),
    enabled: computed(() => debouncedQuery.value.length >= 2),
  })

  const isSearching = computed(() => debouncedQuery.value.length >= 2)

  return {
    query,
    debouncedQuery,
    searchQuery,
    isSearching,
  }
}
