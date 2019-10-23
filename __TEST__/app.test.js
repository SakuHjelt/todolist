const request = require('supertest');
const app = require('../app')


test("POST to /api/data succesfully creates a data entry", (done) => {
  return request(app)
    .post("/api/data").send({title:'Otsikko', desc: 'Tämä on description'})
    .expect('Location', /data\/\d+$/)
    .then(response => {
      expect(response.statusCode).toBe(201);
      done();
  });
});

test("/api/data should return data (statuscode 200)", () => {
  return request(app)
    .get('/api/data').then(response => {
      expect(response.statusCode).toBe(200);
  });
});