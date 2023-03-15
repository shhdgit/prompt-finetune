import httpClient from '../shared/http_client'

export const getQuestions = (d: string) => httpClient.get(`/questions/${d}`)
