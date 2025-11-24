"use client";

import { useState } from "react";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { usePublicGuard } from "@/hooks/usePublicGuard";

export default function RegisterPage() {
  usePublicGuard();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await registerUser({ name, email, password });

    setLoading(false);

    if (res) {
      alert("Registro exitoso 🎉 Ahora inicia sesión");
      router.push("/login");
    } else {
      alert("Error registrando usuario");
    }
  }

  return (
    <div
      className="
      flex items-center justify-center
      px-4 py-24
      animate-fade
    "
    >
      <div
        className="
        w-full max-w-md bg-white/80 backdrop-blur-md
        border border-[#1F2B37]/10
        p-8 shadow-lg
        rounded-none
        animate-fade
      "
      >
        <h1 className="text-3xl font-bold text-[#1F2B37] mb-1">Crear Cuenta</h1>
        <p className="text-[#1F2B37]/70 text-sm mb-6">
          Completa el formulario para registrarte
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#1F2B37]/80 mb-1">
              Nombre completo
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="
              w-full px-3 py-2 text-sm
              border border-[#1F2B37]/20
              bg-white
              rounded-none
              focus:outline-none
              focus:ring-2 focus:ring-[#4F76F6]/50
              focus:border-[#4F76F6]
              transition-all text-black
            "
              placeholder="Juan Pérez"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#1F2B37]/80 mb-1">
              Correo electrónico
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="
              w-full px-3 py-2 text-sm
              border border-[#1F2B37]/20
              bg-white
              rounded-none
              focus:outline-none
              focus:ring-2 focus:ring-[#4F76F6]/50
              focus:border-[#4F76F6]
              transition-all text-black
            "
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#1F2B37]/80 mb-1">
              Contraseña
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="
              w-full px-3 py-2 text-sm
              border border-[#1F2B37]/20
              bg-white
              rounded-none
              focus:outline-none
              focus:ring-2 focus:ring-[#4F76F6]/50
              focus:border-[#4F76F6]
              transition-all text-black
            "
              placeholder="********"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="
            w-full py-2
            bg-[#4F76F6]
            text-white 
            font-medium
            rounded-none
            shadow-md
            hover:bg-[#4F76F6]/90
            active:scale-[0.98]
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#1F2B37]/70">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="
            text-[#4F76F6] font-medium
            hover:underline
          "
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
