"use client";

import { useState, useRef } from "react";

type FormData = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  correo: string;
  direccion: string;
  referencia: string;
  departamento: string;
  provincia: string;
  distrito: string;
  menorDeEdad: "si" | "no";
  nombreTutorLegal: string;
  tipoProducto: string;
  monto: string;
  fechaCompra: string;
  lugarCompra: string;
  tipoReclamacion: string;
  detalleReclamacion: string;
  pedidoConsumidor: string;
};

const initialForm: FormData = {
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  tipoDocumento: "",
  numeroDocumento: "",
  telefono: "",
  correo: "",
  direccion: "",
  referencia: "",
  departamento: "",
  provincia: "",
  distrito: "",
  menorDeEdad: "no",
  nombreTutorLegal: "",
  tipoProducto: "",
  monto: "",
  fechaCompra: "",
  lugarCompra: "",
  tipoReclamacion: "",
  detalleReclamacion: "",
  pedidoConsumidor: "",
};

// ── HELPERS ────────────────────────────────────────────────
const soloLetras = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarDocumento(tipo: string, numero: string): string | null {
  if (!numero) return null; // opcional
  const n = numero.trim();
  if (tipo === "DNI") {
    if (!/^\d{8}$/.test(n)) return "El DNI debe tener exactamente 8 dígitos";
  } else if (tipo === "RUC") {
    if (!/^\d{11}$/.test(n)) return "El RUC debe tener exactamente 11 dígitos";
  } else if (tipo === "Carné de Extranjería" || tipo === "Pasaporte") {
    if (n.length < 6 || n.length > 20) return "Debe tener entre 6 y 20 caracteres";
  }
  return null;
}

function validarTelefono(tel: string): string | null {
  if (!tel) return null;
  const t = tel.replace(/\s/g, "");
  if (!/^\+?[\d]{7,15}$/.test(t)) return "Teléfono inválido (7-15 dígitos)";
  return null;
}

function validarMonto(monto: string): string | null {
  if (!monto) return null;
  const m = parseFloat(monto);
  if (isNaN(m) || m <= 0) return "Ingrese un monto válido mayor a 0";
  return null;
}

// ── KEY FILTERS (nivel módulo) ──────────────────────────────
const blockNonLetters = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowed = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'\-]$/;
  if (e.key.length === 1 && !allowed.test(e.key)) e.preventDefault();
};

const blockNonDigits = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key.length === 1 && !/[\d]/.test(e.key)) e.preventDefault();
};

const blockNonPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key.length === 1 && !/[\d+\-\s]/.test(e.key)) e.preventDefault();
};

const blockNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key.length === 1 && !/[\d.]/.test(e.key)) e.preventDefault();
};

function validarFecha(fecha: string): string | null {
  if (!fecha) return null;
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return "Fecha inválida";
  if (d > new Date()) return "La fecha no puede ser futura";
  return null;
}

const MAX_FILE_MB = 5;

// ── COMPONENTE ─────────────────────────────────────────────
export default function FormContactLibro() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [fileErrors, setFileErrors] = useState<(string | null)[]>([null, null, null]);
  const [archivos, setArchivos] = useState<(File | null)[]>([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<"success" | "error" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // ── Manejo de cambios ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Manejo de archivos ──
  const handleFile = (index: number, file: File | null) => {
    const newFileErrors = [...fileErrors];
    if (file) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        newFileErrors[index] = `El archivo supera el límite de ${MAX_FILE_MB}MB`;
        setFileErrors(newFileErrors);
        return;
      }
    }
    newFileErrors[index] = null;
    setFileErrors(newFileErrors);
    setArchivos((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  // ── Validación completa ──
  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};

    // Sección 1 — obligatorios
    if (!form.nombres.trim()) {
      e.nombres = "Campo obligatorio";
    } else if (!soloLetras.test(form.nombres.trim())) {
      e.nombres = "Solo se permiten letras";
    } else if (form.nombres.trim().length < 2) {
      e.nombres = "Mínimo 2 caracteres";
    }

    if (!form.apellidoPaterno.trim()) {
      e.apellidoPaterno = "Campo obligatorio";
    } else if (!soloLetras.test(form.apellidoPaterno.trim())) {
      e.apellidoPaterno = "Solo se permiten letras";
    }

    if (form.apellidoMaterno.trim() && !soloLetras.test(form.apellidoMaterno.trim())) {
      e.apellidoMaterno = "Solo se permiten letras";
    }

    // Documento
    const docError = validarDocumento(form.tipoDocumento, form.numeroDocumento);
    if (docError) e.numeroDocumento = docError;
    if (form.numeroDocumento.trim() && !form.tipoDocumento) {
      e.tipoDocumento = "Seleccione el tipo de documento";
    }

    // Teléfono
    const telError = validarTelefono(form.telefono);
    if (telError) e.telefono = telError;

    // Correo — obligatorio
    if (!form.correo.trim()) {
      e.correo = "Campo obligatorio";
    } else if (!emailRegex.test(form.correo.trim())) {
      e.correo = "Correo electrónico inválido";
    }

    // Ubicación — solo letras si se completan
    if (form.departamento.trim() && !soloLetras.test(form.departamento.trim()))
      e.departamento = "Solo se permiten letras";
    if (form.provincia.trim() && !soloLetras.test(form.provincia.trim()))
      e.provincia = "Solo se permiten letras";
    if (form.distrito.trim() && !soloLetras.test(form.distrito.trim()))
      e.distrito = "Solo se permiten letras";

    // Tutor legal si es menor de edad
    if (form.menorDeEdad === "si" && !form.nombreTutorLegal.trim()) {
      e.nombreTutorLegal = "El nombre del tutor legal es obligatorio";
    }

    // Sección 2
    const montoError = validarMonto(form.monto);
    if (montoError) e.monto = montoError;

    const fechaError = validarFecha(form.fechaCompra);
    if (fechaError) e.fechaCompra = fechaError;

    // Sección 3 — obligatorios
    if (!form.tipoReclamacion) {
      e.tipoReclamacion = "Seleccione el tipo de reclamación";
    }

    if (!form.detalleReclamacion.trim()) {
      e.detalleReclamacion = "Campo obligatorio";
    } else if (form.detalleReclamacion.trim().length < 20) {
      e.detalleReclamacion = "Describa el reclamo con al menos 20 caracteres";
    }

    if (form.pedidoConsumidor.trim() && form.pedidoConsumidor.trim().length < 10) {
      e.pedidoConsumidor = "Mínimo 10 caracteres si se completa";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasFileErrors = fileErrors.some((fe) => fe !== null);
    if (!validate() || hasFileErrors) {
      // scroll al primer error
      const first = document.querySelector("[data-error]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setResultado(null);

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    archivos.forEach((file, i) => {
      if (file) fd.append(`documento${i + 1}`, file);
    });

    try {
      const res = await fetch("/api/reclamacion", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setResultado("success");
        setForm(initialForm);
        setArchivos([null, null, null]);
        setFileErrors([null, null, null]);
        fileRefs.forEach((ref) => { if (ref.current) ref.current.value = ""; });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setResultado("error");
        setErrorMsg(data.error || "Error desconocido");
      }
    } catch {
      setResultado("error");
      setErrorMsg("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // ── Clases ──
  const inputClass = (field?: string) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm bg-white outline-none transition-colors ${field && errors[field as keyof FormData]
      ? "border-red-400 focus:border-red-500 bg-red-50"
      : "border-[#5DC5BE]/40 focus:border-[#5DC5BE]"
    }`;

  const labelClass = "block text-sm font-semibold text-[#004469] mb-1";
  const sectionClass = "bg-white rounded-2xl p-6 shadow-sm border border-[#5DC5BE]/20";
  const sectionTitle = "text-lg font-bold text-[#004469] mb-5 flex items-center gap-2";
  const errMsg = (field: keyof FormData) =>
    errors[field] ? (
      <p data-error className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <span>⚠</span> {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── SECCIÓN 1 ── */}
      <div className={sectionClass}>
        <h2 className={sectionTitle}>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#004469] text-white text-xs font-bold">1</span>
          Identificación del Consumidor Reclamante
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Nombres <span className="text-red-500">*</span></label>
            <input name="nombres" value={form.nombres} onChange={handleChange}
              onKeyDown={blockNonLetters}
              className={inputClass("nombres")} placeholder="Ingrese sus nombres"
              maxLength={80} />
            {errMsg("nombres")}
          </div>
          <div>
            <label className={labelClass}>Apellido Paterno <span className="text-red-500">*</span></label>
            <input name="apellidoPaterno" value={form.apellidoPaterno} onChange={handleChange}
              onKeyDown={blockNonLetters}
              className={inputClass("apellidoPaterno")} placeholder="Ingrese su apellido paterno"
              maxLength={60} />
            {errMsg("apellidoPaterno")}
          </div>
          <div>
            <label className={labelClass}>Apellido Materno</label>
            <input name="apellidoMaterno" value={form.apellidoMaterno} onChange={handleChange}
              onKeyDown={blockNonLetters}
              className={inputClass("apellidoMaterno")} placeholder="Ingrese su apellido materno"
              maxLength={60} />
            {errMsg("apellidoMaterno")}
          </div>

          <div>
            <label className={labelClass}>Tipo de documento</label>
            <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}
              className={inputClass("tipoDocumento")}>
              <option value="">Seleccione un tipo</option>
              <option value="DNI">DNI</option>
              <option value="Carné de Extranjería">Carné de Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="RUC">RUC</option>
            </select>
            {errMsg("tipoDocumento")}
          </div>
          <div>
            <label className={labelClass}>Número de documento</label>
            <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange}
              onKeyDown={form.tipoDocumento === "DNI" || form.tipoDocumento === "RUC" ? blockNonDigits : undefined}
              className={inputClass("numeroDocumento")} placeholder="Número de documento"
              maxLength={20} />
            {errMsg("numeroDocumento")}
          </div>
          <div>
            <label className={labelClass}>Teléfono fijo o celular</label>
            <input name="telefono" value={form.telefono} onChange={handleChange}
              onKeyDown={blockNonPhone}
              className={inputClass("telefono")} placeholder="Ej: 987654321"
              maxLength={15} />
            {errMsg("telefono")}
          </div>

          <div>
            <label className={labelClass}>Correo electrónico <span className="text-red-500">*</span></label>
            <input name="correo" type="email" value={form.correo} onChange={handleChange}
              className={inputClass("correo")} placeholder="correo@ejemplo.com"
              maxLength={100} />
            {errMsg("correo")}
          </div>
          <div>
            <label className={labelClass}>Dirección</label>
            <input name="direccion" value={form.direccion} onChange={handleChange}
              className={inputClass()} placeholder="Ingrese su dirección"
              maxLength={150} />
          </div>
          <div>
            <label className={labelClass}>Referencia</label>
            <input name="referencia" value={form.referencia} onChange={handleChange}
              className={inputClass()} placeholder="Ingrese la referencia"
              maxLength={100} />
          </div>

          <div>
            <label className={labelClass}>Departamento</label>
            <input name="departamento" value={form.departamento} onChange={handleChange}
              onKeyDown={blockNonLetters}
              className={inputClass("departamento")} placeholder="Ingrese el departamento"
              maxLength={60} />
            {errMsg("departamento")}
          </div>
          <div>
            <label className={labelClass}>Provincia</label>
            <input name="provincia" value={form.provincia} onChange={handleChange}
              onKeyDown={blockNonLetters}
              className={inputClass("provincia")} placeholder="Ingrese la provincia"
              maxLength={60} />
            {errMsg("provincia")}
          </div>
          <div>
            <label className={labelClass}>Distrito</label>
            <input name="distrito" value={form.distrito} onChange={handleChange}
              onKeyDown={blockNonLetters}
              className={inputClass("distrito")} placeholder="Ingrese el distrito"
              maxLength={60} />
            {errMsg("distrito")}
          </div>
        </div>

        {/* Menor de edad */}
        <div className="mt-4">
          <p className={labelClass}>¿Eres menor de edad?</p>
          <div className="flex items-center gap-6 mt-1">
            {(["si", "no"] as const).map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.menorDeEdad === val
                      ? "border-[#004469] bg-[#004469]"
                      : "border-gray-300 bg-white"
                    }`}
                  onClick={() => setForm((prev) => ({ ...prev, menorDeEdad: val }))}
                >
                  {form.menorDeEdad === val && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-[#004469] font-medium">{val === "si" ? "Sí" : "No"}</span>
              </label>
            ))}
          </div>
        </div>

        {form.menorDeEdad === "si" && (
          <div className="mt-4 max-w-sm">
            <label className={labelClass}>Nombre completo del Tutor Legal <span className="text-red-500">*</span></label>
            <input name="nombreTutorLegal" value={form.nombreTutorLegal} onChange={handleChange}
              className={inputClass("nombreTutorLegal")} placeholder="Nombre del tutor legal"
              maxLength={120} />
            {errMsg("nombreTutorLegal")}
          </div>
        )}
      </div>

      {/* ── SECCIÓN 2 ── */}
      <div className={sectionClass}>
        <h2 className={sectionTitle}>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#004469] text-white text-xs font-bold">2</span>
          Identificación del Bien Contratado
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tipo de Producto</label>
            <select name="tipoProducto" value={form.tipoProducto} onChange={handleChange}
              className={inputClass()}>
              <option value="">Seleccione el tipo de producto</option>
              <option value="Consultoría">Consultoría</option>
              <option value="Programa / Diplomado">Programa / Diplomado</option>
              <option value="Servicio Digital">Servicio Digital</option>
              <option value="Membresía">Membresía</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Monto (S/)</label>
            <input name="monto" value={form.monto} onChange={handleChange}
              onKeyDown={blockNonNumeric}
              className={inputClass("monto")} placeholder="Ej: 500.00"
              type="text" inputMode="decimal" />
            {errMsg("monto")}
          </div>

          <div>
            <label className={labelClass}>Fecha de Compra o Servicio</label>
            <input name="fechaCompra" type="date" value={form.fechaCompra} onChange={handleChange}
              className={inputClass("fechaCompra")}
              max={new Date().toISOString().split("T")[0]} />
            {errMsg("fechaCompra")}
          </div>
          <div>
            <label className={labelClass}>Lugar de Compra o Servicio</label>
            <input name="lugarCompra" value={form.lugarCompra} onChange={handleChange}
              className={inputClass()} placeholder="Ingrese la sede o dirección"
              maxLength={150} />
          </div>
        </div>
      </div>

      {/* ── SECCIÓN 3 ── */}
      <div className={sectionClass}>
        <h2 className={sectionTitle}>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#004469] text-white text-xs font-bold">3</span>
          Detalle de Reclamación y Pedido del Consumidor
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="max-w-sm">
            <label className={labelClass}>Tipo de Reclamación <span className="text-red-500">*</span></label>
            <select name="tipoReclamacion" value={form.tipoReclamacion} onChange={handleChange}
              className={inputClass("tipoReclamacion")}>
              <option value="">Seleccione el tipo</option>
              <option value="Reclamo">Reclamo (disconformidad sobre un bien/servicio)</option>
              <option value="Queja">Queja (disconformidad no relacionada a un bien/servicio)</option>
            </select>
            {errMsg("tipoReclamacion")}
          </div>

          <div>
            <label className={labelClass}>
              Detalle de la reclamación <span className="text-red-500">*</span>
              <span className="ml-2 font-normal text-gray-400 text-xs">
                ({form.detalleReclamacion.length}/20 mín.)
              </span>
            </label>
            <textarea name="detalleReclamacion" value={form.detalleReclamacion} onChange={handleChange}
              rows={4} className={`${inputClass("detalleReclamacion")} resize-none`}
              placeholder="Describa detalladamente su reclamo (mínimo 20 caracteres)"
              maxLength={1000} />
            <div className="flex justify-between items-start mt-0.5">
              {errMsg("detalleReclamacion")}
              <span className="text-xs text-gray-400 ml-auto">{form.detalleReclamacion.length}/1000</span>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Pedido del consumidor
              {form.pedidoConsumidor.trim().length > 0 && (
                <span className="ml-2 font-normal text-gray-400 text-xs">
                  ({form.pedidoConsumidor.length}/10 mín.)
                </span>
              )}
            </label>
            <textarea name="pedidoConsumidor" value={form.pedidoConsumidor} onChange={handleChange}
              rows={4} className={`${inputClass("pedidoConsumidor")} resize-none`}
              placeholder="Indique qué acción solicita"
              maxLength={500} />
            <div className="flex justify-between items-start mt-0.5">
              {errMsg("pedidoConsumidor")}
              <span className="text-xs text-gray-400 ml-auto">{form.pedidoConsumidor.length}/500</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ADJUNTOS ── */}
      <div className={sectionClass}>
        <h2 className={sectionTitle}>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#5DC5BE] text-white text-xs font-bold">📎</span>
          Adjuntar documentos <span className="text-sm font-normal text-gray-400 ml-1">(opcional)</span>
        </h2>

        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="block text-xs font-semibold text-[#5DC5BE] mb-1">
                Documento {i + 1}
              </label>
              <div className={`relative flex items-center border rounded-lg bg-white overflow-hidden ${fileErrors[i] ? "border-red-400" : "border-[#5DC5BE]/40"
                }`}>
                <label className="flex-shrink-0 bg-[#004469] text-white text-xs font-semibold px-4 py-2.5 cursor-pointer hover:bg-[#003355] transition-colors">
                  Elegir archivo
                  <input ref={fileRefs[i]} type="file" className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFile(i, e.target.files?.[0] ?? null)} />
                </label>
                <span className="px-4 text-sm text-gray-400 truncate">
                  {archivos[i] ? archivos[i]!.name : "Ningún archivo seleccionado"}
                </span>
              </div>
              {fileErrors[i] && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {fileErrors[i]}
                </p>
              )}
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-2">
            Formatos: PDF, DOC, DOCX, JPG, PNG. Máximo 3 archivos de {MAX_FILE_MB}MB c/u.
          </p>
        </div>
      </div>

      {/* Resultado */}
      {resultado === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 flex items-start gap-3">
          <span className="text-green-500 text-xl">✅</span>
          <div>
            <p className="font-semibold text-green-700">¡Reclamo enviado exitosamente!</p>
            <p className="text-sm text-green-600 mt-1">
              Hemos recibido su reclamo y le responderemos al correo proporcionado en un plazo de 15 días hábiles.
            </p>
          </div>
        </div>
      )}
      {resultado === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 flex items-start gap-3">
          <span className="text-red-500 text-xl">❌</span>
          <div>
            <p className="font-semibold text-red-700">No se pudo enviar el reclamo</p>
            <p className="text-sm text-red-600 mt-1">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-center pb-2">
        <button type="submit" disabled={loading}
          className="bg-[#004469] hover:bg-[#002D46] disabled:opacity-60 text-white font-semibold px-10 py-3.5 rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed min-w-[200px]">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Enviando...
            </span>
          ) : "Enviar reclamo"}
        </button>
      </div>

      {/* ── NOTAS LEGALES ── */}
      <div className="bg-[#EEF9F8] border border-[#5DC5BE]/30 rounded-2xl px-6 py-5 space-y-4">
        <p className="text-xs text-[#004469]/80 leading-relaxed">
          <span className="font-bold text-[#004469]">(*)</span> La presente sección será completada por{" "}
          <span className="font-semibold">INB2B CONSULTING S.A.C.</span> Le hará llegar al correo electrónico
          proporcionado en la presente Hoja de Reclamación las observaciones y acciones que se adopten
          en atención al reclamo o queja presentado.
        </p>
        <div>
          <p className="text-xs font-bold text-[#004469] mb-2 uppercase tracking-wide">Notas:</p>
          <ul className="space-y-2">
            {[
              "La formulación del reclamo no impide acudir a otras vías de solución de controversias, ni es requisito previo para interponer una denuncia ante el INDECOPI.",
              "El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles, el cual es improrrogable.",
              "El tratamiento de sus datos personales en este Libro de Reclamaciones y en este Portal tiene por finalidad gestionar de manera correcta su reclamo o queja conforme a las disposiciones legales sobre la materia y llevar un registro histórico de la casuística presentada a fin de mejorar nuestra atención.",
            ].map((nota, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#004469]/75 leading-relaxed">
                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-[#5DC5BE]/30 flex items-center justify-center text-[#004469] font-bold text-[10px]">
                  {i + 1}
                </span>
                {i === 1 ? (
                  <span>El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a{" "}
                    <strong className="text-[#004469]">quince (15) días hábiles</strong>, el cual es improrrogable.
                  </span>
                ) : nota}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
}
