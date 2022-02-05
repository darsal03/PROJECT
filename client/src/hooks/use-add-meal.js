import { useMutation, useQueryClient } from 'react-query'
import { addMeal } from '../api/meals'

export function useAddMeal() {
  const queryClient = useQueryClient()
  return useMutation(addMeal, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: 'meals' }),
  })
}
