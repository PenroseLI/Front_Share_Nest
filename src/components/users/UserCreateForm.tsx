import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";
import type { UserRole } from "@/types/api";

export type UserFormValues = {
  id: string;
  name: string;
  email: string;
  age: string;
  phone: string;
  role: UserRole;
  bio: string;
  budgetMax: string;
  smoker: boolean;
  pets: boolean;
};

export const emptyUserForm: UserFormValues = {
  id: "", name: "", email: "", age: "", phone: "",
  role: "SEEKER", bio: "", budgetMax: "", smoker: false, pets: false,
};

// Formulario controlado y reutilizable: no importa usersService ni modifica el estado directamente.
export function UserCreateForm({ value, onChange, onSubmit }: {
  value: UserFormValues;
  onChange: (value: UserFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-6 grid md:grid-cols-5 gap-3 p-4 rounded-2xl bg-slate-50 border">
      <FormInput className="focus:ring-2 focus:ring-blue-500" placeholder="Cédula 5-20 dígitos" value={value.id} onChange={event => onChange({ ...value, id: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-blue-500" placeholder="Nombre" value={value.name} onChange={event => onChange({ ...value, name: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-blue-500" placeholder="Email" value={value.email} onChange={event => onChange({ ...value, email: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-blue-500" type="number" min={0} max={130} placeholder="Edad" value={value.age} onChange={event => onChange({ ...value, age: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-blue-500" placeholder="Tel +573..." value={value.phone} onChange={event => onChange({ ...value, phone: event.target.value })} required />

      <FormSelect value={value.role} onChange={event => onChange({ ...value, role: event.target.value as UserRole })}>
        <option value="SEEKER">Inquilino (SEEKER)</option>
        <option value="HOST">Anfitrión (HOST)</option>
        <option value="BOTH">Ambos (BOTH)</option>
      </FormSelect>
      <FormInput className="md:col-span-2 focus:ring-2 focus:ring-blue-500" placeholder="Bio (opcional)" value={value.bio} onChange={event => onChange({ ...value, bio: event.target.value })} />
      <FormInput className="focus:ring-2 focus:ring-blue-500" type="number" placeholder="Presupuesto máx." value={value.budgetMax} onChange={event => onChange({ ...value, budgetMax: event.target.value })} />
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={value.smoker} onChange={event => onChange({ ...value, smoker: event.target.checked })} />Fuma</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={value.pets} onChange={event => onChange({ ...value, pets: event.target.checked })} />Mascotas</label>
      </div>

      <button className="md:col-span-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition">+ Crear usuario</button>
    </FormPanel>
  );
}
