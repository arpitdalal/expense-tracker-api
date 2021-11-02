import SheetsService from '../../services/sheets.service';
import { Request, Response } from 'express';

type createSheetBody = {
  resSheetName: string;
};

type deleteSheetBody = {
  resSheetName: string;
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
}
export default new Controller();
