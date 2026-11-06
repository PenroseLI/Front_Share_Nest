"use client";

import Link from "next/link";
import { use } from "react";
import { bookingsService } from "@/modules/bookings/services/bookingsService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Esta ruta usa [id] para cargar una solicitud específica sin consultar toda la lista.
  const { id } = use(params);
  const { entity: booking, loading, error, reload } = useEntityDetail(id, bookingsService.getById);

  async function act(action: () => Promise<unknown>) {
    try {
      await action();
      await reload();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  if (loading) return <LoadingState label="Cargando solicitud..." />;
  if (error) return <ErrorState message={error} />;
  if (!booking) return <EmptyState>Solicitud no encontrada</EmptyState>;

  return (
    <EntityDetailLayout accent="violet" backHref="/bookings" backLabel="solicitudes" title={`Solicitud ${booking.id.slice(0, 8)}`} description={<>Estado: <b>{booking.status}</b> • creada el {new Date(booking.createdAt).toLocaleString()}</>}>
      <div className="space-y-4">
        <EntityCard accent="violet">
          <p className="text-sm text-slate-500">Inquilino</p>
          <Link href={`/users/${booking.tenantId}`} className="mt-1 inline-block font-semibold hover:text-violet-700">{booking.tenant?.name || booking.tenantId}</Link>
          <p className="text-sm text-slate-500">{booking.tenant?.email}</p>
          <Link href={`/bookings/user/${booking.tenantId}`} className="mt-2 inline-block text-xs font-medium text-violet-700 hover:underline">Ver todas sus solicitudes →</Link>
        </EntityCard>
        <EntityCard accent="violet">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold">Habitaciones</h2>
            <span className="text-xl font-bold">Total: ${Number(booking.totalPrice).toLocaleString()}</span>
          </div>
          <div className="mt-4 divide-y border-t">
            {booking.items.map(item => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <Link href={`/listings/${item.listingId}`} className="font-medium hover:text-violet-700">{item.listing?.title || item.listingId}</Link>
                <span className="text-slate-500">{item.startDate} → {item.endDate}</span>
                <span>{item.months} meses × ${Number(item.unitPrice).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </EntityCard>
        <div className="flex gap-2">
          {booking.status === "PENDING" && <button onClick={() => void act(() => bookingsService.update(id, { status: "ACCEPTED" }))} className="px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Aceptar</button>}
          {booking.status !== "CANCELLED" && <button onClick={() => void act(() => bookingsService.cancel(id))} className="px-5 py-2 rounded-full bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600">Cancelar solicitud</button>}
        </div>
      </div>
    </EntityDetailLayout>
  );
}
