export function dateStatus(
  startDate: Date | string,
  endDate?: Date | string,
  dateOnly = false,
): number {
  const now = new Date();
  let start = new Date(startDate);
  let end = endDate ? new Date(endDate) : undefined;

  if (dateOnly) {
    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    if (end) end.setHours(0, 0, 0, 0);
  }

  let result: number;

  if (!end)
    result = (start.getTime() - now.getTime()) / (dateOnly ? 86400000 : 1);
  else if (now < start)
    result = (start.getTime() - now.getTime()) / (dateOnly ? 86400000 : 1);
  else if (now > end)
    result = (end.getTime() - now.getTime()) / (dateOnly ? 86400000 : 1);
  else result = 0;

  return Math.floor(result);
}
export function age(birthDate: Date | string): number {
  const date = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate()))
    return age - 1;

  return age;
}
