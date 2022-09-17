import axios from 'axios'

const BASE_URL = 'http://localhost:3001'
const TOKEN = () => {
  if (
    JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user)
      .currentUser.accessToken
  ) {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user)
      .currentUser.accessToken
  } else {
    return ''
  }
}


const publicRequest = axios.create({
  baseURL: BASE_URL
})

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN()}` }
})

export { publicRequest, userRequest }
