"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePhoneLead } from "@/context/PhoneLeadContext";

const CLUB_HREF = "https://chat.whatsapp.com/CDs3m8GxO4N5G9hgVO2kMo?mode=r_t";

export const Community = () => {
  const { triggerCTA } = usePhoneLead();

  return (
    <div className="relative bg-in-blue-main">
      <div className="relative ">
          <Image
              src="/images/semi-ellipse.png"
              alt="Wave"
              width={900}
              height={100}
              unoptimized
              className="hidden md:block w-full absolute -mt-72"
            />
            <Image
              src="/images/semi-ellipse-mobile.png"
              alt="Wave"
              width={500}
              height={100}
              unoptimized
              className="block md:hidden w-full absolute -mt-72"
            />
      </div>
      <div data-aos="fade-up" data-aos-duration="800" className=" relative z-10 max-w-7xl mx-auto px-4 container -translate-y-24 ">
        <div className="space-y-8">
          <h2 className="text-white text-center text-2xl md:text-4xl font-in-avantgarde">
          Comunidad & <br /> Eventos Regionales
          </h2>
          <p className="text-white text-center font-in-poppins max-w-3xl text-base md:text-lg mx-auto">
          Estamos construyendo una comunidad regional activa en WhatsApp, conformada por líderes de proyectos de salud en Perú, Ecuador, Panamá y más.
          </p>
        </div>

        <section className="max-w-6xl mx-auto container py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="col-span-1 md:col-span-7">
              <div className="space-y-16 mb-8">

                <div>
                  <p className="font-in-lato text-xl text-in-cyan pb-2">En esta comunidad encontrarás:</p>
                  <div className="text-white font-in-poppins">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Consejos prácticos sobre gestión, marketing y expansión</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Invitaciones a eventos digitales y presenciales</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Lanzamiento de programas, contenidos y convocatorias INB2B</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Espacios de colaboración entre empresarios del sector</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-in-lato text-xl text-in-cyan pb-2">Además, organizamos periódicamente:</p>
                  <div className="text-white font-in-poppins">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Eventos presenciales y experiencias de networking en ciudades clave</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Talleres y desayunos ejecutivos para clínicas y consultorios en crecimiento</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-in-cyan flex-shrink-0 rounded-full mt-2"></div>
                      <p className="text-white font-in-poppins">Espacios colaborativos con universidades y actores del ecosistema salud</p>
                    </div>
                  </div>
                </div>

              </div>
              <Button
                onClick={() => triggerCTA(CLUB_HREF, "Unirme ahora - Comunidad")}
                className="cta-club-custom bg-in-cyan cursor-pointer font-in-poppins hover:bg-in-cyan/80 rounded-full text-lg py-6 px-10 text-black"
              >
                Unirme ahora
              </Button>

            </div>
            <div className="col-span-1 md:col-span-5 hidden md:block">
              <Image src="/images/comunidad-image.png" alt="Community" width={500} height={500} className="w-full h-full object-cover mx-auto" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
