const pool = require('../config/db');


async function getConditions() {
    const [rows] = await pool.execute(
        'SELECT * FROM allapotok'
    );
    return rows;
}

module.exports = {getConditions};