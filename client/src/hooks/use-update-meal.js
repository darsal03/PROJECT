import { useMutation, useQueryClient } from 'react-query'
import { updateMeal } from '../api/meals'

export function useUpdateMeal() {
  const queryClient = useQueryClient()

  return useMutation(updateMeal, {
    onSuccess: () => queryClient.invalidateQueries('meals'),
  })
}
