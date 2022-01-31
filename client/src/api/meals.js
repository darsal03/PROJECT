export const getMeals = (id, { dateFrom, dateTo, asc, desc }) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}/meals/?userId=${id}&dateFrom=${dateFrom ?? ''}&dateTo=${
      dateTo ?? ''
    }&asc=${asc}&desc=${desc}`,
    {
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .then((data) => data.foundMeals)
}
