import { useAuth } from '../contexts/auth'
import React from 'react'

function Dashboard({ username }) {
  return (
    <>
      <h1>{`Hello ${username}`}</h1>
    </>
  )
}

function Home() {
  const { user } = useAuth()

  return <div>{user ? <Dashboard username={user.username} /> : 'not authed'}</div>
}

export default Home
