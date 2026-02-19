const pool = require('../config/db');




 async function getAllUser() {
  const [rows] = await pool.execute(
    'SELECT * FROM felhasznalok'
  );
  return rows;
}

 async function findUserById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM felhasznalok WHERE id = ?',
    [id]
  );
  return rows[0];
}


 async function findUserByemail(email) {
  const [rows] = await pool.execute(
    'SELECT * FROM felhasznalok WHERE email = ?',
    [email]
  );
  return rows[0];
}


async function createUser(user) {
  const {nev,telefonszam,email, jelszo, jogosultsag,iranyitoszam, varos, utca,haz_szam } = user;
  const [rows] = await pool.execute(
    'INSERT INTO felhasznalok (nev,telefonszam,email, jelszo , jogosultsag,iranyitoszam, varos, utca,haz_szam) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nev,telefonszam,email, jelszo , jogosultsag,iranyitoszam, varos, utca,haz_szam]
  );
  return rows.insertId; 
}

async function updateUser(id, user) {
  const {nev,telefonszam,email, jelszo ,berelt_eszkozok_szama, jogosultsag, varos, utca,haz_szam} = user;
  const [rows] = await pool.execute(
    'UPDATE felhasznalok SET nev = ?,telefonszam = ?,email = ?,jelszo=?,berelt_eszkozok_szama=?,  jogosultsag = ?, varos=?, utca=?, haz_szam=? WHERE id = ?',
    [nev,telefonszam,email, jelszo ,berelt_eszkozok_szama, jogosultsag, varos, utca,haz_szam, id]
  );
  return rows.affectedRows; 
}


module.exports = {getAllUser,findUserById,findUserByemail,createUser,updateUser};