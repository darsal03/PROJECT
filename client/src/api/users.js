const apiUrl = process.env.REACT_APP_API_BASE_URL

export const getUsers = () => fetch(`${apiUrl}/users`)

export const createUser = ({ username, email, password }) => {
  fetch(`${apiUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
}

export const loginUser = ({ username, password }) => {
  fetch(`${apiUrl}/login/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
}
