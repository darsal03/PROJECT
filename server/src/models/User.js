import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'moderator', 'admin'],
  },
})

export const users = model('users', userSchema)
