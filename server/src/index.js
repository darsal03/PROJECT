import express from 'express'
import { configCors } from './middlewares/cors.js'
import { globalErrorHandler } from './middlewares/error.js'
import { router } from './router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(configCors)

app.use('/api', router)

// eslint-disable-next-line no-unused-vars
app.use(globalErrorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} | ${new Date().toLocaleTimeString()} `)
})
