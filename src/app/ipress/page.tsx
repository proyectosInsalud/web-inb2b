'use client';

import { useState } from "react";
import { HeroNav } from "@/components/pages/home/HeroNav";
import { usePhoneLead } from "@/context/PhoneLeadContext";

const WSP_IPRESS = "https://wa.me/51943366635?text=%C2%A1Hola!%20Vi%20su%20p%C3%A1gina%20IPRESS.%20Deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20categorizaci%C3%B3n%20de%20mi%20establecimiento";

const services = [
  {
    title: "Consultorios médicos",
    description: "Categorización completa para consultorios de medicina general y especialidades.",
    icon: (
      <svg className="w-6 h-6 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    title: "Centros médicos",
    description: "Gestión integral para policlínicos, clínicas y centros multidisciplinarios.",
    icon: (
      <svg className="w-6 h-6 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Consultorios odontológicos",
    description: "Categorización con cumplimiento sanitario y normativo del sector dental.",
    icon: (
      <svg className="w-6 h-6 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Centros de diagnóstico",
    description: "Laboratorios, imagenología y centros de apoyo al diagnóstico.",
    icon: (
      <svg className="w-6 h-6 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Servicios de fisioterapia",
    description: "Centros de rehabilitación, terapia física y medicina alternativa.",
    icon: (
      <svg className="w-6 h-6 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Renovación y ampliación",
    description: "Actualización de categoría, ampliación de servicios y cambio de local.",
    icon: (
      <svg className="w-6 h-6 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const steps = [
  { n: "01", title: "Diagnóstico inicial", desc: "Evaluamos tu establecimiento y definimos la categoría objetivo." },
  { n: "02", title: "Plan de adecuación", desc: "Diseñamos el plan técnico, sanitario y arquitectónico." },
  { n: "03", title: "Gestión documental", desc: "Preparamos y presentamos todos los expedientes ante la autoridad." },
  { n: "04", title: "Resolución y entrega", desc: "Acompañamos la inspección y entregamos tu categorización." },
];

const faqs = [
  { q: "¿Qué es la categorización de establecimientos de salud?", a: "Es el reconocimiento oficial del MINSA a través de DIRIS/DIRESA que clasifica tu consultorio o centro médico según los servicios que ofrece (I-1, I-2, I-3, I-4). Es obligatorio para operar legalmente." },
  { q: "¿Cuánto tiempo demora el proceso?", a: "El proceso completo toma entre 30 y 60 días hábiles, dependiendo de la complejidad de tu establecimiento y la categoría objetivo." },
  { q: "¿Qué pasa si no obtengo la categorización?", a: "Te ofrecemos una garantía formal: si tu categorización no se aprueba por errores nuestros, te devolvemos el 100% de tu inversión." },
  { q: "¿Trabajan en todo el Perú?", a: "Sí, atendemos a nivel nacional con equipos en Lima, Arequipa, Trujillo, Cusco y Piura. Para otras ciudades coordinamos visitas técnicas." },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-in-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
      <button onClick={() => setOpen(p => !p)} className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold hover:bg-white/5 transition gap-4">
        <span className="text-sm md:text-base">{q}</span>
        <svg className={`w-5 h-5 text-in-cyan flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-5 text-white/65 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</div>}
    </div>
  );
}

export default function IpressPage() {
  const { triggerCTA } = usePhoneLead();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "ipress" }),
      });
      setSent(true);
    } catch { /* noop */ }
    finally { setSending(false); }
  };

  return (
    <>
      {/* Header */}
      <HeroNav />

      <main className="text-white font-in-poppins">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="bg-in-blue-dark px-4 pt-28 md:pt-32 pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs border border-white/20 rounded-full px-4 py-1.5 mb-8 text-white/70 tracking-wide">
                <CheckIcon />
                Única empresa formal en Perú
              </div>
              <h1 className="text-4xl md:text-[2.8rem] lg:text-5xl font-bold leading-[1.15] mb-5">
                ¿Eres dueño de un consultorio o centro médico?
              </h1>
              <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Categoriza tu establecimiento de salud con respaldo profesional, cumple con DIRIS/DIRESA y opera con total tranquilidad legal.
              </p>
              <div className="flex flex-wrap gap-3 mb-14">
                <button
                  onClick={() => triggerCTA(WSP_IPRESS, "Hero CTA - IPRESS")}
                  className="inline-flex items-center gap-2 bg-in-cyan text-black font-semibold px-7 py-3 rounded-full hover:bg-in-cyan/80 transition-all"
                >
                  Solicitar asesoría gratis
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
                <a href="#proceso" className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3 rounded-full hover:bg-white/8 transition-all font-medium text-sm">
                  Ver proceso paso a paso
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-6 border-t border-white/10">
                {[{ val: "+100", label: "Clientes" }, { val: "+130", label: "Proyectos realizados" }, { val: "+6", label: "Años exp." }].map(({ val, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-bold text-white">{val}</p>
                    <p className="text-white/50 text-xs mt-0.5 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — card */}
            <div className="bg-in-blue-base border border-white/10 rounded-2xl p-7 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between mb-5">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <CheckIcon />
                  Certificación garantizada
                </span>
                <span className="text-[11px] bg-in-cyan/15 text-in-cyan border border-in-cyan/25 px-3 py-1 rounded-full font-medium">Activo</span>
              </div>
              <ul className="space-y-3 mb-7">
                {["Categorización ante DIRIS / DIRESA", "Plan de gestión integral", "Documentación técnica completa", "Asesoría legal y sanitaria", "Acompañamiento hasta la resolución"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/75">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-sm border-t border-white/10 pt-5">
                <span className="text-white/50">Tiempo estimado</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <svg className="w-4 h-4 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  30 – 60 días
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ────────────────────────────────────── */}
        <section className="bg-in-blue-base border-y border-white/8 py-5 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Empresa formal", path: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
              { label: "Equipo garantizado", path: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
              { label: "100% legal", path: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
              { label: "Soporte continuo", path: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" },
            ].map(({ label, path }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8">
                <svg className="w-5 h-5 text-in-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                </svg>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICIOS ────────────────────────────────────── */}
        <section id="servicios" className="bg-in-blue-main py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[11px] uppercase tracking-[0.15em] text-in-cyan border border-in-cyan/25 rounded-full px-4 py-1.5 mb-5 inline-block">Servicios especializados</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-5 mb-4 leading-tight">
                Categoriza tu consultorio con la única<br className="hidden md:block" /> empresa formal en gestión del sector salud.
              </h2>
              <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Atendemos consultorios, clínicas especializadas y cada categoría SMA (Servicios médicos de apoyo), I-1, I-2, I-3, I-4 y II-E con un equipo multidisciplinario que garantiza el cumplimiento normativo total.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.title} className="group bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:border-in-cyan/35 hover:bg-white/[0.07] transition-all duration-200 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-in-cyan/10 flex items-center justify-center mb-5 group-hover:bg-in-cyan/15 transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-1">{s.description}</p>
                  <button
                    onClick={() => triggerCTA(WSP_IPRESS, `Conocer más - ${s.title}`)}
                    className="mt-5 text-in-cyan text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all font-medium"
                  >
                    Conocer más
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POR QUÉ INB2B ───────────────────────────────── */}
        <section className="bg-in-blue-dark py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">¿Por qué INB2B?</h2>
                <p className="text-white/55 mb-10 text-sm md:text-base">Somos la única empresa formal con equipo de gestión garantizado.</p>
                <div className="space-y-6">
                  {[
                    { title: "Equipo multidisciplinario interno", desc: "Médicos, ingenieros, arquitectos y abogados en planilla." },
                    { title: "Contrato formal y boleta/factura", desc: "Operamos con total transparencia y respaldo legal." },
                    { title: "Garantía de resolución favorable", desc: "Si no obtienes tu categorización, te devolvemos tu inversión." },
                    { title: "Acompañamiento post-categorización", desc: "Asesoría continua para mantener tu cumplimiento sanitario." },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="mt-0.5 w-7 h-7 rounded-full bg-in-cyan/15 border border-in-cyan/25 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-0.5">{title}</p>
                        <p className="text-white/55 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => triggerCTA(WSP_IPRESS, "Quiero categorizarme - Why")}
                  className="mt-10 inline-flex items-center gap-2 bg-in-cyan text-black font-semibold px-7 py-3 rounded-full hover:bg-in-cyan/80 transition-all"
                >
                  Quiero categorizarme
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[{ val: "98%", label: "Tasa de aprobación en primera presentación" }, { val: "+500", label: "Establecimientos atendidos" }, { val: "30-60", label: "Días promedio de gestión" }].map(({ val, label }) => (
                    <div key={val} className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-in-cyan">{val}</p>
                      <p className="text-white/50 text-xs mt-2 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-in-cyan" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm italic leading-relaxed mb-4">
                    "Pensé que la categorización iba a ser un dolor de cabeza, pero INB2B se encargó de todo. Hoy operamos con total tranquilidad legal."
                  </p>
                  <p className="text-in-cyan text-sm font-semibold not-italic">Dra. Carla Méndez</p>
                  <p className="text-white/45 text-xs">Centro Médico San Borja</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESO ──────────────────────────────────────── */}
        <section id="proceso" className="bg-in-blue-main py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Un proceso claro, sin complicaciones</h2>
              <p className="text-white/55 max-w-lg mx-auto text-sm md:text-base">
                Cuatro etapas diseñadas para que te concentres en lo que haces mejor: atender a tus pacientes.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-4 relative">
              {steps.map(({ n, title, desc }, i) => (
                <div key={n} className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <p className="text-in-cyan text-xl font-bold mb-4">{n}</p>
                  <h3 className="font-semibold mb-2 text-sm">{title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{desc}</p>
                  {i < 3 && (
                    <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 bg-in-blue-main w-7 h-7 rounded-full border border-white/10 items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="bg-in-blue-dark py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </section>

        {/* ── CONTACTO ─────────────────────────────────────── */}
        <section id="contacto" className="bg-in-blue-main py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Agenda tu asesoría gratuita hoy</h2>
              <p className="text-white/55 text-sm md:text-base">Un especialista te contactará en menos de 24 horas para evaluar tu caso sin compromiso.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Info */}
              <div className="md:col-span-2 space-y-5">
                {[
                  { path: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", text: "+51 943 583 887" },
                  { path: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", text: "inb2b.contacto@gmail.com" },
                  { path: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", text: "Lima, Perú" },
                ].map(({ path, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/65 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-in-cyan/10 border border-in-cyan/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={path} /></svg>
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="md:col-span-3 bg-white/[0.04] border border-white/10 rounded-2xl p-7 space-y-4">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-in-cyan/15 border border-in-cyan/25 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-in-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <p className="font-semibold text-lg">¡Solicitud enviada!</p>
                    <p className="text-white/55 text-sm mt-1">Te contactaremos en menos de 24 horas.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/55 mb-1.5 uppercase tracking-wide">Nombre completo</label>
                        <input required type="text" placeholder="Dr. Juan Pérez" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-in-cyan/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/55 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                        <input required type="email" placeholder="tu@correo.com" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-in-cyan/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/55 mb-1.5 uppercase tracking-wide">Teléfono / WhatsApp</label>
                        <input required type="tel" placeholder="+51 ..." value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-in-cyan/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/55 mb-1.5 uppercase tracking-wide">Tipo de establecimiento</label>
                        <select required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                          className="w-full bg-in-blue-dark border border-white/12 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-in-cyan/50 transition-colors"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value="consultorio-medico">Consultorio médico</option>
                          <option value="centro-medico">Centro médico</option>
                          <option value="consultorio-odontologico">Consultorio odontológico</option>
                          <option value="centro-diagnostico">Centro de diagnóstico</option>
                          <option value="fisioterapia">Fisioterapia</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full bg-in-cyan text-black font-semibold py-3.5 rounded-full hover:bg-in-cyan/80 transition-all disabled:opacity-60 mt-1"
                    >
                      {sending ? "Enviando..." : "Quiero mi asesoría gratis"}
                    </button>
                    <p className="text-center text-white/35 text-xs">Al enviar aceptas nuestra política de privacidad. Sin spam.</p>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
