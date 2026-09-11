export const ADMIN_COOKIE_NAME = "unfold_admin_session";

// Secret key resolution - checks ADMIN_SESSION_SECRET first, then ADMIN_JWT_SECRET
function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL SECURITY ERROR: ADMIN_SESSION_SECRET is not configured in environment variables.");
    }
    return "dev-unfold-admin-fallback-session-secret-987654321";
  }
  return secret;
}

/**
 * Universal constant-time comparison to mitigate side-channel timing attacks.
 * Compatible with Edge Runtime, Node.js, and browser contexts.
 */
function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  let mismatch = a.length === b.length ? 0 : 1;
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= charA ^ charB;
  }
  return mismatch === 0;
}

/**
 * Validates provided credentials against environment variables.
 * Uses constant-time string comparison to eliminate timing side-channel leakage.
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const configuredEmail = (process.env.ADMIN_EMAIL || "admin@unfold.store").trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD || "unfold@admin2026";

  const emailMatches = timingSafeCompare(email.trim().toLowerCase(), configuredEmail);
  const passwordMatches = timingSafeCompare(password, configuredPassword);

  return emailMatches && passwordMatches;
}

/**
 * Generates an HMAC SHA-256 signature for token payloads using Web Crypto API.
 * 100% compatible with Edge Runtime and Node.js.
 */
async function getSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(data);

  const subtleCrypto = globalThis.crypto?.subtle;
  if (!subtleCrypto) {
    throw new Error("Web Crypto API (crypto.subtle) is unavailable in current runtime.");
  }

  const key = await subtleCrypto.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await subtleCrypto.sign("HMAC", key, messageData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export interface AdminSessionPayload {
  email: string;
  role: "ADMIN";
  iat: number;
  exp: number;
  jti: string;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 admin session token.
 * Max validity: 8 hours.
 */
export async function createAdminToken(email: string): Promise<string> {
  const now = Date.now();
  const exp = now + 8 * 60 * 60 * 1000; // 8 hours
  const jti = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Math.random().toString(36).substring(2);

  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    role: "ADMIN",
    iat: now,
    exp,
    jti,
  };

  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString("base64url");
  const signature = await getSignature(base64Payload, getSessionSecret());
  return `${base64Payload}.${signature}`;
}

/**
 * Verifies an admin token and returns the payload if signature is valid and token is unexpired.
 */
export async function verifyAdminToken(token: string): Promise<{ email: string; role: "ADMIN" } | null> {
  try {
    if (!token || typeof token !== "string" || !token.includes(".")) {
      return null;
    }

    const [base64Payload, signature] = token.split(".");
    if (!base64Payload || !signature) {
      return null;
    }

    const expectedSignature = await getSignature(base64Payload, getSessionSecret());
    if (!timingSafeCompare(signature, expectedSignature)) {
      return null;
    }

    const payloadJson = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;

    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }

    if (payload.role !== "ADMIN") {
      return null;
    }

    return { email: payload.email, role: "ADMIN" };
  } catch {
    return null;
  }
}
