const Condition = require('../models/condition.model');


async function getAllConditions(req,res) {
    try{

        const conditions = await Condition.getConditions();

        res.status(200).json(conditions);

    }
    catch(err){
        res.status(500).json({message:"Hiba az állapotok lekérdezése közben!"});
    }
}

async function deleteCondition(req, res) {
    try {
        const id = parseInt(req.params.id);

        const deleted = await Condition.deleteCondition(id);

        res.status(200).json({message:`Sikeres törlés: ${deleted} id`});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a törlés közben!" });
    }

}

async function updateCondition(req, res) {
    try {
        
        const condition = req.body;

        if(!condition.id||!condition.allapot){
            return res.status(400).json({message:"Hiányzó bemeneti adatok!"});
        }

        const updated = await Condition.updateCondition(condition);

        res.status(200).json({message:`Sikeres törlés: ${updated} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a frissítés közben!" });
    }

}

async function createCondition(req, res) {
    try {
        
        const condition = req.body;

        if(!condition.allapot){
            return res.status(400).json({message:"Hiányzó bemeneti adat!"});
        }

        const created = await Condition.createCondition(condition);

        res.status(200).json({message:`Sikeres létrehozás: ${created} `});

    }
    catch (err) {
        res.status(500).json({ message: "Hiba a létrehozás közben!" });
    }

}

module.exports = {getAllConditions,deleteCondition,updateCondition,createCondition};