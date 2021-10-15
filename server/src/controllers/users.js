import { users } from '../models/User.js'

import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
  try {
    console.log(req.session)
    const userArray = await users.find()
    if (userArray) {
      res.status(200).json({ userArray })
    }
  } catch (error) {
    res.status(400).json({
      msg: 'something went wrong',
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.body.id
    const user = await users.findOne({ _id: id })
    if (user) {
      res.send(user)
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (req, res) => {
  try {
    console.log(req.session)
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

export const login = async (req, res) => {
  console.log(req.session)
  const { username, password } = req.body
  const userFound = await users.findOne({ username })
  const checkPassword = await bcrypt.compare(password, userFound.hashedPassword)
  if (userFound && checkPassword) {
    res.status(200).json({
      msg: 'logged in',
    })
  } else {
    res.status(500).json({
      msg: 'login failed',
    })
  }
}

export const logout = async (req, res) => {
  res.redirect('/api/users')
}
