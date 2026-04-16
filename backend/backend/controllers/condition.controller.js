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

module.exports = {getAllConditions};