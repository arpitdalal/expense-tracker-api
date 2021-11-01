import 'mocha';
import request from 'supertest';

import Server from '../server';

const sheetId = '120LwrLFrFqafIWEFno2hGUBFn-y7mGIL0A2MADfMo48';

describe('[v2] Sheets', () => {
  it('[v2] should create a sheet', (done) => {
    request(Server)
      .post(`/api/v2/sheets/${sheetId}`)
      .set('Accept', 'application/json')
      .send({ resSheetName: 'TestSheet' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(() => done())
      .catch(done);
  });
  it('[v2] should delete a sheet', (done) => {
    request(Server)
      .delete(`/api/v2/sheets/${sheetId}`)
      .set('Accept', 'application/json')
      .send({ resSheetName: 'TestSheet' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => done())
      .catch(done);
  });
});
