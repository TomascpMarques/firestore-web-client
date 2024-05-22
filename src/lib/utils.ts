import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function utcTimeStringToDate(utcTime: string): Date {
  return new Date(Date.parse(utcTime));
}

export function getUserName(): string {
  return sessionStorage?.getItem("user_name") || "BeachHouse";
}
