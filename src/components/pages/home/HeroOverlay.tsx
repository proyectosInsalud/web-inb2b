"use client";
import { HeroNav } from "./HeroNav";
import { usePhoneLead } from "@/context/PhoneLeadContext";

const WSP_HREF =
  "https://wa.me/51943583887?text=%C2%A1Hola!%20Vi%20su%20web%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%C2%A0sobre%C2%A0INB2B";

export const HeroOverlay = () => {
  const { triggerCTA } = usePhoneLead();

  return (
    <div className="bg-cover bg-center bg-no-repeat h-[70vh] md:h-[100vh] relative p-[0.1px]">
        <video
          src="/hero-video-horizontal.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="object-cover hidden md:block absolute top-0 left-0 w-full h-full min-h-[100vh] max-h-none -z-10"
          style={{objectPosition: "center"}}
        />
        <video
          src="/hero-video-vertical.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="object-cover block md:hidden absolute top-0 left-0 w-full h-full min-h-[100vh] max-h-none -z-10"
          style={{objectPosition: "center"}}
        />
        <div className="absolute inset-0 bg-black/50 -z-10"></div>
        <div className="mt-6">
          <HeroNav />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-12 pb-14 md:py-24 container space-y-6 text-white md:translate-y-1/2 md:top-1/2">
          <div data-aos="fade-up" className="absolute md:relative bottom-12 space-y-4">
            <h1 className="text-3xl text-center md:text-left md:text-5xl lg:text-6xl w-full lg:w-1/2 max-w-2xl font-in-avantgarde md:px-0 pr-4 leading-8 md:leading-none">INB2B transforma ideas
            en proyectos de salud rentables en LATAM</h1>
            <div className="font-in-poppins flex-col md:flex-row flex items-center md:items-start gap-4">
              <h2 className="md:text-lg md:py-0 text-center">¿Tienes un proyecto en salud?</h2>
              <button
                onClick={() => triggerCTA(WSP_HREF, "Conversemos - Hero")}
                className="cta-wsp-custom bg-in-cyan px-6 py-2 text-black rounded-full cursor-pointer"
              >
                Conversemos
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
