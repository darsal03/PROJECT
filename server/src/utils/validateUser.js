import Validator from 'fastest-validator'

const v = new Validator()

const userSchema = {
  username: {
    type: 'string',
    min: 6,
    max: 30,
    messages: {
      stringMin: 'username should be atleast 6 characters',
      stringMax: 'username should not exceed 40 characters',
    },
  },
  email: {
    type: 'email',
    max: 100,
    messages: {
      stringMax: 'email should not exceed 100 characters',
    },
  },
  password: {
    type: 'string',
    min: 9,
    max: 30,
    messages: {
      stringMin: 'password should be atleast 9 characters',
      stringMax: 'passwordshould not exceed 30 characters',
    },
  },
}

const check = v.compile(userSchema)

export const validateUser = async ({ username, email, password }) => {
  const validate = await check({ username, email, password })
  if (validate) {
    const messages = validate.map((e) => e.message)
    return messages
  }
}
