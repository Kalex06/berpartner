const Category = require('../models/category.model');


async function getAllcategory(req,res){
    try{

        const mainCategory = await Category.getMainCategories();

       

        

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



async function getCategory(req,res){
    try{


        const mainCategory_id = parseInt(req.params.id);


        const categories = await Category.getOneTypeCategory(mainCategory_id);


        

        res.json(categories);


    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben!"});
    }


}


async function getMaincategory(req,res){
    try{

        const mainCategories= await Category.getMainCategories();


        

        res.json(mainCategories);


    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben!"});
    }

}



module.exports = {getAllcategory,getMaincategory,getCategory}