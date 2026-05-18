import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "../api";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schema";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const forgot = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await forgot.mutateAsync(values);
    setSent(true);
  });

  if (sent) {
    return (
      <div className="space-y-2 rounded-xl border border-border/40 bg-card/40 p-4 text-sm text-muted-foreground">
        <p>If an account exists for that email, a reset link is on its way.</p>
        <p>Check your inbox — and your spam folder, just in case.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
