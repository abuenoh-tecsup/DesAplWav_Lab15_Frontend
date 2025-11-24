'use client';

import { useState, useEffect } from 'react';
import { Product, ApiResponse } from '@/types/product';
import { Category } from '@/types/product';
import { useAuthGuard } from '@/hooks/useAuthGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminPage() {
    useAuthGuard(["ADMIN"]);

    // ESTADOS
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        imageUrl: '',
        categoryIds: [] as number[],
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    // CARGA INICIAL
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // FETCH PRODUCTOS
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data: ApiResponse<Product[]> = await res.json();
            if (data.success) setProducts(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH CATEGORÍAS
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);
            const data: ApiResponse<Category[]> = await res.json();
            if (data.success) setCategories(data.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // SUBMIT (CREATE / UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = editingId
            ? `${API_URL}/products/${editingId}`
            : `${API_URL}/products`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    precio: parseFloat(formData.precio),
                    descripcion: formData.descripcion || undefined,
                    imageUrl: formData.imageUrl || undefined,
                    categoryIds: formData.categoryIds,
                }),
            });

            if (res.ok) {
                setFormData({
                    nombre: '',
                    precio: '',
                    descripcion: '',
                    imageUrl: '',
                    categoryIds: [],
                });
                setEditingId(null);
                fetchProducts();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // CARGAR PRODUCTO PARA EDITAR
    const handleEdit = (product: Product) => {
        setFormData({
            nombre: product.nombre,
            precio: product.precio.toString(),
            descripcion: product.descripcion || '',
            imageUrl: product.imageUrl || '',
            categoryIds: product.categories?.map(c => c.id) || [],
        });
        setEditingId(product.id);
    };

    // ELIMINAR PRODUCTO
    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro?')) return;
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) fetchProducts();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // CANCELAR EDICIÓN
    const handleCancel = () => {
        setFormData({
            nombre: '',
            precio: '',
            descripcion: '',
            imageUrl: '',
            categoryIds: [],
        });
        setEditingId(null);
    };

    // LOADING
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center text-gray-500">Cargando...</div>
            </div>
        );
    }

    // UI COMPLETA
return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 font-montserrat">

    <h1 className="text-3xl font-bold mb-8">Administración de Productos</h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* FORMULARIO */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-300 rounded-none p-6">

          <h2 className="text-xl font-semibold mb-6">
            {editingId ? "Editar Producto" : "Crear Producto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="
                  w-full px-3 py-2
                  border border-gray-400
                  rounded-none
                  focus:outline-none 
                  focus:border-black
                  text-gray-900
                "
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium mb-1">Precio</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                className="
                  w-full px-3 py-2
                  border border-gray-400
                  rounded-none
                  focus:outline-none 
                  focus:border-black
                  text-gray-900
                "
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                rows={3}
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="
                  w-full px-3 py-2
                  border border-gray-400
                  rounded-none
                  focus:outline-none
                  focus:border-black
                  text-gray-900
                "
              />
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Imagen (URL)
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="
                  w-full px-3 py-2
                  border border-gray-400
                  rounded-none
                  focus:outline-none
                  focus:border-black
                "
              />
            </div>

            {/* Categorías */}
            <div>
              <label className="block text-sm font-medium mb-1">Categorías</label>

              <select
                multiple
                value={formData.categoryIds.map(String)}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(
                    (opt) => parseInt(opt.value)
                  );
                  setFormData({ ...formData, categoryIds: selected });
                }}
                className="
                  w-full px-3 py-2
                  border border-gray-400
                  rounded-none
                  focus:outline-none
                  focus:border-black
                  text-gray-900
                "
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <p className="text-xs text-gray-500 mt-1">
                Mantén presionado CTRL (Windows) o CMD (Mac) para seleccionar varias.
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-2 pt-3">
              <button
                type="submit"
                className="
                  flex-1
                  bg-black text-white
                  py-2
                  rounded-none
                  transition-colors
                  hover:bg-gray-800
                "
              >
                {editingId ? "Actualizar" : "Crear"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="
                    px-4 py-2
                    border border-gray-400
                    rounded-none
                    hover:bg-gray-100
                    text-gray-700
                  "
                >
                  Cancelar
                </button>
              )}
            </div>

          </form>
        </div>
      </div>

      {/* TABLA */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-gray-300 rounded-none overflow-hidden">

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-6 py-3 text-left text-xs font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Categorías</th>
                <th className="px-6 py-3 text-right text-xs font-semibold">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{product.nombre}</td>
                  <td className="px-6 py-4 text-sm">${product.precio}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.categories?.map((c) => c.name).join(", ") || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">

                    <button
                      onClick={() => handleEdit(product)}
                      className="text-gray-700 hover:text-black mr-4"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
);

}
