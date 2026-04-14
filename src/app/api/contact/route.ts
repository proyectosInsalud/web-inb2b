import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { nombre, apellido, empresa, telefono, mensaje } = await req.json();

    // Validar variables de entorno
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

    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Preparar los datos (Fecha actual + campos del formulario)
    const date = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
    });

    const values = [[date, nombre, apellido, empresa, telefono, mensaje]];

    // 1. Verificar si la hoja está vacía (obtener la primera fila)
    const checkResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Hoja 1'!A1:F1",
    });

    // 2. Si no hay encabezados, añadirlos primero
    if (!checkResponse.data.values || checkResponse.data.values.length === 0) {
      const headers = [
        ["Fecha y Hora", "Nombre", "Apellido", "Empresa", "Teléfono", "Mensaje"],
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "'Hoja 1'!A1:F1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: headers,
        },
      });

      // Opcional: Aplicar formato negrita a los encabezados (requiere batchUpdate)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0, // Generalmente 0 es la primera hoja
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 6,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.1, green: 0.3, blue: 0.4 }, // Azul oscuro
                    textFormat: {
                      bold: true,
                      foregroundColor: { red: 1, green: 1, blue: 1 }, // Blanco
                    },
                    horizontalAlignment: "CENTER",
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
              },
            },
          ],
        },
      });
    }

    // 3. Añadir la nueva fila de datos
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "'Hoja 1'!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al guardar los datos" },
      { status: 500 }
    );
  }
}
