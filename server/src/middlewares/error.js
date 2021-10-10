// eslint-disable-next-line no-unused-vars
export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err })
}
