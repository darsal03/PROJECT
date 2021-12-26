import { useMutation } from 'react-query'
import { updateProfile } from '../api/users'

export function useUpdateDets() {
  return useMutation(updateProfile)
}
