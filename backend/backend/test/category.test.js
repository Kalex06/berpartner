const request = require('supertest');


jest.mock('../middleware/auth.middleware', () => (req, res, next) => {
    req.user = { id: 1, jogosultsag: 'admin' }; 
    next();
});

jest.mock('../middleware/admin.middleware', () => (req, res, next) => {
    next();
});

const db = require('../config/db');
jest.mock('../config/db');


const app = require('../app'); 
describe('Kategória műveletek tesztelése', () => {


  it('Új kategória létrehozása - mockolva', async () => {

    db.query.mockResolvedValue([{ affectedRows: 99 },null]); 
    db.execute = db.query; 
    
    const res = await request(app)
      .post('/category/sub/post')
      .set('Authorization', `Bearer Valami`)
      .send({fo_kategoriaId:2,kategoria:'Teszt Kategória' });

    expect(res.statusCode).toBe(201); 
    expect(db.query).toHaveBeenCalled();
  });
});
