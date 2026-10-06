import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TvShow } from '@/api/types'

const MAX_ITEMS = 8

export const useRecentlyViewedStore = defineStore('recentlyViewed', () => {
  const items = ref<Array<{ id: number; name: string }>>([])

  function addShow(show: Pick<TvShow, 'id' | 'name'>) {
    items.value = [
      { id: show.id, name: show.name },
      ...items.value.filter((item) => item.id !== show.id),
    ].slice(0, MAX_ITEMS)
  }

  return { items, addShow }
})
