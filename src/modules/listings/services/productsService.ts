import { apiClient } from "@/lib/api";
import type { Product, CreateProductDto, UpdateProductDto } from "@/types/api";

export const productsService = {
  getAll: (filter?: { name?: string; minPrice?: number; maxPrice?: number; minStock?: number; maxStock?: number }) =>
    apiClient.get<Product[]>("/products", filter),
  getById: (id: string) => apiClient.get<Product>(`/products/${id}`),
  create: (data: CreateProductDto) => apiClient.post<Product>("/products", data),
  update: (id: string, data: UpdateProductDto) => apiClient.put<Product>(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/products/${id}`),
};
