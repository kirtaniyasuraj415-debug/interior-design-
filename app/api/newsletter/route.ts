import { database } from "@/lib/database";
import { readPayload, cleanEmail, formError } from "@/lib/requests";
export async function POST(request: Request) {
  let email: string;
  try { const payload = await readPayload(request); email = cleanEmail(payload.email); } catch (error) { return formError(error); }
  try {
    await database().prepare("INSERT INTO subscribers (email, created_at) VALUES (?, ?) ON CONFLICT(email) DO NOTHING").bind(email, Date.now()).run();
    return Response.json({ success: true });
  } catch { console.error("Newsletter persistence unavailable"); return Response.json({ error: "We couldn’t save your email just now. Please try again shortly." }, { status: 503 }); }
}
