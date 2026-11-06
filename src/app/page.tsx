import Link from "next/link";
import { HomeShortcutCard } from "@/components/HomeShortcutCard";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#131a2a] via-[#1d2b43] to-[#253a56] text-white p-8 md:p-12 shadow-[0_24px_60px_rgb(20,28,43,0.2)]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full blur-[80px] opacity-25" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full blur-[80px] opacity-20" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/15 border border-amber-200/30 text-amber-100 text-xs font-semibold tracking-widest uppercase backdrop-blur">Proyecto ShareNest • Next.js</div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4 leading-[0.95]">Encuentra tu espacio.<br /><span className="font-light bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">Comparte la vida.</span></h1>
          <p className="text-white/70 mt-4 max-w-2xl">Frontend Next.js + Tailwind conectado a tu backend NestJS. Tres módulos: Usuarios, Habitaciones y Solicitudes, con filtros y reglas de negocio.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/listings" className="px-6 py-3 rounded-full bg-amber-300 text-slate-950 font-semibold hover:bg-amber-200 transition">Explorar habitaciones →</Link>
            <Link href="/bookings" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur text-white font-medium hover:bg-white/15">Ver solicitudes</Link>
            <span className="inline-flex items-center px-4 py-3 rounded-full bg-white/10 border border-white/10 text-xs font-mono">API {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <HomeShortcutCard href="/users" accent="blue" icon="👥" title="Usuarios" description="Anfitriones e inquilinos • soft delete" action="Entrar" />
        <HomeShortcutCard href="/listings" accent="emerald" icon="🏠" title="Habitaciones" description="Publicaciones con filtros de ciudad, precio y servicios" action="Explorar" />
        <HomeShortcutCard href="/bookings" accent="violet" icon="🧾" title="Solicitudes" description="Reservas con reglas de negocio y estados" action="Ver solicitudes" />
      </div>

      <div className="rounded-2xl border border-stone-200 bg-[#fffdf9]/85 p-4 shadow-[0_8px_24px_rgb(71,55,34,0.05)] flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <span className="text-slate-600">¿Backend local? <span className="font-mono bg-stone-100 border border-stone-200 px-2 py-1 rounded">NEXT_PUBLIC_API_URL=http://localhost:3000</span></span>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Simple • Didáctico • Listo para Vercel</span>
      </div>
    </div>
  );
}
