"use client";
import Image from "next/image";
import { benefitsMain } from "@/data/benefitsMain";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { usePhoneLead } from "@/context/PhoneLeadContext";

const CLUB_HREF = "https://chat.whatsapp.com/CDs3m8GxO4N5G9hgVO2kMo?mode=r_t";

export const ClubBenefits = () => {
  const { triggerCTA } = usePhoneLead();

  return (
    <div id="health-business-club" className="bg-in-blue-main">
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div data-aos="fade-up" data-aos-duration="1000" className="relative mb-16">
          <div className="relative w-full h-auto">
            <Image
              src="/images/club-benefits.png"
              alt="Club Benefits"
              width={1000}
              height={314}
              className="hidden sm:block w-full h-auto"
              unoptimized
            />
            <Image
              src="/images/club-benefits-vertical.png"
              alt="Club Benefits"
              width={1000}
              height={600}
              className="sm:hidden w-full h-auto block"
              unoptimized
            />
            <div
                className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
                style={{
                    background: "linear-gradient(0deg, rgba(24, 41, 77, 0.85) 0%, rgba(24, 41, 77, 0.45) 60%, rgba(24, 41, 77, 0.00) 100%)"
                }}
            />
          </div>
          <div className="absolute lg:relative bottom-4 left-6 right-6 lg:left-auto lg:right-auto">
            <h3 className="flex left-6 lg:absolute bottom-4 font-in-avantgarde tracking-wider text-white text-2xl md:text-4xl font-bold max-w-sm">
                Health Business Club INB2B
            </h3>
            <p className="flex right-6 lg:absolute bottom-4 font-in-poppins max-w-sm text-white lg:text-lg leading-6">
                Una comunidad de líderes que están transformando el sector salud en
                Latinoamérica.
            </p>
          </div>
        </div>

        <p data-aos="fade-up" data-aos-duration="1000" className="text-center text-white font-in-poppins md:text-lg leading-6 mb-10">
          El Health Business Club de INB2B es un espacio exclusivo donde
          reunimos a directores, emprendedores, inversores y profesionales del
          sector salud para generar conexiones estratégicas, compartir
          experiencias reales y acceder a conocimiento de alto valor.
        </p>

        <div className="h-20 w-0.5 bg-in-cyan mx-auto relative">
          <div className="h-2 w-2 rounded-full bg-in-cyan mx-auto absolute bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
      </section>
      <section data-aos="fade-up" data-aos-duration="1000" className="container mx-auto max-w-7xl px-4 pb-16">
        <h2 className="font-in-avantgarde text-2xl md:text-3xl lg:text-4xl text-center text-white pb-8 md:pb-16">
          ¿Qué ofrece el club?
        </h2>

        <div>
          <Carousel className="w-full">
            <CarouselContent className="w-full max-w-7xl mx-auto -ml-4">
              {benefitsMain.map((benefit) => (
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  key={benefit.text}
                >
                  <div
                    className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
                    key={benefit.text}
                    style={{
                      background:
                        "linear-gradient(127deg, rgba(255, 255, 255, 0.40) 12.11%, rgba(255, 255, 255, 0.10) 73.08%)",
                      boxShadow:
                        "0px 2.874px 17.246px -0.719px rgba(0, 0, 0, 0.20)",
                    }}
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.text}
                      width={100}
                      height={100}
                      className="w-24 h-24 mx-auto"
                    />
                    <p className="text-white text-center font-in-poppins leading-6">
                      {benefit.text}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <button
          onClick={() => triggerCTA(CLUB_HREF, "Únete al club - ClubBenefits")}
          className="cta-club-custom bg-in-cyan mt-12 text-black font-in-poppins text-lg leading-6 px-12 py-4 rounded-full mx-auto block hover:bg-in-cyan/80 transition-all duration-300 cursor-pointer"
        >
          Únete al club
        </button>
      </section>
    </div>
  );
};
