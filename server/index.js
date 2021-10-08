import express from 'express'
import cors from 'cors'

const app = express()
const users = [
  { id: '1', name: 'Goga' },
  { id: '2', name: 'Davit' },
]

/**
 * CORS
 */
const corsWhitelist = ['http://localhost:3000']
app.use(
  cors({
    origin: function (origin, callback) {
      if (corsWhitelist.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

app.get('/api/users', (req, res) => {
  res.status(200).send(users)
})

app.get('/', (req, res) => {
  res.status(200).send('Hayasasaa')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Listening 0.0.0.0 (localhost) on ${PORT}`)
})
