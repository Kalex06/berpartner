const Item = require('../models/item.model');
const pool = require('../config/db');


async function uploadItem(req,res){
     const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();


        const {kategoria} = req.body;
         const{nev,ar_egy_napra,allapot,leiras} = req.body;

       

       

        const itemData = {
            nev:nev,
            kategoria_id: Number(kategoria),
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

async function getAllItem(req,res){
    try{
        const items = await Item.getAllItem();
        res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }
    
    

}

async function getItemById(req,res){
    try{
        const id = parseInt(req.params.id);
        const item = await Item.getItemById(id);
        res.status(200).json(item);
        if (!item) {
            return res.status(404).json({ message: 'Az eszköz nem található!' });
        }

    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }

}


async function getItemsByOwner(req,res){
    try{
        const id = parseInt(req.params.id);

        const item = await Item.getAllItemByOwnerId(id);

        res.status(200).json(item);
        if (!item) {
            return res.status(404).json({ message: 'Az eszközök nem találhatók!' });
        }

    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }

}



module.exports = {uploadItem,getAllItem,getItemById,getItemsByOwner};