"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "inb2b_phone_lead";

interface PhoneLeadData {
  phone: string;
  nombre: string;
  capturedAt: string;
}

interface PhoneLeadContextType {
  triggerCTA: (href: string, ctaLabel: string) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  submitLead: (phone: string, nombre: string) => Promise<void>;
  pendingCTA: { href: string; label: string } | null;
}

const PhoneLeadContext = createContext<PhoneLeadContextType | null>(null);

function buildPersonalizedUrl(href: string, nombre: string, phone: string) {
  const baseUrl = href.split("?")[0];
  const message = `¡Hola! Vengo de la web inb2blatam.com.\nMi nombre es ${nombre} y mi número es ${phone}.`;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function PhoneLeadProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [savedPhone, setSavedPhone] = useState<string | null>(null);
  const [savedNombre, setSavedNombre] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCTA, setPendingCTA] = useState<{
    href: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: PhoneLeadData = JSON.parse(raw);
        setSavedPhone(data.phone);
        setSavedNombre(data.nombre ?? null);
      }
    } catch {
      // ignorar errores de parse
    }
  }, []);

  const openURL = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const triggerCTA = useCallback(
    (href: string, ctaLabel: string) => {
      if (savedPhone && savedNombre) {
        fetch("/api/phone-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            telefono: savedPhone,
            nombre: savedNombre,
            pagina: pathname,
            cta: ctaLabel,
          }),
        }).catch(() => {});
        openURL(buildPersonalizedUrl(href, savedNombre, savedPhone));
        return;
      }
      setPendingCTA({ href, label: ctaLabel });
      setIsModalOpen(true);
    },
    [savedPhone, savedNombre, pathname]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setPendingCTA(null);
  }, []);

  const submitLead = useCallback(
    async (phone: string, nombre: string) => {
      const data: PhoneLeadData = { phone, nombre, capturedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedPhone(phone);
      setSavedNombre(nombre);

      fetch("/api/phone-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: phone,
          nombre,
          pagina: pathname,
          cta: pendingCTA?.label ?? "",
        }),
      }).catch(() => {});

      setIsModalOpen(false);
      if (pendingCTA) {
        openURL(buildPersonalizedUrl(pendingCTA.href, nombre, phone));
        setPendingCTA(null);
      }
    },
    [pathname, pendingCTA]
  );

  return (
    <PhoneLeadContext.Provider
      value={{ triggerCTA, isModalOpen, closeModal, submitLead, pendingCTA }}
    >
      {children}
    </PhoneLeadContext.Provider>
  );
}

export function usePhoneLead() {
  const ctx = useContext(PhoneLeadContext);
  if (!ctx) throw new Error("usePhoneLead must be used inside PhoneLeadProvider");
  return ctx;
}
