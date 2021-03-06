import express from 'express'

import { configCors } from './middlewares/cors.js'

import { globalErrorHandler } from './middlewares/error.js'

import { router } from './router.js'

import mongoose from 'mongoose'

import dotenv from 'dotenv'

import session from 'express-session'

import MongoStore from 'connect-mongo'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(configCors)

const sessionStore = new MongoStore({
  mongoUrl: process.env.DB_URL,
  collectionName: 'sessions',
})

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)
app.use('/api', router)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 8080
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT} | ${new Date().toLocaleTimeString()} `)
    })
  })
  .catch((err) => console.log(err))
