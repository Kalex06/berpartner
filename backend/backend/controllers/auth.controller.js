const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_KEY;

async function login(req, res) {
    try {
        
        const { email, jelszo } = req.body;
        const user = await User.findUserByemail(email);
        if (!user) {
            return res.status(404).json({ message: 'Nincs ilyen felhasználó' });
        }


        const isMatch = await bcrypt.compare(jelszo, user.jelszo);
        if (!isMatch) {
            return res.status(404).json({ message: 'Hibás jelszó' })

        }
        const token = jwt.sign(
            {
                id: user.id,
                jogosultsag: user.jogosultsag
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        );


        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                jogosultsag: user.jogosultsag
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Hiba történt bejelentkezés közben' })
    }

}


async function regist(req, res) {
    try {
        console.log(req.body);
        const { nev, telefonszam, email, jelszo, berelt_eszkozok_szama, jogosultsag, varos, utca, haz_szam } = req.body;

        if (!nev || !telefonszam || !email || !jelszo || !berelt_eszkozok_szama ||  !jogosultsag || !varos || !utca || !haz_szam){ 
            return res.status(400).json({ message: 'Hiányzó adatok' });
        }

        const hashedPassword = await bcrypt.hash(jelszo, 10);

        const id = await User.createUser({ nev, telefonszam, email, jelszo: hashedPassword, berelt_eszkozok_szama, jogosultsag, varos, utca, haz_szam });
        res.status(201).json({ message: 'Sikeres regisztráció', id });
    } catch (err) {
        res.status(500).json({ message: 'Hiba a felhasználó regisztrálásakor', error: err.message });
    }
}

module.exports = { login, regist }