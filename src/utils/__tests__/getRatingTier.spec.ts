import { describe, expect, it } from 'vitest'
import { getRatingTier } from '@/utils/getRatingTier'

describe('getRatingTier', () => {
  it('maps ratings to soft tiers on a 0-10 scale', () => {
    expect(getRatingTier(8.5)).toBe('excellent')
    expect(getRatingTier(7)).toBe('good')
    expect(getRatingTier(5)).toBe('fair')
    expect(getRatingTier(3)).toBe('low')
    expect(getRatingTier(null)).toBe('none')
  })
})
