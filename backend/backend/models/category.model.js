const pool = require('../config/db');

async function findCategory(name) {
  const [rows] = await pool.execute(
    'SELECT id FROM kategoriak WHERE kategoria = ?',
    [name]
  );
  return rows[0];
}


module.exports = {findCategory};