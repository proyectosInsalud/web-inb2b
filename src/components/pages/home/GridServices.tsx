import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export const GridServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 font-in-poppins">
      {/* Columna izquierda */}
      <div className="space-y-6">
        {/* Asesoría Integral */}
        <article  data-aos="fade-up" data-aos-duration="1000"  className="bg-in-blue-dark p-6 rounded-2xl relative">
          <div className="flex justify-between items-start">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl mb-4">Asesoría Integral</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Planificación del proyecto</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Implementación, diseño y ejecución de obra</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Categorización IPRESS y cumplimiento normativo</p>
            </li>
          </ul>
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image 
              src="/images/service-one.png"
              alt="Asesoría Integral" 
              fill
              className="object-cover"
            />
          </div>
        </article>

        {/* Expansión y crecimiento */}
        <article  data-aos="fade-up" data-aos-duration="1000"  className="bg-in-blue-dark pt-6 px-6 rounded-2xl relative hidden md:block">
          <div className="flex justify-between items-start">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl mb-4">Expansión y crecimiento</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Modelos de negocio escalables</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Proyecciones financieras y comerciales</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Apertura de nuevas sedes</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Estrategias comerciales y marketing médico</p>
            </li>
          </ul>
          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image 
              src="/images/service-four.png"
              alt="Expansión y crecimiento"
              fill
              className="object-cover"
            />
          </div>
        </article>
      </div>

      {/* Columna derecha */}
      <div className="space-y-6">
        {/* Health Hunting */}
        {/*
        <article  data-aos="fade-up" data-aos-duration="1000"  className="bg-in-blue-dark p-6 rounded-2xl flex items-center relative">
          <div className="flex-1">
            <div className="flex justify-between items-start  ">
              <h3 className="font-in-avantgarde text-xl lg:text-2xl mb-4">Health Hunting</h3>
            </div>
            <p className="md:hidden   text-sm mb-4">Reclutamiento médico, administrativo, y gerencial</p>
            <ul className="hidden md:block space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
                <p>Selección de talento especializado en salud (médico, administrativo y gerencial)</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
                <p>Búsqueda y evaluación de líderes para clínicas, centros médicos y startups</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
                <p>Acompañamiento en procesos de incorporación y alineación cultural</p>
              </li>
            </ul>
          </div>
          <div className="relative w-32  ml-4">
            <Image 
              src="/images/service-two.png"
              alt="Health Hunting"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </article>
        */}
        {/* Gestión de Operaciones */}
        <article  data-aos="fade-up" data-aos-duration="1000"  className="bg-in-blue-dark pt-6  px-6 rounded-2xl relative">
          <div className="flex justify-between items-start ">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl mb-4">Gestión de Operaciones</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Diseño y optimización de procesos clínicoadministrativos</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Implementación de indicadores (KPIs), manuales y protocolos</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Mejora continua, control de calidad y eficiencia operativa</p>
            </li>
          </ul>
          <div className="relative w-full h-32 rounded-t-xl overflow-hidden">
            <Image 
              src="/images/service-three.png"
              alt="Gestión de Operaciones"
              fill
              className="object-cover"
            />
          </div>
        </article>

        {/* Transformación Digital */}
        <article  data-aos="fade-up" data-aos-duration="1000"  className="bg-in-blue-dark pt-6 px-6 rounded-2xl relative">
          <div className="flex justify-between items-start">
            <h3 className="font-in-avantgarde text-xl lg:text-2xl mb-4">Transformación Digital</h3>
            <div className="size-10 absolute top-5 right-5 bg-in-blue-base/20 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-white text-xl -rotate-45" />
            </div>
          </div>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Digitalización de procesos clínico-administrativos</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Desarrollo de dashboards y control de gestión</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 flex-shrink-0 bg-in-cyan rounded-full mt-2"></div>
              <p>Implementación de sistemas y cultura digital</p>
            </li>
          </ul>
          <div className="relative w-full h-32 rounded-t-xl overflow-hidden">
            <Image 
              src="/images/service-five.png"
              alt="Transformación Digital"
              fill
              className="object-cover"
            />
          </div>
        </article>
      </div>
    </div>
  );
};
