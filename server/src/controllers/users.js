import { Users } from '../models/User.js'

import { validateUser } from '../utils/validateUser.js'

import bcrypt from 'bcrypt'

export const getUsers = async (req, res, next) => {
  try {
    const foundUsers = await Users.find()
    if (foundUsers) {
      res.status(200).json({ foundUsers })
    } else {
      return res.status(404).json({
        msg: 'could not find the users',
      })
    }
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id
    const foundUser = await Users.findOne({ _id: id })
    if (foundUser) {
      res.status(200).json({ user: foundUser })
    } else {
      return res.status(404).json({
        msg: 'could not find that user',
      })
    }
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const messages = await validateUser({ username, email, password })
    const foundUser = await Users.findOne({ username })
    const foundEmail = await Users.findOne({ email })
    if (messages) {
      return res.status(400).json({ msg: messages })
    }
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
    const newUser = await Users.create({
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
    next(error.message)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const foundUser = await Users.findOne({ username })
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
    const foundUser = await Users.findOne({ _id: req.session.userId })
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
