import React, { useState } from 'react'

const Views = {
  Login: 'login',
  Register: 'register',
}

function Login({ onClick }) {
  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={onClick}>
        Register
      </button>
    </div>
  )
}

function Register({ onClick }) {
  return (
    <div>
      <h1>Register</h1>
      <button type="button" onClick={onClick}>
        Login
      </button>
    </div>
  )
}

export function AuthContainer() {
  const [view, setView] = useState(Views.Login)

  return (
    <div className="wrapper">
      {view === Views.Login && <Login onClick={() => setView(Views.Register)} />}
      {view === Views.Register && <Register onClick={() => setView(Views.Login)} />}
    </div>
  )
}
