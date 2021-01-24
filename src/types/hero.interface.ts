import { Result, Collection } from './common'

interface HeroResult extends Result {
  data: {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Hero[]
  }
}

type Hero = {
  id: number,
  name: string,
  description: string,
  thumbnail: {
    path: string,
    extension: string
  },
  resourceURI: string,
  stories: Collection
}

export type {
  Hero,
  HeroResult
}
