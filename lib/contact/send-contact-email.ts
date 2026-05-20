import { ServerClient } from "postmark";
import { SOCIAL } from "@/lib/portfolio-data";
import type { ContactInput } from "@/lib/validations/contact";

function getContactToEmail(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    SOCIAL.emailDisplay ||
    "michaeljogoh@gmail.com"
  );
}

function getContactFromEmail(): string {
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!from) {
    throw new Error(
      "Set CONTACT_FROM_EMAIL to a verified Postmark sender signature (e.g. contact@yourdomain.com).",
    );
  }
  return from;
}

export function isContactEmailConfigured(): boolean {
  return Boolean(process.env.POSTMARK_SERVER_TOKEN?.trim());
}

export async function sendContactEmail(data: ContactInput): Promise<void> {
  const serverToken = process.env.POSTMARK_SERVER_TOKEN?.trim();
  if (!serverToken) {
    throw new Error(
      "Contact email is not configured. Set POSTMARK_SERVER_TOKEN in .env.local.",
    );
  }

  const client = new ServerClient(serverToken);
  const textBody = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    data.message,
  ].join("\n");

  const htmlBody = `
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `.trim();

  try {
    await client.sendEmail({
      From: getContactFromEmail(),
      To: getContactToEmail(),
      ReplyTo: data.email,
      Subject: `Portfolio inquiry from ${data.name}`,
      TextBody: textBody,
      HtmlBody: htmlBody,
      MessageStream: process.env.POSTMARK_MESSAGE_STREAM?.trim() || "outbound",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    throw new Error(message);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
