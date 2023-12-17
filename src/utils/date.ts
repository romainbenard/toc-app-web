export const getAnteriorDate = (daysToSubstract: number, date?: Date) => {
  const d = date || new Date()
  d.setUTCHours(0, 0, 0, 0)

  return new Date(d.setDate(d.getDate() - daysToSubstract)).toISOString()
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US').format(new Date(date))
