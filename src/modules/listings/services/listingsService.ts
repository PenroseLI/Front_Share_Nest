import { apiClient } from "@/lib/api";
import type {
  CreateListingDto,
  Listing,
  ListingFilters,
  UpdateListingDto,
} from "@/types/api";

export const listingsService = {
  getAll: (filters?: ListingFilters) =>
    apiClient.get<Listing[]>("/listings", filters),
  getById: (id: string) => apiClient.get<Listing>(`/listings/${id}`),
  create: (data: CreateListingDto) =>
    apiClient.post<Listing>("/listings", data),
  update: (id: string, data: UpdateListingDto) =>
    apiClient.put<Listing>(`/listings/${id}`, data),
  remove: (id: string) => apiClient.delete<void>(`/listings/${id}`),
};
