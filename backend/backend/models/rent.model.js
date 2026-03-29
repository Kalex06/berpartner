const pool = require('../config/db');



async function uploadRentRequest(pool,data) {
    const {eszkoz_id,berlo_id,tulajdonos_id,datum_tol,datum_ig} = data;
  const [rows] = await pool.execute(
    'INSERT INTO berlesek (eszkoz_id,berlo_id,tulajdonos_id,datum_tol,datum_ig) VALUES (?, ?, ?, ?, ?)',
    [eszkoz_id,berlo_id,tulajdonos_id,datum_tol,datum_ig]
  );
  return rows.insertId; 
}

async function findItemByRentId(id) {
  const [rows] = await pool.execute(
    'SELECT eszkozok.* FROM eszkozok JOIN berlesek on berlesek.eszkoz_id = eszkozok.id WHERE berlesek.id = ?;',
    [id]
  );
  return rows[0];
}

async function findRentById(id) {
  const [rows] = await pool.execute(
    'SELECT berlesek.* FROM  berlesek WHERE berlesek.id = ?;',
    [id]
  );
  return rows[0];
}


async function updateRentStatusById(status,id,connection=null) {
  const executor = connection||pool;
  const[rows] = await executor.execute(
        'UPDATE berlesek set statusz = ? WHERE berlesek.id = ?',
        [status,id]
    );
    return rows.affectedRows
}

async function getAllRentsByOwner(id) {
  const [rows] = await pool.execute(
    `SELECT eszkozok.*,berlesek.datum_tol,berlesek.datum_ig,felhasznalok.varos,eszkoz_kepek.kep_nev FROM eszkozok
    JOIN berlesek ON berlesek.eszkoz_id = eszkozok.id
    JOIN felhasznalok ON eszkozok.tulajdonos_id = felhasznalok.id
    JOIN eszkoz_kepek ON eszkoz_kepek.eszkoz_id = eszkozok.id
    WHERE berlesek.statusz = "accepted" AND eszkozok.tulajdonos_id = ?
    GROUP BY berlesek.id;`,
    [id]
  );
  return rows;
}


async function getRentsDateByItem(id) {
  const [rows] = await pool.execute(
    'SELECT berlesek.datum_tol, berlesek.datum_ig, berlesek.statusz FROM berlesek WHERE berlesek.eszkoz_id = ? AND NOT berlesek.statusz = "rejected"',
    [id]
  );
  return rows;
  
}







module.exports = {uploadRentRequest,findItemByRentId,updateRentStatusById,getAllRentsByOwner,findRentById,getRentsDateByItem}