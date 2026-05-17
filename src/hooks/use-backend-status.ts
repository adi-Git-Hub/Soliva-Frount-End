import { useQuery } from "@tanstack/react-query";

import { env } from "@/config/env";

// Pings the backend /health endpoint. The health endpoint lives at the API
// root (not under /api/v1), so we strip the v1 prefix.
function healthUrl(): string {
  const base = env.VITE_API_URL.replace(/\/api\/v\d+\/?$/, "");
  return `${base}/health`;
}

type Status = "up" | "down" | "checking";

export function useBackendStatus(): { status: Status; isMock: boolean } {
  const q = useQuery({
    queryKey: ["backend-status"],
    queryFn: async (): Promise<"up" | "down"> => {
      try {
        const res = await fetch(healthUrl(), {
          method: "GET",
          signal: AbortSignal.timeout(2500),
        });
        return res.ok ? "up" : "down";
      } catch {
        return "down";
      }
    },
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 10_000,
  });

  return {
    status: q.isLoading ? "checking" : (q.data ?? "down"),
    isMock: env.VITE_USE_MOCK_API,
  };
}
