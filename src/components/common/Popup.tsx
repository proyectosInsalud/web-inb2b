"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BlogPopup } from "@/types/blog";
import { X } from "lucide-react";
import { usePhoneLead } from "@/context/PhoneLeadContext";

interface PopupProps {
  popup: BlogPopup | null;
}

export function Popup({ popup }: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { triggerCTAAlways } = usePhoneLead();

  useEffect(() => {
    if (!popup || !popup.active) return;

    // Reset visibility on route change
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // Muestra el popup tras 1.5 segundos en CUALQUIER vista
    return () => clearTimeout(timer);
  }, [popup, pathname]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!popup || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="relative max-w-lg w-full transform transition-all duration-500 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 bg-white/40 backdrop-blur-md rounded-full p-1.5 shadow-lg hover:bg-white transition-all z-20 group"
            aria-label="Cerrar"
          >
            <X size={20} className="text-gray-800 group-hover:scale-110 transition-transform" />
          </button>
          
          {popup.link ? (
            <button
              onClick={() => { handleClose(); triggerCTAAlways(popup.link!, "Popup"); }}
              className="block w-full cursor-pointer hover:opacity-95 transition-opacity"
            >
              <Image
                src={popup.imageUrl}
                alt={popup.alt}
                width={800}
                height={800}
                className="w-full h-auto object-contain max-h-[85vh] block"
                priority
              />
            </button>
          ) : (
            <Image
              src={popup.imageUrl}
              alt={popup.alt}
              width={800}
              height={800}
              className="w-full h-auto object-contain max-h-[85vh] block"
              priority
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={handleClose} aria-hidden="true" />
    </div>
  );
}
