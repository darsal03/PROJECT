const apiUrl = process.env.REACT_APP_API_BASE_URL

export const getUsers = () => fetch(`${apiUrl}/users`)

export const createUser = (form) => {
  fetch(`${apiUrl}/users/` || 'http://localhost:8080/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
}
