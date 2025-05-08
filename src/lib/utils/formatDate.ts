export const formatDate = (
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "en-US"
): string => {
  if (!date) return "-";

  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-"; // Invalid date

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
      parsedDate
    );
  } catch {
    return "-";
  }
};
