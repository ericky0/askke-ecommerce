import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router } from './routes'
import cors from 'cors'

// config
const app = express()
dotenv.config()

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
app.use(router)

app.listen(process.env.PORT || 3001, () =>
  console.log('🔥 backend server is running at http://localhost:3001')
)
