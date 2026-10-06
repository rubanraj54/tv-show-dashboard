import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ShowCard from '@/components/molecules/ShowCard.vue'
import type { TvShow } from '@/api/types'

const show: TvShow = {
  id: 42,
  name: 'Test Show',
  genres: ['Drama'],
  rating: { average: 8.2 },
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

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/shows/:id', component: { template: '<div />' } }],
})

describe('ShowCard', () => {
  it('renders show info and links to the detail page', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(ShowCard, {
      props: { show },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Test Show')
    expect(wrapper.text()).toContain('8.2')
    expect(wrapper.find('a').attributes('href')).toBe('/shows/42')
    expect(wrapper.find('.poster__placeholder').text()).toBe('T')
  })
})
