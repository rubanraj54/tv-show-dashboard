import type { TvShow } from '@/api/types'
import { sortByRating } from './sortByRating'

export function buildGenreMap(shows: TvShow[]): Map<string, TvShow[]> {
  const groups = new Map<string, TvShow[]>()

  for (const show of shows) {
    if (show.genres.length === 0) {
      continue
    }

    for (const genre of show.genres) {
      const existing = groups.get(genre) ?? []
      existing.push(show)
      groups.set(genre, existing)
    }
  }

  const sortedEntries = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([genre, genreShows]) => [genre, sortByRating(genreShows)] as const)

  return new Map(sortedEntries)
}

export function groupByGenre(shows: TvShow[], minShows = 3): Map<string, TvShow[]> {
  const result = new Map<string, TvShow[]>()

  for (const [genre, genreShows] of buildGenreMap(shows)) {
    if (genreShows.length >= minShows) {
      result.set(genre, genreShows)
    }
  }

  return result
}
