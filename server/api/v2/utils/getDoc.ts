import { GoogleSpreadsheet } from 'google-spreadsheet';

export const getDoc = async (sheetId: string): Promise<GoogleSpreadsheet> => {
  // Initialize the sheet
  const doc: GoogleSpreadsheet = new GoogleSpreadsheet(sheetId);

  // Initialize Auth
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    private_key:
      (process.env.GOOGLE_PRIVATE_KEY &&
        process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')) ||
      '',
  });

  // Load the document
  await doc.loadInfo();

  return Promise.resolve(doc);
};
