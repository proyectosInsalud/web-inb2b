import type { Metadata } from "next";
import FormContactLibro from "@/components/pages/libro/FormContactLibro";
import { HeroNav } from "@/components/pages/home/HeroNav";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Ingresa tu reclamo o queja de forma rápida y segura a través del Libro de Reclamaciones Virtual de INB2B Health Partners.",
  robots: { index: true, follow: true },
};

export default function LibroDeReclamaciones() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── NAVBAR (mismo diseño, pero no persigue el scroll) ── */}
      <div className="absolute top-0 inset-x-0 z-50 pt-4 md:pt-0">
        <HeroNav isStatic={true} />
      </div>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#004469] via-[#003355] to-[#002D46] text-white pt-36 pb-14 px-4 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#5DC5BE]/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#5DC5BE]/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-in-poppins)] leading-tight">
            Libro de Reclamaciones <span className="text-[#5DC5BE]">Virtual</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            De acuerdo al Código de Protección y Defensa del Consumidor, INB2B
            Health Partners pone a su disposición su libro de reclamaciones virtual.
          </p>

          {/* Solo badge proceso seguro */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 bg-[#5DC5BE]/20 border border-[#5DC5BE]/40 rounded-full px-4 py-2 text-sm text-[#5DC5BE]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Proceso 100% virtual y seguro
            </span>
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ── */}
      <main className="flex-1 bg-[#EEF9F8]">
        <div className="max-w-5xl mx-auto px-4 py-10 pb-16">
          <FormContactLibro />
        </div>
      </main>

    </div>
  );
}
