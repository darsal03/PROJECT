import { useQuery } from 'react-query'
import { getUser } from '../api/users'

export function useGetUser(id) {
  return useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) })
}
