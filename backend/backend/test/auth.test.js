const request = require('supertest');
const app = require('../app'); 


describe('Auth tesztek seed felhasználókal', () => {

  it('Sikeres bejelentkezés', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'tothbela@example.com',
        jelszo: 'ABC12345'     
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Sikertelen login rossz emailel', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'dwadwadad',
        jelszo: 'ABC12345'
      });

    expect(res.statusCode).toBe(401); 
  });

  it('Sikertelen login rossz jelszóval', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'tothbela@example.com',
        jelszo: 'awfawfwaf'
      });

    expect(res.statusCode).toBe(401); 
  });
});