import httpClient from '../shared/http_client'

export const getQuestionList = (date: string) => httpClient.get(`/questions/${date}`)

export const getQuestion = (id: string) => httpClient.get(`/questions/${id}`)

export const executeQuestion = (id: string) => httpClient.post('/execute/manual', { id })
