import { createUser } from '../api/users'
import { useMutation } from 'react-query'

function useRegistration() {
  const { mutate } = useMutation(createUser)

  return [mutate]
}

export default useRegistration
