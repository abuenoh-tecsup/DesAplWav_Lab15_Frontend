import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  User,
} from "@/types/auth";

import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ------------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------------
export async function login(data: LoginRequest): Promise<LoginResponse | null> {
  try {
    const res = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Error en login");
      return null;
    }

    const result: LoginResponse = await res.json();

    // 1. Guardar token
    useAuthStore.getState().setToken(result.token);

    // 2. Obtener perfil del usuario
    const meRes = await authFetch("/users/me");
    if (!meRes.ok) {
      console.error("Error obteniendo /me");
      return result; // token sigue siendo válido, se puede manejar luego
    }

    const user: User = await meRes.json();

    // 3. Guardar usuario con roles
    useAuthStore.getState().setUser(user);

    return result;
  } catch (error) {
    console.error("Error login:", error);
    return null;
  }
}

// ------------------------------------------------------------------
// REGISTER
// ------------------------------------------------------------------
export async function registerUser(
  data: SignUpRequest
): Promise<SignUpResponse | null> {
  try {
    const res = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Error en registro");
      return null;
    }

    const result: SignUpResponse = await res.json();
    return result;
  } catch (error) {
    console.error("Error registro:", error);
    return null;
  }
}

// ------------------------------------------------------------------
// PETICIONES PROTEGIDAS CON TOKEN
// ------------------------------------------------------------------
export async function authFetch(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
}
