"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const PopUp = () => {
  const message = "¡Hola! me gustaría obtener más información sobre el programa internacional de salud digital y gestión de la innovación clínica."
  const phoneNumber = "51969332494"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  }, []);

  return (
    <div className={`${isOpen ? "opacity-100 z-30" : "opacity-0 z-10 pointer-events-none"} w-full h-full fixed inset-0 flex justify-center items-center bg-black/50 bottom-0 px-4`}
      onClick={() => setIsOpen(false)}>
            <Link
            id="pop-up"
        className={`${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"} transition-all duration-300 relative w-full max-w-[480px]`}
        href={whatsappUrl}
        target="_blank"
      >
        <Image
          src="/images/popup/popup-inb2b_v2.png"
          alt="Programa salud digital y gestion de la innovacion clinica"
          width={400}
          height={500}
          quality={95}
          className="w-full absolute top-1/2 -translate-y-1/2"
        />
      </Link>
    </div>
  );
};
