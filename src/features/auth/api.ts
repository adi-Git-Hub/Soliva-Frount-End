import { useMutation } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "./schema";

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => authClient.login(input),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (input: RegisterInput) => authClient.register(input),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authClient.logout(),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) =>
      authClient.forgotPassword(input.email),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput & { token: string }) =>
      authClient.resetPassword({ token: input.token, password: input.password }),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => authClient.verifyEmail(token),
  });
}
