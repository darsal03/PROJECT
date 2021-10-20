import { meals } from '../models/Meals.js'

export const createMeal = async (req, res, next) => {
  try {
    const { name, calories } = req.body
    if (name.length < 4 || name.length > 50) {
      return res.status(400).json({
        msg: 'meal name must be between 5 and 50 charachters',
      })
    }
    if (calories < 100 || calories > 12000) {
      return res.status(400).json({
        msg: 'calories must be between 1000 and 12000',
      })
    }
    const newMeal = await meals.create({
      name,
      calories,
    })

    if (newMeal) {
      return res.status(200).json({
        msg: 'meal successfully created',
      })
    }
  } catch (error) {
    next(error)
  }
}

export const getMeals = async (req, res, next) => {
  try {
    const Meals = await meals.find()
    if (Meals) {
      return res.status(200).json({ Meals })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteMeal = await meals.deleteOne({ _id: id })
    if (deleteMeal) {
      return res.status(200).json({
        msg: 'meal successfully deleted',
      })
    }
  } catch (error) {
    next(error)
  }
}

export const getMealById = async (req, res, next) => {
  try {
    const id = req.params.id
    const meal = await meals.findOne({ _id: id })
    if (meal) {
      return res.status(200).json({ meal: meal })
    }
  } catch (error) {
    next(error)
  }
}
