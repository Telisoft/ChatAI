import axios from 'axios'

// default
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    const { data } = response
    if (data.success === false) {
      return Promise.reject(data.message)
    } else {
      return data.data ? data.data : data
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message
    switch (error.status) {
      case 500:
        message = 'Internal Server Error'
        break
      case 401:
        message = 'Invalid credentials'
        break
      case 404:
        message = 'Sorry! the data you are looking for could not be found'
        break
      default:
        message = error.message || error
    }
    return Promise.reject(message)
  },
)

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    return axios.get(url, params)
  }

  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data)
  }

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data)
  }

  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config })
  }

  /*
   file upload update method
   */
  updateWithFile = (url, data) => {
    const formData = new FormData()
    for (const k in data) {
      formData.append(k, data[k])
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    }
    return axios.put(url, formData, config)
  }

  /*
   file upload post method
   */
  createWithFile = (url, data) => {
    const formData = new FormData()
    for (const k in data) {
      formData.append(k, data[k])
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    }
    return axios.post(url, formData, config)
  }
}

const getLoggedinUser = () => {
  const user = localStorage.getItem('authUser')
  if (!user) {
    return null
  } else {
    return JSON.parse(user)
  }
}

export { APIClient, setAuthorization, getLoggedinUser }
