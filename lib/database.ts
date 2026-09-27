export interface DatabaseStatement {
  bind(...values: unknown[]): DatabaseStatement;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<unknown>;
}

export interface DatabaseLike {
  prepare(query: string): DatabaseStatement;
}

export function database(): DatabaseLike {
  throw new Error(
    "Persistent database storage is not configured for this Vercel deployment."
  );
}
