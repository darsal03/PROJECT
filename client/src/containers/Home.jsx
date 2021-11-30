import { AuthContext } from '../Context'
import React, { useContext } from 'react'

function Home() {
  const { user } = useContext(AuthContext)

  return <div>{user ? console.log(user.username) : 'unauth'}</div>
}

export default Home
