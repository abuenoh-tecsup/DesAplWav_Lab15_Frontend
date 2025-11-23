"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Product, ApiResponse } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function ProductDetailPage() {
  useAuthGuard(["ADMIN", "CUSTOMER"]);

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const getProduct = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setProduct(null);
        return;
      }

      const data: ApiResponse<Product> = await res.json();
      setProduct(data.success ? data.data : null);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]); // depende solo del id

  useEffect(() => {
    if (id) getProduct();
  }, [id, getProduct]);

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-600">
        Cargando información del producto...
      </p>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg mb-4">Producto no encontrado</p>
        <Link href="/" className="text-gray-900 font-medium hover:underline">
          ← Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {product.nombre}
        </h1>

        <div className="text-3xl font-bold text-gray-900 mb-6">
          ${product.precio}
        </div>

        {product.descripcion && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Descripción
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.descripcion}
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
          ID del producto: {product.id}
        </div>
      </div>
    </div>
  );
}
