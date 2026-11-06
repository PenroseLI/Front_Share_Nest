import { FormInput } from "@/components/ui/FormControls";

export type ListingFilterValues = { city: string; minPrice: string; maxPrice: string; amenity: string };

// Solo captura criterios de búsqueda; la página decide cuándo consultar al backend con onApply.
export function ListingFilterBar({ value, onChange, onApply, onClear }: {
  value: ListingFilterValues;
  onChange: (value: ListingFilterValues) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
      <FormInput className="flex-1 min-w-[140px] rounded-full px-4 focus:ring-2 focus:ring-emerald-500" placeholder="🔍 ciudad" value={value.city} onChange={event => onChange({ ...value, city: event.target.value })} />
      <FormInput className="w-32 rounded-full px-4" type="number" placeholder="precio mín." value={value.minPrice} onChange={event => onChange({ ...value, minPrice: event.target.value })} />
      <FormInput className="w-32 rounded-full px-4" type="number" placeholder="precio máx." value={value.maxPrice} onChange={event => onChange({ ...value, maxPrice: event.target.value })} />
      <FormInput className="w-36 rounded-full px-4" placeholder="servicio (wifi)" value={value.amenity} onChange={event => onChange({ ...value, amenity: event.target.value })} />
      <button type="button" onClick={onApply} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
      <button type="button" onClick={onClear} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
    </div>
  );
}
