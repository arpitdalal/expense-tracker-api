import SheetsService from '../../services/sheets.service';
import { Request, Response } from 'express';

type createBody = {
  title: string;
  expense: string;
  resSheetName?: string;
};

type patchBody = {
  id: number;
  title?: string;
  expense?: string;
  resSheetName?: string;
};

type deleteBody = {
  id: number;
  resSheetName?: string;
};

export class Controller {
  create(req: Request, res: Response): void {
    const { title, expense, resSheetName }: createBody = req.body;
    SheetsService.create(req.params['sheetId'], title, expense, resSheetName)
      .then((r) => {
        if (r.result !== '') res.status(201).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  patch(req: Request, res: Response): void {
    const { id, title, expense, resSheetName }: patchBody = req.body;
    SheetsService.patch(req.params['sheetId'], id, title, expense, resSheetName)
      .then((r) => {
        if (r.result !== '') res.status(200).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  delete(req: Request, res: Response): void {
    const { id, resSheetName }: deleteBody = req.body;
    SheetsService.delete(req.params['sheetId'], id, resSheetName)
      .then((r) => {
        if (r.result !== '') res.status(200).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
}
export default new Controller();
