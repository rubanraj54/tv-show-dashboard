import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import GenreRow from '@/components/organisms/GenreRow.vue'
import type { TvShow } from '@/api/types'

function createShow(id: number): TvShow {
  return {
    id,
    name: `Show ${id}`,
    genres: ['Drama'],
    rating: { average: 7 },
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

describe('GenreRow', () => {
  it('renders one card per show', () => {
    const wrapper = mount(GenreRow, {
      props: {
        genre: 'Drama',
        shows: [createShow(1), createShow(2)],
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.find('.genre-row__title').text()).toBe('Drama')
    expect(wrapper.findAll('.show-card')).toHaveLength(2)
    expect(wrapper.find('.genre-row__more').exists()).toBe(false)
  })

  it('loads more shows when the end button is clicked', async () => {
    const wrapper = mount(GenreRow, {
      props: {
        genre: 'Drama',
        shows: [createShow(1)],
        canLoadMore: true,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await wrapper.get('.genre-row__more').trigger('click')

    expect(wrapper.emitted('loadMore')).toHaveLength(1)
  })
})
