import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

export const getSheet = async (
  doc: GoogleSpreadsheet
): Promise<{
  sheet: GoogleSpreadsheetWorksheet;
  sheetName: string;
}> => {
  const currentMonth = new Date().toLocaleString('default', {
    month: 'short',
  });
  const currentYear = new Date().toLocaleString('default', {
    year: '2-digit',
  });
  const sheetName = `${currentMonth}-${currentYear}`;
  const sheet = doc.sheetsByTitle[sheetName];
  return { sheet, sheetName };
};
