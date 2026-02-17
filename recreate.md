# RECREAR EL PROYECTO

## Prerrequisitos
- Node
- Git instalado.

## Pasos rápidos
1) Crear base Next:
   ```bash
   npx create-next-app@latest web-inb2b_v2 --ts --app --src-dir --tailwind --eslint --turbopack --import-alias "@/*"
   ```
2) Copiar `public/` (imágenes), `src/` y config del proyecto original.
3) Instalar dependencias (sin versiones, ver lista abajo):
   ```bash
   npm install <lista-produccion>
   npm install -D <lista-desarrollo>
   ```
4) Ejecutar:
   - `npm run dev` (dev con Turbopack)
   - `npm run lint`
   - `npm run build` y `npm start`

## Dependencias (sin versiones)
- Producción: @hookform/resolvers, @microsoft/clarity, @radix-ui/react-accordion, @radix-ui/react-dialog, @radix-ui/react-label, @radix-ui/react-radio-group, @radix-ui/react-slot, @radix-ui/react-tabs, @tsparticles/engine, @tsparticles/react, aos, class-variance-authority, clsx, embla-carousel-react, lucide-react, next, react, react-dom, react-hook-form, react-icons, tailwind-merge, zod.
- Desarrollo: @eslint/eslintrc, @tailwindcss/postcss, @types/aos, @types/node, @types/react, @types/react-dom, eslint, eslint-config-next, tailwindcss, tw-animate-css, typescript.

## Estructura propuesta (escalable)
```
src/
  app/
    (marketing)/           # layouts/páginas públicas
    api/                   # server actions / API routes
  core/
    config/                # env, seo, analytics (GTM/Clarity)
    lib/                   # utilidades puras
    data/                  # constantes compartidas
    types/                 # d.ts e interfaces globales
  features/
    home/
      components/          # HeroOverlay, AboutSection, etc.
      hooks/
      services/            # llamadas HTTP o mappers
      data.ts
    contact/
      ...                  # formularios y tabs
  ui/
    primitives/            # button, input, label, tabs, accordion, sheet
    composite/             # Footer, WhatsAppButton, PopUp, Carousel genérico
  styles/                  # globals.css, tokens adicionales
  analytics/               # loaders de Clarity/GTM
  tests/
public/
  images/                  # optimizadas y nombradas por feature
```
- Mueve `components/ui` → `src/ui/primitives`; `components/common` → `src/ui/composite`; `components/pages/home` → `src/features/home/components`.
- Centraliza datos en `src/core/data` y tipos en `src/core/types`.
- Configuración SEO/analytics/env en `src/core/config`; leer IDs de entorno: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_CLARITY_ID`.
- Usa alias `@/` para evitar rutas relativas largas.

## Detalles clave a replicar
- `src/app/layout.tsx`: carga fuentes Geist/Geist_Mono/Poppins/Lato, incluye `<WhatsAppButton />`, `<Footer />`, script GTM y `<noscript>` iframe; define `metadata` con `metadataBase: https://inb2blatam.com`.
- `src/app/page.tsx`: compone las secciones de `features/home` y `PopUp`.
- `src/app/globals.css`: importa `tailwindcss` y `tw-animate-css`, define tokens de color/tipografía y `@layer base` para bordes/ring; `scroll-behavior: smooth`.
- Formularios: `react-hook-form` + `@hookform/resolvers` + `zod` con esquemas en `src/schemas`.
- Animaciones/UI: AOS para scroll; Embla para carruseles; Radix para diálogos/tabs/accordion; `lucide-react`/`react-icons` para íconos; `tailwind-merge`/`clsx` para clases.
