const pool = require('../config/db');
const { updateRequestStatusById } = require('./message.model');


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

async function updateRentStatusById(status,id,connection=null) {
  const executor = connection||pool;
  const[row] = await executor.execute(
        'UPDATE berlesek set statusz = ? WHERE berlesek.id = ?',
        [status,id]
    );
    return row.affectedRows
  
}

module.exports = {uploadRentRequest,findItemByRentId,updateRentStatusById}