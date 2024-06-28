import dayjs from 'dayjs'

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month')
  const endDateOfMonth = dayjs().year(year).month(month).endOf('month')

  const arrayOfDate = []

  for (let i = 1; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.day(i),
      currentMonth: false
    })
  }

  // currentMonth
  for (let i = firstDateOfMonth.date(); i <= endDateOfMonth.date(); i++) {
    arrayOfDate.push({
      date: firstDateOfMonth.date(i),
      currentMonth: true,
      today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
    })
  }

  const remaining = 42 - arrayOfDate.length

  for (let i = endDateOfMonth.date() + 1; i <= endDateOfMonth.date() + remaining; i++) {
    arrayOfDate.push({
      date: endDateOfMonth.date(i),
      currentMonth: false
    })
  }

  return arrayOfDate
}

export const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]
