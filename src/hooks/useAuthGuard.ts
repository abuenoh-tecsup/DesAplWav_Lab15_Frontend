"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

/**
 * Guard universal para rutas protegidas y según rol.
 *
 * @param rolesAllowed (opcional) => array de roles que sí pueden entrar
 */
export function useAuthGuard(rolesAllowed?: string[]) {
  const { token, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 1. No autenticado → redirigir a login
    if (!token) {
      router.push("/login");
      return;
    }

    // 2. Si se requiere roles y el user aún no carga → esperar
    if (rolesAllowed && !user) return;

    // 3. Verificación de roles
    if (rolesAllowed && user) {
      const hasPermission = user.roles.some((role) =>
        rolesAllowed.includes(role)
      );

      if (!hasPermission) {
        router.push("/"); // sin permiso → redirigir al home
      }
    }
  }, [token, user, rolesAllowed, router]);
}
