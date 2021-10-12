const users = [
  { id: '1', name: 'Goga' },
  { id: '2', name: 'Davit' },
  { id: '3', name: 'Lazare' },
]

export const getUsers = (req, res, next) => {
  try {
    // access db or whatever
    res.send(users)
  } catch (err) {
    next(err)
  }
}

export const getUser = (req, res, next) => {
  try {
    const user = users.find((user) => user.id === req.params.id)

    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ error: 'Thre is no user with such id' })
    }
  } catch (err) {
    next(err)
  }
}

export const createUser = (req, res) => {
  const { name } = req.body
  const userFound = users.find((user) => user.name === name)
  if (userFound) {
    return res.status(400).json({
      msg: 'this user already exists',
    })
  } else {
    const user = { id: Math.random().toString(), name }
    users.push(user)
    console.log(users)
  }
}
