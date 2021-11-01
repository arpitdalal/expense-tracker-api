import L from '../../../common/logger';
import { getSheet } from '../utils/getSheet';
import { getSheetDoc } from '../utils/getSheetDoc';

type ReturnObject = {
  result: string;
  errors: any[];
};

export class SheetsService {
  async createSheet(
    docId: string,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(docId);

    const { sheetName, ...data } = await getSheet(doc, resSheetName);
    let sheet = data.sheet;

    if (!sheet) {
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: ['Title', 'Expense', 'CreatedAt', 'UpdatedAt'],
      });
    }

    L.info(`create sheet with name ${resSheetName}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }

  async deleteSheet(
    docId: string,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(docId);

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
  async createRow(
    docId: string,
    title: string,
    expense: string,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(docId);

    const { sheetName, ...data } = await getSheet(doc, resSheetName);
    let sheet = data.sheet;

    if (!sheet) {
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: ['Title', 'Expense', 'CreatedAt', 'UpdatedAt'],
      });
    }

    await sheet.addRow({
      Title: title,
      Expense: expense,
      CreatedAt: new Date().toLocaleDateString(),
    });

    L.info(`create row with title ${title} and expense ${expense}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }

  async updateRow(
    docId: string,
    id: number,
    title?: string,
    expense?: string,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(docId);

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
    rows[id].UpdatedAt = new Date().toLocaleDateString();
    await rows[id].save();

    L.info(`update the row with id ${id}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }

  async deleteRow(
    docId: string,
    id: number,
    resSheetName?: string
  ): Promise<ReturnObject> {
    const doc = await getSheetDoc(docId);

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
