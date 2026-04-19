const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function passwordMiddleware(req,res,next){
 try {

         const { email, password } = req.body;
         const user = await User.findUserByemail(email);
         if (!user) {
             return res.status(404).json({ message: 'Nem létező felhasználó!' });
         }
 
 
         const isMatch = await bcrypt.compare(password, user.jelszo);
         if (!isMatch) {
             return res.status(401).json({ message: 'Hibás jelszó' })
 
         }
        


         next()

     } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Hiba történt a jelszó ellenörzése közben' })
     }       


}

module.exports = passwordMiddleware;