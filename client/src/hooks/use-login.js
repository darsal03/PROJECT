import { useMutation } from 'react-query'
import { loginUser } from '../api/users'

export function useLogin(config) {
  return useMutation(loginUser, config)
}
