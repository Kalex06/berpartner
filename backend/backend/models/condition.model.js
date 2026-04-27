const pool = require('../config/db');


async function getConditions() {
    const [rows] = await pool.execute(
        'SELECT * FROM allapotok'
    );
    return rows;
}

async function deleteCondition(id) {
  const [rows] = await pool.execute(
    'DELETE FROM allapotok WHERE allapotok.id = ?',
    [id]
  );
  return rows.affectedRows;
}

async function updateCondition(data) {
  const {id,allapot} = data;
  const [rows] = await pool.execute(
    'UPDATE allapotok SET allapot = ? WHERE allapotok.id = ?',
    [allapot,id]
  );
  return rows.affectedRows;
}


async function createCondition(data) {
  const {allapot} = data;
  const [rows] = await pool.execute(
    'INSERT INTO allapotok (allapot) VALUES (?)',
    [allapot]
  );
  return rows.affectedRows;
}



module.exports = {getConditions,deleteCondition,createCondition,updateCondition};