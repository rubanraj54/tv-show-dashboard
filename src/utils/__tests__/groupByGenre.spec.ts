import { describe, expect, it } from 'vitest'
import type { TvShow } from '@/api/types'
import { groupByGenre } from '@/utils/groupByGenre'

function createShow(id: number, genres: string[], rating: number | null): TvShow {
  return {
    id,
    name: `Show ${id}`,
    genres,
    rating: { average: rating },
    status: 'Running',
    premiered: '2020-01-01',
    ended: null,
    runtime: 45,
    language: 'English',
    schedule: { time: '21:00', days: ['Monday'] },
    network: null,
    webChannel: null,
    officialSite: null,
    summary: null,
    image: null,
    url: `https://example.com/${id}`,
  }
}

describe('groupByGenre', () => {
  it('groups shows into genre buckets and sorts by rating', () => {
    const shows = [
      createShow(1, ['Drama', 'Crime'], 7),
      createShow(2, ['Drama'], 9),
      createShow(3, ['Drama'], 8),
      createShow(4, ['Comedy'], 6),
      createShow(5, ['Comedy'], 5),
      createShow(6, ['Comedy'], 4),
    ]

    const groups = groupByGenre(shows)

    expect(groups.get('Drama')?.map((show) => show.id)).toEqual([2, 3, 1])
    expect(groups.get('Comedy')?.map((show) => show.id)).toEqual([4, 5, 6])
    expect(groups.has('Crime')).toBe(false)
  })

  it('skips shows without genres', () => {
    const groups = groupByGenre([createShow(1, [], 8)])

    expect(groups.size).toBe(0)
  })
})
