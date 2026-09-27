export function database(): any {
  throw new Error(
    "Persistent database storage is not configured for this Vercel deployment."
  );
}
