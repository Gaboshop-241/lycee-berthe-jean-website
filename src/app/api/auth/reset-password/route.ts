import { SITE_URL } from "@/app/seo";
import { requestPasswordReset } from "@/lib/school/auth";
import {
  checkRateLimit,
  getClientIp,
  isSameOriginRequest,
  isSuspiciousMiddlewareBypass,
  jsonSecurityResponse,
} from "@/lib/school/security";

function jsonError(message: string, status = 400) {
  return jsonSecurityResponse({ message }, { status });
}

function genericResetResponse() {
  return jsonSecurityResponse({
    message:
      "Si ce compte existe, un lien de réinitialisation vient d'être envoyé.",
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request) || isSuspiciousMiddlewareBypass(request)) {
    return jsonError("Requête refusée.", 403);
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return jsonError("Format de requête invalide.", 415);
    }

    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return genericResetResponse();
    }

    const ip = getClientIp(request);
    const ipLimit = checkRateLimit(`reset:ip:${ip}`, {
      limit: 8,
      windowMs: 60 * 60 * 1000,
      lockMs: 60 * 60 * 1000,
    });
    const emailLimit = checkRateLimit(`reset:email:${email}`, {
      limit: 3,
      windowMs: 60 * 60 * 1000,
      lockMs: 60 * 60 * 1000,
    });

    if (!ipLimit.allowed || !emailLimit.allowed) {
      const response = genericResetResponse();
      response.headers.set(
        "Retry-After",
        String(Math.max(ipLimit.retryAfterSeconds, emailLimit.retryAfterSeconds)),
      );
      return response;
    }

    await requestPasswordReset(email, `${SITE_URL}/gestion/connexion`);

    return genericResetResponse();
  } catch (error) {
    void error;
    return genericResetResponse();
  }
}
