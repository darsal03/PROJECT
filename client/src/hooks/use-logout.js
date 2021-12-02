import { useMutation } from 'react-query'
import { logoutUser } from '../api/users'

export function useLogout(config) {
  return useMutation(logoutUser, config)
}
