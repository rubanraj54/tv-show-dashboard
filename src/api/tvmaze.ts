import type { SearchResult, TvShow } from './types'

const BASE_URL = 'https://api.tvmaze.com'

export async function fetchShowsPage(page: number): Promise<TvShow[]> {
  const response = await fetch(`${BASE_URL}/shows?page=${page}`)

  if (response.status === 404) {
    return []
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch shows page ${page}`)
  }

  return response.json()
}

export async function searchShows(query: string): Promise<SearchResult[]> {
  const encodedQuery = encodeURIComponent(query)
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodedQuery}`)

  if (!response.ok) {
    throw new Error('Failed to search shows')
  }

  return response.json()
}

export async function fetchShow(id: number): Promise<TvShow | null> {
  const response = await fetch(`${BASE_URL}/shows/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch show ${id}`)
  }

  return response.json()
}
