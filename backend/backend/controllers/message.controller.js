const Message = require('../models/message.model');
const User = require('../models/user.model');
const Rent = require('../models/rent.model');
const pool = require('../config/db');



async function getAllMessagesByOwner(req,res) {

    try{
        
        const message = await Message.getAllMessageByOwner(req.user.id);
     
        

        for (let msg of message)
        {
                const sender = await User.findUserById(msg.felado_id);
                const item = await Rent.findItemByRentId(msg.berles_id);

                msg.felado = sender.nev;
                msg.eszkoz = item.nev;
        }
       

            
    

        res.status(200).json(message)


    }
    
    catch(err){
        
             res.status(500).json({message:"Hiba a lekérdezés közben",error: err.message });
    }
    
    
}


async function messageAccept(req,res){
        const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const message = req.body

        const updatedRentRow = await Rent.updateRentStatusById('accepted',message.berles_id,connection);
        const updatedMessageRow = await Message.updateRequestStatusById('accepted',message.id,connection);

        console.log("frissítet sorok száma:",updatedRentRow, updatedMessageRow)
        
        await connection.commit(); 
        res.status(200).json({message:'Kérés elfogadva!'})
    }
    catch(err){
        await connection.rollback();
             res.status(500).json({message:"Hiba a kérés elfogadása közben!",error: err.message });
    }
    finally{
        connection.release();
    }
    
}

async function messageReject(req,res) {
      const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const message = req.body

        const updatedRentRow = await Rent.updateRentStatusById('accepted',message.berles_id,connection);
        const updatedMessageRow = await Message.updateRequestStatusById('accepted',message.id,connection);

        console.log("frissítet sorok száma:",updatedRentRow, updatedMessageRow)
        
        await connection.commit(); 
        res.status(200).json({message:'Kérés elutasítva!'})
    }
    catch(err){
        await connection.rollback();
             res.status(500).json({message:"Hiba a kérés elutasítása közben!",error: err.message });
    }
    finally{
        connection.release();
    }
    
}





module.exports = {getAllMessagesByOwner,messageAccept,messageReject};