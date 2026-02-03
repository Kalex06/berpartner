const pool = require('../config/db');



async function uploadpictures(data) {
    const [rows] = await pool.query(
        'INSERT INTO eszkoz_kepek (eszkoz_id,eleresi_ut) VALUES (?)',
        [data]
    );
     return rows.fieldCount;
    
 }

 async function uploadItem(data) {
    const {nev,kategoria_id,ar_egy_napra,allapot,leiras,tulajdonos_id} = data;
    const [rows] = await pool.execute(
        'INSERT INTO eszkozok (nev,kategoria_id,ar_egy_napra,allapot,leiras,tulajdonos_id) VALUES (?,?,?,?,?,?)',
        [nev,kategoria_id,ar_egy_napra,allapot,leiras,tulajdonos_id]
    );
    return rows.fieldCount;
 }





module.exports = {uploadpictures,uploadItem}