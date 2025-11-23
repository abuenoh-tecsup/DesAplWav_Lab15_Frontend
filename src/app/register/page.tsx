"use client";

import { useState } from "react";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w/full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Crear Cuenta</h1>
        <p className="text-gray-600 text-sm mb-6">
          Completa el formulario para registrarte
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Juan Pérez"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="********"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md font-medium transition"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-gray-900 font-medium hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
