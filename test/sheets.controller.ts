import 'mocha';
import request from 'supertest';

import Server from '../server';

const sheetId = '120LwrLFrFqafIWEFno2hGUBFn-y7mGIL0A2MADfMo48';

describe('Sheets', () => {
  it('should insert a row', (done) => {
    request(Server)
      .post(`/api/v1/sheets/${sheetId}`)
      .set('Accept', 'application/json')
      .send({ title: 'Test', expense: '40' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(() => done())
      .catch(done);
  });
  it('should update a row with title and expense', (done) => {
    request(Server)
      .patch(`/api/v1/sheets/${sheetId}`)
      .send({ id: 0, title: 'test1', expense: '-40' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('should update a row with only title', (done) => {
    request(Server)
      .patch(`/api/v1/sheets/${sheetId}`)
      .send({ id: 0, title: 'test2' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('should update a row with only expense', (done) => {
    request(Server)
      .patch(`/api/v1/sheets/${sheetId}`)
      .send({ id: 0, expense: '10' })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
  it('should delete a row', (done) => {
    request(Server)
      .delete(`/api/v1/sheets/${sheetId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ id: 0 })
      .expect(200)
      .then(() => done())
      .catch(done);
  });
});
