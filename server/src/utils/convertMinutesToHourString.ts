/**
 * Converte minutos em horas -> Ex: "21:44"
 * @param minutes 
 * @returns 
 */
export function convertMinutesToHourString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutesLeft).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}