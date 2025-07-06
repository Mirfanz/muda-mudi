export function dateStatus(
  startDate: Date | string,
  endDate?: Date | string,
  dateOnly = false,
): "soon" | "pass" | "now" {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate || startDate);

  if (dateOnly) {
    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
  }

  if (now < start) return "soon";
  else if (now > end) return "pass";
  else return "now";
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
