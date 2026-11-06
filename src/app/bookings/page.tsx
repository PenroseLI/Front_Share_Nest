"use client";
import { useEffect, useState } from "react";
import { bookingsService } from "@/modules/bookings/services/bookingsService";
import { listingsService } from "@/modules/listings/services/listingsService";
import { usersService } from "@/modules/users/services/usersService";
import type { Booking, BookingFilters, BookingStatus, CreateBookingDto, Listing, User } from "@/types/api";
import { BookingCard } from "@/components/bookings/BookingCard";
import { BookingCreateForm, emptyBookingForm } from "@/components/bookings/BookingCreateForm";
import { BookingFilterBar } from "@/components/bookings/BookingFilterBar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyFilter = { status: "", tenantId: "" };

export default function BookingsPage() {
  // El contenedor administra las relaciones (usuarios y habitaciones) necesarias para crear una solicitud.
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filter, setFilter] = useState(emptyFilter);
  const [form, setForm] = useState(emptyBookingForm);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load(activeFilter = filter) {
    try {
      setLoading(true);
      setErr(null);
      const f: BookingFilters = {};
      if (activeFilter.status) f.status = activeFilter.status as BookingStatus;
      if (activeFilter.tenantId) f.tenantId = activeFilter.tenantId;
      setBookings(await bookingsService.getAll(f));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadRefs() {
    try {
      // Consultas independientes: se ejecutan al mismo tiempo.
      const [userData, listingData] = await Promise.all([usersService.getAll(), listingsService.getAll()]);
      const available = listingData.filter(listing => listing.status === "ACTIVE");
      setUsers(userData);
      setListings(available);
      setForm(current => ({
        ...current,
        tenantId: current.tenantId || userData[0]?.id || "",
        listingId: current.listingId || available[0]?.id || "",
      }));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  // Ejecuta una acción, recarga la lista y muestra el mensaje del backend si falla (400, 404...).
  async function act(action: () => Promise<unknown>) {
    try {
      await action();
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  async function create() {
    const dto: CreateBookingDto = {
      tenantId: form.tenantId,
      items: [{ listingId: form.listingId, startDate: form.startDate, months: Number(form.months) }],
    };
    await act(() => bookingsService.create(dto));
    setForm(current => ({ ...current, startDate: "", months: "1" }));
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); void loadRefs(); }, []);

  return (
    <div className="space-y-6">
      <EntityPageHeader accent="violet" title="Solicitudes" description={<>User 1—N Booking 1—N BookingItem N—1 Listing • {bookings.length} solicitudes</>} action={<span className="hidden md:inline-flex px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700">Pendientes: {bookings.filter(b => b.status === "PENDING").length}</span>}>
        <BookingFilterBar users={users} value={filter} onChange={setFilter} onApply={() => void load()} onClear={() => { setFilter(emptyFilter); void load(emptyFilter); }} />
        <BookingCreateForm users={users} listings={listings} value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid gap-4">
        {bookings.map(booking => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onAccept={item => void act(() => bookingsService.update(item.id, { status: "ACCEPTED" }))}
            onCancel={item => void act(() => bookingsService.cancel(item.id))}
            onDelete={item => { if (confirm("¿Eliminar esta solicitud?")) void act(() => bookingsService.remove(item.id)); }}
          />
        ))}
        {bookings.length === 0 && !loading && <EmptyState>No hay solicitudes con ese filtro — crea una arriba</EmptyState>}
      </div>
    </div>
  );
}
