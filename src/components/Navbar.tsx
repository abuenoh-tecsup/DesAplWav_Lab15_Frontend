"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const { token, logout } = useAuthStore();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            ProductStore
          </Link>

          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Productos
            </Link>

            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>

            {/* Si hay token ➜ mostrar botón Cerrar Sesión */}
            {token ? (
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Cerrar sesión
              </button>
            ) : (
              /* Si NO hay token ➜ mostrar login */
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
