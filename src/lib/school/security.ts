import { NextResponse, type NextRequest } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
  lockedUntil?: number;
};

type RateLimitStore = Map<string, RateLimitEntry>;

declare global {
  var bjSchoolRateLimitStore: RateLimitStore | undefined;
}

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_LOCK_MS = 15 * 60 * 1000;

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const managementSecurityHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  Pragma: "no-cache",
  Expires: "0",
  "X-Robots-Tag": "noindex, nofollow",
};

export function getRateLimitStore() {
  globalThis.bjSchoolRateLimitStore ??= new Map();
  return globalThis.bjSchoolRateLimitStore;
}

function cleanupRateLimitStore(store: RateLimitStore, now: number) {
  if (store.size < 500) return;

  for (const [key, entry] of store) {
    if (entry.resetAt < now && (!entry.lockedUntil || entry.lockedUntil < now)) {
      store.delete(key);
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    forwardedIp ||
    "unknown"
  );
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) return true;

  return origin === new URL(request.url).origin;
}

export function checkRateLimit(
  key: string,
  options: {
    limit: number;
    windowMs?: number;
    lockMs?: number;
  },
) {
  const now = Date.now();
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const lockMs = options.lockMs ?? DEFAULT_LOCK_MS;
  const store = getRateLimitStore();
  cleanupRateLimitStore(store, now);

  const current = store.get(key);

  if (current?.lockedUntil && current.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.lockedUntil - now) / 1000),
    };
  }

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return { allowed: true, retryAfterSeconds: 0 };
  }

  current.count += 1;

  if (current.count > options.limit) {
    current.lockedUntil = now + lockMs;
    store.set(key, current);

    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(lockMs / 1000),
    };
  }

  store.set(key, current);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimit(...keys: string[]) {
  const store = getRateLimitStore();
  keys.forEach((key) => store.delete(key));
}

export function jsonSecurityResponse(
  body: Record<string, unknown>,
  init: ResponseInit = {},
) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...Object.fromEntries(new Headers(init.headers).entries()),
      ...managementSecurityHeaders,
    },
  });
}

export function withManagementSecurityHeaders(response: NextResponse) {
  Object.entries(managementSecurityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export function isSuspiciousMiddlewareBypass(request: NextRequest | Request) {
  return request.headers.has("x-middleware-subrequest");
}
