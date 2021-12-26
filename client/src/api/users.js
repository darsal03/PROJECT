const apiUrl = process.env.REACT_APP_API_BASE_URL

export const getUsers = () => {
  return fetch(`${apiUrl}/users`)
}

export const createUser = ({ username, email, password }) => {
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
}

export const loginUser = ({ username, password }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => data.foundUser)
}

export const logoutUser = () => {
  return fetch(`${apiUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data.foundUser)
}

export const me = () => {
  return fetch(`${apiUrl}/me`, { credentials: 'include' }).then((res) => res.json())
}

export const updateProfile = (updatedProfile) => {
  return fetch(`${apiUrl}/users`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProfile),
  })
    .then((res) => res.json())
    .then((data) => data.updatedUser)
}
