import { createUser } from '../api/users'
import { useMutation } from 'react-query'

function useRegistration() {
  return useMutation(createUser)
}

export default useRegistration
