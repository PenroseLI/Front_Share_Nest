"use client";
import { useState } from "react";
import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";
import type { Listing, ListingStatus, UpdateListingDto } from "@/types/api";

// Se monta solo cuando la habitación ya cargó, así que puede iniciar su estado desde las props.
export function ListingEditForm({ listing, onSave }: {
  listing: Listing;
  onSave: (data: UpdateListingDto) => Promise<void>;
}) {
  const [title, setTitle] = useState(listing.title);
  const [price, setPrice] = useState(String(Number(listing.pricePerMonth)));
  const [status, setStatus] = useState<ListingStatus>(listing.status);

  return (
    <FormPanel onSubmit={() => onSave({ title, pricePerMonth: Number(price), status })} className="grid md:grid-cols-4 gap-3">
      <FormInput className="md:col-span-2" value={title} onChange={event => setTitle(event.target.value)} required />
      <FormInput type="number" step="0.01" min={0} value={price} onChange={event => setPrice(event.target.value)} required />
      <FormSelect value={status} onChange={event => setStatus(event.target.value as ListingStatus)}>
        <option value="ACTIVE">ACTIVE</option><option value="PAUSED">PAUSED</option><option value="RENTED">RENTED</option>
      </FormSelect>
      <button className="md:col-span-4 py-2.5 rounded-full bg-slate-900 text-white font-semibold hover:bg-black">Guardar cambios</button>
    </FormPanel>
  );
}
