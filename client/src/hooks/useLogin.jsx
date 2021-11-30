import { useMutation } from 'react-query'
import { loginUser } from '../api/users'

function useLogin() {
  return useMutation(loginUser)
}

export default useLogin
