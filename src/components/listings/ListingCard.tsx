import Link from "next/link";
import type { Product } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";

// Tarjeta de presentación: recibe un producto y comunica la intención de eliminarlo mediante onDelete.
export function ProductCard({ product, onDelete }: { product: Product; onDelete: (product: Product) => void }) {
  const stockClass = product.stock > 20
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : product.stock > 5
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <EntityCard accent="emerald" className="hover:shadow-lg">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg">📦</div>
      <div className="font-semibold mt-3 leading-tight">{product.name}</div>
      <div className="text-xs font-mono text-slate-400 truncate">{product.id}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-bold border ${stockClass}`}>stock {product.stock}</span>
      </div>
      <div className="text-xs text-slate-500 mt-1 line-clamp-2 h-8">{product.description || "Sin descripción"}</div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/products/${product.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black transition">Ver detalle</Link>
        <button onClick={() => onDelete(product)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-100 transition">Eliminar</button>
      </div>
    </EntityCard>
  );
}
