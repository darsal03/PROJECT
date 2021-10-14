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

app.use('/api', router)

// eslint-disable-next-line no-unused-vars
app.use(globalErrorHandler)

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to DB'))
  .catch((err) => console.log(err))

const sessionStore = new MongoStore({
  mongoUrl: process.env.DB_URL,
  collectionName: 'sessions',
})

app.use(
  session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} | ${new Date().toLocaleTimeString()} `)
})
