import { useMutation, useQueryClient } from 'react-query'
import { updateUser } from '../api/users'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation(updateUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries('me')
    },
  })
}
