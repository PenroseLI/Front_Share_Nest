"use client";

import { use } from "react";
import { productsService } from "@/modules/products/services/productsService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Next entrega los segmentos dinámicos como una promesa; use(params) obtiene el id de la URL.
  const { id } = use(params);
  // El mismo hook se puede reutilizar en cualquier detalle que disponga de getById.
  const { entity: product, loading, error } = useEntityDetail(id, productsService.getById);

  if (loading) return <LoadingState label="Cargando producto..." />;
  if (error) return <ErrorState message={error} />;
  if (!product) return <EmptyState>Producto no encontrado</EmptyState>;

  return (
    <EntityDetailLayout accent="emerald" backHref="/products" backLabel="productos" title={product.name} description="Detalle del producto consultado por su ID en la ruta dinámica.">
      <EntityCard accent="emerald">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Descripción</p>
            <p className="mt-1 text-slate-800">{product.description || "Sin descripción"}</p>
            <p className="mt-5 text-xs font-mono text-slate-400 break-all">ID: {product.id}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
            <p className="text-sm text-emerald-800">Precio</p>
            <p className="mt-1 text-3xl font-bold">${Number(product.price).toFixed(2)}</p>
            <p className="mt-4 text-sm text-emerald-800">Stock disponible: <b>{product.stock}</b></p>
          </div>
        </div>
      </EntityCard>
    </EntityDetailLayout>
  );
}
