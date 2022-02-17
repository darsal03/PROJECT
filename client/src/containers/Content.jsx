import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { UserEdit } from './UserEdit'
import { AuthContainer } from './Login'
import { UsersPage } from './UsersPage'
import { Meals } from './Meals'
import { useAuth } from '../contexts/auth'
import { NotFound } from '../components/NotFound'
import { ProfilePage } from '../containers/ProfilePage'

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

function AuthApp({ user }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Meals />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        {(user.role === 'admin' || user.role === 'moderator') && (
          <>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user">
              <Route path=":id" element={<UserEdit />} />
            </Route>
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export function Content() {
  const { user } = useAuth()

  return <>{user ? <AuthApp user={user} /> : <UnAuthApp />}</>
}
