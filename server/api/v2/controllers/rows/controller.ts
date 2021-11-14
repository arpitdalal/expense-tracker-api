import RowsService from '../../services/rows.service';
import { Request, Response } from 'express';

type createRowBody = {
  title: string;
  expense: string;
  file?: string;
  resSheetName?: string;
  ShouldAddToNextMonth?: string;
};

type patchRowBody = {
  id: number;
  title?: string;
  expense?: string;
  resSheetName?: string;
  ShouldAddToNextMonth?: string;
};

type deleteRowBody = {
  id: number;
  resSheetName?: string;
};

export class Controller {
  createRow(req: Request, res: Response): void {
    const {
      title,
      expense,
      file,
      resSheetName,
      ShouldAddToNextMonth,
    }: createRowBody = req.body;
    RowsService.createRow(
      req.params['docId'],
      title,
      expense,
      file,
      resSheetName,
      ShouldAddToNextMonth
    )
      .then((r) => {
        if (r.result !== '') res.status(201).send(r);
        else res.status(404).send(r);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  updateRow(req: Request, res: Response): void {
    const {
      id,
      title,
      expense,
      resSheetName,
      ShouldAddToNextMonth,
    }: patchRowBody = req.body;
    RowsService.updateRow(
      req.params['docId'],
      id,
      title,
      expense,
      resSheetName,
      ShouldAddToNextMonth
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
    RowsService.deleteRow(req.params['docId'], id, resSheetName)
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
