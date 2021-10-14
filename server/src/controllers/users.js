import { users } from '../models/User.js'

import bcrypt from 'bcrypt'

const userArray = [
  //is this array needed anymore?
  { id: '1', name: 'Goga' },
  { id: '2', name: 'Davit' },
  { id: '3', name: 'Lazare' },
]

export const getUsers = (req, res, next) => {
  //should i change this ?
  try {
    // access db or whatever
    res.send(userArray)
  } catch (err) {
    next(err)
  }
}

export const getUser = (req, res, next) => {
  try {
    const user = userArray.find((user) => user.id === req.params.id)

    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ error: 'Thre is no user with such id' })
    }
  } catch (err) {
    next(err)
  }
}

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const userFound = await users.findOne({ username })
    const emailFound = await users.findOne({ email })
    if (userFound) {
      return res.status(400).json({
        msg: 'this username is already registered',
      })
    }
    if (emailFound) {
      return res.status(400).json({
        msg: 'this email is already registered',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await users.create({
      username,
      email,
      hashedPassword,
    })
    if (newUser) {
      res.status(201).json({
        msg: 'registration was successful',
      })
    }
    console.log(newUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'something went wrong',
    })
  }
}
