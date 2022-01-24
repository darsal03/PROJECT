import { useQuery } from 'react-query'
import { getMeals } from '../api/meals'

export function useMeals(id, query) {
  return useQuery({
    queryKey: ['meals', query],
    queryFn: () => getMeals(id, query),
  })
}
