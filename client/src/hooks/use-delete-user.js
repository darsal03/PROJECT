import { useMutation, useQueryClient } from 'react-query'
import { deleteUser } from '../api/users'

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'users' })
    },
  })
}
