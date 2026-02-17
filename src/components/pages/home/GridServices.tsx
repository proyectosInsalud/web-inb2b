import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export const GridServices = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 font-in-poppins">
      {/* Columna izquierda */}
      <div className="space-y-6">
        {/* Asesoría Integral */}
        <article
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-in-blue-dark p-6 rounded-2xl relative flex flex-col gap-4"
        >
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl">Asesoría Integral</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Planificación del proyecto</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Implementación, diseño y ejecución de obra</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Categorización IPRESS y cumplimiento normativo</p>
            </li>
          </ul>
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image
              src="/images/service-one.png"
              alt="Asesoría Integral"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </article>

        {/* Expansión y crecimiento */}
        <article
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-in-blue-dark p-6 rounded-2xl relative flex flex-col gap-4 hidden md:block"
        >
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl">Expansión y crecimiento</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Modelos de negocio escalables</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Proyecciones financieras y comerciales</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Apertura de nuevas sedes</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Estrategias comerciales y marketing médico</p>
            </li>
          </ul>
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image
              src="/images/service-four.png"
              alt="Expansión y crecimiento"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </article>
      </div>

      {/* Columna derecha */}
      <div className="space-y-6">
        {/* Gestión de Operaciones */}
        <article
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-in-blue-dark p-6 rounded-2xl relative flex flex-col gap-4"
        >
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl">Gestión de Operaciones</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Diseño y optimización de procesos clínico-administrativos</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Implementación de indicadores (KPIs), manuales y protocolos</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Mejora continua, control de calidad y eficiencia operativa</p>
            </li>
          </ul>
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image
              src="/images/service-three.png"
              alt="Gestión de Operaciones"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </article>

        {/* Transformación Digital */}
        <article
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-in-blue-dark p-6 rounded-2xl relative flex flex-col gap-4"
        >
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl">Transformación Digital</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Digitalización de procesos clínico-administrativos</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Desarrollo de dashboards y control de gestión</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2" />
              <p>Implementación de sistemas y cultura digital</p>
            </li>
          </ul>
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image
              src="/images/service-five.png"
              alt="Transformación Digital"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </article>
      </div>
    </div>
  );
};
