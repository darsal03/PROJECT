import { useQuery } from 'react-query'
import { getMeals } from '../api/meals'

export function useMeals(id, dateFrom, dateTo) {
  return useQuery({
    queryKey: 'meals',
    queryFn: () => getMeals(id, dateFrom, dateTo),
  })
}
