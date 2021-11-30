import useLogin from './hooks/useLogin'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const { mutate, data } = useLogin()

  useEffect(() => {
    console.log({ data })
  }, [data])

  return (
    <AuthContext.Provider value={{ user, setUser, mutate, data }}>{children}</AuthContext.Provider>
  )
}
