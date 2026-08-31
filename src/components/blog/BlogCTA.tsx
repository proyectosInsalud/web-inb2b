"use client";
import Image from "next/image";
import { usePhoneLead } from "@/context/PhoneLeadContext";

const WSP_HREF =
  "https://wa.me/51997231931?text=%C2%A1Hola!%20Vi%20su%20p%C3%A1gina%20web.%20Deseo%20m%C3%A1s%20informacion%20sobre%20c%C3%B3mo%20categorizar%20mi%20negocio";

export function BlogCTA() {
  const { triggerCTA } = usePhoneLead();

  return (
    <section className="pt-16 md:pt-24 pb-28 md:pb-32">
      <div className="container max-w-4xl mx-auto px-4 relative">
        {/* Decorative + icons */}
        <Image
          src="/svg/plus-icons.svg"
          alt=""
          width={32}
          height={32}
          className="absolute -top-6 left-8 md:left-0 opacity-70"
          aria-hidden="true"
        />
        <Image
          src="/svg/plus-icons.svg"
          alt=""
          width={20}
          height={20}
          className="absolute -top-2 right-16 md:right-12 opacity-50"
          aria-hidden="true"
        />
        <Image
          src="/svg/plus-icons.svg"
          alt=""
          width={36}
          height={36}
          className="absolute -bottom-10 right-4 md:right-0 opacity-70"
          aria-hidden="true"
        />
        <Image
          src="/svg/plus-icons.svg"
          alt=""
          width={24}
          height={24}
          className="absolute -bottom-6 left-12 md:left-8 opacity-50"
          aria-hidden="true"
        />

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-12 md:py-16 px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold font-in-avantgarde mb-4 max-w-xl mx-auto">
            Quiero una asesoría para escalar mi centro de salud
          </h2>
          <p className="text-white/50 font-in-poppins text-sm md:text-base mb-8 max-w-lg mx-auto">
            Más de 100 centros de salud confían en INB2B y ya crecieron sus centros.
          </p>
          <button
            onClick={() => triggerCTA(WSP_HREF, "Contactarme con un asesor - Blog")}
            className="inline-block border border-white/30 text-white px-8 py-3 rounded-full font-in-poppins text-sm hover:bg-white/10 transition-colors cursor-pointer"
          >
            Contactarme con un asesor
          </button>
        </div>
      </div>
    </section>
  );
}
