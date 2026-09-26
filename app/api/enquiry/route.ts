import { database } from "@/lib/database";
import { readPayload, cleanEmail, formError } from "@/lib/requests";
export async function POST(request: Request) {
  let email: string; let name: string; let message: string;
  try {
    const payload = await readPayload(request);
    if (payload.website) throw new Error("Please leave the website field empty.");
    email = cleanEmail(payload.email);
    name = typeof payload.name === "string" ? payload.name.trim() : "";
    message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!name || name.length > 100) throw new Error("Please enter your name (up to 100 characters).");
    if (!message || message.length > 3000) throw new Error("Please enter a message (up to 3,000 characters).");
  } catch (error) { return formError(error); }
  try {
    const db = database();
    const previous = await db.prepare("SELECT id FROM enquiries WHERE email = ? AND message = ? AND created_at > ? LIMIT 1").bind(email, message, Date.now() - 300000).first<{id:string}>();
    if (previous) return Response.json({ success: true, id: previous.id });
    const count = await db.prepare("SELECT COUNT(*) AS count FROM enquiries WHERE email = ? AND created_at > ?").bind(email, Date.now() - 3600000).first<{count:number}>();
    if ((count?.count || 0) >= 5) return Response.json({ error: "You have already sent several enquiries. Please try again in an hour." }, { status: 429 });
    const id = crypto.randomUUID();
    await db.prepare("INSERT INTO enquiries (id, name, email, message, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, name, email, message, Date.now()).run();
    return Response.json({ success: true, id }, { status: 201 });
  } catch { console.error("Enquiry persistence unavailable"); return Response.json({ error: "Your enquiry couldn’t be saved just now. Your details are still here—please try again shortly." }, { status: 503 }); }
}
