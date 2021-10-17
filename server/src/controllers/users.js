import { users } from '../models/User.js'

import bcrypt from 'bcrypt'

export const getUsers = async (req, res, next) => {
  try {
    const users = await users.find()
    if (users) {
      res.status(200).json({ users })
    }
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await users.findOne({ _id: id })
    if (user) {
      res.send(user)
    }
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const foundUser = await users.findOne({ username })
    const foundEmail = await users.findOne({ email })
    if (foundUser) {
      return res.status(400).json({
        msg: 'this username is already registered',
      })
    }
    if (foundEmail) {
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
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const foundUser = await users.findOne({ username })
    const checkPassword = await bcrypt.compare(password, foundUser.hashedPassword)
    if (foundUser && checkPassword) {
      res.status(200).json({
        msg: 'logged in',
      })
      req.session.userId = foundUser._id
    } else {
      return res.status(500).json({
        msg: 'login failed',
      })
    }
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err
    }
    res.redirect('/login')
  })
}
