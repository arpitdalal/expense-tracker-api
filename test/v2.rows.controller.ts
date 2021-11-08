import 'mocha';
import request from 'supertest';

import Server from '../server';

const sheetId = '120LwrLFrFqafIWEFno2hGUBFn-y7mGIL0A2MADfMo48';

describe('[v2] Rows', () => {
  it('[v2] should insert a row', (done) => {
    request(Server)
      .post(`/api/v2/sheets/${sheetId}/row`)
      .set('Accept', 'application/json')
      .send({ title: 'Test', expense: '40' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should update a row with title and expense', (done) => {
    request(Server)
      .patch(`/api/v2/sheets/${sheetId}/row`)
      .send({ id: 0, title: 'test1', expense: '-40' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should update a row with only title', (done) => {
    request(Server)
      .patch(`/api/v2/sheets/${sheetId}/row`)
      .send({ id: 0, title: 'test2' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should update a row with only expense', (done) => {
    request(Server)
      .patch(`/api/v2/sheets/${sheetId}/row`)
      .send({ id: 0, expense: '10' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should delete a row', (done) => {
    request(Server)
      .delete(`/api/v2/sheets/${sheetId}/row`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ id: 0 })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should insert a preset row', (done) => {
    request(Server)
      .post(`/api/v2/sheets/${sheetId}/row`)
      .set('Accept', 'application/json')
      .send({
        resSheetName: 'Presets',
        title: 'Test',
        expense: '40',
        ShouldAddToNextMonth: '1',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should update a preset row with only ShouldAddToNextMonth', (done) => {
    request(Server)
      .patch(`/api/v2/sheets/${sheetId}/row`)
      .send({ resSheetName: 'Presets', id: 0, ShouldAddToNextMonth: '0' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should delete a preset row', (done) => {
    request(Server)
      .delete(`/api/v2/sheets/${sheetId}/row`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ resSheetName: 'Presets', id: 0 })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
});
