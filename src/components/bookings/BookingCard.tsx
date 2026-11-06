import Link from "next/link";
import type { Order } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";

const statusClasses = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
};

// Cada acción se recibe por props para que la tarjeta pueda mostrarse sin depender de ordersService.
export function OrderCard({ order, onMarkPaid, onCancel, onDelete }: {
  order: Order;
  onMarkPaid: (order: Order) => void;
  onCancel: (order: Order) => void;
  onDelete: (order: Order) => void;
}) {
  const accent = order.status === "PENDING" ? "slate" : order.status === "PAID" ? "emerald" : "slate";
  return (
    <EntityCard accent={accent}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-slate-400 truncate">{order.id} • {new Date(order.createdAt).toLocaleDateString()}</span>
        <span className={`text-xs px-3 py-1 rounded-full font-bold border ${statusClasses[order.status]}`}>{order.status}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold">{order.user?.name?.charAt(0) || "?"}</div>
        <div>
          <div className="font-semibold leading-tight">{order.user?.name || order.userId}</div>
          <div className="text-xs text-slate-500">{order.user?.email || order.userId} • Total <b className="text-slate-900">${Number(order.total).toFixed(2)}</b></div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {order.items?.map((item) => (
          <span key={item.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border text-xs">
            <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px]">📦</span>
            {item.product?.name || item.productId} <b>x{item.quantity}</b> <span className="text-slate-500">@${item.unitPrice}</span>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        <Link href={`/orders/${order.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black">Ver detalle</Link>
        <button onClick={() => onMarkPaid(order)} className="py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">Marcar PAID</button>
        <button onClick={() => onCancel(order)} className="py-2 rounded-full bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600">Cancelar</button>
        <button onClick={() => onDelete(order)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-50">Eliminar</button>
      </div>
    </EntityCard>
  );
}
