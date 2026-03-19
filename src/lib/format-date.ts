const LONG_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", { dateStyle: "long" });

export function formatLongDate(date: string): string {
  return LONG_DATE_FORMATTER.format(new Date(date));
}
