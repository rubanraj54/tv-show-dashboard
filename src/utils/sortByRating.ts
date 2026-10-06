import type { TvShow } from '@/api/types'

export function sortByRating(shows: TvShow[]): TvShow[] {
  return [...shows].sort((a, b) => {
    const aRating = a.rating.average
    const bRating = b.rating.average

    if (aRating === null && bRating === null) {
      return 0
    }

    if (aRating === null) {
      return 1
    }

    if (bRating === null) {
      return -1
    }

    return bRating - aRating
  })
}
