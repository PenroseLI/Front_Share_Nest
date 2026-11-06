"use client";
import { useEffect, useState } from "react";
import { listingsService } from "@/modules/listings/services/listingsService";
import { usersService } from "@/modules/users/services/usersService";
import type { CreateListingDto, Listing, ListingFilters, User } from "@/types/api";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingCreateForm, emptyListingForm } from "@/components/listings/ListingCreateForm";
import { ListingFilterBar } from "@/components/listings/ListingFilterBar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyFilter = { city: "", minPrice: "", maxPrice: "", amenity: "" };

export default function ListingsPage() {
  // Contenedor: conserva el estado y conecta los componentes con listingsService.
  const [listings, setListings] = useState<Listing[]>([]);
  const [hosts, setHosts] = useState<User[]>([]);
  const [filter, setFilter] = useState(emptyFilter);
  const [form, setForm] = useState(emptyListingForm);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load(activeFilter = filter) {
    try {
      setLoading(true);
      setErr(null);
      // Solo enviamos al backend los filtros que el usuario diligenció.
      const f: ListingFilters = {};
      if (activeFilter.city) f.city = activeFilter.city;
      if (activeFilter.minPrice) f.minPrice = Number(activeFilter.minPrice);
      if (activeFilter.maxPrice) f.maxPrice = Number(activeFilter.maxPrice);
      if (activeFilter.amenity) f.amenity = activeFilter.amenity;
      setListings(await listingsService.getAll(f));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadHosts() {
    try {
      const users = await usersService.getAll();
      const allowed = users.filter(user => user.role !== "SEEKER");
      setHosts(allowed);
      setForm(current => (current.hostId ? current : { ...current, hostId: allowed[0]?.id ?? "" }));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  async function create() {
    try {
      // El backend rechaza campos desconocidos: armamos el DTO y solo incluimos los opcionales diligenciados.
      const amenities = form.amenities.split(",").map(a => a.trim()).filter(Boolean);
      const dto: CreateListingDto = {
        hostId: form.hostId,
        title: form.title,
        city: form.city,
        address: form.address,
        pricePerMonth: Number(form.pricePerMonth),
        maxRoommates: Number(form.maxRoommates),
        status: form.status,
      };
      if (form.description) dto.description = form.description;
      if (amenities.length > 0) dto.amenities = amenities;

      await listingsService.create(dto);
      setForm({ ...emptyListingForm, hostId: form.hostId });
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); void loadHosts(); }, []);

  return (
    <div className="space-y-6">
      <EntityPageHeader accent="emerald" title="Habitaciones" description={<>CRUD + filtros ciudad / precio / servicio • {listings.length} publicadas</>} action={<span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">Disponibles: {listings.filter(l => l.status === "ACTIVE").length}</span>}>
        <ListingFilterBar value={filter} onChange={setFilter} onApply={() => void load()} onClear={() => { setFilter(emptyFilter); void load(emptyFilter); }} />
        <ListingCreateForm hosts={hosts} value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid md:grid-cols-3 gap-4">
        {listings.map(listing => <ListingCard key={listing.id} listing={listing} onDelete={async item => { if (confirm(`Eliminar ${item.title}?`)) { try { await listingsService.remove(item.id); await load(); } catch (e: unknown) { alert(e instanceof Error ? e.message : String(e)); } } }} />)}
      </div>
      {listings.length === 0 && !loading && <EmptyState>No hay habitaciones con ese filtro</EmptyState>}
    </div>
  );
}
