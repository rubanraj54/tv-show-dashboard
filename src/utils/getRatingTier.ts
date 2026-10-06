export type RatingTier = 'excellent' | 'good' | 'fair' | 'low' | 'none'

export function getRatingTier(rating: number | null): RatingTier {
  if (rating === null) {
    return 'none'
  }

  if (rating >= 8) {
    return 'excellent'
  }

  if (rating >= 6) {
    return 'good'
  }

  if (rating >= 4) {
    return 'fair'
  }

  return 'low'
}
