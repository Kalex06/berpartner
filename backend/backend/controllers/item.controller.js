const Item = require('../models/item.model');
const pool = require('../config/db');
const Category = require('../models/category.model');

async function uploadItem(req,res){
     const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();


        const {kategoria} = req.body;
         const{nev,ar_egy_napra,allapot,leiras} = req.body;

        const categoryId = await Category.findCategory(kategoria);

       

        const itemData = {
            nev:nev,
            kategoria_id: categoryId.id,
            ar_egy_napra:Number(ar_egy_napra),
            allapot:allapot,
            leiras:leiras,
            tulajdonos_id: req.user.id
        };

       const savedItemid = await Item.uploadItem(connection,itemData);



        
        const pictures = [];
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];
            pictures.push([
                savedItemid,
                element.filename
            ]);


        };

      const savedPic = await Item.uploadpictures(connection,pictures);
        await connection.commit();
        res.status(200).json({message:`Sikeres feltöltés! Adat Id: ${savedItemid}  Képek száma: ${savedPic}`});
    }
    catch(err){
            res.status(500).json({message:"Hiba feltöltés közben",error: err.message });
    }
    finally{
        connection.release();
    }
}

module.exports = {uploadItem}