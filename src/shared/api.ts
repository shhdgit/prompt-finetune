import httpClient from '../shared/http_client'

export const getTrend = () => httpClient.get('/trend')
