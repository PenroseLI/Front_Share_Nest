import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";
import type { ListingStatus, User } from "@/types/api";

export type ListingFormValues = {
  hostId: string;
  title: string;
  description: string;
  city: string;
  address: string;
  pricePerMonth: string;
  maxRoommates: string;
  amenities: string; // separados por coma: "wifi, lavadora"
  status: ListingStatus;
};

export const emptyListingForm: ListingFormValues = {
  hostId: "", title: "", description: "", city: "", address: "",
  pricePerMonth: "", maxRoommates: "1", amenities: "", status: "ACTIVE",
};

// Los anfitriones llegan por props: solo pueden publicar usuarios HOST o BOTH.
export function ListingCreateForm({ hosts, value, onChange, onSubmit }: {
  hosts: User[];
  value: ListingFormValues;
  onChange: (value: ListingFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-4 grid md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border">
      <FormSelect value={value.hostId} onChange={event => onChange({ ...value, hostId: event.target.value })} required>
        {hosts.length === 0 && <option value="">Crea primero un usuario HOST o BOTH</option>}
        {hosts.map(host => <option key={host.id} value={host.id}>{host.id} — {host.name}</option>)}
      </FormSelect>
      <FormInput className="focus:ring-2 focus:ring-emerald-500" placeholder="Título 3-120" value={value.title} onChange={event => onChange({ ...value, title: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-emerald-500" placeholder="Ciudad" value={value.city} onChange={event => onChange({ ...value, city: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-emerald-500" placeholder="Dirección 5-200" value={value.address} onChange={event => onChange({ ...value, address: event.target.value })} required />
      <FormInput type="number" step="0.01" min={0} placeholder="Precio por mes" value={value.pricePerMonth} onChange={event => onChange({ ...value, pricePerMonth: event.target.value })} required />
      <FormInput type="number" min={1} max={10} placeholder="Compañeros máx. (1-10)" value={value.maxRoommates} onChange={event => onChange({ ...value, maxRoommates: event.target.value })} required />
      <FormInput placeholder="Servicios: wifi, lavadora" value={value.amenities} onChange={event => onChange({ ...value, amenities: event.target.value })} />
      <FormSelect value={value.status} onChange={event => onChange({ ...value, status: event.target.value as ListingStatus })}>
        <option value="ACTIVE">ACTIVE</option><option value="PAUSED">PAUSED</option><option value="RENTED">RENTED</option>
      </FormSelect>
      <FormInput className="md:col-span-4" placeholder="Descripción (opcional)" value={value.description} onChange={event => onChange({ ...value, description: event.target.value })} />
      <button className="md:col-span-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow hover:opacity-90">+ Publicar habitación</button>
    </FormPanel>
  );
}
