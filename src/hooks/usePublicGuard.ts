"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

/**
 * Guard para páginas públicas (login, register) que no deberían ver usuarios autenticados.
 */
export function usePublicGuard() {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      // Usuario ya logueado → redirigir al home
      router.push("/");
    }
  }, [token, router]);
}
