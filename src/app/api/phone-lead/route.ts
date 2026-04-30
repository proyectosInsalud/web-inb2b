import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_NAME = "Leads CTA";

// Colores corporativos INB2B
const COLOR_HEADER_BG  = { red: 0.071, green: 0.122, blue: 0.235 }; // #122040 azul oscuro
const COLOR_HEADER_FG  = { red: 0.000, green: 0.898, blue: 0.784 }; // #00E5C8 cyan
const COLOR_ROW_ODD    = { red: 0.063, green: 0.153, blue: 0.310 }; // fila impar
const COLOR_ROW_EVEN   = { red: 0.094, green: 0.188, blue: 0.361 }; // fila par (ligeramente más claro)
const COLOR_BORDER     = { red: 0.000, green: 0.898, blue: 0.784 }; // cyan para bordes
const COLOR_TEXT_LIGHT = { red: 0.85,  green: 0.92,  blue: 1.0   }; // texto blanco-azulado

const borderStyle = {
  style: "SOLID",
  width: 1,
  color: { ...COLOR_BORDER, alpha: 0.25 },
};

export async function POST(req: NextRequest) {
  try {
    const { telefono, pagina, cta } = await req.json();

    if (!telefono) {
      return NextResponse.json({ error: "Teléfono requerido" }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      return NextResponse.json({ error: "Error de configuración" }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Verificar si la hoja existe
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetsList = spreadsheet.data.sheets ?? [];
    const existingSheet = sheetsList.find((s) => s.properties?.title === SHEET_NAME);
    const sheetExists = !!existingSheet;
    let sheetId: number;

    if (!sheetExists) {
      // Crear hoja con dimensiones definidas
      const addSheet = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                  gridProperties: { rowCount: 1000, columnCount: 4 },
                },
              },
            },
          ],
        },
      });
      sheetId = addSheet.data.replies?.[0]?.addSheet?.properties?.sheetId ?? 1;

      // Escribir encabezados
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `'${SHEET_NAME}'!A1:D1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["📅  Fecha y Hora", "📞  Teléfono", "🌐  Página", "🎯  CTA Origen"]],
        },
      });

      // Formato completo inicial
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            // ── Fondo general de la hoja (azul oscuro base) ──────────────────
            {
              repeatCell: {
                range: { sheetId, startRowIndex: 0, endRowIndex: 1000, startColumnIndex: 0, endColumnIndex: 4 },
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
            // ── Encabezado ───────────────────────────────────────────────────
            {
              repeatCell: {
                range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 4 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: COLOR_HEADER_BG,
                    textFormat: {
                      bold: true,
                      fontSize: 11,
                      foregroundColor: COLOR_HEADER_FG,
                    },
                    horizontalAlignment: "CENTER",
                    verticalAlignment: "MIDDLE",
                    padding: { top: 10, bottom: 10, left: 12, right: 12 },
                    borders: {
                      bottom: { style: "SOLID", width: 2, color: COLOR_BORDER },
                    },
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,padding,borders)",
              },
            },
            // ── Fila de encabezado: altura ────────────────────────────────────
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 },
                properties: { pixelSize: 42 },
                fields: "pixelSize",
              },
            },
            // ── Freeze fila encabezado ────────────────────────────────────────
            {
              updateSheetProperties: {
                properties: {
                  sheetId,
                  gridProperties: { frozenRowCount: 1 },
                },
                fields: "gridProperties.frozenRowCount",
              },
            },
            // ── Ancho de columnas ─────────────────────────────────────────────
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 },
                properties: { pixelSize: 175 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 1, endIndex: 2 },
                properties: { pixelSize: 160 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 2, endIndex: 3 },
                properties: { pixelSize: 200 },
                fields: "pixelSize",
              },
            },
            {
              updateDimensionProperties: {
                range: { sheetId, dimension: "COLUMNS", startIndex: 3, endIndex: 4 },
                properties: { pixelSize: 320 },
                fields: "pixelSize",
              },
            },
          ],
        },
      });
    } else {
      sheetId = existingSheet.properties?.sheetId ?? 1;
    }

    const date = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });

    // Obtener la fila actual para determinar si es par o impar
    const countRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${SHEET_NAME}'!A:A`,
    });
    const rowCount = countRes.data.values?.length ?? 1;
    const newRowIndex = rowCount; // 0-based: fila 1 = encabezado, fila 2 = primer dato
    const isEven = newRowIndex % 2 === 0;

    // Escribir la nueva fila
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${SHEET_NAME}'!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[date, telefono, pagina ?? "", cta ?? ""]] },
    });

    // Formatear la fila recién añadida
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
                endColumnIndex: 4,
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
          // Altura de fila de datos
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving phone lead:", error);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
