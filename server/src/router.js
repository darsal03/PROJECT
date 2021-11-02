import express from 'express'

import { ROLES } from './constants.js'

import { auth } from './middlewares/auth.js'

import { forbidFor } from './middlewares/forbidFor.js'

import {
  getUserById,
  getUsers,
  createUser,
  login,
  logout,
  updateUser,
} from './controllers/users.js'

import { postMeal, getMeals, deleteMeal, getMealById, updateMeal } from './controllers/meals.js'

export const router = express.Router()

/**
 * Users
 */
router.get('/users', auth, forbidFor([ROLES.User]), getUsers)
router.post('/users', createUser)
router.get('/users/:id', auth, getUserById)
router.post('/login', login)
router.post('/logout', auth, logout)
router.patch('/users/:id', auth, updateUser)
/*
 Meals 
*/
router.get('/meals', auth, getMeals)
router.get('/meals/:id', auth, getMealById)
router.post('/meals', auth, postMeal)
router.delete('/meals/:id', auth, deleteMeal)
router.patch('/meals/:id', auth, updateMeal)
