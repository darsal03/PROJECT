import { Users } from '../models/User.js'

import { validateUser } from '../utils/validateUser.js'

import bcrypt from 'bcrypt'

export const getUsers = async (req, res, next) => {
  try {
    const foundUsers = await Users.find()
    if (foundUsers) {
      res.status(200).json({ foundUsers })
    } else {
      return res.status(404).json({})
    }
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id

    if (id != req.user._id && req.user.role == 'user') {
      return res.status(400).json({
        error: 'permission denied',
      })
    }

    const foundUser = await Users.findOne({ _id: id })
    if (foundUser) {
      res.status(200).json({ foundUser })
    } else {
      return res.status(404).json({})
    }
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const validationState = await validateUser({ username, email, password })
    const foundUser = await Users.findOne({ username })
    const foundEmail = await Users.findOne({ email })

    if (validationState) {
      return res.status(400).json({ error: validationState })
    }
    if (foundUser) {
      return res.status(400).json({ error: 'user already exists' })
    }
    if (foundEmail) {
      return res.status(400).json({ erro: 'email is already taken ' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({
      username,
      email,
      hashedPassword,
    })
    if (newUser) {
      res.status(201).json({})
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
      res.status(200).json({})
    } else {
      return res.status(400).json({})
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
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
}
