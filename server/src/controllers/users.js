import { users } from '../models/User.js'

import bcrypt from 'bcrypt'

export const getUsers = async (req, res, next) => {
  try {
    const Users = await users.find()
    if (Users) {
      res.status(200).json({ Users })
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
      req.session.userId = foundUser._id
      res.status(200).json({
        msg: 'logged in',
      })
    } else {
      return res.status(400).json({
        msg: 'login failed',
      })
    }
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const foundUser = await users.findOne({ _id: req.session.userId })
    if (foundUser) {
      req.session.destroy((err) => {
        if (err) {
          throw err
        }
      })
    }
    res.status(200).json({
      msg: 'logged out',
    })
  } catch (error) {
    next(error)
  }
}
