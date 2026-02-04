const Item = require('../models/item.model');
const Category = require('../models/category.model');

async function uploadItem(req,res){
    try{
        
        const {kategoria} = req.body;
         const{nev,ar_egy_napra,allapot,leiras} = req.body;

        const categoryId = await Category.findCategory(kategoria);

       

        const itemData = {
            nev:nev,
            kategoria_id:categoryId,
            ar_egy_napra:ar_egy_napra,
            allapot:allapot,
            leiras:leiras,
            tulajdonos_id: req.user.id
        };

       const savedItemdata = await Item.uploadItem(itemData);



        const {eszkoz_id} = req.body;
        const pictures = [];

        for (let index = 0; index < req.files.length; index++) {
            const element = req.files[index];
            pictures.push({
                eszkoz_id: eszkoz_id,
                eleresi_ut: element.filename
            });


        };

      const savedPic = await Item.uploadpictures(pictures);
        res.status(200).json({message:`Sikeres feltöltés! Adat: ${savedItemdata}  Képek: ${savedPic}`});
    }
    catch(err){
            res.status(500).json({message:"Hiba feltöltés közben"});
    }
}

module.exports = {uploadItem}