/**
 * In-Memory Sliding-Window Rate Limiter
 * 
 * Protects administrative authentication against automated brute-force attacks.
 * Limits login failures to 5 attempts per 15 minutes per client IP.
 */

interface AttemptRecord {
  timestamps: number[];
}

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;

// In-memory tracker keyed by client IP
const ipAttempts = new Map<string, AttemptRecord>();

// Clean up stale IP records every 30 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipAttempts.forEach((record, ip) => {
      record.timestamps = record.timestamps.filter((t) => now - t < WINDOW_MS);
      if (record.timestamps.length === 0) {
        ipAttempts.delete(ip);
      }
    });
  }, 30 * 60 * 1000);
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const record = ipAttempts.get(ip);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  // Filter timestamps within sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < WINDOW_MS);

  if (record.timestamps.length >= MAX_FAILED_ATTEMPTS) {
    const oldest = record.timestamps[0];
    const retryAfterMs = WINDOW_MS - (now - oldest);
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds,
    };
  }

  return {
    allowed: true,
    remainingAttempts: MAX_FAILED_ATTEMPTS - record.timestamps.length,
  };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = ipAttempts.get(ip) || { timestamps: [] };
  record.timestamps.push(now);
  ipAttempts.set(ip, record);
}

export function resetRateLimit(ip: string): void {
  ipAttempts.delete(ip);
}
