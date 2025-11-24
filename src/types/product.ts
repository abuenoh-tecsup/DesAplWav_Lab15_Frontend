export interface Product {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
    imageUrl?: string;
    categories?: Category[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Category {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
}