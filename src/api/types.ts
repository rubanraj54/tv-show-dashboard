export interface TvShowImage {
  medium: string
  original: string
}

export interface TvShowRating {
  average: number | null
}

export interface TvShowCountry {
  name: string
  code: string
}

export interface TvShowNetwork {
  name: string
  country?: TvShowCountry | null
}

export interface TvShowSchedule {
  time: string
  days: string[]
}

export interface TvShow {
  id: number
  name: string
  genres: string[]
  rating: TvShowRating
  status: string
  premiered: string | null
  ended: string | null
  runtime: number | null
  language: string
  schedule: TvShowSchedule
  network: TvShowNetwork | null
  webChannel: TvShowNetwork | null
  officialSite: string | null
  summary: string | null
  image: TvShowImage | null
  url: string
}

export interface SearchResult {
  score: number
  show: TvShow
}
