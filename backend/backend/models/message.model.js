const pool = require('../config/db');


async function createMessage(pool,data) {
    const {felado_id,cimzett_id,berles_id,cim,tartalom,tipus} = data;
    const [row] = await pool.execute(
        'INSERT INTO uzenetek (felado_id,cimzett_id,berles_id,cim,tartalom,tipus) VALUES (?, ?,?, ?, ?, ?)',
        [felado_id,cimzett_id,berles_id,cim,tartalom,tipus]
    );
    return row.insertId;
}


async function getAllMessageByOwner(id) {
    const[row] = await pool.execute(
    'SELECT * FROM uzenetek WHERE uzenetek.cimzett_id = (?) ORDER BY uzenetek.letrehozva_ekkor DESC',
    [id]
    );
    return row
}





module.exports = {createMessage,getAllMessageByOwner};