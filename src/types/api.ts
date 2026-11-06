/**
 * Tipos compartidos con el backend NestJS (ShareNest)
 * Espejo de las entities y DTOs del backend.
 * Nota: los decimales (pricePerMonth, totalPrice, unitPrice, budgetMax)
 * pueden llegar como texto según la BD; usa Number() al operar con ellos.
 */

// ───────── Users ─────────
export type UserRole = "HOST" | "SEEKER" | "BOTH";

export interface User {
  id: string; // cédula, 5-20 dígitos
  name: string;
  email: string;
  age: number;
  phone: string;
  role: UserRole;
  bio: string | null;
  budgetMax: number | null;
  smoker: boolean;
  pets: boolean;
  isActive: boolean;
}

export interface CreateUserDto {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  role?: UserRole;
  bio?: string;
  budgetMax?: number;
  smoker?: boolean;
  pets?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  phone?: string;
  role?: UserRole;
  bio?: string;
  budgetMax?: number;
  smoker?: boolean;
  pets?: boolean;
}

// ───────── Listings ─────────
export type ListingStatus = "ACTIVE" | "PAUSED" | "RENTED";

export interface Listing {
  id: string; // uuid
  hostId: string;
  title: string;
  description: string | null;
  city: string;
  address: string;
  pricePerMonth: number;
  amenities: string[] | null;
  maxRoommates: number;
  status: ListingStatus;
  isActive: boolean;
  createdAt: string;
}

export interface CreateListingDto {
  hostId: string;
  title: string;
  description?: string;
  city: string;
  address: string;
  pricePerMonth: number;
  amenities?: string[];
  maxRoommates: number;
  status?: ListingStatus;
}

// hostId no se puede cambiar
export interface UpdateListingDto {
  title?: string;
  description?: string;
  city?: string;
  address?: string;
  pricePerMonth?: number;
  amenities?: string[];
  maxRoommates?: number;
  status?: ListingStatus;
}

// type (no interface) para que sea compatible con los params del apiClient
export type ListingFilters = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  amenity?: string;
};

// ───────── Bookings ─────────
export type BookingStatus = "PENDING" | "ACCEPTED" | "CANCELLED";

export interface BookingItem {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD, la calcula el backend
  months: number;
  unitPrice: number;
  bookingId: string;
  listingId: string;
  listing: Listing;
}

export interface Booking {
  id: string;
  tenantId: string;
  tenant: User;
  items: BookingItem[];
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface CreateBookingDto {
  tenantId: string;
  items: { listingId: string; startDate: string; months: number }[];
}

export interface UpdateBookingDto {
  status?: BookingStatus;
}

export type BookingFilters = {
  status?: BookingStatus;
  tenantId?: string;
};
