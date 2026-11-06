import { apiClient } from "@/lib/api";
import type { Order, CreateOrderDto } from "@/types/api";

export const ordersService = {
  getAll: (filter?: { status?: string; userId?: string }) =>
    apiClient.get<Order[]>("/orders", filter),
  getById: (id: string) => apiClient.get<Order>(`/orders/${id}`),
  getByUser: (userId: string) => apiClient.get<Order[]>(`/orders/user/${userId}`),
  create: (data: CreateOrderDto) => apiClient.post<Order>("/orders", data),
  updateStatus: (id: string, status: string) => apiClient.put<Order>(`/orders/${id}`, { status }),
  cancel: (id: string) => apiClient.put<Order>(`/orders/${id}/cancel`, {}),
  delete: (id: string) => apiClient.delete<void>(`/orders/${id}`),
};
