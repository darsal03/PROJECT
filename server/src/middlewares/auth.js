import { Users } from '../models/User.js'

export const auth = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({})
  } else {
    req.user = await Users.findOne({ _id: req.session.userId })
    next()
  }
}
