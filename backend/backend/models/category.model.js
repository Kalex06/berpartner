const pool = require('../config/db');

async function findCategory(name) {
  const [rows] = await pool.execute(
    'SELECT id FROM kategoriak WHERE kategoria = ?',
    [name]
  );
  return rows[0];
}

async function getOneTypeCategory(id) {
  const [rows] = await pool.execute(
    'SELECT id,kategoria FROM kategoriak WHERE kategoriak.fo_kategoriaId=?',
    [id]
  );
  return rows;
}


async function getMainCategorys() {
  const [rows] = await pool.execute(
    'SELECT * FROM foKategoriak'
  );
  return rows;
}

module.exports = {findCategory,getOneTypeCategory,getMainCategorys};
