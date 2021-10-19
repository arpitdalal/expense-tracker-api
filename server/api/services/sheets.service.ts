import L from '../../common/logger';
import { getSheet } from '../utils/getSheet';
import { getSheetDoc } from '../utils/getSheetDoc';

type ReturnObject = {
  result: string;
  errors: any[];
};

export class SheetsService {
  async create(
    sheetId: string,
    title: string,
    expense: string,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(sheetId);

    const { sheetName, ...data } = await getSheet(doc, resSheetName);
    let sheet = data.sheet;

    if (!sheet) {
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: ['Title', 'Expense'],
      });
    }

    await sheet.addRow({ Title: title, Expense: expense });

    L.info(`create row with title ${title} and expense ${expense}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }

  async patch(
    sheetId: string,
    id: number,
    title?: string,
    expense?: string,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(sheetId);

    const { sheet } = await getSheet(doc, resSheetName);

    if (!sheet) {
      return Promise.reject({
        result: '',
        errors: ['Something went wrong'],
      });
    }

    const rows = await sheet.getRows();
    rows[id].Title = title || rows[id].Title;
    rows[id].Expense = expense || rows[id].Expense;
    await rows[id].save();

    L.info(`update the row with id ${id}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }

  async delete(
    sheetId: string,
    id: number,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(sheetId);

    const { sheet } = await getSheet(doc, resSheetName);

    if (!sheet) {
      return Promise.reject({
        result: '',
        errors: ['Something went wrong'],
      });
    }

    const rows = await sheet.getRows();
    await rows[id].delete();

    L.info(`delete the row with id ${id}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }
}

export default new SheetsService();
