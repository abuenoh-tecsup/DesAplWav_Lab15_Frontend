"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const { token, logout } = useAuthStore();

  return (
    <nav className="bg-[#1F2B37] border-b border-[#4F76F6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#F9F9F9] tracking-wide hover:text-[#77F2A1] transition-colors"
          >
            ProductStore
          </Link>

          {/* LINKS */}
          <div className="flex gap-8 items-center">

            <NavItem href="/">Productos</NavItem>
            <NavItem href="/admin">Admin</NavItem>

            {/* AUTH */}
            {token ? (
              <button
                onClick={logout}
                className="
                  text-[#F9F9F9] 
                  group relative 
                  transition-colors
                  hover:text-[#77F2A1]
                "
              >
                Cerrar sesión
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77F2A1] transition-all group-hover:w-full"></span>
              </button>
            ) : (
              <NavItem href="/login">Iniciar sesión</NavItem>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Componente reutilizable con animación underline */
function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        relative
        text-[#F9F9F9]
        hover:text-[#4F76F6]
        transition-colors
        font-medium
        tracking-wide
      "
    >
      {children}
      <span
        className="
          absolute left-0 -bottom-1 
          h-0.5 w-0 
          bg-[#4F76F6]
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </Link>
  );
}
