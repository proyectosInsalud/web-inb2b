import { notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import { GridServices } from "@/components/pages/home/GridServices";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ id: s.id }));
}

export default async function ServicioDetallePage({ params }: Props) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-in-blue-main text-white">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        {/* Back */}
        <Link
          href="/#servicios"
          className="inline-flex items-center gap-2 text-white/60 hover:text-in-cyan transition-colors text-sm mb-10"
        >
          <ArrowLeft className="size-4" />
          Volver a servicios
        </Link>

        <GridServices serviceId={id} />
      </div>
    </main>
  );
}
