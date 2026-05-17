import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/features/auth/api";

const searchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/_auth/verify-email")({
  validateSearch: (s) => searchSchema.parse(s),
  component: VerifyEmailRoute,
});

function VerifyEmailRoute() {
  const { token } = Route.useSearch();
  const verify = useVerifyEmail();

  useEffect(() => {
    if (token) verify.mutate(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="space-y-6 text-center">
      <h1 className="font-display text-3xl text-foreground">Verify email</h1>

      {!token ? (
        <p className="text-sm text-muted-foreground">
          We've sent a verification link to your inbox. Click it to confirm your
          email — then come back here to sign in.
        </p>
      ) : verify.isPending ? (
        <p className="text-sm text-muted-foreground">Verifying your email…</p>
      ) : verify.isSuccess ? (
        <>
          <p className="text-sm text-muted-foreground">
            Email verified. You can now sign in.
          </p>
          <Button asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </>
      ) : verify.isError ? (
        <p className="text-sm text-destructive">
          This link is invalid or has expired. Please request a new one.
        </p>
      ) : null}
    </div>
  );
}
