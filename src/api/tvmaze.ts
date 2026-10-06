import type { SearchResult, TvShow } from './types'

const BASE_URL = 'https://api.tvmaze.com'
const USER_AGENT = 'tv-show-dashboard/1.0 (frontend-assignment)'

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    })

    if (response.status === 429 && attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
      continue
    }

    return response
  }

  throw new Error('Failed to fetch after retries')
}

export async function fetchShowsPage(page: number): Promise<TvShow[]> {
  const response = await fetchWithRetry(`${BASE_URL}/shows?page=${page}`)

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
  const response = await fetchWithRetry(`${BASE_URL}/search/shows?q=${encodedQuery}`)

  if (!response.ok) {
    throw new Error('Failed to search shows')
  }

  return response.json()
}

export async function fetchShow(id: number): Promise<TvShow | null> {
  const response = await fetchWithRetry(`${BASE_URL}/shows/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch show ${id}`)
  }

  return response.json()
}
