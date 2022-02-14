import { Users } from '../models/User.js'

import { validateUser } from '../utils/validateUser.js'

import bcrypt from 'bcrypt'

import { ROLES } from '../constants.js'

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

    if (id !== req.user.id && [ROLES.User].includes(req.user.role)) {
      return res.status(403).json({})
    }

    const foundUser = await Users.findById(id)
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
      return res.status(400).json({ error: 'email is already taken' })
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

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const { username, email, calorieLimit, image } = req.body

    if (id !== req.user.id && [ROLES.User].includes(req.user.role)) {
      return res.status(403).json({})
    }
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { username, email, calorieLimit, image },
      { new: true }
    )
    if (req.session.user.id === updatedUser.id) {
      req.session.user = updatedUser
    }

    res.status(200).json()
  } catch (error) {
    next(error.message)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id

    if (id !== req.user.id && [ROLES.User].includes(req.user.role)) {
      return res.status(403).json({})
    } else {
      await Users.findByIdAndDelete(id)
      res.status(200).json({})
    }
  } catch (error) {
    next(error.message)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const foundUser = await Users.findOne({ username })

    if (!foundUser) {
      return res.status(400).json({ error: 'user not found' })
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.hashedPassword)

    if (passwordMatch) {
      req.session.user = foundUser
      res.status(200).json({ foundUser })
    } else {
      return res.status(400).json({ error: 'incorrect username or password' })
    }
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const foundUser = await Users.findById(req.user.id)
    if (foundUser) {
      req.session.destroy((err) => {
        if (err) {
          throw err
        }

        res.status(200).json({})
      })
    }
  } catch (error) {
    next(error)
  }
}

export const me = async (req, res) => {
  if (!req.user) {
    res.status(400).json({ error: "User session doesn't exist" })
  } else {
    res.status(200).json(req.user)
  }
}
