import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { useLogin } from '../hooks/use-login'
import { useLogout } from '../hooks/use-logout'

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      setUser(data)
      navigate('/home', { replace: true })
    },
    onError: (error) => alert(JSON.stringify(error, null, 2)),
  })

  const { mutate: logout } = useLogout({
    onSuccess: () => {
      setUser(null)
      navigate('/auth', { replace: true })
    },
    onError: (error) => alert(JSON.stringify(error, null, 2)),
  })

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
