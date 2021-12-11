import { useMutation } from 'react-query'
import { createUser } from '../api/users'

export function useRegistration(config) {
  return useMutation(createUser, config)
}
