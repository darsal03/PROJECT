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
      startYear,
      startHour,
      startMinutes,
      endDay,
      endMonth,
      endYear,
      endHour,
      endMinutes,
      asc,
      desc,
    } = req.query

    if (userId !== req.user.id && [ROLES.User, ROLES.Moderator].includes(req.user.role)) {
      return res.status(403).json({})
    }

    let query = { userId }

    if (startYear) query = { ...query, 'parsedDate.year': { $gte: startYear } }
    if (endYear) {
      query = {
        ...query,
        'parsedDate.year': startYear ? { $gte: startYear, $lte: endYear } : { $lte: endYear },
      }
    }

    if (startDay) query = { ...query, 'parsedDate.day': { $gte: startDay } }
    if (endDay) {
      query = {
        ...query,
        'parsedDate.day': startDay ? { $gte: startDay, $lte: endDay } : { $lte: endDay },
      }
    }

    if (startMonth) query = { ...query, 'parsedDate.month': { $gte: startMonth } }
    if (endMonth) {
      query = {
        ...query,
        'parsedDate.month': startMonth ? { $gte: startMonth, $lte: endMonth } : { $lte: endMonth },
      }
    }

    if (startHour) query = { ...query, 'parsedTime.hour': { $gte: startHour } }
    if (endHour) {
      query = {
        ...query,
        'parsedTime.hour': startHour ? { $gte: startHour, $lte: endHour } : { $lte: endHour },
      }
    }
    if (startMinutes) query = { ...query, 'parsedTime.minute': { $gte: startMinutes } }
    if (endMinutes) {
      query = {
        ...query,
        'parsedTime.minute': startMinutes
          ? { $gte: startMinutes, $lte: endMinutes }
          : { $lte: endMinutes },
      }
    }

    console.log(query)

    const foundMeals = await Meals.find(query).sort(
      (asc === 'true' && { createdAt: 'asc' }) || (desc === 'true' && { createdAt: 'desc' })
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
      foundMeal.userId.toString() !== req.user.toString() &&
      [ROLES.User, ROLES.Moderator].includes(req.user.role)
    ) {
      return res.status(403).json({})
    } else {
      await Meals.deleteOne({ id })
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
