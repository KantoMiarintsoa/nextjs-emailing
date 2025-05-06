import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
}