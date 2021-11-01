import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

export const getSheet = async (
  doc: GoogleSpreadsheet,
  resSheetName: string | undefined
): Promise<{
  sheet: GoogleSpreadsheetWorksheet;
  sheetName: string;
}> => {
  let sheetName;
  if (resSheetName) {
    sheetName = resSheetName;
  } else {
    const currentMonth = new Date().toLocaleString('default', {
      month: 'short',
    });
    const currentYear = new Date().toLocaleString('default', {
      year: '2-digit',
    });
    sheetName = `${currentMonth}-${currentYear}`;
  }
  const sheet = doc.sheetsByTitle[sheetName];
  return { sheet, sheetName };
};
