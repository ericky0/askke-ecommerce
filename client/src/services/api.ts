import axios from 'axios'

const BASE_URL = 'http://localhost:3001'
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRjOTViMzc5YzEwODVkMzYyODY4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTU1ODI2NiwiZXhwIjoxNjU5ODE3NDY2fQ.qzuh728GKBbc3jcuHuvCMBPMs9WH4f5RGZ-aWQoVpMY'

const publicRequest = axios.create({
  baseURL: BASE_URL
})

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
})

export { publicRequest, userRequest }
