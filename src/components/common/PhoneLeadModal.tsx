"use client";
import { useState, useEffect, useRef } from "react";
import { usePhoneLead } from "@/context/PhoneLeadContext";
import { X } from "lucide-react";

export function PhoneLeadModal() {
  const { isModalOpen, closeModal, submitLead } = usePhoneLead();
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ nombre?: string; phone?: string }>({});
  const nombreRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setNombre("");
      setPhone("");
      setErrors({});
      setTimeout(() => nombreRef.current?.focus(), 100);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const validate = () => {
    const newErrors: { nombre?: string; phone?: string } = {};
    if (!nombre.trim() || nombre.trim().length < 2) {
      newErrors.nombre = "Ingresa tu nombre (mínimo 2 caracteres)";
    }
    if (!phone) {
      newErrors.phone = "Ingresa tu número de celular";
    } else if (!/^9/.test(phone)) {
      newErrors.phone = "El número debe comenzar con 9";
    } else if (phone.length !== 9) {
      newErrors.phone = "El número debe tener exactamente 9 dígitos";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    await submitLead(phone, nombre.trim());
    setLoading(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 9);
    setPhone(val);
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-[#0d1f3c] border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <p className="text-in-cyan text-sm font-in-poppins font-semibold uppercase tracking-widest mb-2">
            Un paso antes
          </p>
          <h2 className="text-white text-xl font-in-avantgarde font-bold leading-snug">
            ¿Con quién hablamos?
          </h2>
          <p className="text-white/50 text-sm font-in-poppins mt-2">
            Solo lo pedimos una vez.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <input
              ref={nombreRef}
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setErrors((prev) => ({ ...prev, nombre: undefined }));
              }}
              placeholder="Tu nombre"
              autoComplete="given-name"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-in-poppins text-sm focus:outline-none focus:border-in-cyan transition-colors"
            />
            {errors.nombre && (
              <p className="text-red-400 text-xs mt-1 font-in-poppins">{errors.nombre}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-xl overflow-hidden focus-within:border-in-cyan transition-colors">
              <span className="pl-4 pr-2 text-white/50 font-in-poppins text-sm select-none">
                +51
              </span>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                placeholder="9XX XXX XXX"
                maxLength={9}
                autoComplete="tel-national"
                className="flex-1 bg-transparent px-2 py-3 text-white placeholder-white/30 font-in-poppins text-sm focus:outline-none"
              />
            </div>
            {errors.phone ? (
              <p className="text-red-400 text-xs mt-1 font-in-poppins">{errors.phone}</p>
            ) : (
              <p className="text-white/30 text-xs mt-1 font-in-poppins">
                9 dígitos · empieza con 9
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !nombre || !phone}
            className="w-full bg-in-cyan text-black font-in-poppins font-semibold py-3 rounded-xl hover:bg-in-cyan/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Continuar a WhatsApp"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="w-full text-white/30 text-xs font-in-poppins hover:text-white/60 transition-colors py-1"
          >
            Omitir por ahora
          </button>
        </form>
      </div>
    </div>
  );
}
