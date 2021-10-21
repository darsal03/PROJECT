import { meals } from '../models/Meals.js'

export const postMeal = async (req, res, next) => {
  try {
    const { name, calories } = req.body
    const date = new Date()
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
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
      time: {
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
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
    const { calories } = req.query
    const foundMeals = await meals.find()

    if (foundMeals) {
      res.status(200).json({ foundMeals })
    } else {
      return res.status(404).json({
        msg: 'meals not found',
      })
    }
    if (calories === 'desc') {
      const mealsDesc = foundMeals.sort((a, b) => {
        return b.calories - a.calories
      })
      return res.status(200).json({ mealsDesc })
    }

    if (calories === 'asc') {
      const mealsAsc = foundMeals.sort((a, b) => {
        return a.calories - b.calories
      })
      return res.status(200).json({ mealsAsc })
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
    const foundMeal = await meals.findOne({ _id: id })
    if (foundMeal) {
      return res.status(200).json({ meal: foundMeal })
    }
  } catch (error) {
    next(error)
  }
}

export const updateMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const foundMeal = await meals.findOne({ _id: id })
    if (!foundMeal) {
      return res.status(404).json({
        msg: 'could not find that meal',
      })
    } else {
      const updateMeal = await meals.findByIdAndUpdate(id, updates, { new: true })
      return res.status(200).json({ meal: updateMeal })
    }
  } catch (error) {
    next(error)
  }
}
