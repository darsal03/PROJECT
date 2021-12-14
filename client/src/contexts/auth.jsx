import { createContext, useContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

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

  const { isFetching: isUserLoading } = useQuery({
    queryKey: 'me',
    queryFn: async () =>
      fetch(process.env.REACT_APP_API_BASE_URL + '/me', { credentials: 'include' }).then((res) =>
        res.json()
      ),
    onSuccess: (user) => {
      setUser(user)
    },
  })

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  )

  if (isUserLoading) {
    return <div>This should be a huge spinner</div>
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
