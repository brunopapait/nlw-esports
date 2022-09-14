/**
 * Converte hora em minutos
 * @param time 
 * @returns 
 */
export function convertHourInMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}