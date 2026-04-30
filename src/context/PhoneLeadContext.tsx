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
  capturedAt: string;
}

interface PhoneLeadContextType {
  /** Llama al CTA. Si no hay teléfono guardado abre el modal primero. */
  triggerCTA: (href: string, ctaLabel: string) => void;
  /** true mientras el modal está abierto */
  isModalOpen: boolean;
  closeModal: () => void;
  /** Llamado por el modal cuando el usuario confirma su número */
  submitPhone: (phone: string) => Promise<void>;
  /** Página + label del CTA pendiente (para mostrar en el modal) */
  pendingCTA: { href: string; label: string } | null;
}

const PhoneLeadContext = createContext<PhoneLeadContextType | null>(null);

export function PhoneLeadProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [savedPhone, setSavedPhone] = useState<string | null>(null);
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
      if (savedPhone) {
        // Registrar actividad silenciosamente (también recrea la hoja si fue borrada)
        fetch("/api/phone-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telefono: savedPhone, pagina: pathname, cta: ctaLabel }),
        }).catch(() => {});
        openURL(href);
        return;
      }
      setPendingCTA({ href, label: ctaLabel });
      setIsModalOpen(true);
    },
    [savedPhone, pathname]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setPendingCTA(null);
  }, []);

  const submitPhone = useCallback(
    async (phone: string) => {
      // Guardar en localStorage
      const data: PhoneLeadData = { phone, capturedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedPhone(phone);

      // Registrar en Google Sheets (sin bloquear la UX)
      fetch("/api/phone-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: phone,
          pagina: pathname,
          cta: pendingCTA?.label ?? "",
        }),
      }).catch(() => {});

      // Cerrar modal y abrir el destino
      setIsModalOpen(false);
      if (pendingCTA) {
        openURL(pendingCTA.href);
        setPendingCTA(null);
      }
    },
    [pathname, pendingCTA]
  );

  return (
    <PhoneLeadContext.Provider
      value={{ triggerCTA, isModalOpen, closeModal, submitPhone, pendingCTA }}
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
