const pool = require('../config/db');


async function createMessage(data, connection = null) {
    const { felado_id, cimzett_id, berles_id, cim, tartalom, tipus, statusz } = data;
    const executor = connection || pool;
    const [row] = await executor.execute(
        'INSERT INTO uzenetek (felado_id,cimzett_id,berles_id,cim,tartalom,tipus,statusz) VALUES (?, ?,?, ?, ?, ?, ?)',
        [felado_id, cimzett_id, berles_id, cim, tartalom, tipus, statusz || null]
    );
    return row.insertId;
}


async function getAllMessageByOwner(type, id) {
    const [row] = await pool.execute(
        `SELECT * FROM uzenetek WHERE uzenetek.cimzett_id = (?) AND ${type} ORDER BY uzenetek.letrehozva_ekkor DESC`,
        [id]
    );
    return row;
}



async function updateRequestStatusById(status, id, connection = null) {
    const executor = connection || pool;
    const [row] = await executor.execute(
        'UPDATE uzenetek set statusz = ? WHERE uzenetek.id = ?',
        [status, id]
    );
    return row.affectedRows;

}


async function getIsOpenedByOwnerId(id) {
    const [row] = await pool.execute(
        'SELECT COUNT(uzenetek.megnyitva) AS unread_count FROM uzenetek WHERE uzenetek.cimzett_id = (?) AND uzenetek.megnyitva = FALSE',
        [id]
    );
    return row[0];
}

async function updateAllIsOpenedValueByOwner(id) {
    const [row] = await pool.execute(
        'UPDATE uzenetek set megnyitva = TRUE WHERE uzenetek.cimzett_id = ?',
        [id]
    );
    return row.affectedRows;


}


async function sendMessageForEveryOne(data) {
    const {cim,tartalom} = data;
    const [row] = await pool.execute(
        `INSERT INTO uzenetek (felado_id, cimzett_id, berles_id, cim, tartalom, tipus)
        SELECT null, id, null, ?, ?,'message'
        FROM felhasznalok;`,
        [cim,tartalom]
    );
    return row.affectedRows;
}





module.exports = { createMessage, getAllMessageByOwner, updateRequestStatusById, getIsOpenedByOwnerId, updateAllIsOpenedValueByOwner ,sendMessageForEveryOne};