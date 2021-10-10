import { useQuery } from 'react-query'
import { getUsers } from '../api/users'

export const useUsers = () => {
  return useQuery({ queryKey: 'users', queryFn: getUsers, initialData: [] })
}
