import Link from "next/link";
import type { Listing } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";

const statusClasses = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PAUSED: "bg-amber-50 text-amber-700 border-amber-200",
  RENTED: "bg-slate-100 text-slate-600 border-slate-200",
};

// Tarjeta de presentación: recibe una habitación y comunica la intención de eliminarla mediante onDelete.
export function ListingCard({ listing, onDelete }: { listing: Listing; onDelete: (listing: Listing) => void }) {
  return (
    <EntityCard accent="emerald" className="hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg">🏠</div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${statusClasses[listing.status]}`}>{listing.status}</span>
      </div>
      <div className="font-semibold mt-3 leading-tight">{listing.title}</div>
      <div className="text-xs text-slate-500">{listing.city} • {listing.address}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold">${Number(listing.pricePerMonth).toLocaleString()}</span>
        <span className="text-xs text-slate-500">/ mes • hasta {listing.maxRoommates} personas</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1 min-h-6">
        {listing.amenities?.map(a => <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 border text-slate-600">{a}</span>)}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/listings/${listing.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black transition">Ver detalle</Link>
        <button onClick={() => onDelete(listing)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-100 transition">Eliminar</button>
      </div>
    </EntityCard>
  );
}
