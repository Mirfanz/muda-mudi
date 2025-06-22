export function compareDate(
  startDate: Date | string,
  endDate?: Date | string,
  includeTime: boolean = false,
): number {
  const d1 = new Date(startDate).setHours(0, 0, 0, 0);
  const d2 = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;
  const now = new Date().setHours(0, 0, 0, 0);
  const divider = includeTime ? 1 : 1000 * 60 * 60 * 24;

  if (!d2) return (d1 - now) / divider;
  if (now < d1) return (d1 - now) / divider;
  if (now > d2) return (d2 - now) / divider;

  return 0;
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
