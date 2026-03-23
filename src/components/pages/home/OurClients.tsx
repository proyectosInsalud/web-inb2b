"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export const OurClients = () => {
  return (
    <div className="bg-in-blue-main">
      <section  data-aos="fade-up" data-aos-duration="1000"  className="container mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-in-avantgarde text-2xl md:text-3xl lg:text-4xl text-center text-white pb-8 md:pb-16">
          Nuestros clientes
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="w-full max-w-7xl mx-auto -ml-4">
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/sanho.png"
                  alt="Logo de Sanho - Cliente de INB2B"
                  width={100}
                  height={100}
                  className="w-auto h-24 mx-auto"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/c-h.svg"
                  alt="Logo de C-H - Cliente de INB2B"
                  width={100}
                  height={100}
                  className="w-auto h-24 mx-auto"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/medical-spa.png"
                  alt="Logo de Medical Spa - Cliente de INB2B"
                  width={100}
                  height={100}
                  className="w-auto h-24 mx-auto"
                  unoptimized
                />
              </div>
            </CarouselItem>

            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/lima-blue.png"
                  alt="Logo de Lima Blue - Cliente de INB2B"
                  width={100}
                  height={100}
                  className="w-auto h-24 mx-auto"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/ceo-salud.png"
                  alt="Logo de CEO Salud - Cliente de INB2B"
                  width={100} 
                  height={100}
                  className="w-auto h-24 mx-auto"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/lima-del-mar.png"
                  alt="Logo de Lima del Mar - Cliente de INB2B"
                  width={100}
                  height={100}
                  className="w-auto h-24 mx-auto"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/18.png"
                  alt="Logo de cliente 18 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/19.png"
                  alt="Logo de cliente 19 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/20.png"
                  alt="Logo de cliente 20 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/21.png"
                  alt="Logo de cliente 21 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/22.png"
                  alt="Logo de cliente 22 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/23.png"
                  alt="Logo de cliente 23 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6">
              <div
                className="p-6 rounded-3xl h-[240px] flex flex-col justify-center"
              >
                <Image
                  src="/images/clients/24.png"
                  alt="Logo de cliente 24 - Cliente de INB2B"
                  width={150}
                  height={150}
                  className="w-auto h-36 md:h-44 mx-auto object-contain scale-110"
                  unoptimized
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
};
