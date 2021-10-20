import express from 'express'
import { getUserById, getUsers, createUser, login, logout } from './controllers/users.js'
import { createMeal } from './controllers/meals.js'
export const router = express.Router()

/**
 * Users
 */
router.get('/users', getUsers)
router.post('/users', createUser)
router.get('/users/:id', getUserById)
router.post('/login', login)
router.post('/logout', logout)
/*
 Meals 
*/
// router.get('/meals',getMeals)
router.post('/meals', createMeal)
//router.get('meal/:id',getMealById)
//router.delete('meals'deleteMeal)
