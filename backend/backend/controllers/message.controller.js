const Message = require('../models/message.model');


async function getAllMessagesByOwner(req,res) {

    try{
        
        const message = Message.getAllMessageByOwner(req.user.id);
        
        


    }
    
    catch(err){
             res.status(500).json({message:"Hiba feltöltés közben",error: err.message });
    }
    
    
}

module.exports = {getAllMessagesByOwner}