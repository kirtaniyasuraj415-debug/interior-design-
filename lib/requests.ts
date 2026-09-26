export async function readPayload(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("Please send a valid form.");
  if (request.headers.get("sec-fetch-site") === "cross-site") throw new Error("Please submit this form from our website.");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Please fill out the form.");
  const chunks: Uint8Array[] = []; let size = 0;
  for (;;) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > 12000) { await reader.cancel(); throw new Error("Your message is too long."); } chunks.push(value); }
  const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { const payload = JSON.parse(new TextDecoder().decode(bytes)); if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error(); return payload; } catch { throw new Error("Please send a valid form."); }
}
export function cleanEmail(value: unknown) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
  return email;
}
export function formError(error: unknown) { return Response.json({ error: error instanceof Error ? error.message : "Please check your details." }, { status: 400 }); }
