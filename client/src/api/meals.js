export const getMeals = (id) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/meals/?userId=${id}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => data.foundMeals)
}
