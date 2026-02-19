export function formatFechaPeru(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Lima",
  });
}

export function formatFechaCompleta(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Lima",
  });
}
