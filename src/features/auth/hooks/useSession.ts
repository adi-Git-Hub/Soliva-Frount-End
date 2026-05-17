import { useSyncExternalStore } from "react";

import { authClient, type Session } from "@/lib/auth-client";

function subscribe(callback: () => void) {
  return authClient.subscribe(() => callback());
}

function getSnapshot(): Session | null {
  return authClient.getSession();
}

function getServerSnapshot(): Session | null {
  return null;
}

export function useSession(): Session | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
