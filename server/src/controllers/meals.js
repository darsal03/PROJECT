import { Meals } from '../models/Meals.js'

export const postMeal = async (req, res, next) => {
  try {
    const { name, calories, date: ISOdate } = req.body
    const userId = req.user._id
    const date = new Date(ISOdate)

    const newMeal = await Meals.create({
      userId,
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
      userId,
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

    if (
      userId !== req.user._id.toString() &&
      (req.user.role === 'user') | (req.user.role === 'moderator')
    ) {
      return res.status(403).json({})
    }

    const foundMeals = await Meals.find({
      userId,
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
    const foundMeal = await Meals.findOne({ _id: id })

    if (foundMeal.userId.toString() !== req.user._id.toString() && req.user.role === 'user') {
      return res.status(403).json({})
    } else {
      await Meals.deleteOne({ _id: id })
      res.status(200).json({})
    }
  } catch (error) {
    next(error.message)
  }
}

export const getMealById = async (req, res, next) => {
  try {
    const id = req.params.id
    const foundMeal = await Meals.findOne({ _id: id })

    if (foundMeal.userId.toString() !== req.user._id.toString() && req.user.role === 'user') {
      return res.status(403).json({})
    } else {
      res.status(200).json({ foundMeal })
    }
  } catch (error) {
    next(error.message)
  }
}

export const updateMeal = async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const foundMeal = await Meals.findOne({ _id: id })

    if (foundMeal.userId.toString() !== req.user._id.toString() && req.user.role === 'user') {
      return res.status(403).json({})
    } else {
      await Meals.findByIdAndUpdate(id, updates, { new: true })
      res.status(200).json({})
    }
  } catch (error) {
    next(error.message)
  }
}
