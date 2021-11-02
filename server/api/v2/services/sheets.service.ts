import L from '../../../common/logger';
import { getSheet } from '../utils/getSheet';
import { getDoc } from '../utils/getDoc';

type ReturnObject = {
  result: string;
  errors: any[];
};

const headerValues = ['Title', 'Expense', 'CreatedAt', 'UpdatedAt'];

export class SheetsService {
  async createSheet(
    docId: string,
    resSheetName: string
  ): Promise<ReturnObject> {
    const doc = await getDoc(docId);

    await doc.addSheet({
      title: resSheetName,
      headerValues,
    });

    L.info(`create sheet with name ${resSheetName}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }

  async deleteSheet(
    docId: string,
    resSheetName: string
  ): Promise<ReturnObject> {
    const doc = await getDoc(docId);

    const { ...data } = await getSheet(doc, resSheetName);
    const sheet = data.sheet;

    if (sheet) {
      await doc.deleteSheet(sheet.sheetId);
    }

    L.info(`delete sheet with name ${resSheetName}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }
}

export default new SheetsService();
