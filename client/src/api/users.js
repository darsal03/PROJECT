const apiUrl = process.env.REACT_APP_API_BASE_URL

export const getUsers = () => fetch(`${apiUrl}/users`)

export const createUser = (form) => {
  const { username, email, password } = form
  fetch(`${apiUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
}
