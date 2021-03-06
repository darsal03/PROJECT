import mongoose from 'mongoose'
const { Schema, model } = mongoose

const mealSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      minlength: [6, 'should be at least 6 characters'],
      maxlength: [40, 'should not exceed  40 characters'],
      required: [true, 'meal name is required'],
    },
    calories: {
      type: Number,
      min: [300, 'should be at least 300 calories'],
      max: [5000, 'should not exceed 5000 calories'],
      required: [true, 'calorie count is required'],
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

mealSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

export const Meals = model('meals', mealSchema)
