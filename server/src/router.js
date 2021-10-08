import express from 'express'
import { getUser, getUsers } from './controllers/users.js'

export const router = express.Router()

/**
 * Users
 */
router.get('/users', getUsers)
router.get('/users/:id', getUser)
