import { parse, isValid, startOfYear, getDay } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function normalizeToIsoDate(param: string): Date {
  // if (!param || param.includes("Posted") || param.length < 1) {
  //   return null;
  // }

  const formatPatterns = [
    "dd.MM.yyyy",
    "dd/MM/yyyy",
    "MM/dd/yyyy, HH:mm:ss",
    "dd/MM/yyyy, HH:mm:ss",
    "dd/MM/yyyy HH:mm",
    "dd-MMMM-yyyy",
    "MMM d, yyyy",
    "MM-dd-yyyy, HH:mm:ss",
    "yyyy-MM-dd HH:mm:ss",
    "yyyy-MM-dd",
    "yyyy-MMMM-dd",
    "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
    "yyyy-MM-dd'T'HH:mm:ss",
  ];

  let dummy = new Date()
  let parsedDate: Date = dummy;

  formatPatterns.some((formatPattern) => {
    const tempDate = parse(param, formatPattern, new Date());
    if (isValid(tempDate)) {
      parsedDate = tempDate;
      return true;
    }
    return false;
  });

  return parsedDate;
}

export const checkYearStartIsSunday = (param: Date): boolean => {
  if (!param) return false;

  return getDay(startOfYear(param)) !== 0;
};


export function* range(start: number, end: number, step: number = 1): Generator<number> {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}


export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const getTimeFromDateTime = (dateTimeStr: string): string => {
  const completeDateTime = dateTimeStr.length <= 13 ? dateTimeStr + ':00:00' : dateTimeStr;
  const date = new Date(completeDateTime);

  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${hour}:${minute}`;
}