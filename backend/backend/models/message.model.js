const pool = require('../config/db');


async function createMessage(data) {
    const {felado_id,cimzett_id,cim,tartalom,tipus} = data;
    const [row] = await pool.execute(
        'INSERT INTO uzenetek (felado_id,cimzett_id,cim,tartalom,tipus) VALUES (?, ?, ?, ?, ?)',
        [felado_id,cimzett_id,cim,tartalom,tipus]
    );
    return row.insertId;
}

module.exports = {createMessage};