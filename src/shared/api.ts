import httpClient from '../shared/http_client'

export interface ExampleFormValue {
  Q: string
  A: string
}

export interface EntityFormValue {
  name: string
  desc: string
}

export const modifyExample = (req: ExampleFormValue) => httpClient.put('/examples', req)

export const modifyEntity = (req: EntityFormValue) => httpClient.put('/entities', req)
