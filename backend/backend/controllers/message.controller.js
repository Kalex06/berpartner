const Message = require('../models/message.model');
const User = require('../models/user.model');
const Rent = require('../models/rent.model');
const pool = require('../config/db');



async function getAllMessagesByOwner(req,res) {

    try{

        const typeOptions = {
            "all" : "1=1",
            "user" : "uzenetek.felado_id IS NOT NULL",
            "system" : "uzenetek.felado_id IS NULL"
        }


        const type = typeOptions[req.query.type] || typeOptions["all"];
        
        const message = await Message.getAllMessageByOwner(type,req.user.id);
     
        

        for (let msg of message)
        {
            if(msg.statusz!==null){
                const sender = await User.findUserById(msg.felado_id);
                const item = await Rent.findItemByRentId(msg.berles_id);
                const rent = await Rent.findRentById(msg.berles_id);

                msg.felado = sender.nev;
                msg.eszkoz = item.nev;
                msg.eszkoz_id = item.id;
                msg.datum_tol = rent.datum_tol;
                msg.datum_ig = rent.datum_ig;
            }
        }
    
   

     
        

            
    

        res.status(200).json(message)


    }
    
    catch(err){
            console.log(err)
             res.status(500).json({message:"Hiba a lekérdezés közben",error: err.message });
    }
    
    
}


async function messageAccept(req,res){
        const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const message = req.body;
        console.log(message);

        const updatedRentRow = await Rent.updateRentStatusById('accepted',message.berles_id,connection);
        const updatedMessageRow = await Message.updateRequestStatusById('accepted',message.id,connection);

        const answer_message = {
            felado_id: req.user.id,
            cimzett_id: message.felado_id, //azért mert visszaküldjük ezt, a felado_id itt a kérelmet küldő id-ja
            berles_id: message.berles_id,
            cim: null,
            tartalom: null,
            tipus:'message',
            statusz:'accepted'
        };

        const savedmassage = await Message.createMessage(answer_message,connection);

       //console.log("frissítet sorok száma:",updatedRentRow, updatedMessageRow);
        
        await connection.commit(); 
        res.status(200).json({message:'Kérés elfogadva! válaszüzenet id:',savedmassage});
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
        const message = req.body;

        const updatedRentRow = await Rent.updateRentStatusById('rejected',message.berles_id,connection);
        const updatedMessageRow = await Message.updateRequestStatusById('rejected',message.id,connection);

        const answer_message = {
            felado_id: req.user.id,
            cimzett_id: message.felado_id, //azért mert visszaküldjük ezt
            berles_id: message.berles_id,
            cim: null,
            tartalom: null,
            tipus:'message',
            statusz:'rejected'
        };

        const savedmassage = await Message.createMessage(answer_message,connection);

        console.log("frissítet sorok száma:",updatedRentRow, updatedMessageRow)
        
        await connection.commit(); 
        res.status(200).json({message:'Kérés elutasítva! válaszüzenet id:',savedmassage})
    }
    catch(err){
        await connection.rollback();
             res.status(500).json({message:"Hiba a kérés elutasítása közben!",error: err.message });
    }
    finally{
        connection.release();
    }
    
}



async function getIsOpenedCountByOwner(req,res) {
    try{
         const notReadedCount = await Message.getIsOpenedByOwnerId(req.user.id);
         res.status(200).json(notReadedCount);
    }
    catch(err){
        res.status(500).json({message:"Hiba a lekérdezés közben!",error: err.message });
    }
    
}




async function updateIsOpenedByOwner(req,res) {
    try{
        const rows = Message.updateAllIsOpenedValueByOwner(req.user.id);
        res.status(200).json({message:"Sikeresen frissített sorok száma: ",rows});
    }
    catch(err){
        res.status(500).json({message:"Hiba a frissítés közben!",error: err.message });
    }
    
}






module.exports = {getAllMessagesByOwner,messageAccept,messageReject,getIsOpenedCountByOwner,updateIsOpenedByOwner};