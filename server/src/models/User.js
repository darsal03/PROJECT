import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    minlength: [6, 'should contain at least 6 characters'],
    maxlength: [30, 'should not exceed 30 characters'],
    required: [true, 'username is required'],
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  email: {
    type: String,
    maxlength: [100, 'should not exceed 100 characters'],
    required: [true, 'email is required'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'moderator', 'admin'],
  },
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})

export const Users = model('users', userSchema)
