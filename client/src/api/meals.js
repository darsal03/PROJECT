export const getMeals = (id, dateFrom, dateTo) => {
  if (dateFrom && dateFrom !== null) {
    // აქ უნდა ვაკეთებდე მსგავს რამეს, ? როგორც ხედავ მარტო კონკრეტული სიტუაციისთვის მაქვს ეს კოდი.
    const { startYear, startMonth, startDay } = dateFrom
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/meals/?userId=${id}&startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}`,
      {
        credentials: 'include',
      }
    )
      .then((res) => res.json())
      .then((data) => data.foundMeals)
  }

  return fetch(`${process.env.REACT_APP_API_BASE_URL}/meals/?userId=${id}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => data.foundMeals)
}
