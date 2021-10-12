import express from 'express'
import { getUser, getUsers, createUser } from './controllers/users.js'

export const router = express.Router()

/**
 * Users
 */
router.get('/users', getUsers)
router.post('/register', createUser)
router.get('/users/:id', getUser)
router.get('/users/:id', readById)
router.put('/users/:id', updateById)
