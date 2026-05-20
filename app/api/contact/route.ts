import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contact/send-contact-email";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send message";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
