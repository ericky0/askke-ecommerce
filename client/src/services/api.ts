import axios from 'axios'

const BASE_URL = 'http://localhost:3001'
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGRjOTViMzc5YzEwODVkMzYyODY4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTA0NzQyNiwiZXhwIjoxNjU5MzA2NjI2fQ.QbJaB-TPe4iHEeuu9rLz3_vvnaHQacrdbgFNOZJuxiI'

const publicRequest = axios.create({
  baseURL: BASE_URL
})

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
})

export { publicRequest, userRequest }
