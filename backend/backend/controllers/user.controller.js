const User = require('../models/user.model');
const fs = require('fs').promises;
const path = require('path');


async function getMyProfile(req, res) {

    try {
       
        const userId = req.user.id;

        const user = await User.findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'A felhasználó nem található!' });
        }

        delete user.jelszo;

    res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({message:'Hiba a felhasználó lekérdezésénél!'})
    }

}

async function updateProfilePic(req,res) {
    try{
        const myProfilePic = await User.findProfilePicById(req.user.id);

        if(myProfilePic.profil_kep)
        {
            try{
                const filePath = path.join(__dirname,'..','upload','profile_picture',myProfilePic.profil_kep);
                await fs.unlink(filePath);
            }
            catch(fileErr){
                    console.log("A kép már nem létezik.")
            }
            

        }
      const pic = await User.updateProfilePicById(req.file.filename,req.user.id);
    res.status(200).json({message:"Sikeresen frissített sorok száma: ",pic});
    }
    catch(err){
        console.log(err)
            return res.status(500).json({message:'Hiba a profilkép frissítése közben!'})
    }


}



async function getAllUsers(req, res) {
    try {
        const users = await User.getAllUser();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Hiba történt' });
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findUserById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'Nincs ilyen felhasználó' });
        }

        delete user.jelszo
      
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Hiba történt lekérdezéskor' });
    }


}



async function putUser(req, res) {
    try {
        const  id  = parseInt(req.params.id);
        const user = req.body;

        const affectedRows = await User.updateUser(id, user);
        if (affectedRows === 0){
             return res.status(404).json({ message: 'A felhasználó nem létezik' });
        }

        res.json({ message: 'Felhasználó frissítve' });
    } catch (err) {
        res.status(500).json({ message: 'Hiba a felhasználó frissítésekor', error: err.message });
    }
}

async function updateEmail(req,res) {
    try{
        const newEmail = req.body.newEmail;
        
        if(!newEmail){
            return res.status(404).json({ message: 'Hiányosan megadott adatok!' });
        }

      const row = await User.updateEmailById(newEmail,req.user.id);

     if(row === 0){
         return  res.status(404).json({ message: 'Sikertelen frissítés!' });
     }


      res.status(200).json({message:'Felhasználó frissítve!'})
        
    }
    catch(err){
        res.status(500).json({ message: 'Hiba a felhasználó frissítésekor.', error: err.message });
    }
    
}

async function updatePhoneNumber(req,res) {
    try{
        const newPhone = req.body.newPhone;
        
        if(!newPhone){
            return res.status(404).json({ message: 'Hiányosan megadott adatok!' });
        }

      const row = await User.updateEmailById(newPhone,req.user.id);

     if(row === 0){
         return  res.status(404).json({ message: 'Sikertelen frissítés!' });
     }


      res.status(200).json({message:'Felhasználó frissítve!'})
        
    }
    catch(err){
        res.status(500).json({ message: 'Hiba a felhasználó frissítésekor.', error: err.message });
    }
    
}

async function updateUsername(req,res) {
    try{
        const newName = req.body.newName;
        
        if(!newName){
            return res.status(404).json({ message: 'Hiányosan megadott adatok!' });
        }

      const row = await User.updateEmailById(newName,req.user.id);

     if(row === 0){
         return  res.status(404).json({ message: 'Sikertelen frissítés!' });
     }


      res.status(200).json({message:'Felhasználó frissítve!'})
        
    }
    catch(err){
        res.status(500).json({ message: 'Hiba a felhasználó frissítésekor.', error: err.message });
    }
    
}

module.exports = { getAllUsers, getUserById, putUser ,getMyProfile,updateProfilePic,updateEmail,updatePhoneNumber,updateUsername};
