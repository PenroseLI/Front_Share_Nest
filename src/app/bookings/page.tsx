"use client";
import { useEffect, useState } from "react";
import { ordersService } from "@/modules/orders/services/ordersService";
import { productsService } from "@/modules/products/services/productsService";
import { usersService } from "@/modules/users/services/usersService";
import type { Order, Product, User } from "@/types/api";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrderCreateForm } from "@/components/orders/OrderCreateForm";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

export default function OrdersPage() {
  // El contenedor administra las relaciones (usuarios y productos) necesarias para crear una orden.
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ status: "", userId: "" });
  const [form, setForm] = useState({ userId: "1000000001", productId: "", quantity: 1 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load(activeFilter = filter) {
    try {
      setLoading(true);
      setErr(null);
      const f: Record<string, string> = {};
      if (activeFilter.status) f.status = activeFilter.status;
      if (activeFilter.userId) f.userId = activeFilter.userId;
      setOrders(await ordersService.getAll(f));
    } catch (cause: unknown) {
      setErr(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setLoading(false);
    }
  }
  async function loadRefs() {
    // Consultas independientes: se ejecutan al mismo tiempo y luego se entregan al formulario por props.
    const [userData, productData] = await Promise.all([usersService.getAll(), productsService.getAll()]);
    setUsers(userData);
    setProducts(productData);
    if (!form.productId) {
      if (productData[0]) setForm(current => ({ ...current, productId: productData[0].id }));
    }
  }
  // eslint-disable-next-line
  useEffect(() => { void load(); void loadRefs(); }, []);

  async function create() {
    await ordersService.create({ userId: form.userId, items: [{ productId: form.productId, quantity: Number(form.quantity) }] });
    await load();
  }

  return (
    <div className="space-y-6">
      <EntityPageHeader accent="violet" title="Orders" description={<>Tienda • User 1—N Order 1—N OrderItem N—1 Product • {orders.length} órdenes</>} action={<span className="hidden md:inline-flex px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700">Transacción con Repository</span>}>
        {/* Filtro y formulario son componentes controlados; la página conserva el estado. */}
        <OrderFilters value={filter} onChange={setFilter} onApply={() => void load()} onClear={() => { const empty = { status: "", userId: "" }; setFilter(empty); void load(empty); }} />
        <OrderCreateForm users={users} products={products} value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid gap-4">
        {orders.map(order => <OrderCard key={order.id} order={order} onMarkPaid={async item => { await ordersService.updateStatus(item.id, "PAID"); await load(); }} onCancel={async item => { await ordersService.cancel(item.id); await load(); }} onDelete={async item => { await ordersService.delete(item.id); await load(); }} />)}
        {orders.length === 0 && !loading && <EmptyState>No hay órdenes con ese filtro — crea una arriba</EmptyState>}
      </div>
    </div>
  );
}
