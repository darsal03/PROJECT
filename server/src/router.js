import express from 'express'
import { getUser, getUsers, createUser } from './controllers/users.js'

export const router = express.Router()

/**
 * Users
 */
router.get('/users', getUsers)
router.post('/users', createUser)
router.get('/users/:id', getUser)
