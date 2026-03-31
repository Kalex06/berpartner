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

        const ItemRentesDates = await Rent.getRentsDateByItem(rentData.eszkoz_id);

        if(ItemRentesDates){

           const isReserved = ItemRentesDates.some(range=>{
               return (new Date(rentData.datum_tol).getTime() >= new Date(range.datum_tol).getTime() && new Date(rentData.datum_ig).getTime() <= new Date(range.datum_ig).getTime()) ||
               (new Date(rentData.datum_tol).getTime() <= new Date(range.datum_tol).getTime() && new Date(rentData.datum_ig).getTime() >= new Date(range.datum_ig).getTime())
            });

            if(isReserved){
              return res.status(409).json({message:"Az általad kiválasztott időszak már foglalt!"});
            }
        }


        const id = await Rent.uploadRentRequest(connection,rentData);

        
        const messageData = {
            felado_id:req.user.id,
            cimzett_id:req.body.tulajdonos_id,
            berles_id:id,
            cim: null,
            tartalom: null,
            tipus: 'request',
            statusz:'pending'
        };


       

        const savedmassage = await Message.createMessage(messageData,connection);
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

async function getMyRents(req,res) {
        try{
            const rents = await Rent.getAllRentsByOwner(req.user.id);
            res.status(200).json(rents)
        }
        catch(err){
            console.log(err)
             res.status(500).json({message:"Hiba a bérlés(ek) lekérdezésekor!"});
        }

}

async function getRentsDateByItemId(req,res) {
        try{
            const rents = await Rent.getRentsDateByItem(Number(req.params.id));
            res.status(200).json(rents)
        }
        catch(err){
            console.log(err)
             res.status(500).json({message:"Hiba a bérlés(ek) lekérdezésekor!"});
        }

}




module.exports = {uploadRent,getMyRents,getRentsDateByItemId}