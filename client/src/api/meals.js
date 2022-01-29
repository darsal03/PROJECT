export const getMeals = (id, query) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}/meals/?userId=${id}&dateFrom=${query.dateFrom.date}&dateTo=${query.dateTo.date}`,
    {
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .then((data) => data.foundMeals)
}
