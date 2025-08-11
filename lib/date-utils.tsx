import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

export const isValidServerDateTime = (dateString: string) => {
  const isoUtcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return isoUtcRegex.test(dateString) && !isNaN(Date.parse(dateString));
};

export const formatToMySQLUTC = (isoString: string) =>
  dayjs.utc(isoString).format("YYYY-MM-DD HH:mm:ss");

export const getDates = (date?: string) => (date ? new Date(date) : new Date());

const DATE_FORMATS = {
  D_MMM_YYYY: "D MMM YYYY",
  D_MMM_YYYY_HH_MM_A: "D MMM YYYY h:mm A",
  YYYY_MM_DD_HH_mm_ss: "YYYY-MM-DD HH:mm:ss",
  YYYYMMDD_HHmmss: "YYYYMMDD-HHmmss",
};

export const now = dayjs();
export const nowDate = (date: string) => dayjs(date);

export const format = (
  date: string,
  type: keyof typeof DATE_FORMATS = "D_MMM_YYYY"
) => {
  const formatString = DATE_FORMATS[type];
  return dayjs(date).format(formatString);
};

export const formatLocalTime = (
  date: string,
  type: keyof typeof DATE_FORMATS = "D_MMM_YYYY"
) => {
  const formatString = DATE_FORMATS[type];
  return dayjs.utc(date).tz("Asia/Kolkata").format(formatString);
};

export const displayFormatFromNow = (
  date: string,
  type: keyof typeof DATE_FORMATS = "D_MMM_YYYY"
) => {
  const diff = dayjs(date).diff(dayjs(), "day");

  if (Math.abs(diff) > 7) {
    return format(date, type);
  }
  return dayjs(date).fromNow();
};

export const formatNow = (
  date: string,
  type: keyof typeof DATE_FORMATS = "D_MMM_YYYY"
) => {
  const diff = dayjs(date).diff(dayjs(), "day");

  if (Math.abs(diff) > 7) {
    return format(date, type);
  }
  return dayjs(date).fromNow();
};
