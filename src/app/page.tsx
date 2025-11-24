"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Product, ApiResponse, Category } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function HomePage() {
  useAuthGuard(["ADMIN", "CUSTOMER"]);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<"all" | number>(
    "all"
  );

  async function getProducts() {
    try {
      const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
      const data: ApiResponse<Product[]> = await res.json();
      setProducts(data.success ? data.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function getCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
      const data: ApiResponse<Category[]> = await res.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) =>
          product.categories?.some((cat) => cat.id === selectedCategory)
        );

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-600">Cargando productos...</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por categoría
        </label>

        <select
          className="
    w-full
    border border-gray-300 
    rounded-lg 
    px-4 py-2 
    bg-white 
    text-gray-800
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-200
    focus:border-blue-500
    transition
  "
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {product.nombre}
              </h2>

              <p className="text-2xl font-bold text-gray-900 mb-3">
                ${product.precio}
              </p>

              {/* Categorías del producto */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              {product.descripcion && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.descripcion}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
