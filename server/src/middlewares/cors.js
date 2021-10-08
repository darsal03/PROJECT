import cors from 'cors'

const corsWhitelist = ['http://localhost:3000']

export const configCors = (...args) =>
  cors({
    origin: function (origin, callback) {
      if (corsWhitelist.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })(...args)
