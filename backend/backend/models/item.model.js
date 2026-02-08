const pool = require('../config/db');



async function uploadpictures(pool,data) {
    const [rows] = await pool.query(
        'INSERT INTO eszkoz_kepek (eszkoz_id,kep_nev) VALUES ?',
        [data]
    );
     return rows.affectedRows;
    
 }

 async function uploadItem(pool,data) {
    const {nev,kategoria_id,ar_egy_napra,allapot,leiras,tulajdonos_id} = data;
    const [rows] = await pool.execute(
        'INSERT INTO eszkozok (nev,kategoria_id,ar_egy_napra,allapot,leiras,tulajdonos_id) VALUES (?,?,?,?,?,?)',
        [nev,kategoria_id,ar_egy_napra,allapot,leiras,tulajdonos_id]
    );
    return rows.insertId;
 }

 async function getAllItem(){
    const [rows] = await pool.execute(
        `SELECT eszkozok.id,eszkozok.nev,eszkozok.ar_egy_napra,eszkozok.allapot,eszkozok.leiras,felhasznalok.varos,eszkozok.tulajdonos_id,eszkoz_kepek.kep_nev,kategoriak.kategoria 
        FROM eszkozok,eszkoz_kepek,kategoriak,felhasznalok  
        WHERE eszkoz_kepek.eszkoz_id = eszkozok.id AND kategoriak.id = eszkozok.kategoria_id AND eszkozok.tulajdonos_id = felhasznalok.id 
        GROUP BY eszkozok.id`
    );
    return rows
 }

async function getItemById(id) {
  const [rows] = await pool.execute(
    `SELECT eszkozok.nev,eszkozok.ar_egy_napra,eszkozok.allapot,eszkozok.leiras,eszkozok.tulajdonos_id,kategoriak.kategoria,felhasznalok.nev AS felhasznalonev,felhasznalok.telefonszam,felhasznalok.email,felhasznalok.varos,felhasznalok.iranyitoszam 
    FROM eszkozok,kategoriak,felhasznalok  
    WHERE kategoriak.id = eszkozok.kategoria_id AND eszkozok.tulajdonos_id = felhasznalok.id AND eszkozok.id = (?)
    GROUP BY eszkozok.id`,
    [id]
  );
  return rows[0];
}



module.exports = {uploadpictures,uploadItem,getAllItem,getItemById}