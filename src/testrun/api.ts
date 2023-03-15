import httpClient from '../shared/http_client'

export const getTestDetail = () => httpClient.get('/trend')
