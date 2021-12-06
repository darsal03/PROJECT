import { createContext, useContext, useMemo, useState } from 'react'

import { useLogin } from '../hooks/use-login'
import { useLogout } from '../hooks/use-logout'

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      setUser(data)
    },
    onError: (error) => alert(JSON.stringify(error, null, 2)),
  })

  const { mutate: logout } = useLogout({
    onSuccess: () => {
      setUser(null)
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
