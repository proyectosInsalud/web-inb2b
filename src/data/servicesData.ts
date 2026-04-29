export interface AccordionItem {
  id: string;
  title: string;
  points: string[];
  image: string;
  badge?: string;
  time?: string;
}

export interface SubService {
  id: string;
  name: string;
  star?: boolean;
  items: AccordionItem[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  highlights: string[];
  subServices: SubService[];
}

export const servicesData: Service[] = [
  {
    id: "asesoria-integral",
    title: "Asesoría Integral",
    subtitle: "Planificación, diseño y ejecución de proyectos de salud",
    image: "/webp/service-one.webp",
    highlights: [
      "Planificación del proyecto",
      "Implementación, diseño y ejecución de obra",
      "Categorización IPRESS y cumplimiento normativo",
    ],
    subServices: [
      {
        id: "planificacion",
        name: "Planificación de proyecto",
        items: [
          {
            id: "modelo-negocio",
            title: "Modelo de negocios",
            image: "/webp/service-one.webp",
            points: [
              "Diseño estratégico personalizado.",
              "Identificación clara de oportunidades.",
              "Claridad en tu propuesta de valor.",
              "Modelo viable y rentable.",
              "Alineado a normativas de salud en el Perú.",
            ],
            badge: "Informe de modelo de negocios",
            time: "Desde 4 semanas",
          },
          {
            id: "dimensionamiento",
            title: "Dimensionamiento de mercado",
            image: "/images/png/90.png",
            points: [
              "Planificación y elección de metodologías (Fuentes secundarias de investigación).",
              "Trabajo de campo focalizado.",
              "Análisis de datos.",
              "Proyección de oferta y demanda.",
            ],
            badge: "Informe de dimensionamiento de mercado",
            time: "Desde 6 semanas",
          },
          {
            id: "programa-medico",
            title: "Programa médico funcional",
            image: "/images/png/91.png",
            points: [
              "Elección del nivel y categoría de la clínica.",
              "Dimensionamiento físico-funcional de los servicios de salud (UPSS).",
              "Recursos necesarios para el inicio de actividades.",
            ],
            badge: "Informe programa médico funcional",
            time: "Desde 6 semanas",
          },
          {
            id: "asesoria-financiera",
            title: "Asesoría financiera",
            image: "/images/png/92.png",
            points: [
              "Estructura de costos por etapa de inversión.",
              "Proyección del estado de resultados.",
              "Determinación del punto de equilibrio financiero.",
            ],
            badge: "Informe financiero",
            time: "Desde 4 semanas",
          },
        ],
      },
      {
        id: "diseno-ejecucion",
        name: "Implementación, diseño y ejecución de obra",
        items: [
          {
            id: "eleccion-inmueble",
            title: "Elección del inmueble",
            image: "/images/png/93.png",
            points: [
              "Búsqueda de inmueble en zona de referencia.",
              "Confirmación de zonificación municipal para servicio de salud.",
              "Presentación de propuestas.",
              "Asesoría en la firma de contrato.",
            ],
            badge: "Contrato de alquiler / venta",
            time: "Desde 8 semanas",
          },
          {
            id: "arquitectura",
            title: "Arquitectura y diseño hospitalario",
            image: "/images/png/94.png",
            points: [
              "Diseño paramétrico de infraestructura según normas técnicas sanitarias y categoría elegida.",
              "Diseño de interiores en vistas 3D.",
            ],
            badge: "Planos y vistas 3D",
            time: "Desde 4 semanas",
          },
          {
            id: "ejecucion-obras",
            title: "Ejecución de obras",
            image: "/images/png/95.png",
            points: [
              "Presentación de 2 propuestas económicas de ejecución de obra.",
              "Supervisión y acompañamiento durante la obra.",
            ],
            badge: "Acta de entrega de obra",
            time: "Desde 12 semanas",
          },
        ],
      },
      {
        id: "categorizacion",
        name: "Categorización y cumplimiento",
        star: true,
        items: [
          {
            id: "categorizacion-ipress",
            title: "Categorización",
            image: "/images/png/97.png",
            points: [
              "Recopilación de información para armado de expedientes.",
              "Evaluación técnica.",
              "Presentación de expediente en mesa de partes.",
              "Acompañamiento en visita de DIRIS.",
            ],
            badge: "CUI (Código único IPRESS) Categorización",
            time: "Desde 6 semanas",
          },
          {
            id: "asesoria-susalud",
            title: "Asesoría preventiva de supervisión de SUSALUD",
            image: "/images/png/96.png",
            points: [
              "Diagnóstico de cumplimiento.",
              "Evaluación frente a normativa vigente.",
              "Simulación de supervisión.",
              "Auditoría tipo SUSALUD en campo.",
              "Revisión de historias clínicas.",
              "Calidad de registros y consentimientos.",
              "Gestión de reclamos.",
              "Libro de reclamaciones y tiempos de respuesta.",
              "Documentación institucional.",
              "Licencias, categorización, contratos y seguros.",
              "Seguridad del paciente.",
              "Protocolos, eventos adversos y farmacia.",
              "Publicidad en salud.",
              "Cumplimiento en marketing y comunicaciones.",
              "Capacitación del personal.",
              "Derechos del paciente y manejo de inspecciones.",
              "Plan de acción/Hallazgos + soluciones con responsables y plazos.",
              "Verificación de implementación.",
            ],
            time: "Desde 4 semanas",
          },
        ],
      },
    ],
  },
  {
    id: "gestion-operaciones",
    title: "Gestión de Operaciones",
    subtitle: "Optimización y eficiencia en la gestión clínico-administrativa",
    image: "/images/png/Texto del párrafo (20) 1.png",
    highlights: [
      "Diseño y optimización de procesos clínico-administrativos",
      "Reclutamiento y selección en salud",
    ],
    subServices: [
      {
        id: "diseno-procesos-clinicos",
        name: "Diseño y optimización de procesos clínicos y administrativos",
        items: [
          {
            id: "procesos-clinicos",
            title: "Diseño y optimización de procesos clínicos y administrativos",
            image: "/images/png/98.png",
            points: [
              "Desarrollo de los procesos de gestión de citas, admisión, caja, atención médica y farmacia.",
              "Coordinación de los recursos humanos de la clínica.",
              "Gestión de los procesos asistenciales y de soporte del establecimiento de salud.",
            ],
            badge: "Contrato de gestión clínica / Manual de indicadores",
            time: "Desde 4 semanas",
          },
        ],
      },
      {
        id: "reclutamiento",
        name: "Reclutamiento y selección en salud",
        items: [
          {
            id: "seleccion-personal",
            title: "Reclutamiento y selección en salud",
            image: "/images/png/99.png",
            points: [
              "Elaboración de perfil del puesto.",
              "Promoción de la oferta laboral.",
              "Filtro y entrevista de candidatos.",
              "Decisión final e incorporación del trabajador.",
            ],
            badge: "Informe",
            time: "Desde 4 semanas",
          },
        ],
      },
    ],
  },
  {
    id: "expansion-crecimiento",
    title: "Expansión y crecimiento",
    subtitle: "Estrategias para escalar y consolidar tu presencia en el mercado de salud",
    image: "/images/png/Texto del párrafo (22) 1.png",
    highlights: [
      "Modelos de negocio escalables",
      "Proyecciones financieras y comerciales",
      "Apertura de nuevas sedes",
      "Estrategias comerciales y marketing médico",
    ],
    subServices: [
      {
        id: "estrategia-expansion",
        name: "Estrategia de expansión",
        items: [
          {
            id: "crecimiento",
            title: "Crecimiento sostenible",
            image: "/webp/service-five.webp",
            points: [
              "Modelos de negocio escalables",
              "Proyecciones financieras y comerciales",
              "Apertura de nuevas sedes",
              "Estrategias comerciales y marketing médico",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "transformacion-digital",
    title: "Transformación Digital",
    subtitle: "Digitalización integral de procesos para clínicas y centros de salud",
    image: "/images/png/Texto del párrafo (21) 1.png",
    highlights: [
      "Digitalización de procesos clínico-administrativos",
      "Desarrollo de dashboards y control de gestión",
      "Implementación de sistemas y cultura digital",
    ],
    subServices: [
      {
        id: "digitalizacion",
        name: "Digitalización",
        items: [
          {
            id: "digital",
            title: "Transformación digital en salud",
            image: "/webp/service-three.webp",
            points: [
              "Digitalización de procesos clínico-administrativos",
              "Desarrollo de dashboards y control de gestión",
              "Implementación de sistemas y cultura digital",
            ],
          },
        ],
      },
    ],
  },
];
