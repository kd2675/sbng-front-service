import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "sbng_admin_session";

const SESSION_PAYLOAD = "sbng-admin-session-v1";

function getAdminPassword(): string {
  return process.env.SBNG_ADMIN_PASSWORD?.trim() ?? "";
}

function getSessionSecret(): string {
  return process.env.SBNG_ADMIN_SESSION_SECRET?.trim() || getAdminPassword();
}

function secureEqual(left: string, right: string): boolean {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminPassword() && getSessionSecret());
}

export function verifyAdminPassword(password: string): boolean {
  const configuredPassword = getAdminPassword();
  return Boolean(configuredPassword) && secureEqual(password, configuredPassword);
}

export function getAdminCookieValue(): string {
  const sessionSecret = getSessionSecret();
  if (!sessionSecret) {
    return "";
  }
  return createHmac("sha256", sessionSecret).update(SESSION_PAYLOAD).digest("base64url");
}

export function isAdminSessionValue(value: string | undefined): boolean {
  const expectedValue = getAdminCookieValue();
  return Boolean(value && expectedValue) && secureEqual(value ?? "", expectedValue);
}
