const request = require('supertest');
const app = require('../app'); 


describe('User végpontok tesztelése', () => {
  let token;


  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@example.com', 
        jelszo: 'AdminPass123'
      });
    token = res.body.token;
  });

  it('összes felhasználó lekérése', async () => {
    const res = await request(app)
      .get('/user/getAll')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});