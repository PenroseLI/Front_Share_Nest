"use client";

import Link from "next/link";
import { use } from "react";
import { bookingsService } from "@/modules/bookings/services/bookingsService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function UserBookingsPage({ params }: { params: Promise<{ userId: string }> }) {
  // El mismo hook sirve aquí: getByUser recibe un id y devuelve la lista de solicitudes de ese inquilino.
  const { userId } = use(params);
  const { entity: bookings, loading, error } = useEntityDetail(userId, bookingsService.getByUser);

  if (loading) return <LoadingState label="Cargando solicitudes..." />;
  if (error) return <ErrorState message={error} />;
  if (!bookings) return <EmptyState>No se pudo cargar</EmptyState>;

  return (
    <EntityDetailLayout accent="violet" backHref="/bookings" backLabel="solicitudes" title={`Solicitudes del usuario ${userId}`} description={<>{bookings.length} solicitudes • <Link href={`/users/${userId}`} className="hover:underline">ver usuario</Link></>}>
      {bookings.length === 0 ? (
        <EmptyState>Este usuario no tiene solicitudes</EmptyState>
      ) : (
        <div className="grid gap-3">
          {bookings.map(booking => (
            <EntityCard key={booking.id} accent="violet">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <Link href={`/bookings/${booking.id}`} className="font-mono text-xs hover:text-violet-700 truncate">{booking.id}</Link>
                <span className="font-semibold">{booking.status}</span>
                <span>${Number(booking.totalPrice).toLocaleString()}</span>
              </div>
            </EntityCard>
          ))}
        </div>
      )}
    </EntityDetailLayout>
  );
}
