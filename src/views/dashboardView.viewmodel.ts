export const selectTodayTrend = (timelost: number) => {
  if (timelost < 10) return '☀️'
  if (timelost >= 10 && timelost < 20) return '🌤️'
  if (timelost >= 20 && timelost < 30) return '☁️'
  if (timelost >= 30) return '🌧️'
}
