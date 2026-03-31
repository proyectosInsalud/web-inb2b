import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // --- Extraer campos del formulario ---
    const nombres = formData.get("nombres") as string;
    const apellidoPaterno = formData.get("apellidoPaterno") as string;
    const apellidoMaterno = formData.get("apellidoMaterno") as string;
    const tipoDocumento = formData.get("tipoDocumento") as string;
    const numeroDocumento = formData.get("numeroDocumento") as string;
    const telefono = formData.get("telefono") as string;
    const correo = formData.get("correo") as string;
    const direccion = formData.get("direccion") as string;
    const referencia = formData.get("referencia") as string;
    const departamento = formData.get("departamento") as string;
    const provincia = formData.get("provincia") as string;
    const distrito = formData.get("distrito") as string;
    const menorDeEdad = formData.get("menorDeEdad") as string;
    const nombreTutorLegal = formData.get("nombreTutorLegal") as string;

    const tipoProducto = formData.get("tipoProducto") as string;
    const monto = formData.get("monto") as string;
    const fechaCompra = formData.get("fechaCompra") as string;
    const lugarCompra = formData.get("lugarCompra") as string;

    const tipoReclamacion = formData.get("tipoReclamacion") as string;
    const detalleReclamacion = formData.get("detalleReclamacion") as string;
    const pedidoConsumidor = formData.get("pedidoConsumidor") as string;

    // Validación básica
    if (!nombres || !apellidoPaterno || !correo || !tipoReclamacion || !detalleReclamacion) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    // --- Adjuntos ---
    const attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [];

    for (let i = 1; i <= 3; i++) {
      const file = formData.get(`documento${i}`) as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }
    }

    // --- Construir el HTML del correo ---
    const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
    .wrapper { max-width: 680px; margin: 0 auto; background: #fff; }
    .header { background: #004469; padding: 28px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: 0.5px; }
    .header p { color: #5DC5BE; margin: 6px 0 0; font-size: 13px; }
    .section { padding: 24px 32px; border-bottom: 1px solid #e5e5e5; }
    .section h2 { color: #004469; font-size: 15px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #5DC5BE; }
    .row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
    .field { flex: 1; min-width: 180px; }
    .field label { display: block; font-size: 11px; font-weight: bold; color: #5DC5BE; text-transform: uppercase; margin-bottom: 3px; }
    .field span { font-size: 14px; color: #222; }
    .textarea-field { margin-bottom: 10px; }
    .textarea-field label { display: block; font-size: 11px; font-weight: bold; color: #5DC5BE; text-transform: uppercase; margin-bottom: 3px; }
    .textarea-field p { background: #f9f9f9; border-left: 3px solid #5DC5BE; padding: 10px 14px; margin: 0; font-size: 14px; border-radius: 4px; }
    .badge { display: inline-block; background: #004469; color: #fff; border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: bold; }
    .footer { background: #004469; padding: 18px 32px; text-align: center; }
    .footer p { color: #8dc7d8; font-size: 12px; margin: 4px 0; }
    .footer a { color: #5DC5BE; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📋 Nuevo Reclamo Recibido</h1>
      <p>Libro de Reclamaciones — INB2B Health Partners</p>
    </div>

    <div class="section">
      <h2>1. Identificación del Consumidor Reclamante</h2>
      <div class="row">
        <div class="field"><label>Nombres</label><span>${nombres}</span></div>
        <div class="field"><label>Apellido Paterno</label><span>${apellidoPaterno}</span></div>
        <div class="field"><label>Apellido Materno</label><span>${apellidoMaterno || "—"}</span></div>
      </div>
      <div class="row">
        <div class="field"><label>Tipo de Documento</label><span>${tipoDocumento || "—"}</span></div>
        <div class="field"><label>Número de Documento</label><span>${numeroDocumento || "—"}</span></div>
        <div class="field"><label>Teléfono</label><span>${telefono || "—"}</span></div>
      </div>
      <div class="row">
        <div class="field"><label>Correo Electrónico</label><span>${correo}</span></div>
        <div class="field"><label>Dirección</label><span>${direccion || "—"}</span></div>
        <div class="field"><label>Referencia</label><span>${referencia || "—"}</span></div>
      </div>
      <div class="row">
        <div class="field"><label>Departamento</label><span>${departamento || "—"}</span></div>
        <div class="field"><label>Provincia</label><span>${provincia || "—"}</span></div>
        <div class="field"><label>Distrito</label><span>${distrito || "—"}</span></div>
      </div>
      <div class="row">
        <div class="field"><label>Menor de Edad</label><span>${menorDeEdad === "si" ? "Sí" : "No"}</span></div>
        ${menorDeEdad === "si" ? `<div class="field"><label>Nombre del Tutor Legal</label><span>${nombreTutorLegal || "—"}</span></div>` : ""}
      </div>
    </div>

    <div class="section">
      <h2>2. Identificación del Bien Contratado</h2>
      <div class="row">
        <div class="field"><label>Tipo de Producto</label><span>${tipoProducto || "—"}</span></div>
        <div class="field"><label>Monto (S/)</label><span>${monto || "—"}</span></div>
      </div>
      <div class="row">
        <div class="field"><label>Fecha de Compra / Servicio</label><span>${fechaCompra || "—"}</span></div>
        <div class="field"><label>Lugar de Compra / Servicio</label><span>${lugarCompra || "—"}</span></div>
      </div>
    </div>

    <div class="section">
      <h2>3. Detalle de Reclamación y Pedido del Consumidor</h2>
      <div class="row" style="margin-bottom:12px;">
        <div class="field"><label>Tipo de Reclamación</label><span style="display:inline-block;background:#004469;color:#ffffff;border-radius:20px;padding:4px 14px;font-size:12px;font-weight:bold;">${tipoReclamacion}</span></div>
      </div>
      <div class="textarea-field">
        <label>Detalle de la Reclamación</label>
        <p>${detalleReclamacion}</p>
      </div>
      <div class="textarea-field">
        <label>Pedido del Consumidor</label>
        <p>${pedidoConsumidor || "—"}</p>
      </div>
    </div>

    ${attachments.length > 0 ? `
    <div class="section">
      <h2>4. Documentos Adjuntos</h2>
      <p style="font-size:13px; color:#555;">Se han adjuntado ${attachments.length} documento(s) a este correo.</p>
    </div>` : ""}

    <div class="footer">
      <p>Este correo fue generado automáticamente desde el Libro de Reclamaciones de <strong>inb2blatam.com</strong></p>
      <p>Contacto: <a href="mailto:info@inb2blatam.com">info@inb2blatam.com</a></p>
    </div>
  </div>
</body>
</html>`;

    // --- Configurar transporter ---
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.inb2blatam.com",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // permite certificados autofirmados en hosting compartido
      },
    });

    // Verificar conexión antes de enviar
    await transporter.verify();

    const destinatario =
      process.env.GESTOR_RECLAMACIONES_EMAIL || process.env.SMTP_USER || "";

    await transporter.sendMail({
      from: `"Libro de Reclamaciones INB2B" <${process.env.SMTP_USER}>`,
      to: destinatario,
      replyTo: correo,
      subject: `📋 Nuevo Reclamo: ${nombres} ${apellidoPaterno} — ${tipoReclamacion}`,
      html: emailHtml,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error & { code?: string; responseCode?: number; response?: string };
    console.error("[/api/reclamacion] SMTP Error:", {
      message: err.message,
      code: err.code,
      responseCode: err.responseCode,
      response: err.response,
    });
    return NextResponse.json(
      { error: "Ocurrió un error al procesar su reclamo. Por favor intente nuevamente." },
      { status: 500 }
    );
  }
}
