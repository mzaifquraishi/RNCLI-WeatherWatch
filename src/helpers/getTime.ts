export function getTime(dateString: string) {
  if (dateString === '') {
    return '12 AM';
  }
  const inputDate = new Date(dateString);
  const today = new Date();

  let hours = inputDate.getHours();
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const timeString = `${hours} ${period}`;

  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Ma',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (isToday) {
    return timeString;
  } else {
    dateString =
      inputDate.getDate() + ' ' + monthNames[inputDate.getMonth()] + '\n';
    return `${dateString} ${timeString}`;
  }
}
