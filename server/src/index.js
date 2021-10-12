import express from 'express'
import { configCors } from './middlewares/cors.js'
import { globalErrorHandler } from './middlewares/error.js'
import { router } from './router.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(configCors)

app.use('/api', router)

// eslint-disable-next-line no-unused-vars
app.use(globalErrorHandler)

mongoose
  .connect(
    `mongodb+srv://darso:${process.env.DB_PASS}@cluster0.p4ngx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log('connected to DB'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} | ${new Date().toLocaleTimeString()} `)
})
