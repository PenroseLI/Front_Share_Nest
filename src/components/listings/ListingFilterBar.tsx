import { FormInput } from "@/components/ui/FormControls";

export type ProductFilterValues = { name: string; minPrice: string; maxPrice: string };

// Solo captura criterios de búsqueda; la página decide cuándo consultar al backend con onApply.
export function ProductFilters({ value, onChange, onApply, onClear }: {
  value: ProductFilterValues;
  onChange: (value: ProductFilterValues) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
      <FormInput className="flex-1 min-w-[160px] rounded-full px-4 focus:ring-2 focus:ring-emerald-500" placeholder="🔍 name? whey" value={value.name} onChange={event => onChange({ ...value, name: event.target.value })} />
      <FormInput className="w-28 rounded-full px-4" type="number" placeholder="minPrice" value={value.minPrice} onChange={event => onChange({ ...value, minPrice: event.target.value })} />
      <FormInput className="w-28 rounded-full px-4" type="number" placeholder="maxPrice" value={value.maxPrice} onChange={event => onChange({ ...value, maxPrice: event.target.value })} />
      <button type="button" onClick={onApply} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
      <button type="button" onClick={onClear} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
    </div>
  );
}
