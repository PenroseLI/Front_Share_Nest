import { FormSelect } from "@/components/ui/FormControls";
import type { User } from "@/types/api";

export type BookingFilterValues = { status: string; tenantId: string };

// Los usuarios llegan por props para ofrecer el filtro de inquilino como lista desplegable.
export function BookingFilterBar({ users, value, onChange, onApply, onClear }: {
  users: User[];
  value: BookingFilterValues;
  onChange: (value: BookingFilterValues) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
      <FormSelect className="rounded-full px-4" value={value.status} onChange={event => onChange({ ...value, status: event.target.value })}>
        <option value="">estado: todos</option>
        <option>PENDING</option><option>ACCEPTED</option><option>CANCELLED</option>
      </FormSelect>
      <FormSelect className="flex-1 min-w-[160px] rounded-full px-4" value={value.tenantId} onChange={event => onChange({ ...value, tenantId: event.target.value })}>
        <option value="">inquilino: todos</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.id} — {user.name}</option>)}
      </FormSelect>
      <button type="button" onClick={onApply} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
      <button type="button" onClick={onClear} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
    </div>
  );
}
