import express from 'express';

import controller from './controller';

export default express
  .Router()
  .post('/:docId', controller.createSheet)
  .delete('/:docId', controller.deleteSheet)
  .post('/:docId/row', controller.createRow)
  .patch('/:docId/row', controller.updateRow)
  .delete('/:docId/row', controller.deleteRow);
