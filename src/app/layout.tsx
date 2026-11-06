import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShareNest — Frontend Next.js",
  description: "Habitaciones compartidas con Next.js + Tailwind — Backend NestJS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full text-slate-900 antialiased">
        <header className="sticky top-0 z-20 border-b border-slate-950/20 bg-[#131a2a]/95 text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">◈</span>
              <span className="font-semibold tracking-tight text-lg">Share<span className="font-light text-slate-300">Nest</span></span>
              <span className="hidden md:inline-flex ml-2 px-2 py-0.5 rounded-full bg-white/10 text-amber-200 text-[10px] font-bold tracking-widest border border-white/10">DEMO</span>
            </Link>
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="w-full relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                <input placeholder="Buscar habitaciones, ciudades..." className="w-full pl-9 pr-4 py-2 rounded-full bg-white/95 border border-white/20 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30 focus:outline-none text-sm" />
              </div>
            </div>
            <Nav />
          </div>
        </header>
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-10">{children}</main>
        <footer className="max-w-7xl mx-auto w-full px-4 md:px-6 pb-8 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 border-t border-stone-300/80 pt-6">
            <span>© ShareNest — Next.js + Tailwind • Backend NestJS en <span className="font-mono bg-white/80 border border-stone-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}</span></span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Diseño de ejemplo para clase</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
