'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const HeroNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="px-4 md:px-0">
      <div className="container md:backdrop-blur-[35px] md:bg-[linear-gradient(181deg,rgba(255,255,255,0.50)_1.15%,rgba(255,255,255,0.00)_98.91%)] max-w-7xl md:fixed md:left-1/2 md:-translate-x-1/2 md:top-6 md:z-30 mx-auto md:px-10 rounded-[30px] md:py-4 lg:py-0">
        <nav className="relative z-40 flex items-center justify-between py-4 lg:py-6 text-gray-100 font-in-poppins md:grid md:grid-cols-3 md:items-center">
          <div className="hidden md:flex md:justify-start md:items-center gap-4 md:gap-6 text-end text-sm md:text-base whitespace-nowrap">
            <Link
              href="/#nosotros"
              className="transition hover:text-in-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-in-cyan"
            >
              Nosotros
            </Link>
            <Link
              href="/#servicios"
              className="transition hover:text-in-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-in-cyan"
            >
              Servicios
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 group transition hover:text-in-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-in-cyan"
            >
              <span>Blog</span>
              <span className="px-2 py-[2px] text-[10px] uppercase tracking-[0.08em] rounded-full border border-in-cyan/40 bg-in-cyan/15 text-in-cyan shadow-[0_0_0_1px_rgba(93,197,190,0.25)] animate-pulse group-hover:animate-none group-hover:bg-in-cyan/25">
                Nuevo!
              </span>
            </Link>
          </div>
          <Link
            href="/"
            className="mx-auto left-0 md:justify-self-center w-32 md:w-24 lg:w-auto lg:mx-auto md:relative inline-block"
            aria-label="Ir al inicio"
          >
            <Image
              className="w-full"
              src="/svg/logo-inb2b.svg"
              alt="Logo"
              width={151}
              height={50}
              priority
            />
          </Link>

          <div className="hidden md:flex md:justify-end md:items-center gap-4 md:gap-6 whitespace-nowrap">
            <Link
              href="/#inacademy"
              className="transition hover:text-in-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-in-cyan"
            >
              InAcademy
            </Link>
            <Link
              href="/#health-business-club"
              className="hidden xl:block transition hover:text-in-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-in-cyan"
            >
              Health Business Club
            </Link>
            <Link
              className="cta-wsp-custom bg-in-cyan text-black px-6 md:px-7 lg:px-8 py-2 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-in-cyan/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-in-cyan"
              href="https://wa.me/51943583887?text=Hola%20Vi%20su%20web%20y%20me%20gustaria%20obtener%20mas%20informacion%20sobre%20INB2B"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contáctanos
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">{isOpen ? "Cerrar menu" : "Abrir menu"}</span>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {isOpen && (
            <div className="md:hidden absolute left-0 right-0 top-full mt-3 rounded-2xl border border-white/10 bg-black/80 px-5 py-4 text-sm shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                <Link
                  href="/#nosotros"
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 -mx-2 transition hover:bg-white/10 active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-in-cyan"
                >
                  Nosotros
                </Link>
                <Link
                  href="/#servicios"
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 -mx-2 transition hover:bg-white/10 active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-in-cyan"
                >
                  Servicios
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 -mx-2 transition hover:bg-white/10 active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-in-cyan"
                  onClick={closeMenu}
                >
                  <span>Blog</span>
                  <span className="px-2 py-[2px] text-[10px] uppercase tracking-[0.08em] rounded-full border border-in-cyan/40 bg-in-cyan/15 text-in-cyan shadow-[0_0_0_1px_rgba(93,197,190,0.25)] animate-pulse">
                    Nuevo!
                  </span>
                </Link>
                <Link
                  href="/#inacademy"
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 -mx-2 transition hover:bg-white/10 active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-in-cyan"
                >
                  InAcademy
                </Link>
                <Link
                  href="/#health-business-club"
                  onClick={closeMenu}
                  className="rounded-lg px-2 py-1 -mx-2 transition hover:bg-white/10 active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-in-cyan"
                >
                  Health Business Club
                </Link>
              </div>
              <Link
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-in-cyan px-6 py-2 text-center text-black transition hover:bg-in-cyan/80 active:bg-in-cyan/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60"
                href="https://wa.me/51943583887?text=Hola%20Vi%20su%20web%20y%20me%20gustaria%20obtener%20mas%20informacion%20sobre%20INB2B"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Contáctanos
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
