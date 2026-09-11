import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  validateAdminCredentials,
} from "@/lib/admin-auth";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "@/lib/admin-rate-limit";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Sliding-Window Rate Limit Check
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      console.warn(`[Security Alert] Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds || 900),
          },
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 400 }
      );
    }

    // 2. Timing-Safe Credential Verification
    const isValid = validateAdminCredentials(email, password);
    if (!isValid) {
      recordFailedAttempt(clientIp);
      console.warn(`[Security Alert] Failed admin login attempt for user: ${email} from IP: ${clientIp}`);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 3. Reset rate limit tracker on successful authentication
    resetRateLimit(clientIp);
    console.info(`[Security Notice] Successful admin login for: ${email} from IP: ${clientIp}`);

    // 4. Generate Cryptographically Signed HMAC Session Token
    const token = await createAdminToken(email);

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
      user: {
        email: email.trim().toLowerCase(),
        role: "ADMIN",
      },
    });

    // 5. Issue Secure HttpOnly Session Cookie (8 hours)
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (err) {
    console.error("[Login Handler Error]:", err);
    return NextResponse.json(
      { success: false, error: "Authentication system error. Please try again later." },
      { status: 500 }
    );
  }
}
