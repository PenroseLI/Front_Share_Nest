"use client";

import { use } from "react";
import { usersService } from "@/modules/users/services/usersService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // El valor de [id] en la carpeta corresponde al id de la URL actual.
  const { id } = use(params);
  const { entity: user, loading, error } = useEntityDetail(id, usersService.getById);

  if (loading) return <LoadingState label="Cargando usuario..." />;
  if (error) return <ErrorState message={error} />;
  if (!user) return <EmptyState>Usuario no encontrado</EmptyState>;

  return (
    <EntityDetailLayout accent="blue" backHref="/users" backLabel="usuarios" title={user.name} description="Detalle del usuario consultado por su ID en la ruta dinámica.">
      <EntityCard accent="blue">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="text-sm text-slate-500">Documento</dt><dd className="mt-1 font-mono text-sm break-all">{user.id}</dd></div>
          <div><dt className="text-sm text-slate-500">Correo</dt><dd className="mt-1 font-medium break-all">{user.email}</dd></div>
          <div><dt className="text-sm text-slate-500">Edad</dt><dd className="mt-1 font-medium">{user.age} años</dd></div>
          <div><dt className="text-sm text-slate-500">Teléfono</dt><dd className="mt-1 font-medium">{user.phone}</dd></div>
          <div><dt className="text-sm text-slate-500">Rol</dt><dd className="mt-1 font-medium">{user.role}</dd></div>
          <div><dt className="text-sm text-slate-500">Presupuesto máx.</dt><dd className="mt-1 font-medium">{user.budgetMax ? "$" + Number(user.budgetMax).toLocaleString() : "—"}</dd></div>
          <div><dt className="text-sm text-slate-500">Fuma</dt><dd className="mt-1 font-medium">{user.smoker ? "Sí" : "No"}</dd></div>
          <div><dt className="text-sm text-slate-500">Mascotas</dt><dd className="mt-1 font-medium">{user.pets ? "Sí" : "No"}</dd></div>
          <div className="sm:col-span-2 lg:col-span-4"><dt className="text-sm text-slate-500">Bio</dt><dd className="mt-1">{user.bio || "Sin bio"}</dd></div>
        </dl>
      </EntityCard>
    </EntityDetailLayout>
  );
}
