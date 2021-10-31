import express from 'express';

import controller from './controller';

export default express
  .Router()
  .post('/:sheetId', controller.create)
  .patch('/:sheetId', controller.patch)
  .delete('/:sheetId', controller.delete)
  .post('/:sheetId/add-month', controller.createMonth)
  .delete('/:sheetId/delete-month', controller.deleteMonth);
