import { apiClient } from "@/lib/api";
import type {
  Booking,
  BookingFilters,
  CreateBookingDto,
  UpdateBookingDto,
} from "@/types/api";

export const bookingsService = {
  getAll: (filters?: BookingFilters) =>
    apiClient.get<Booking[]>("/bookings", filters),
  getById: (id: string) => apiClient.get<Booking>(`/bookings/${id}`),
  getByUser: (userId: string) =>
    apiClient.get<Booking[]>(`/bookings/user/${userId}`),
  create: (data: CreateBookingDto) =>
    apiClient.post<Booking>("/bookings", data),
  update: (id: string, data: UpdateBookingDto) =>
    apiClient.put<Booking>(`/bookings/${id}`, data),
  cancel: (id: string) =>
    apiClient.put<Booking>(`/bookings/${id}/cancel`, {}),
  remove: (id: string) => apiClient.delete<void>(`/bookings/${id}`),
};
