export const getMeals = (id, query) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}/meals/?userId=${id}&startYear=${query.dateFrom.year}&startMonth=${query.dateFrom.month}&startDay=${query.dateFrom.day}&endYear=${query.dateTo.year}&endMonth=${query.dateTo.month}&endDay=${query.dateTo.day}&startHour=${query.timeFrom.hour}&startMinutes=${query.timeFrom.minute}&endHour=${query.timeTo.hour}&endMinutes=${query.timeTo.minute}&asc=${query.asc}&desc=${query.desc}`,
    {
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .then((data) => data.foundMeals)
}
