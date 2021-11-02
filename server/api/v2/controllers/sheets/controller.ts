import SheetsService from '../../services/sheets.service';
import { Request, Response } from 'express';

type createSheetBody = {
  resSheetName: string;
};

type deleteSheetBody = {
  resSheetName: string;
};

type createRowBody = {
  title: string;
  expense: string;
  resSheetName?: string;
};

type patchRowBody = {
  id: number;
  title?: string;
  expense?: string;
  resSheetName?: string;
};

type deleteRowBody = {
  id: number;
  resSheetName?: string;
};

export class Controller {
  createSheet(req: Request, res: Response): void {
    const { resSheetName }: createSheetBody = req.body;
    SheetsService.createSheet(req.params['docId'], resSheetName)
      .then((r) => {
        if (r.result !== '') res.status(201).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  deleteSheet(req: Request, res: Response): void {
    const { resSheetName }: deleteSheetBody = req.body;
    SheetsService.deleteSheet(req.params['docId'], resSheetName)
      .then((r) => {
        if (r.result !== '') res.status(200).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  createRow(req: Request, res: Response): void {
    const { title, expense, resSheetName }: createRowBody = req.body;
    SheetsService.createRow(req.params['docId'], title, expense, resSheetName)
      .then((r) => {
        if (r.result !== '') res.status(201).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  updateRow(req: Request, res: Response): void {
    const { id, title, expense, resSheetName }: patchRowBody = req.body;
    SheetsService.updateRow(
      req.params['docId'],
      id,
      title,
      expense,
      resSheetName
    )
      .then((r) => {
        if (r.result !== '') res.status(200).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  deleteRow(req: Request, res: Response): void {
    const { id, resSheetName }: deleteRowBody = req.body;
    SheetsService.deleteRow(req.params['docId'], id, resSheetName)
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
