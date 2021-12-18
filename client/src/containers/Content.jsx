import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth'
import { AuthContainer } from './Login'
import { Meals } from './Meals'
import { NotFound } from '../components/NotFound'

function UnAuthApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  )
}

function AuthApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Meals />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export function Content() {
  const { user } = useAuth()

  return <>{user ? <AuthApp /> : <UnAuthApp />}</>
}
