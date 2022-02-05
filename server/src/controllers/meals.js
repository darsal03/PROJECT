import { Meals } from '../models/Meals.js'

import { ROLES } from '../constants.js'

export const postMeal = async (req, res, next) => {
  try {
    const { name, calories, date: ISOdate } = req.body
    const userId = req.user.id
    const date = new Date(ISOdate)

    const newMeal = await Meals.create({
      userId,
      name,
      calories,
      date: ISOdate,
    })
    if (newMeal) {
      return res.status(200).json({})
    }
  } catch (error) {
    next(error.message)
  }
}

export const getMeals = async (req, res, next) => {
  try {
    const { userId, dateFrom, dateTo, asc, desc } = req.query

    if (userId !== req.user.id && [ROLES.User, ROLES.Moderator].includes(req.user.role)) {
      return res.status(403).json({})
    }

    let query = { userId }

    if (dateFrom) {
      query = { ...query, date: { $gte: dateFrom } }
    }
    if (dateTo) {
      query = { ...query, date: { $lte: dateTo } }
    }
    if (dateFrom && dateTo) {
      query = { ...query, date: { $gte: dateFrom, $lte: dateTo } }
    }

    const foundMeals = await Meals.find(query).sort(
      (asc === 'true' && { date: 'asc' }) || (desc === 'true' && { date: 'desc' })
    )

    if (foundMeals) {
      res.status(200).json({ foundMeals })
    } else {
      return res.status(404).json({})
    }
  } catch (error) {
    next(error)
  }
}

export const getMealById = async (req, res, next) => {
  try {
    const id = req.params.id
    const foundMeal = await Meals.findById(id)

    if (
      foundMeal.userId.toString() !== req.user.id &&
      [ROLES.User, ROLES.Moderator].includes(req.user.role)
    ) {
      return res.status(403).json({})
    } else {
      res.status(200).json({ foundMeal })
    }
  } catch (error) {
    next(error.message)
  }
}

export const deleteMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const foundMeal = await Meals.findById(id)

    if (
      foundMeal.userId.toString() !== req.user.id.toString() &&
      [ROLES.User, ROLES.Moderator].includes(req.user.role)
    ) {
      return res.status(403).json({})
    } else {
      await Meals.findByIdAndDelete(id)
      res.status(200).json({})
    }
  } catch (error) {
    next(error.message)
  }
}

export const updateMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const foundMeal = await Meals.findById(id)

    if (
      foundMeal.userId.toString() !== req.user.id &&
      [ROLES.User, ROLES.Moderator].includes(req.user.role)
    ) {
      return res.status(403).json({})
    } else {
      await Meals.findByIdAndUpdate(id, updates, { new: true })
      res.status(200).json({})
    }
  } catch (error) {
    next(error.message)
  }
}
