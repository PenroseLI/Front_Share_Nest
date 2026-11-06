import type { Product, User } from "@/types/api";
import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";

export type OrderFormValues = { userId: string; productId: string; quantity: number };

// La lista de usuarios y productos llega por props para mantener este formulario independiente del backend.
export function OrderCreateForm({ users, products, value, onChange, onSubmit }: {
  users: User[];
  products: Product[];
  value: OrderFormValues;
  onChange: (value: OrderFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-4 grid md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border">
      <FormSelect value={value.userId} onChange={event => onChange({ ...value, userId: event.target.value })}>
        {users.map(user => <option key={user.id} value={user.id}>{user.id} — {user.name}</option>)}
      </FormSelect>
      <FormSelect value={value.productId} onChange={event => onChange({ ...value, productId: event.target.value })}>
        {products.map(product => <option key={product.id} value={product.id}>{product.name} — ${product.price} (stock {product.stock})</option>)}
      </FormSelect>
      <FormInput type="number" min={1} value={value.quantity} onChange={event => onChange({ ...value, quantity: Number(event.target.value) })} />
      <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow">+ Crear orden</button>
    </FormPanel>
  );
}
