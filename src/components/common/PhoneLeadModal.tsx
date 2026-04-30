"use client";
import { useState, useEffect, useRef } from "react";
import { usePhoneLead } from "@/context/PhoneLeadContext";
import { X } from "lucide-react";

export function PhoneLeadModal() {
  const { isModalOpen, closeModal, submitPhone } = usePhoneLead();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setPhone("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\s/g, "");
    if (cleaned.length < 7) {
      setError("Ingresa un número válido");
      return;
    }
    setLoading(true);
    await submitPhone(cleaned);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={closeModal}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
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
            ¿A qué número te contactamos?
          </h2>
          <p className="text-white/50 text-sm font-in-poppins mt-2">
            Solo lo pedimos una vez. Incluye el código de país.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              placeholder="+51 999 999 999"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-in-poppins text-sm focus:outline-none focus:border-in-cyan transition-colors"
            />
            {error && (
              <p className="text-red-400 text-xs mt-1 font-in-poppins">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !phone}
            className="w-full bg-in-cyan text-black font-in-poppins font-semibold py-3 rounded-xl hover:bg-in-cyan/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Continuar"}
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
