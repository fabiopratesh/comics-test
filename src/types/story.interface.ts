import { Result, Collection } from './common'

interface StoryResult extends Result {
  data: {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Story[]
  }
}

type Story = {
  id: number,
  title: string,
  description: string,
  resourceURI: string,
  type: string,
  modified: Date,
  thumbnail: {
    path: string,
    extension: string
  } | null,
  characters: Collection
  comics: Collection
}

export type {
  Story,
  StoryResult
}
