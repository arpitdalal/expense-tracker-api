import L from '../../../common/logger';
import { getSheet } from '../utils/getSheet';
import { getDoc } from '../utils/getDoc';
import { addImage, deleteImage, getImages } from '../utils/imageKit';
import {
  ListFileResponse,
  UploadResponse,
} from 'imagekit/dist/libs/interfaces';

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
      const response = await addImage(
        file,
        `${title}-${expense}`,
        'expense-tracker',
        `${title}, ${expense}`
      );
      if (!(response as UploadResponse).url) {
        return Promise.reject({
          result: '',
          errors: ['Something went wrong'],
        });
      }
      fileUrl = (response as UploadResponse).url;
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
      payload,
      errors: [],
    });
  }

  async updateRow(
    docId: string,
    id: number,
    title?: string,
    expense?: string,
    file?: string,
    resSheetName?: string,
    ShouldAddToNextMonth?: string
  ): Promise<ReturnObject> {
    const doc = await getDoc(docId);
    let fileId = '';
    let fileUrl = '';

    const { sheet } = await getSheet(doc, resSheetName);

    if (!sheet) {
      return Promise.reject({
        result: '',
        errors: ['Something went wrong'],
      });
    }

    const rows = await sheet.getRows();
    const row = rows[id];

    if (file) {
      const response = await getImages(`${row.Title}, ${row.Expense}`);
      if (!(response as ListFileResponse[])[0].url) {
        return Promise.reject({
          result: '',
          errors: ['Something went wrong'],
        });
      }
      fileId = (response as ListFileResponse[])[0].fileId;
    }

    if (fileId && file) {
      await deleteImage(fileId);

      const response = await addImage(
        file,
        `${title || row.Title}-${expense || row.Expense}`,
        'expense-tracker',
        `${title || row.Title}, ${expense || row.Expense}`
      );
      if (!(response as UploadResponse).url) {
        return Promise.reject({
          result: '',
          errors: ['Something went wrong'],
        });
      }
      fileUrl = (response as UploadResponse).url;
    }

    row.Title = title || row.Title;
    row.Expense = expense || row.Expense;
    row.File = fileUrl || row.File;
    row.ShouldAddToNextMonth = ShouldAddToNextMonth || row.ShouldAddToNextMonth;
    row.UpdatedAt = new Date().toLocaleDateString();
    await row.save();

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
    let fileId = '';

    const { sheet } = await getSheet(doc, resSheetName);

    if (!sheet) {
      return Promise.reject({
        result: '',
        errors: ['Something went wrong'],
      });
    }

    const rows = await sheet.getRows();
    const row = rows[id];

    const response = await getImages(`${row.Title}, ${row.Expense}`);
    if (!(response as ListFileResponse[])[0].url) {
      return Promise.reject({
        result: '',
        errors: ['Something went wrong'],
      });
    }
    fileId = (response as ListFileResponse[])[0].fileId;

    if (!fileId) {
      return Promise.reject({
        result: '',
        errors: ['Something went wrong'],
      });
    }
    await deleteImage(fileId);

    await row.delete();

    L.info(`delete the row with id ${id}`);
    return Promise.resolve({
      result: 'Ok',
      errors: [],
    });
  }
}

export default new SheetsService();
