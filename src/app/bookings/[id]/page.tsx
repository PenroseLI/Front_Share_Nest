"use client";

import Link from "next/link";
import { use } from "react";
import { ordersService } from "@/modules/orders/services/ordersService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Esta ruta usa [id] para cargar una orden específica sin consultar toda la lista.
  const { id } = use(params);
  const { entity: order, loading, error } = useEntityDetail(id, ordersService.getById);

  if (loading) return <LoadingState label="Cargando orden..." />;
  if (error) return <ErrorState message={error} />;
  if (!order) return <EmptyState>Orden no encontrada</EmptyState>;

  return (
    <EntityDetailLayout accent="violet" backHref="/orders" backLabel="órdenes" title={`Orden ${order.id}`} description={<>Estado: <b>{order.status}</b> • creada el {new Date(order.createdAt).toLocaleString()}</>}>
      <div className="space-y-4">
        <EntityCard accent="violet">
          <p className="text-sm text-slate-500">Cliente</p>
          <Link href={`/users/${order.userId}`} className="mt-1 inline-block font-semibold hover:text-violet-700">{order.user?.name || order.userId}</Link>
          <p className="text-sm text-slate-500">{order.user?.email}</p>
        </EntityCard>
        <EntityCard accent="violet">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold">Productos</h2>
            <span className="text-xl font-bold">Total: ${Number(order.total).toFixed(2)}</span>
          </div>
          <div className="mt-4 divide-y border-t">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                <Link href={`/products/${item.productId}`} className="font-medium hover:text-violet-700">{item.product?.name || item.productId}</Link>
                <span>{item.quantity} × ${Number(item.unitPrice).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </EntityCard>
      </div>
    </EntityDetailLayout>
  );
}
