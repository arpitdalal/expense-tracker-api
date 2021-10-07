import SheetsService from '../../services/sheets.service';
import { Request, Response } from 'express';

type createBody = {
  title: string;
  expense: number;
};

type patchBody = {
  id: number;
  title?: string;
  expense?: number;
};

type deleteBody = {
  id: number;
};

export class Controller {
  create(req: Request, res: Response): void {
    const { title, expense }: createBody = req.body;
    SheetsService.create(req.params['sheetId'], title, expense)
      .then((r) => {
        if (r.result !== '') res.status(201).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  patch(req: Request, res: Response): void {
    const body: patchBody = req.body;
    SheetsService.patch(
      req.params['sheetId'],
      body.id,
      body.title,
      body.expense
    )
      .then((r) => {
        if (r.result !== '') res.status(200).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  delete(req: Request, res: Response): void {
    const { id }: deleteBody = req.body;
    SheetsService.delete(req.params['sheetId'], id)
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
