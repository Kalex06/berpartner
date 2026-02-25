const Rent = require('../models/rent.model');
const Message = require('../models/message.model');
const pool = require('../config/db');


async function uploadRent(req,res) {
     const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        req.body.berlo_id = req.user.id;

        const rentData = {
            eszkoz_id:req.body.eszkoz_id,
            berlo_id:req.user.id,
            tulajdonos_id:req.body.tulajdonos_id,
            datum_tol:req.body.datum_tol,
            datum_ig:req.body.datum_ig

        };


        const id = await Rent.uploadRentRequest(connection,rentData);

        
        const messageData = {
            felado_id:req.user.id,
            cimzett_id:req.body.tulajdonos_id,
            berles_id:id,
            cim:"Bérlési kérelem",
            tartalom:"felhasználó bérlési kérelmet nyújtott be az alábbi termékedre:",
            tipus: 'request',
            statusz:'pending'
        };


       

        const savedmassage = await Message.createMessage(connection,messageData);
         await connection.commit(); 
        res.status(200).json({message:`Kérés feltöltve! id:${id} , üzenetId: ${savedmassage}`,})
    } catch (err) {
 
        await connection.rollback();
        res.status(500).json({message:"Hiba a bérlés leadásakor!"});
    }

    finally{
        connection.release();
    }
    
}


module.exports = {uploadRent}