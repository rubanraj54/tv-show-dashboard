import { describe, expect, it } from 'vitest'
import type { TvShow } from '@/api/types'
import { sortByRating } from '@/utils/sortByRating'

function createShow(id: number, rating: number | null): TvShow {
  return {
    id,
    name: `Show ${id}`,
    genres: ['Drama'],
    rating: { average: rating },
    status: 'Running',
    premiered: null,
    ended: null,
    runtime: null,
    language: 'English',
    schedule: { time: '', days: [] },
    network: null,
    webChannel: null,
    officialSite: null,
    summary: null,
    image: null,
    url: '',
  }
}

describe('sortByRating', () => {
  it('sorts by rating descending with null ratings last', () => {
    const sorted = sortByRating([
      createShow(1, null),
      createShow(2, 7.5),
      createShow(3, 9.1),
      createShow(4, null),
      createShow(5, 8),
    ])

    expect(sorted.map((show) => show.id)).toEqual([3, 5, 2, 1, 4])
  })
})
