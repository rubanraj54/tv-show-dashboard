import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchShowsPage, searchShows } from '@/api/tvmaze'

function mockResponse(partial: Partial<Response>): Response {
  return partial as Response
}

describe('tvmaze api', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('requests a paginated show index URL', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      mockResponse({
        ok: true,
        status: 200,
        json: async () => [],
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await fetchShowsPage(2)

    expect(fetchMock).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=2')
  })

  it('requests search with an encoded query string', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      mockResponse({
        ok: true,
        status: 200,
        json: async () => [],
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await searchShows('breaking bad')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.tvmaze.com/search/shows?q=breaking%20bad',
    )
  })

  it('returns an empty array when the show index page is missing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>().mockResolvedValue(
        mockResponse({
          ok: false,
          status: 404,
        }),
      ),
    )

    await expect(fetchShowsPage(999)).resolves.toEqual([])
  })
})
