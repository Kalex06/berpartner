const Category = require('../models/category.model');


async function getAllcategory(req, res) {
    try {

        const mainCategory = await Category.getMainCategories();

        for (let fo_kategoriak of mainCategory) {
            fo_kategoriak.kategoriak = await Category.getOneTypeCategory(fo_kategoriak.id);
        }

        res.json(mainCategory);
    }
    catch (err) {
        res.status(500).json({ message: "Hiba a lekérdezés közben!" });
    }

}



async function getCategory(req, res) {
    try {
        const mainCategory_id = parseInt(req.params.id);

        const categories = await Category.getOneTypeCategory(mainCategory_id);

        res.json(categories);


    }
    catch (err) {
        res.status(500).json({ message: "Hiba a lekérdezés közben!" });
    }


}


async function getMaincategory(req, res) {
    try {
        const mainCategories = await Category.getMainCategories();

        res.json(mainCategories);

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a lekérdezés közben!" });
    }

}

async function deleteMaincategory(req, res) {
    try {
        const id = parseInt(req.params.id);

        const deleted = await Category.deleteMainCategory(id);

        res.status(200).json({message:`Sikeres törlés: ${deleted} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a törlés közben!" });
    }

}

async function updateMaincategory(req, res) {
    try {
        
        const mainCategory = req.body;

        if(!mainCategory.id||!mainCategory.fo_kategoria){
            return res.status(400).json({message:"Hiányzó bemeneti adatok!"});
        }

        const updated = await Category.updateMainCategory(mainCategory);

        res.status(200).json({message:`Sikeres törlés: ${updated} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a frissítés közben!" });
    }

}

async function createMaincategory(req, res) {
    try {
        
        const mainCategory = req.body;

        if(!mainCategory.fo_kategoria){
            return res.status(400).json({message:"Hiányzó bemeneti adatok!"});
        }

        const created = await Category.createMainCategory(mainCategory);

        res.status(200).json({message:`Sikeres létrehozás: ${created} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a létrehozás közben!" });
    }

}


async function deletecategory(req, res) {
    try {
        const id = parseInt(req.params.id);

        const deleted = await Category.deleteCategory(id);

        res.status(200).json({message:`Sikeres törlés: ${deleted} id`});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a törlés közben!" });
    }

}

async function updatecategory(req, res) {
    try {
        
        const category = req.body;

        if(!category.id||!category.kategoria){
            return res.status(400).json({message:"Hiányzó bemeneti adatok!"});
        }

        const updated = await Category.updateCategory(category);

        res.status(200).json({message:`Sikeres törlés: ${updated} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a frissítés közben!" });
    }

}


async function createcategory(req, res) {
    try {
        
        const category = req.body;

        if(!category.fo_kategoriaId||!category.kategoria){
            return res.status(400).json({message:"Hiányzó bemeneti adatok!"});
        }

        const created = await Category.createCategory(category);

        res.status(200).json({message:`Sikeres létrehozás: ${created} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a létrehozás közben!" });
    }

}



module.exports = { getAllcategory, getMaincategory, getCategory,deleteMaincategory,deletecategory,updatecategory,updateMaincategory,createcategory,createMaincategory}