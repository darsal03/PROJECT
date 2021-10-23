import { meals } from '../models/Meals.js'

export const postMeal = async (req, res, next) => {
  try {
    const { name, calories } = req.body
    const date = new Date()
    const newMeal = await meals.create({
      name,
      calories,
      parsedDate: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
      parsedTime: {
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
      date: date.toString(),
    })

    if (newMeal) {
      return res.status(200).json({
        msg: 'meal successfully created',
      })
    }
  } catch (error) {
    next(error.message)
  }
}

export const getMeals = async (req, res, next) => {
  try {
    const { calories } = req.query
    const foundMeals = await meals.find()

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
    if (foundMeals) {
      res.status(200).json({ foundMeals })
    } else {
      return res.status(404).json({
        msg: 'meals not found',
      })
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
    } else {
      return res.status(404).json({
        msg: 'could not find that meal ',
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
    if (!foundMeal) {
      return res.status(404).json({
        msg: 'could not find that meal',
      })
    } else {
      res.status(200).json({ meal: foundMeal })
    }
  } catch (error) {
    next(error)
  }
}

export const updateMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const updateMeal = await meals.findByIdAndUpdate(id, updates, { new: true })
    if (updateMeal) {
      res.status(200).json({ meal: updateMeal })
    } else {
      return res.status(404).json({
        msg: 'could not delete that meal',
      })
    }
  } catch (error) {
    next(error)
  }
}
