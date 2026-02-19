import Image from "next/image";
import Link from "next/link";

export const HeroNav = () => {
  return (
    <div className="px-4 md:px-0">
      <div
        className="container md:backdrop-blur-[35px] md:bg-[linear-gradient(181deg,rgba(255,255,255,0.50)_1.15%,rgba(255,255,255,0.00)_98.91%)] max-w-7xl md:fixed md:left-1/2 md:-translate-x-1/2 md:top-6 md:z-30 mx-auto md:px-10 rounded-[30px] md:py-4 lg:py-0"
      >
        <nav className="relative flex justify-between items-center py-4 lg:py-6 text-gray-100 font-in-poppins">
          <div className="hidden md:flex flex-col md:order-2  lg:order-1 md:flex-row gap-6 text-end">
            <Link href="/#nosotros">Nosotros</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 group"
            >
              <span>Blog</span>
              <span className="px-2 py-[2px] text-[10px] uppercase tracking-[0.08em] rounded-full border border-in-cyan/40 bg-in-cyan/15 text-in-cyan shadow-[0_0_0_1px_rgba(93,197,190,0.25)] animate-pulse group-hover:animate-none group-hover:bg-in-cyan/25">
                ¡Nuevo!
              </span>
            </Link>
          </div>
          <Image
            className="mx-auto left-0 md:mr-auto w-32 md:w-24 lg:w-auto lg:mx-auto md:order-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2 md:relative"
            src="/svg/logo-inb2b.svg"
            alt="Logo"
            width={151}
            height={50}
          />
          <div className="hidden lg:flex flex-col md:order-1 lg:flex-row items-center gap-6">
            <Link href="/#inacademy">InAcademy</Link>
            <Link href="/#health-business-club" className="hidden xl:block">Health Business Club</Link>
            <Link
              className="cta-wsp-custom bg-in-cyan text-black px-8 py-2 rounded-full transition-all duration-300 hover:bg-in-cyan/80"
              href="https://wa.me/51943583887?text=¡Hola!%20Vi%20su%20web%20y%20me%20gustaría%20obtener%20más%20información%20sobre%20INB2B"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contáctanos
            </Link>
          </div>

        </nav>
      </div>
    </div>
  );
};
