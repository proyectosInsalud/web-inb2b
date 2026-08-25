"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formContactHomeSchema } from "@/schemas";
import { FormContactHomeType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "51943366635";

type Status = "idle" | "loading" | "success" | "error";

function getStoredGclid(): string {
  try {
    const raw = localStorage.getItem("inb2b_gclid");
    if (raw) return JSON.parse(raw).gclid ?? "";
  } catch {
    // ignorar errores de parse
  }
  return "";
}

export const FormContactHome = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [wspUrl, setWspUrl] = useState("");

  const form = useForm<FormContactHomeType>({
    resolver: zodResolver(formContactHomeSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      mensaje: "",
      empresa: "",
      telefono: "",
    },
  });

  async function onSubmit(data: FormContactHomeType) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("API error");

      // Registrar también en Leads CTA
      fetch("/api/phone-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: data.telefono,
          nombre: data.nombre,
          pagina: "/",
          cta: "Formulario de contacto",
          gclid: getStoredGclid(),
        }),
      }).catch(() => {});

      try {
        localStorage.setItem(
          "inb2b_phone_lead",
          JSON.stringify({
            phone: data.telefono,
            nombre: data.nombre,
            capturedAt: new Date().toISOString(),
          })
        );
      } catch { /* ignorar */ }

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "formSubmissionWsp" });
      }

      const message = encodeURIComponent(
        `¡Hola! Vengo de la web inb2blatam.com.\nMi nombre es ${data.nombre} ${data.apellido}.\n${
          data.empresa ? `Empresa: ${data.empresa}\n` : ""
        }Teléfono: ${data.telefono}\n\n${data.mensaje}`
      );

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(url, "_blank");
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const handleCloseModal = () => setStatus("idle");

  return (
    <div id="contactanos">
      {/* ── Toast de resultado ─────────────────────────────── */}
      {(status === "success" || status === "error") && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-in-poppins ${
            status === "success"
              ? "bg-[#0d1f3c] border-in-cyan/30 text-white"
              : "bg-[#1f0d0d] border-red-500/30 text-white"
          }`}>
            {status === "success" ? (
              <CheckCircle2 className="text-in-cyan w-5 h-5 shrink-0" />
            ) : (
              <XCircle className="text-red-400 w-5 h-5 shrink-0" />
            )}
            <span>
              {status === "success"
                ? "¡Enviado! Abriendo WhatsApp…"
                : "Algo salió mal. Intenta de nuevo."}
            </span>
            <button onClick={handleCloseModal} className="ml-2 text-white/40 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Formulario ─────────────────────────────────────── */}
      <Form {...form}>
        <form className="space-y-4 relative" onSubmit={form.handleSubmit(onSubmit)}>
          {status === "loading" && (
            <div className="absolute inset-0 z-10 cursor-not-allowed rounded-lg" />
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      className="placeholder:text-white aria-invalid:border-white border py-5 border-white text-white aria-invalid:ring-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Apellido"
                      className="placeholder:text-white aria-invalid:border-white border py-5 border-white text-white aria-invalid:ring-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Teléfono"
                      className="placeholder:text-white border py-5 aria-invalid:border-white border-white text-white aria-invalid:ring-none"
                      maxLength={9}
                      onKeyDown={(e) => {
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
                      }}
                      onPaste={(e) => {
                        const pastedData = e.clipboardData.getData("text");
                        if (!/^\d+$/.test(pastedData)) {
                          e.preventDefault();
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Empresa"
                      className="placeholder:text-white border py-5 aria-invalid:border-white border-white text-white aria-invalid:ring-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <textarea
                    placeholder="Mensaje"
                    className="w-full placeholder:text-white border aria-invalid:border-white px-4 rounded-lg py-4 border-white text-white resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aceptaTerminos"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-start gap-2">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(v: boolean) => field.onChange(v === true)}
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                  </FormControl>
                  <Label className="font-normal text-xs text-white leading-4">
                    Autorizo el tratamiento de mis datos personales con fines informativos y comerciales
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-in-cyan text-black hover:bg-in-cyan/80 cursor-pointer font-in-poppins disabled:opacity-70"
            type="submit"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </span>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
