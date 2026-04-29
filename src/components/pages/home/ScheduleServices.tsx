import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/data/servicesData";

export const ScheduleServices = () => {
  return (
    <div id="servicios" className="bg-in-blue-main text-white md:pb-20">
      <section
        data-aos="fade-up"
        data-aos-duration="1000"
        className="max-w-7xl mx-auto px-4 container space-y-10 md:space-y-16"
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <h2 className="text-2xl md:text-4xl font-in-avantgarde font-bold text-center">
            Nuestros servicios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, i) => {
            const noLink = service.id === "expansion-crecimiento" || service.id === "transformacion-digital";
            const cardClass = `relative bg-in-blue-dark/60 border border-white/10 rounded-3xl overflow-hidden flex flex-col${noLink ? "" : " group hover:border-in-cyan/40 transition-all duration-300"}`;
            const cardContent = (
              <>
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4">
                  <h3 className="text-xl md:text-2xl font-in-avantgarde font-medium pr-4">
                    {service.title}
                  </h3>
                  {!noLink && (
                    <div className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-in-cyan group-hover:border-in-cyan transition-all duration-300">
                      <ArrowUpRight className="size-4 text-white group-hover:text-in-blue-dark transition-colors duration-300" />
                    </div>
                  )}
                </div>

                {/* Bullet points */}
                <ul className="px-6 pb-6 space-y-2 flex-1">
                  {service.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="size-2 bg-in-cyan rounded-full flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover${noLink ? "" : " group-hover:scale-105 transition-transform duration-500"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-in-blue-dark/40 to-transparent" />
                </div>
              </>
            );

            return noLink ? (
              <div key={service.id} data-aos="fade-up" data-aos-delay={i * 100} className={cardClass}>
                {cardContent}
              </div>
            ) : (
              <Link key={service.id} href={`/servicios/${service.id}`} data-aos="fade-up" data-aos-delay={i * 100} className={cardClass}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
