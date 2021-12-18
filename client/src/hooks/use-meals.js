import { useQuery } from 'react-query'
import { useAuth } from '../contexts/auth'
import { getMeals } from '../api/meals'

export function useMeals() {
  const { user } = useAuth()
  return useQuery({
    queryKey: 'meals',
    queryFn: () => getMeals(user.id),
  })
}
