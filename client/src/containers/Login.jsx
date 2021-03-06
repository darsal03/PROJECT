import { useRegistration } from '../hooks/use-registration'
import { styled } from '../stitches.config'
import { useAuth } from '../contexts/auth'

import React, { useState } from 'react'

const Views = {
  Login: 'login',
  Register: 'register',
}

const Box = styled('div', {
  margin: '8rem auto',
  maxWi: '60rem',
  borderRadius: '0.5rem',
  boxShadow: ' 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)',
})

const H1 = styled('h1', {
  padding: '3rem 0 0 0',
  textAlign: 'center',
  fontSize: '$heading',
  fontWeight: '400',
})

const Text = styled('p', {
  margin: '1rem 0 0 0',
  textAlign: 'center',
  fontSize: '$body',
})

const Label = styled('label', {
  margin: '1rem 0 0 0',
  fontSize: '$title',
})

const LinkBackButton = styled('button', {
  fontSize: '$body',
  color: '#008000',
})

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: '5rem 12rem',
})

const Input = styled('input', {
  margin: '1rem 0 0 0',
  padding: '1rem',
  height: '5rem',
  fontSize: '$body',
  border: '0.1rem solid #808080',
  borderRadius: '1rem',
})

const FormButton = styled('button', {
  margin: '3rem auto 0',
  padding: '1rem 7rem',
  fontSize: '$title',
  borderRadius: '1rem',
  border: '0.1rem solid #008000',
  transition: 'ease-in-out 0.3s',
  color: '#008000',
  '&:hover': {
    boxShadow: ' 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)',
    bg: '#008000',
    color: '#fff',
  },
  '@mobile': {
    padding: '1rem 5rem',
  },
})

function Login({ onViewChange }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const { login } = useAuth()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.username || !form.password) {
      return alert('form must not be empty')
    }

    if (form.username.length < 6) {
      return alert('username must contain more than 6 characters')
    }

    if (form.password.length < 9) {
      return alert('password should be atleast 9 characters')
    }

    login(form)

    e.target.reset()
  }

  return (
    <Box>
      <H1>Login</H1>
      <Text>
        don't have an account?{' '}
        <LinkBackButton type="button" onClick={onViewChange}>
          register
        </LinkBackButton>
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          value={form.username}
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          value={form.password}
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <FormButton>Login</FormButton>
      </Form>
    </Box>
  )
}

function Register({ onViewChange }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { mutate } = useRegistration()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

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

    mutate(form, {
      onSuccess: () => {
        onViewChange()
      },
    })

    e.target.reset()
  }

  return (
    <Box>
      <H1>Create an account</H1>
      <Text>
        already have an account?{' '}
        <LinkBackButton type="button" onClick={onViewChange}>
          Log in
        </LinkBackButton>
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          value={form.username}
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          value={form.email}
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          value={form.password}
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          value={form.confirmPassword}
          name="confirmPassword"
          placeholder="confirm password"
          onChange={handleInputChange}
        />
        <FormButton>Register</FormButton>
      </Form>
    </Box>
  )
}

export function AuthContainer() {
  const [view, setView] = useState(Views.Login)

  return (
    <div className="wrapper">
      {view === Views.Login && <Login onViewChange={() => setView(Views.Register)} />}
      {view === Views.Register && <Register onViewChange={() => setView(Views.Login)} />}
    </div>
  )
}
