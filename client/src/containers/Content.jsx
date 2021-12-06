import { useAuth } from '../contexts/auth'
import { AuthContainer } from './Login'

import React from 'react'

function Dashboard({ onClick }) {
  //im using this component for testing sake only//
  const { user } = useAuth()
  return (
    <>
      <h1>{`Hello ${user.username}`}</h1>
      <button onClick={onClick}>MEALS</button>
    </>
  )
}

function UnAuthedApp() {
  return (
    <>
      <AuthContainer />
    </>
  )
}

function AuthedApp() {
  return (
    <>
      <Dashboard />
    </>
  )
}

export function Content() {
  const { user } = useAuth()

  return <>{user ? <AuthedApp /> : <UnAuthedApp />}</>
}
