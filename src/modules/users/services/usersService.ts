import { apiClient } from "@/lib/api";
import type { CreateUserDto, UpdateUserDto, User } from "@/types/api";

export const usersService = {
  getAll: () => apiClient.get<User[]>("/users"),
  getById: (id: string) => apiClient.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => apiClient.post<User>("/users", data),
  update: (id: string, data: UpdateUserDto) =>
    apiClient.put<User>(`/users/${id}`, data),
  remove: (id: string) => apiClient.delete<void>(`/users/${id}`),
};
