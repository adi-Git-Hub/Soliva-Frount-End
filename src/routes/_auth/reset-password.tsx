import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

const searchSchema = z.object({
  token: z.string().default(""),
});

export const Route = createFileRoute("/_auth/reset-password")({
  validateSearch: (s) => searchSchema.parse(s),
  component: ResetPasswordRoute,
});

function ResetPasswordRoute() {
  const { token } = Route.useSearch();

  if (!token) {
    return (
      <div className="space-y-3 rounded-xl border border-border/40 bg-card/40 p-4 text-sm text-muted-foreground">
        <p>This link is missing its reset token. Request a new one to continue.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-foreground">New password</h1>
        <p className="text-sm text-muted-foreground">
          Choose a strong password — at least 8 characters.
        </p>
      </header>

      <ResetPasswordForm token={token} />
    </div>
  );
}
