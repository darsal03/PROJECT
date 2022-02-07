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

export const addMeal = ({ name, date, calories }) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/meals`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ name, date, calories }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const deleteMeal = (id) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/meals/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
}

export const updateMeal = ({ id, name, date, calories }) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/meals/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({ name, date, calories }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
