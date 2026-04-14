export const ADMIN_COOKIE_NAME = "sbng_admin_session";
export const ADMIN_PASSWORD = "6186";
const ADMIN_COOKIE_VALUE = "granted";

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function isAdminSessionValue(value: string | undefined): boolean {
  return value === ADMIN_COOKIE_VALUE;
}

export function getAdminCookieValue(): string {
  return ADMIN_COOKIE_VALUE;
}
