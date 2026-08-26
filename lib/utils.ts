import { type ClassValue, clsx } from "clsx";

/**
 * Merge conditional class names. Extend with tailwind-merge in a later
 * session if class conflicts start showing up.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
