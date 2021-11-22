import { styled, css, keyframes } from '../stitches.config'

import React, { useState } from 'react'

import { useMutation } from 'react-query'

const Views = {
  Login: 'login',
  Register: 'register',
}

const Box = styled('div', {
  margin: 'auto',
  marginTop: '80px',
  maxWi: '600px',
  borderRadius: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
  '@xs': {
    width: '90%',
  },
})

const H1 = styled('h1', {
  textAlign: 'center',
  fontSize: '4rem',
  fontWeight: 'normal',
  paddingTop: '30px',
})

const Text = styled('p', {
  textAlign: 'center',
  fontSize: '1.8rem',
  marginTop: '1rem',
})

const LoginLinkButton = styled('button', {
  all: 'unset',
  color: 'green',
  fontSize: '1.8rem',
  cursor: 'pointer',
})

const Label = styled('label', {
  marginTop: '1rem',
  fontSize: '$title',
  '@xs': {
    fontSize: '$body',
  },
})

const Form = styled('form', {
  display: 'flex',
  padding: '50px 120px',
  flexDirection: 'column',
  '@xs': {
    padding: '50px 80px',
  },
})

const Input = styled('input', {
  marginTop: '10px',
  padding: '1rem',
  height: '50px',
  fontSize: '$body',
  border: '1px solid gray',
  borderRadius: '1rem',
})

const FormButton = styled('button', {
  margin: 'auto',
  marginTop: '4rem',
  padding: '10px 70px',
  fontSize: '$title',
  borderRadius: '1rem',
  border: '1px solid green',
  color: 'green',
  transition: 'ease-in-out 0.3s',
  '&:hover': {
    bg: 'green',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    color: '#fff',
  },
  '@xs': {
    padding: '8px 35px',
  },
})

function Login({ setView }) {
  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={setView}>
        Register
      </button>
    </div>
  )
}

function Register({ setView, setForm, form }) {
  console.log(process.env.REACT_APP_API_BASE_URL)
  const { isSuccess, mutate } = useMutation((form) => {
    fetch(process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
  })

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.email || !form.username || !form.password || !form.confirmPassword) {
      return alert('form must not be empty')
    }

    if (form.password.length < 9) {
      return alert('password should be atleast 9 characters')
    }

    if (form.username.length < 6) {
      return alert('username must contain more than 6 characters')
    }

    if (form.password !== form.confirmPassword) {
      return alert('passwords do not match')
    }

    mutate(form)

    setForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  if (isSuccess) {
    setView()
  }

  return (
    <Box>
      <H1>Create an account</H1>
      <Text>
        already have an account?{' '}
        <LoginLinkButton type="button" onClick={setView}>
          Log in
        </LoginLinkButton>
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <FormButton>Register</FormButton>
      </Form>
    </Box>
  )
}

export function AuthContainer() {
  const [view, setView] = useState(Views.Register)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  return (
    <div className="wrapper">
      {view === Views.Login && <Login setView={() => setView(Views.Register)} />}
      {view === Views.Register && (
        <Register setForm={setForm} form={form} setView={() => setView(Views.Login)} />
      )}
    </div>
  )
}
