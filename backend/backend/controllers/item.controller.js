const Item = require('../models/item.model');
const pool = require('../config/db');
const fs = require('fs').promises;
const path = require('path');


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
            allapot:Number(allapot),
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
        res.status(201).json({message:`Sikeres feltöltés! Adat Id: ${savedItemid}  Képek száma: ${savedPic}`});
    }
    catch(err){
            await connection.rollback();
            console.log(err);
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


async function putItem(req,res) {
    const connection = await pool.getConnection();
    try{
    await connection.beginTransaction();
    const id = Number(req.body.id);
    const {name,category,price_per_day,condition,description} = req.body;

    if(!name||!category||!price_per_day||!condition||!description){
        return  res.status(404).json({message:"Hiányosan megadott adatok!"});
    }

    const item = await Item.getItemById(id);
    if(item.tulajdonos_id!==req.user.id && req.user.jogosultsag!=='admin'){
        return res.status(403).json({message:"Nincs jogosultságod ehhez!"});
    }


    const pictures = [];
        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];
            pictures.push([
                id,
                element.filename
            ]);
        };
        let savedPic = 0;
        let deletePic = 0;
        if(pictures.length>0){
             savedPic = await Item.uploadpictures(connection,pictures);
        }

        
        const newDetail = {
            name: req.body.name,
            category: req.body.category,
            price_per_day: req.body.price_per_day,
            condition: Number(req.body.condition),
            description: req.body.description
        };
        
        const row = await Item.updateItemById(connection,id,newDetail);
        
    await connection.commit();

       const delImges = req.body.deletedImages.split(',');
        console.log(delImges)
    
        if(delImges.length>0){
             deletePic = await Item.deletepictures(connection,delImges);;
            
        for (let index = 0; index < delImges.length; index++) {
            try{
                const filePath = path.join(__dirname,'..','upload','items_picture',delImges[index]);
                console.log(filePath);
                await fs.unlink(filePath);
            }
            catch(fileErr){
                console.log(fileErr);
            }
        
            
        }
    }

      if(row===0){
       return res.status(200).json({message:"Nem történt módosítás!"});
      }


       res.status(200).json({message:`Sikeres módosítás! \n${savedPic} - mentett kép\n${deletePic} - törölt kép`});

    }
    catch(err){
        await connection.rollback();
        console.log(err);
        res.status(500).json({message:"Hiba az eszköz módosítása közben!"});
    }
    finally{
        connection.release();
    }

}


async function deleteItem(req,res) {
    try{

        const id = req.params.id;

        if(!id){
            return res.status(404).json({message:"Hiányos ID!"});
        }

        const match = await Item.getItemById(id);

        if(!match.tulajdonos_id==req.user.id && req.user.jogosultsag != "admin"){
            return res.status(403).json({ message: 'Nincs jogosultságod törölni ezt a bejegyzést' });
        }


        const pictures = await Item.getItemPicById(id);

        
        for (let index = 0; index < pictures.length; index++) {
            try{
                const filePath = path.join(__dirname,'..','upload','items_picture',pictures[index].kep_nev);
                console.log(filePath);
                await fs.unlink(filePath);
            }
            catch(fileErr){
                return res.status(404).json({message:"Hiba a képek törlésekor! ",fileErr});
            }
        
            
        }
    


        const row = await Item.deleteItemById(id);

      if(row===0){
       return res.status(404).json({message:"Nem történt törlés!"});
      }

       res.status(200).json({message:"Sikeres módosítás!"});

    }
    catch(err){
        
        res.status(500).json({message:"Hiba az eszköz törlése közben!"});
    }
    
}




module.exports = {uploadItem,getAllItem,getItemById,getItemsByOwner,searchItems,putItem,deleteItem};