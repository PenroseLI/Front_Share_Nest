import { FormInput, FormSelect } from "@/components/ui/FormControls";

export type OrderFilterValues = { status: string; userId: string };

// Los callbacks permiten reutilizar el filtro con una fuente de datos distinta si fuera necesario.
export function OrderFilters({ value, onChange, onApply, onClear }: {
  value: OrderFilterValues;
  onChange: (value: OrderFilterValues) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
      <FormSelect className="rounded-full px-4" value={value.status} onChange={event => onChange({ ...value, status: event.target.value })}>
        <option value="">status: todos</option><option>PENDING</option><option>PAID</option><option>CANCELLED</option>
      </FormSelect>
      <FormInput className="flex-1 min-w-[160px] rounded-full px-4" placeholder="userId 1000000001" value={value.userId} onChange={event => onChange({ ...value, userId: event.target.value })} />
      <button type="button" onClick={onApply} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
      <button type="button" onClick={onClear} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
    </div>
  );
}
