import { createContext, useContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { useLogin } from '../hooks/use-login'
import { useLogout } from '../hooks/use-logout'
import { me } from '../api/users'

import { SpinIcon } from '../components/icons/spinner'
import { Spinner } from '../containers/Meals'

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
    queryFn: me,
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
    return (
      <Spinner>
        <SpinIcon />
      </Spinner>
    )
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
