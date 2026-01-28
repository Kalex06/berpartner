const pool = require('../config/db');



async function uploadpictures(item_id,path) {
    const [rows] = await pool.execute(
        'INSERT INTO termek_kepek (eszkoz_id,eleresi_ut) VALUES (?,?)',
        [item_id,path]
    );
 }


module.exports = {uploadpictures}