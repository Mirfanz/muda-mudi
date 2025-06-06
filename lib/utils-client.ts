export function getEventStatus(
  startDate: Date,
  endDate: Date,
): "soon" | "passed" | "ongoing" {
  const today = new Date().setHours(0, 0, 0, 0);
  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(0, 0, 0, 0);

  if (today < start) return "soon";
  if (today > end) return "passed";

  return "ongoing";
}
