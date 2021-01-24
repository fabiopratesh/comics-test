type Result = {
  code: number,
  status: string,
  attributionText: string,
  data: {
    offset: number,
    limit: number,
    total: number,
    count: number
  }
}

type Item = {
  resourceURI: string,
  name: string
}

type Collection = {
  available: number,
  collectionURI: string,
  items: Item[],
  returned: number
}

export type {
  Result,
  Collection
}
