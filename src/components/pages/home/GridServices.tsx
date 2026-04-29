"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { cn } from "@/lib/utils";

interface GridServicesProps {
  serviceId?: string;
}

export const GridServices = ({ serviceId }: GridServicesProps) => {
  const activeService =
    servicesData.find((s) => s.id === serviceId) ?? servicesData[0];

  const [activeSubServiceId, setActiveSubServiceId] = useState(
    activeService.subServices[0].id
  );
  const [expandedItemId, setExpandedItemId] = useState<string | null>(
    activeService.subServices[0].items[0].id
  );
  const activeSubService = activeService.subServices.find(
    (ss) => ss.id === activeSubServiceId
  );

  const toggleItem = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-in-poppins text-white pb-12">
      {/* Header */}
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-in-avantgarde font-medium mb-4">
          {activeService.title}
        </h2>
        <p className="text-white/70 text-lg">
          {activeService.subtitle}
        </p>
      </div>

      {/* Sub-Service Buttons (Tabs) */}
      <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
        {activeService.subServices.map((ss) => (
          <button
            key={ss.id}
            onClick={() => {
              setActiveSubServiceId(ss.id);
              setExpandedItemId(ss.items[0]?.id || null);
            }}
            className={cn(
              "px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2",
              ss.star
                ? activeSubServiceId === ss.id
                  ? "bg-in-cyan text-in-blue-dark font-bold border-2 border-in-cyan shadow-[0_0_16px_2px_rgba(0,230,200,0.45)]"
                  : "bg-in-cyan/10 text-in-cyan font-semibold border-2 border-in-cyan/60 hover:bg-in-cyan/20 shadow-[0_0_10px_1px_rgba(0,230,200,0.2)]"
                : activeSubServiceId === ss.id
                  ? "bg-in-cyan text-in-blue-dark font-semibold border border-white/10"
                  : "bg-in-blue-dark/40 text-white/80 hover:bg-in-blue-dark/60 border border-white/10"
            )}
          >
            {ss.star && (
              <Star className="size-3.5 fill-current" />
            )}
            {ss.name}
          </button>
        ))}
      </div>

      {/* Accordion Container */}
      <div className="space-y-4" data-aos="fade-up">
        {activeSubService?.items.map((item) => (
          <div
            key={item.id}
            className="bg-in-blue-dark/40 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500"
          >
            {/* Accordion Trigger */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-6 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="relative size-16 md:size-20 rounded-full overflow-hidden border-2 border-white/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-in-cyan transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-in-cyan/70 text-xs font-medium tracking-wide uppercase">
                    Que incluye:
                  </span>
                </div>
              </div>
              <div className="size-10 rounded-full bg-white/5 flex items-center justify-center">
                {expandedItemId === item.id ? (
                  <ChevronUp className="text-white" />
                ) : (
                  <ChevronDown className="text-white" />
                )}
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={cn(
                "transition-all duration-500 ease-in-out",
                expandedItemId === item.id
                  ? "max-h-[800px] opacity-100 pb-8"
                  : "max-h-0 opacity-0 overflow-hidden"
              )}
            >
              <div className="px-6 md:px-24 flex flex-col md:flex-row justify-between gap-8">
                <ul className="space-y-3 flex-1">
                  {item.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="size-2 bg-in-cyan rounded-full mt-2 flex-shrink-0" />
                      <p className="text-white/80 text-sm md:text-base">{point}</p>
                    </li>
                  ))}
                </ul>

                {(item.badge || item.time) && (
                  <div className="flex flex-col gap-3 justify-center md:w-64">
                    {item.badge && (
                      <div className="bg-in-blue-dark/60 border border-in-cyan/20 px-4 py-4 rounded-3xl text-center">
                        <span className="text-in-cyan text-sm font-medium">
                          {item.badge}
                        </span>
                      </div>
                    )}
                    {item.time && (
                      <div className="bg-in-blue-dark/40 px-4 py-3 rounded-2xl text-center">
                        <span className="text-white/60 text-sm">
                          {item.time}
                        </span>
                      </div>
                    )}
                    <a
                      href={`https://wa.me/51943583887?text=${encodeURIComponent(`¡Hola! Me interesa el servicio de "${item.title}" y quisiera agendar una consultoría.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-in-cyan text-in-blue-dark text-sm font-semibold text-center px-4 py-3 rounded-2xl hover:bg-in-cyan/80 transition-colors duration-300"
                    >
                      Agenda tu consultoría
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
