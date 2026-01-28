const User = require('../models/user.model');


async function getMyProfile(req, res) {

    try {
       
        const userId = req.user.id;

        const user = await User.findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'A felhasználó nem található!' });
        }

        delete user.jelszo;

    res.json(user);
    } catch (err) {
        return res.status(500).json({message:'Hiba a felhasználó lekérdezésénél!'})
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
        const user = await User.findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Nincs ilyen felhasználó' });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Hiba történt lekérdezéskor' });
    }


}



async function putUser(req, res) {
    try {
        const { id } = req.params;
        const { nev, telefonszam, email, jelszo, berelt_eszkozok_szama, jogosultsag, varos, utca, haz_szam } = req.body;

        const affectedRows = await User.updateUser(id, { nev, telefonszam, email, jelszo, berelt_eszkozok_szama, jogosultsag, varos, utca, haz_szam });
        if (affectedRows === 0) return res.status(404).json({ message: 'A felhasználó nem létezik' });

        res.json({ message: 'Felhasználó frissítve' });
    } catch (err) {
        res.status(500).json({ message: 'Hiba a felhasználó frissítésekor', error: err.message });
    }
}

module.exports = { getAllUsers, getUserById, putUser ,getMyProfile};
