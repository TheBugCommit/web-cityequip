import axios from 'axios'

const apiInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Origin': `${process.env.HOST}:${process.env.PORT}`,
    'x-api-key': process.env.API_KEY
  }
})

const get = async (endpoint) => {
    const response = await apiInstance.get(endpoint)
    return response.data
}

const apiService = {
    get,
    // post, put, delete irían aquí usando apiInstance.post, etc.
}

export default apiService