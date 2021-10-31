import { Meals } from '../models/Meals.js'

export const postMeal = async (req, res, next) => {
  try {
    const { name, calories, date: ISOdate } = req.body
    const date = new Date(ISOdate)
    const newMeal = await Meals.create({
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
    const {
      startDay,
      startMonth,
      startHour,
      startMinutes,
      startYear,
      endDay,
      endMonth,
      endYear,
      endHour,
      endMinutes,
    } = req.query

    const foundMeals = await Meals.find({
      'parsedDate.day': { $gte: startDay, $lte: endDay },
      'parsedDate.month': { $gte: startMonth, $lte: endMonth },
      'parsedDate.year': { $gte: startYear, $lte: endYear },
      'parsedTime.hour': { $gte: startHour, $lte: endHour },
      'parsedTime.minute': { $gte: startMinutes, $lte: endMinutes },
    })

    if (foundMeals) {
      res.status(200).json({ foundMeals })
    } else {
      return res.status(404).json({})
    }
  } catch (error) {
    next(error)
  }
}

export const deleteMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteMeal = await Meals.deleteOne({ _id: id })
    if (deleteMeal) {
      return res.status(200).json({})
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
    const foundMeal = await Meals.findOne({ _id: id })
    if (!foundMeal) {
      return res.status(404).json({})
    } else {
      res.status(200).json({ foundMeal })
    }
  } catch (error) {
    next(error)
  }
}

export const updateMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const updateMeal = await Meals.findByIdAndUpdate(id, updates, { new: true })
    if (updateMeal) {
      res.status(200).json({ updateMeal })
    } else {
      return res.status(404).json({})
    }
  } catch (error) {
    next(error)
  }
}
