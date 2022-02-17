import { useMutation, useQueryClient } from 'react-query'

import { updateUser } from '../api/users'

export function useEditUser() {
  const queryClient = useQueryClient()
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
    },
  })
}
