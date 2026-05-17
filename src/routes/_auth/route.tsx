import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (authClient.getSession()) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <header className="border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-8">
          <Link
            to="/"
            className="font-display text-2xl tracking-tight text-foreground"
          >
            Soliva
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
