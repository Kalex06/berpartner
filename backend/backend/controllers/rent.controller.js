const Rent = require('../models/rent.model');


async function uploadRent(req,res) {

    try {
        
        req.body.berlo_id = req.user.id;

        const data = req.body;

        const id = await Rent.uploadRentRequest(data);

        res.status(200).json({message:"Kérés feltöltve! id:",id})
    } catch (err) {
        res.status(500).json({message:"Hiba a bérlés leadásakor!"});
    }
    
}


module.exports = {uploadRent}