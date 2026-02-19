import Image from "next/image";
import Link from "next/link";

export function BlogCTA() {
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
          <Link
            href="https://wa.me/51943583887?text=¡Hola!%20Quiero%20una%20asesoría%20para%20escalar%20mi%20centro%20de%20salud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded-full font-in-poppins text-sm hover:bg-white/10 transition-colors"
          >
            Contactarme con un asesor
          </Link>
        </div>
      </div>
    </section>
  );
}
