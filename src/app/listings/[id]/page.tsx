"use client";

import Link from "next/link";
import { use } from "react";
import { listingsService } from "@/modules/listings/services/listingsService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { ListingEditForm } from "@/components/listings/ListingEditForm";
import type { UpdateListingDto } from "@/types/api";

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Next entrega los segmentos dinámicos como una promesa; use(params) obtiene el id de la URL.
  const { id } = use(params);
  const { entity: listing, loading, error, reload } = useEntityDetail(id, listingsService.getById);

  async function save(data: UpdateListingDto) {
    try {
      await listingsService.update(id, data);
      await reload();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  if (loading) return <LoadingState label="Cargando habitación..." />;
  if (error) return <ErrorState message={error} />;
  if (!listing) return <EmptyState>Habitación no encontrada</EmptyState>;

  return (
    <EntityDetailLayout accent="emerald" backHref="/listings" backLabel="habitaciones" title={listing.title} description={<>{listing.city} • {listing.address}</>}>
      <div className="space-y-4">
        <EntityCard accent="emerald">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">Descripción</p>
              <p className="mt-1 text-slate-800">{listing.description || "Sin descripción"}</p>
              <p className="mt-4 text-sm text-slate-500">Anfitrión</p>
              <Link href={`/users/${listing.hostId}`} className="font-semibold hover:text-emerald-700">{listing.hostId}</Link>
              <div className="mt-3 flex flex-wrap gap-1">
                {listing.amenities?.map(a => <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-slate-50 border text-slate-600">{a}</span>)}
              </div>
              <p className="mt-5 text-xs font-mono text-slate-400 break-all">ID: {listing.id}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
              <p className="text-sm text-emerald-800">Precio por mes</p>
              <p className="mt-1 text-3xl font-bold">${Number(listing.pricePerMonth).toLocaleString()}</p>
              <p className="mt-4 text-sm text-emerald-800">Estado: <b>{listing.status}</b></p>
              <p className="text-sm text-emerald-800">Compañeros máx.: <b>{listing.maxRoommates}</b></p>
            </div>
          </div>
        </EntityCard>
        <EntityCard accent="slate">
          <h2 className="font-semibold mb-3">Editar</h2>
          <ListingEditForm listing={listing} onSave={save} />
        </EntityCard>
      </div>
    </EntityDetailLayout>
  );
}
