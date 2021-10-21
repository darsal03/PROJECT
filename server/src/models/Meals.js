import mongoose from 'mongoose'
const { Schema, model } = mongoose

const mealSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    date: {
      day: Number,
      month: Number,
      year: Number,
    },
    time: {
      hour: Number,
      minute: Number,
    },
  },
  { timestamps: true }
)

export const meals = model('meals', mealSchema)
