export const auth = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json(null)
  } else {
    req.user = req.session.user
    next()
  }
}
