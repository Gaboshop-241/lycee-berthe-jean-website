import { NextResponse } from "next/server";
import { requestPasswordReset } from "@/lib/school/auth";
import { SITE_URL } from "@/app/seo";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return jsonError("Veuillez renseigner votre adresse e-mail.");
    }

    await requestPasswordReset(email, `${SITE_URL}/gestion/connexion`);

    return NextResponse.json({
      message:
        "Si ce compte existe, un lien de réinitialisation vient d'être envoyé.",
    });
  } catch (error) {
    return jsonError(
      error instanceof Error
        ? error.message
        : "Impossible d'envoyer la demande pour le moment.",
      400,
    );
  }
}
