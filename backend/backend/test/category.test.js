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

  it('Egy típusú kategoria lekérdezése - mockolva',async()=>{
     db.query.mockResolvedValue([{id:1,kategoria:"Építőipari & gépi szerszámok"}]);
     
      db.execute = db.query; 
    
    const res = await request(app)
      .get('/category/sub/1')
      .set('Authorization', `Bearer Valami`);

    expect(res.statusCode).toBe(200); 
    expect(db.query).toHaveBeenCalled();
  })

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
