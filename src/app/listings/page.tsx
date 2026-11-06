"use client";
import { useEffect, useState } from "react";
import { productsService } from "@/modules/products/services/productsService";
import type { Product } from "@/types/api";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCreateForm } from "@/components/products/ProductCreateForm";
import { ProductFilters } from "@/components/products/ProductFilters";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

export default function ProductsPage() {
  // Esta página es el contenedor: conserva estado y conecta los componentes con productsService.
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ name: "", minPrice: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: 0, stock: 0 });

  async function load(activeFilter = filter) {
    try {
      setLoading(true);
      setErr(null);
      // Solo enviamos al backend los filtros que el estudiante diligenció.
      const f: Record<string, string | number> = {};
      if (activeFilter.name) f.name = activeFilter.name;
      if (activeFilter.minPrice) f.minPrice = Number(activeFilter.minPrice);
      if (activeFilter.maxPrice) f.maxPrice = Number(activeFilter.maxPrice);
      setProducts(await productsService.getAll(f));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    await productsService.create({ ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm({ name: "", description: "", price: 0, stock: 0 });
    await load();
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  return (
    <div className="space-y-6">
      <EntityPageHeader accent="emerald" title="Products" description={<>CRUD + filtros Like/Between • {products.length} activos</>} action={<span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">Stock total: {products.reduce((a,p)=>a+p.stock,0)}</span>}>
        {/* Los componentes reciben estado y callbacks; no hacen llamadas HTTP directamente. */}
        <ProductFilters value={filter} onChange={setFilter} onApply={() => void load()} onClear={() => { const empty = { name: "", minPrice: "", maxPrice: "" }; setFilter(empty); void load(empty); }} />
        <ProductCreateForm value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid md:grid-cols-3 gap-4">
        {products.map(product => <ProductCard key={product.id} product={product} onDelete={async item => { if (confirm(`Eliminar ${item.name}?`)) { await productsService.delete(item.id); await load(); } }} />)}
      </div>
      {products.length === 0 && !loading && <EmptyState>No hay productos con ese filtro</EmptyState>}
    </div>
  );
}
