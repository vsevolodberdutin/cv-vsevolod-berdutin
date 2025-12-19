/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate required field
 */
export function isRequired(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim().length > 0;
}

/**
 * Validate minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Validate pattern (regex)
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}
