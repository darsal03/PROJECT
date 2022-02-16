import { useMutation, useQueryClient } from 'react-query'
import { deleteMeal } from '../api/meals'

export function useDeleteMeal() {
  const queryClient = useQueryClient()

  return useMutation(deleteMeal, {
    onSuccess: () => queryClient.invalidateQueries('meals'),
  })
}
