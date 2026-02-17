"use client";
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
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "51943583887"; // Reemplaza con tu número de WhatsApp

export const FormContactHome = () => {
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

  function onSubmit(data: FormContactHomeType) {
    // Evento de Tag Manager antes de abrir WhatsApp
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "formSubmissionWsp",
      });
    }

    const message = encodeURIComponent(
      `¡Hola! Mi nombre es ${data.nombre} ${data.apellido}.\n\n${
        data.empresa ? `Represento a la empresa: ${data.empresa}\n` : ""
      }Teléfono de contacto: ${data.telefono}\n\nMensaje: ${data.mensaje}`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }
  
  return (
    <div id="contactanos">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            className="w-full bg-in-cyan text-black hover:bg-in-cyan/80 cursor-pointer font-in-poppins"
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
};
