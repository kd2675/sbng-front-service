import assert from "node:assert/strict";

process.env.SBNG_ADMIN_PASSWORD = "test-password";
process.env.SBNG_ADMIN_SESSION_SECRET = "test-session-secret";

const {
  getAdminCookieValue,
  isAdminAuthConfigured,
  isAdminSessionValue,
  verifyAdminPassword,
} = await import("../app/adminAuth.ts");

assert.equal(isAdminAuthConfigured(), true);
assert.equal(verifyAdminPassword("test-password"), true);
assert.equal(verifyAdminPassword("wrong-password"), false);

const sessionValue = getAdminCookieValue();
assert.ok(sessionValue.length > 20);
assert.equal(isAdminSessionValue(sessionValue), true);
assert.equal(isAdminSessionValue("granted"), false);

console.log("SBNG admin authentication checks passed.");
