import Link from "next/link";
import type { Booking } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";

const statusClasses = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
};

// Cada acción se recibe por props para que la tarjeta pueda mostrarse sin depender de bookingsService.
export function BookingCard({ booking, onAccept, onCancel, onDelete }: {
  booking: Booking;
  onAccept: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}) {
  const accent = booking.status === "ACCEPTED" ? "emerald" : booking.status === "PENDING" ? "violet" : "slate";
  return (
    <EntityCard accent={accent}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-slate-400 truncate">{booking.id} • {new Date(booking.createdAt).toLocaleDateString()}</span>
        <span className={`text-xs px-3 py-1 rounded-full font-bold border ${statusClasses[booking.status]}`}>{booking.status}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold">{booking.tenant?.name?.charAt(0) || "?"}</div>
        <div>
          <Link href={`/bookings/user/${booking.tenantId}`} className="font-semibold leading-tight hover:text-violet-700">{booking.tenant?.name || booking.tenantId}</Link>
          <div className="text-xs text-slate-500">{booking.tenant?.email || booking.tenantId} • Total <b className="text-slate-900">${Number(booking.totalPrice).toLocaleString()}</b></div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {booking.items?.map(item => (
          <span key={item.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border text-xs">
            <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px]">🏠</span>
            {item.listing?.title || item.listingId} <b>{item.months} m</b>
            <span className="text-slate-500">{item.startDate} → {item.endDate} • ${Number(item.unitPrice).toLocaleString()}/mes</span>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        <Link href={`/bookings/${booking.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black">Ver detalle</Link>
        {booking.status === "PENDING" && <button onClick={() => onAccept(booking)} className="py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">Aceptar</button>}
        {booking.status !== "CANCELLED" && <button onClick={() => onCancel(booking)} className="py-2 rounded-full bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600">Cancelar</button>}
        <button onClick={() => onDelete(booking)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-50">Eliminar</button>
      </div>
    </EntityCard>
  );
}
