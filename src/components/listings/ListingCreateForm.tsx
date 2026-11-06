import { FormInput, FormPanel } from "@/components/ui/FormControls";

export type ProductFormValues = { name: string; description: string; price: number; stock: number };

// Formulario controlado: value viene de la página y onChange devuelve una copia actualizada del estado.
export function ProductCreateForm({ value, onChange, onSubmit }: {
  value: ProductFormValues;
  onChange: (value: ProductFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-4 grid md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border">
      <FormInput className="focus:ring-2 focus:ring-emerald-500" placeholder="Nombre 2-120" value={value.name} onChange={event => onChange({ ...value, name: event.target.value })} required />
      <FormInput placeholder="Descripción" value={value.description} onChange={event => onChange({ ...value, description: event.target.value })} />
      <FormInput type="number" step="0.01" placeholder="Precio" value={value.price} onChange={event => onChange({ ...value, price: Number(event.target.value) })} required />
      <FormInput type="number" placeholder="Stock" value={value.stock} onChange={event => onChange({ ...value, stock: Number(event.target.value) })} required />
      <button className="md:col-span-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow hover:opacity-90">+ Crear producto</button>
    </FormPanel>
  );
}
