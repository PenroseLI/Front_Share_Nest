# ShareNest — Frontend

Frontend en **Next.js 16 + React 19 + Tailwind 4** para ShareNest, una plataforma para publicar y reservar habitaciones compartidas. Consume la API del backend NestJS (`backend-nestjs-seed`).

## Requisitos

- Node 20+
- El backend corriendo en `http://localhost:3000`

## Puesta en marcha

```bash
npm install
cp .env.example .env      # NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001 npm run dev     # el backend usa el 3000, el front el 3001
```

Abre `http://localhost:3001`.

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm run lint` | ESLint |

## Rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Inicio con accesos a los tres módulos |
| `/users` | Lista y creación de usuarios (cédula, rol, bio, presupuesto, fuma, mascotas) |
| `/users/[id]` | Detalle del usuario |
| `/listings` | Habitaciones con filtros (ciudad, precio mín./máx., servicio) y publicación |
| `/listings/[id]` | Detalle y edición (título, precio, estado) |
| `/bookings` | Solicitudes con filtros (estado, inquilino) y creación |
| `/bookings/[id]` | Detalle, aceptar y cancelar |
| `/bookings/user/[userId]` | Solicitudes de un inquilino |

## Arquitectura

```
página (src/app)  →  service (src/modules/*/services)  →  apiClient (src/lib/api.ts)  →  backend NestJS
```

- `src/types/api.ts`: tipos espejo de las entities y DTOs del backend.
- `src/lib/api.ts`: cliente HTTP único (`get/post/put/delete`) y `ApiError`, que muestra los mensajes de validación del backend.
- `src/modules/{users,listings,bookings}/services`: un service por módulo; las páginas nunca llaman `fetch` directamente.
- `src/components`: componentes de presentación por módulo y `ui/` compartidos.
- `src/hooks/useEntityDetail.ts`: hook genérico para las rutas de detalle.

## Reglas de negocio que se ven en la interfaz

Las aplica el backend y la interfaz muestra su mensaje cuando rechaza una acción:

- Solo usuarios HOST o BOTH pueden publicar habitaciones.
- Solo se reservan habitaciones ACTIVE.
- Nadie reserva su propia habitación y la fecha de inicio no puede estar en el pasado.
- Estados de una solicitud: `PENDING → ACCEPTED → CANCELLED`; una solicitud cancelada no se reactiva.
- El precio se guarda como snapshot al reservar: cambiarlo después no altera solicitudes existentes.
- Usuarios y habitaciones se "eliminan" con soft delete.

## Backend

Repositorio del backend: `backend-nestjs-seed` (NestJS + TypeORM). Su colección de Postman está en `postman/`.
