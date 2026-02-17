const pool = require('../config/db');


async function uploadRentRequest(data) {
    const {eszkoz_id,berlo_id,tulajdonos_id,datum_tol,datum_ig} = data;
  const [rows] = await pool.execute(
    'INSERT INTO berlesek (eszkoz_id,berlo_id,tulajdonos_id,datum_tol,datum_ig) VALUES (?, ?, ?, ?, ?)',
    [eszkoz_id,berlo_id,tulajdonos_id,datum_tol,datum_ig]
  );
  return rows.insertId; 
}

module.exports = {uploadRentRequest}