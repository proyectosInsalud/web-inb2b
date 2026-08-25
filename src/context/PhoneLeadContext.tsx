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
const GCLID_STORAGE_KEY = "inb2b_gclid";
const CAMPANA_STORAGE_KEY = "inb2b_campana";
const GAD_CAMPAIGNID_STORAGE_KEY = "inb2b_gad_campaignid";

interface PhoneLeadData {
  phone: string;
  nombre: string;
  capturedAt: string;
}

interface PhoneLeadContextType {
  triggerCTA: (href: string, ctaLabel: string) => void;
  triggerCTAAlways: (href: string, ctaLabel: string) => void;
  isModalOpen: boolean;
  forceCapture: boolean;
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
  const [gclid, setGclid] = useState<string | null>(null);
  const [campana, setCampana] = useState<string | null>(null);
  const [gadCampaignId, setGadCampaignId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceCapture, setForceCapture] = useState(false);
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

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlGclid = params.get("gclid");
      if (urlGclid) {
        localStorage.setItem(
          GCLID_STORAGE_KEY,
          JSON.stringify({ gclid: urlGclid, capturedAt: new Date().toISOString() })
        );
        setGclid(urlGclid);
        return;
      }
      const raw = localStorage.getItem(GCLID_STORAGE_KEY);
      if (raw) {
        setGclid(JSON.parse(raw).gclid ?? null);
      }
    } catch {
      // ignorar errores de parse
    }
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCampana = params.get("campana");
      if (urlCampana) {
        localStorage.setItem(
          CAMPANA_STORAGE_KEY,
          JSON.stringify({ campana: urlCampana, capturedAt: new Date().toISOString() })
        );
        setCampana(urlCampana);
        return;
      }
      const raw = localStorage.getItem(CAMPANA_STORAGE_KEY);
      if (raw) {
        setCampana(JSON.parse(raw).campana ?? null);
      }
    } catch {
      // ignorar errores de parse
    }
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlGadCampaignId = params.get("gad_campaignid");
      if (urlGadCampaignId) {
        localStorage.setItem(
          GAD_CAMPAIGNID_STORAGE_KEY,
          JSON.stringify({ gadCampaignId: urlGadCampaignId, capturedAt: new Date().toISOString() })
        );
        setGadCampaignId(urlGadCampaignId);
        return;
      }
      const raw = localStorage.getItem(GAD_CAMPAIGNID_STORAGE_KEY);
      if (raw) {
        setGadCampaignId(JSON.parse(raw).gadCampaignId ?? null);
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
            gclid: gclid ?? "",
            campana: campana ?? "",
            gadCampaignId: gadCampaignId ?? "",
          }),
        }).catch(() => {});
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "whatsappClick",
          cta: ctaLabel,
          pagina: pathname,
        });
        openURL(buildPersonalizedUrl(href, savedNombre, savedPhone));
        return;
      }
      setPendingCTA({ href, label: ctaLabel });
      setIsModalOpen(true);
    },
    [savedPhone, savedNombre, pathname, gclid, campana, gadCampaignId]
  );

  const triggerCTAAlways = useCallback(
    (href: string, ctaLabel: string) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "leadModalOpened",
        cta: ctaLabel,
        pagina: pathname,
      });
      setPendingCTA({ href, label: ctaLabel });
      setForceCapture(true);
      setIsModalOpen(true);
    },
    [pathname]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setForceCapture(false);
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
          gclid: gclid ?? "",
          campana: campana ?? "",
          gadCampaignId: gadCampaignId ?? "",
        }),
      }).catch(() => {});

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "phoneLeadCapture",
        cta: pendingCTA?.label ?? "",
        pagina: pathname,
      });

      setIsModalOpen(false);
      if (pendingCTA) {
        openURL(buildPersonalizedUrl(pendingCTA.href, nombre, phone));
        setPendingCTA(null);
      }
    },
    [pathname, pendingCTA, gclid, campana, gadCampaignId]
  );

  return (
    <PhoneLeadContext.Provider
      value={{ triggerCTA, triggerCTAAlways, isModalOpen, forceCapture, closeModal, submitLead, pendingCTA }}
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
