// Mock auth client. Replace with Lucia / Auth.js / Clerk client when backend ships.
// Public surface is what the rest of the app consumes — keep it stable across providers.

import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["customer", "staff", "admin"]),
});
export type User = z.infer<typeof userSchema>;

export const sessionSchema = z.object({
  user: userSchema,
  expiresAt: z.string(),
});
export type Session = z.infer<typeof sessionSchema>;

const STORAGE_KEY = "soliva.session";

type Listener = (session: Session | null) => void;

class AuthClient {
  private listeners = new Set<Listener>();
  // Cached snapshot — useSyncExternalStore requires getSnapshot to return a
  // stable reference between unrelated reads. Without this cache, every read
  // re-parses JSON into a NEW object and React loops forever.
  private cached: Session | null | undefined = undefined;

  getSession(): Session | null {
    if (typeof window === "undefined") return null;
    if (this.cached !== undefined) return this.cached;
    this.cached = this.readFromStorage();
    return this.cached;
  }

  private readFromStorage(): Session | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const parsed = sessionSchema.parse(JSON.parse(raw));
      if (new Date(parsed.expiresAt) < new Date()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  private setSession(session: Session | null) {
    if (typeof window === "undefined") return;
    this.cached = session;
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.listeners.forEach((fn) => fn(session));
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  // ---- Auth flows (mocked) ----

  async login(input: { email: string; password: string }): Promise<Session> {
    await sleep(400);
    if (!input.email.includes("@")) throw new Error("Invalid email");
    const session: Session = {
      user: {
        id: "usr_demo",
        email: input.email,
        name: input.email.split("@")[0],
        role: "customer",
      },
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    this.setSession(session);
    return session;
  }

  async register(input: { email: string; password: string; name: string }): Promise<Session> {
    await sleep(500);
    const session: Session = {
      user: {
        id: `usr_${Math.random().toString(36).slice(2, 9)}`,
        email: input.email,
        name: input.name,
        role: "customer",
      },
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    this.setSession(session);
    return session;
  }

  async logout(): Promise<void> {
    await sleep(150);
    this.setSession(null);
  }

  async forgotPassword(_email: string): Promise<void> {
    await sleep(400);
  }

  async resetPassword(_input: { token: string; password: string }): Promise<void> {
    await sleep(400);
  }

  async verifyEmail(_token: string): Promise<void> {
    await sleep(400);
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export const authClient = new AuthClient();
