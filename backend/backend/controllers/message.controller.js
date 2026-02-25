const Message = require('../models/message.model');
const User = require('../models/user.model');
const Rent = require('../models/rent.model');
const item_router = require('../routes/item.routes');


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
        console.log(err)
             res.status(500).json({message:"Hiba a lekérdezés közben",error: err.message });
    }
    
    
}

module.exports = {getAllMessagesByOwner}