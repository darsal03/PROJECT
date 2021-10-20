import mongoose from 'mongoose'
const { Schema, model } = mongoose

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  date: Date,
})

export const meals = model('meals', mealSchema)
