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

 async function getAllItem(sort,category=""){
   if(category!=""){
    category = `AND eszkozok.kategoria_id=${category}`;
   }
    const [rows] = await pool.execute(
        `SELECT eszkozok.id,eszkozok.nev,eszkozok.ar_egy_napra,eszkozok.allapot,eszkozok.leiras,felhasznalok.varos,eszkozok.tulajdonos_id,eszkoz_kepek.kep_nev,kategoriak.kategoria 
        FROM eszkozok,eszkoz_kepek,kategoriak,felhasznalok  
        WHERE eszkoz_kepek.eszkoz_id = eszkozok.id AND kategoriak.id = eszkozok.kategoria_id AND eszkozok.tulajdonos_id = felhasznalok.id ${category}
        GROUP BY eszkozok.id
        ORDER BY ${sort}`
     
    );
    return rows
 }

async function getItemById(id) {
  const [rows] = await pool.execute(
    `SELECT eszkozok.*,kategoriak.kategoria,felhasznalok.nev AS felhasznalonev,felhasznalok.telefonszam,felhasznalok.email,felhasznalok.varos,felhasznalok.iranyitoszam 
    FROM eszkozok,kategoriak,felhasznalok  
    WHERE kategoriak.id = eszkozok.kategoria_id AND eszkozok.tulajdonos_id = felhasznalok.id AND eszkozok.id = (?)
    ORDER BY eszkozok.id`,
    [id]
  );
  return rows[0];
}


 async function getAllItemByOwnerId(id){
    const [rows] = await pool.execute(
        `SELECT eszkozok.id,eszkozok.nev,eszkozok.ar_egy_napra,eszkozok.allapot,eszkozok.leiras,felhasznalok.varos,eszkozok.tulajdonos_id,eszkoz_kepek.kep_nev,kategoriak.kategoria 
        FROM eszkozok,eszkoz_kepek,kategoriak,felhasznalok  
        WHERE eszkoz_kepek.eszkoz_id = eszkozok.id AND kategoriak.id = eszkozok.kategoria_id AND eszkozok.tulajdonos_id = felhasznalok.id AND felhasznalok.id = (?)
        GROUP BY eszkozok.id `,
        [id]
    );
    return rows
 }


 async function getItemPicById(id) {
     const [rows] = await pool.execute(
        'SELECT eszkoz_kepek.kep_nev FROM `eszkoz_kepek` WHERE eszkoz_kepek.eszkoz_id = ?',
        [id]
     );
     return rows
    
 }

 async function getItemBySearch(sort,search){
   
    const [rows] = await pool.execute(
        `SELECT eszkozok.id,eszkozok.nev,eszkozok.ar_egy_napra,eszkozok.allapot,eszkozok.leiras,felhasznalok.varos,eszkozok.tulajdonos_id,eszkoz_kepek.kep_nev,kategoriak.kategoria 
        FROM eszkozok,eszkoz_kepek,kategoriak,felhasznalok  
        WHERE eszkoz_kepek.eszkoz_id = eszkozok.id AND kategoriak.id = eszkozok.kategoria_id AND eszkozok.nev LIKE CONCAT('%', ?, '%')
        GROUP BY eszkozok.id
        ORDER BY ${sort}`,
        [search]
     
    );
    return rows
 }



 async function deleteItemById(id) {
        const [rows] = await pool.execute(
            'DELETE FROM eszkozok WHERE id= ?;',
            [id]
        );
        return rows.affectedRows;
 }


 async function updateItemById(id,data) {
        const {name,category,price_per_day,condition,description} = data;
        const [rows] = await pool.execute(
            'UPDATE eszkozok SET nev=?, kategoria_id=?, ar_egy_napra=?, allapot=?, leiras=? WHERE id=?;',
            [name,category,price_per_day,condition,description,id]
        );
        return rows.affectedRows;
 }


 

 
module.exports = {uploadpictures,uploadItem,getAllItem,getItemById,getAllItemByOwnerId,getItemPicById,getItemBySearch,deleteItemById,updateItemById}