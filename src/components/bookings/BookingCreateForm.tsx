import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";
import type { Listing, User } from "@/types/api";

export type BookingFormValues = { tenantId: string; listingId: string; startDate: string; months: string };

export const emptyBookingForm: BookingFormValues = { tenantId: "", listingId: "", startDate: "", months: "1" };

// Usuarios y habitaciones llegan por props. Solo se ofrecen habitaciones ACTIVE, que son las reservables.
export function BookingCreateForm({ users, listings, value, onChange, onSubmit }: {
  users: User[];
  listings: Listing[];
  value: BookingFormValues;
  onChange: (value: BookingFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-4 grid md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border">
      <FormSelect value={value.tenantId} onChange={event => onChange({ ...value, tenantId: event.target.value })} required>
        {users.map(user => <option key={user.id} value={user.id}>{user.id} — {user.name}</option>)}
      </FormSelect>
      <FormSelect value={value.listingId} onChange={event => onChange({ ...value, listingId: event.target.value })} required>
        {listings.length === 0 && <option value="">No hay habitaciones ACTIVE</option>}
        {listings.map(listing => <option key={listing.id} value={listing.id}>{listing.title} — {listing.city} — ${Number(listing.pricePerMonth).toLocaleString()}/mes</option>)}
      </FormSelect>
      <FormInput type="date" value={value.startDate} onChange={event => onChange({ ...value, startDate: event.target.value })} required />
      <FormInput type="number" min={1} max={24} placeholder="Meses (1-24)" value={value.months} onChange={event => onChange({ ...value, months: event.target.value })} required />
      <button className="md:col-span-4 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90">+ Crear solicitud</button>
    </FormPanel>
  );
}
