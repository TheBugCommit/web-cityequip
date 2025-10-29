import axios from 'axios'

const apiInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Origin': `${process.env.HOST}:${process.env.PORT}`,
    'x-api-key': process.env.API_KEY
  }
})

apiInstance.interceptors.response.use(
  response => response,
  error => {
    let err;
    if (error.response) {
      err = new Error(error.response.data.message || 'Error in server response');
    } else if (error.request) {
      err = new Error('Can\'t connect to server.');
    } else {
      err = new Error(error.message);
    }
    return Promise.reject(err)
  }
)

const get = async (endpoint) => {
  const response = await apiInstance.get(endpoint)
  return response.data
}

const post = async (endpoint, data) => {
  const response = await apiInstance.post(endpoint, data)
  return response.data
}

const put = async (endpoint, data) => {
  const response = await apiInstance.put(endpoint, data)
  return response.data
}

const deleteMethod = async (endpoint) => {
  const response = await apiInstance.delete(endpoint)
  return response.data
}

const apiService = {
  get,
  post,
  put,
  delete: deleteMethod,
}

export default apiService