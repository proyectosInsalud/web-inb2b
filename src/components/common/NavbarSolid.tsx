'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePhoneLead } from "@/context/PhoneLeadContext";

const WSP_BASE = "https://wa.me/51943583887";

export const NavbarSolid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const { triggerCTA } = usePhoneLead();

  const linkClass = "transition hover:text-[#5DC5BE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5DC5BE] text-white text-sm whitespace-nowrap";

  return (
    <div className="bg-[#004469] sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <nav className="relative flex items-center justify-between py-4 text-white font-[var(--font-in-poppins)] md:grid md:grid-cols-3 md:items-center">

          {/* Links izquierda */}
          <div className="hidden md:flex md:justify-start md:items-center gap-6">
            <Link href="/#nosotros" className={linkClass}>Nosotros</Link>
            <Link href="/#servicios" className={linkClass}>Servicios</Link>
            <Link href="/blog" className="inline-flex items-center gap-2 group transition hover:text-[#5DC5BE] text-white text-sm whitespace-nowrap">
              <span>Blog</span>
              <span className="px-2 py-[2px] text-[10px] uppercase tracking-[0.08em] rounded-full border border-[#5DC5BE]/40 bg-[#5DC5BE]/15 text-[#5DC5BE] animate-pulse group-hover:animate-none">
                Nuevo!
              </span>
            </Link>
          </div>

          {/* Logo centrado */}
          <Link href="/" className="mx-auto md:justify-self-center w-28 md:w-24 lg:w-auto lg:mx-auto md:relative inline-block" aria-label="Ir al inicio">
            <Image className="w-full" src="/svg/logo-inb2b.svg" alt="Logo INB2B" width={151} height={50} priority />
          </Link>

          {/* Links derecha */}
          <div className="hidden md:flex md:justify-end md:items-center gap-6">
            <Link href="/#inacademy" className={linkClass}>InAcademy</Link>
            <Link href="/#health-business-club" className="hidden xl:block transition hover:text-[#5DC5BE] text-white text-sm whitespace-nowrap">Health Business Club</Link>
            <button
              className="bg-[#5DC5BE] text-black px-6 py-2 rounded-full text-sm transition-all duration-300 hover:bg-[#5DC5BE]/80 font-semibold cursor-pointer"
              onClick={() => triggerCTA(WSP_BASE, "Contáctanos - NavbarSolid")}
            >
              Contáctanos
            </button>
          </div>

          {/* Hamburger mobile */}
          <button
            type="button"
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {/* Menu mobile */}
          {isOpen && (
            <div className="md:hidden absolute left-0 right-0 top-full mt-0 border-t border-white/10 bg-[#003355] px-5 py-4 text-sm shadow-2xl z-50">
              <div className="flex flex-col gap-3 text-white">
                <Link href="/#nosotros" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-white/10 transition">Nosotros</Link>
                <Link href="/#servicios" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-white/10 transition">Servicios</Link>
                <Link href="/blog" onClick={closeMenu} className="inline-flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/10 transition">
                  <span>Blog</span>
                  <span className="px-2 py-[2px] text-[10px] uppercase tracking-[0.08em] rounded-full border border-[#5DC5BE]/40 bg-[#5DC5BE]/15 text-[#5DC5BE]">Nuevo!</span>
                </Link>
                <Link href="/#inacademy" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-white/10 transition">InAcademy</Link>
                <Link href="/#health-business-club" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-white/10 transition">Health Business Club</Link>
              </div>
              <button
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#5DC5BE] px-6 py-2 text-center text-black font-semibold transition hover:bg-[#5DC5BE]/80 cursor-pointer"
                onClick={() => { closeMenu(); triggerCTA(WSP_BASE, "Contáctanos - NavbarSolid Mobile"); }}
              >
                Contáctanos
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
