import express from 'express'
import mongoose from 'mongoose'
require('dotenv').config()
import { router } from './routes'
import cors from 'cors'
import helmet from 'helmet'

// config
const app = express()

// database connection
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log('📦 Connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })

// middlewares
app.use(cors())
app.use(express.json())
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
)
app.use(router)

app.listen(process.env.PORT || 3001, () =>
  console.log('🔥 backend server is running at http://localhost:3001')
)
