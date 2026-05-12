import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Colores corporativos INB2B
const COLOR_HEADER_BG  = { red: 0.071, green: 0.122, blue: 0.235 };
const COLOR_HEADER_FG  = { red: 0.000, green: 0.898, blue: 0.784 };
const COLOR_ROW_ODD    = { red: 0.063, green: 0.153, blue: 0.310 };
const COLOR_ROW_EVEN   = { red: 0.094, green: 0.188, blue: 0.361 };
const COLOR_BORDER     = { red: 0.000, green: 0.898, blue: 0.784 };
const COLOR_TEXT_LIGHT = { red: 0.85,  green: 0.92,  blue: 1.0   };

const borderStyle = {
  style: "SOLID",
  width: 1,
  color: { ...COLOR_BORDER, alpha: 0.25 },
};

export async function POST(req: NextRequest) {
  try {
    const { nombre, apellido, empresa, telefono, mensaje } = await req.json();

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error("Missing Google Sheets environment variables");
      return NextResponse.json(
        { error: "Error de configuración en el servidor" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const date = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });

    // Obtener nombre real de la primera hoja
    const spreadsheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const firstSheet = spreadsheetMeta.data.sheets?.[0];
    const sheetTitle = firstSheet?.properties?.title ?? "Hoja 1";
    const sheetId = firstSheet?.properties?.sheetId ?? 0;
    const range = (r: string) => `'${sheetTitle}'!${r}`;

    // Verificar si hay encabezados
    const checkResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: range("A1:F1"),
    });

    if (!checkResponse.data.values || checkResponse.data.values.length === 0) {
      // Escribir encabezados
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: range("A1:F1"),
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["📅  Fecha y Hora", "👤  Nombre", "👤  Apellido", "🏢  Empresa", "📞  Teléfono", "💬  Mensaje"]],
        },
      });

      // Formato completo inicial
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            // Fondo general
            {
              repeatCell: {
                range: { sheetId, startRowIndex: 0, endRowIndex: 1000, startColumnIndex: 0, endColumnIndex: 6 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: COLOR_ROW_ODD,
                    textFormat: { foregroundColor: COLOR_TEXT_LIGHT, fontSize: 10 },
                    verticalAlignment: "MIDDLE",
                    padding: { top: 6, bottom: 6, left: 10, right: 10 },
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,verticalAlignment,padding)",
              },
            },
            // Encabezado
            {
              repeatCell: {
                range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 6 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: COLOR_HEADER_BG,
                    textFormat: { bold: true, fontSize: 11, foregroundColor: COLOR_HEADER_FG },
                    horizontalAlignment: "CENTER",
                    verticalAlignment: "MIDDLE",
                    padding: { top: 10, bottom: 10, left: 12, right: 12 },
                    borders: { bottom: { style: "SOLID", width: 2, color: COLOR_BORDER } },
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,padding,borders)",
              },
            },
            // Altura encabezado
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 },
                properties: { pixelSize: 42 },
                fields: "pixelSize",
              },
            },
            // Freeze
            {
              updateSheetProperties: {
                properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
                fields: "gridProperties.frozenRowCount",
              },
            },
            // Anchos de columna
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 },
                properties: { pixelSize: 175 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 1, endIndex: 3 },
                properties: { pixelSize: 140 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 3, endIndex: 4 },
                properties: { pixelSize: 180 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 4, endIndex: 5 },
                properties: { pixelSize: 150 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 5, endIndex: 6 },
                properties: { pixelSize: 320 },
                fields: "pixelSize",
              },
            },
          ],
        },
      });
    }

    // Obtener cantidad de filas para alternar color
    const countRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: range("A:A"),
    });
    const rowCount = countRes.data.values?.length ?? 1;
    const newRowIndex = rowCount;
    const isEven = newRowIndex % 2 === 0;

    // Escribir datos
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: range("A:F"),
      valueInputOption: "RAW",
      requestBody: { values: [[date, nombre, apellido, empresa, telefono, mensaje]] },
    });

    // Formatear la fila nueva
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: newRowIndex,
                endRowIndex: newRowIndex + 1,
                startColumnIndex: 0,
                endColumnIndex: 6,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: isEven ? COLOR_ROW_EVEN : COLOR_ROW_ODD,
                  textFormat: { foregroundColor: COLOR_TEXT_LIGHT, fontSize: 10 },
                  verticalAlignment: "MIDDLE",
                  padding: { top: 6, bottom: 6, left: 10, right: 10 },
                  borders: {
                    top:    borderStyle,
                    bottom: borderStyle,
                    left:   borderStyle,
                    right:  borderStyle,
                  },
                },
              },
              fields: "userEnteredFormat(backgroundColor,textFormat,verticalAlignment,padding,borders)",
            },
          },
          {
            updateDimensionProperties: {
              range: { sheetId, dimension: "ROWS", startIndex: newRowIndex, endIndex: newRowIndex + 1 },
              properties: { pixelSize: 36 },
              fields: "pixelSize",
            },
          },
        ],
      },
    });

    // Enviar correo de notificación (no bloquea si falla)
    try {
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "mail.inb2blatam.com",
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
      });

      const destinatario = process.env.CONTACT_DESTINATION_EMAIL || process.env.SMTP_USER || "";

      await transporter.sendMail({
        from: `"INB2B Web" <${process.env.SMTP_USER}>`,
        to: destinatario,
        subject: `📬 Nuevo contacto web — ${nombre} ${apellido}`,
        html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #004469; padding: 28px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 20px; letter-spacing: 0.5px; }
    .header p { color: #5DC5BE; margin: 6px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 18px; }
    .field label { display: block; font-size: 11px; font-weight: bold; color: #5DC5BE; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field span { font-size: 15px; color: #111; }
    .divider { border: none; border-top: 1px solid #eee; margin: 20px 0; }
    .message-box { background: #f9f9f9; border-left: 3px solid #5DC5BE; padding: 14px 16px; border-radius: 4px; font-size: 14px; color: #333; white-space: pre-wrap; }
    .footer { background: #f0f0f0; text-align: center; padding: 14px; font-size: 11px; color: #999; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Nuevo contacto desde la web</h1>
      <p>inb2blatam.com · ${date}</p>
    </div>
    <div class="body">
      <div class="field">
        <label>Nombre completo</label>
        <span>${nombre} ${apellido}</span>
      </div>
      ${empresa ? `<div class="field"><label>Empresa</label><span>${empresa}</span></div>` : ""}
      <div class="field">
        <label>Teléfono</label>
        <span>${telefono}</span>
      </div>
      <hr class="divider" />
      <div class="field">
        <label>Mensaje</label>
        <div class="message-box">${mensaje}</div>
      </div>
    </div>
    <div class="footer">INB2B · inb2blatam.com</div>
  </div>
</body>
</html>`,
      });
    } catch (emailError) {
      console.error("Error enviando email de contacto:", emailError);
      // No falla la respuesta si el email falla
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al guardar los datos" },
      { status: 500 }
    );
  }
}
