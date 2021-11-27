import { loginUser } from '../api/users'
import { useMutation } from 'react-query'

function useLogin() {
  const { mutate } = useMutation(loginUser)

  return [mutate]
}

export default useLogin
