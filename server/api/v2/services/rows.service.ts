import L from '../../../common/logger';
import { getSheet } from '../utils/getSheet';
import { getDoc } from '../utils/getDoc';
import ImageKit from 'imagekit';

type ReturnObject = {
  result: string;
  errors: any[];
};
type Row = {
  Title: string;
  Expense: string;
  File?: string;
  CreatedAt: string;
  UpdatedAt?: string;
  ShouldAddToNextMonth?: string;
};

const headerValues = ['Title', 'Expense', 'File', 'CreatedAt', 'UpdatedAt'];

const imagekit = new ImageKit({
  publicKey: 'public_7eoqu13DFQ4xKANGBpaKxrwk6W8=',
  privateKey: 'private_g2MqDfsanbhlNonhHPUBUDrqF/o=',
  urlEndpoint: 'https://ik.imagekit.io/arpitdalal',
});

export class SheetsService {
  async createRow(
    docId: string,
    title: string,
    expense: string,
    file?: string,
    resSheetName?: string,
    ShouldAddToNextMonth?: string
  ): Promise<ReturnObject> {
    const doc = await getDoc(docId);
    let fileUrl = '';

    const { sheetName, ...data } = await getSheet(doc, resSheetName);
    let sheet = data.sheet;

    if (!sheet) {
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues,
      });
    }

    if (file) {
      const response = await imagekit.upload({
        file,
        fileName: title,
        folder: 'expense-tracker',
      });
      fileUrl = response.url;
    }

    const payload: Row = {
      Title: title,
      Expense: expense,
      File: fileUrl,
      CreatedAt: new Date().toLocaleDateString(),
      ShouldAddToNextMonth,
    };

    await sheet.addRow(payload);

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
    resSheetName?: string,
    ShouldAddToNextMonth?: string
  ): Promise<ReturnObject> {
    const doc = await getDoc(docId);

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
    rows[id].ShouldAddToNextMonth =
      ShouldAddToNextMonth || rows[id].ShouldAddToNextMonth;
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
    const doc = await getDoc(docId);

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
