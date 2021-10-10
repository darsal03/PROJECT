const apiUrl = process.env.REACT_APP_API_BASE_URL

export const getUsers = () => fetch(`${apiUrl}/users`)
