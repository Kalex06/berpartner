const Category = require('../models/category.model');


async function getAllcategory(req,res){
    try{

        const mainCategory = await Category.getMainCategorys();

       

        

        for (let fo_kategoriak of mainCategory)
         {
                fo_kategoriak.kategoriak = await Category.getOneTypeCategory(fo_kategoriak.id);
            
        }

        

        res.json(mainCategory);


    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben!"});
    }

}


module.exports = {getAllcategory}