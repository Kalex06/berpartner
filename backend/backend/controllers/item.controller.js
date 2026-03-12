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
            await connection.rollback();
            res.status(500).json({message:"Hiba feltöltés közben",error: err.message });
    }
    finally{
        connection.release();
    }
}

async function getAllItem(req,res){
    try{

        const sortoptions = {
            "1" : "eszkozok.letrehozva_ekkor DESC",
            "2" : "eszkozok.ar_egy_napra DESC",
            "3" : "eszkozok.ar_egy_napra"
        }





        const category = req.query.category;
        const sort = sortoptions[req.query.sort] || sortoptions["1"];


    

        let items

        if(category)
        {
             items = await Item.getAllItem(sort,parseInt(category));

        }
        else{
            items = await Item.getAllItem(sort);
        }

        
        res.status(200).json(items);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }
    
    

}


async function searchItems(req,res) {

     try{

        const sortoptions = {
            "1" : "eszkozok.letrehozva_ekkor DESC",
            "2" : "eszkozok.ar_egy_napra DESC",
            "3" : "eszkozok.ar_egy_napra"
        }


        const sort = sortoptions[req.query.sort] || sortoptions["1"];


        const search = req.query.search || "";

            // console.log(search)

    

            const items = await Item.getItemBySearch(sort,search.trim());

        
        res.status(200).json(items || []);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }
    
    

    
}




async function getItemById(req,res){
    try{
        const id = parseInt(req.params.id);
        const item = await Item.getItemById(id);
        const pictures = await Item.getItemPicById(id);
        const item_data = {...item,kepek:pictures};

        
        
        if (!item) {
            return res.status(404).json({ message: 'Az eszköz nem található!' });
        }
        
        res.status(200).json(item_data);
    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }

}


async function getItemsByOwner(req,res){
    try{
        const id = parseInt(req.params.id);

        const item = await Item.getAllItemByOwnerId(id);

        
        if (!item) {
            return res.status(404).json({ message: 'Az eszközök nem találhatók!' });
        }

        res.status(200).json(item);
    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben"});
    }

}



module.exports = {uploadItem,getAllItem,getItemById,getItemsByOwner,searchItems};