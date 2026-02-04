const pool = require('./config/db');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

async function createAdmin() {
    try {
        
        const [rows] = await pool.execute(
            'SELECT * FROM felhasznalok WHERE jogosultsag = ?',
            ['admin']
        );

        if (rows.length > 0) {
            console.log('Admin már létezik.');
            return;
        }

       
        const password = process.env.ADMIN_PASSWORD; 
        const hashedPassword = await bcrypt.hash(password, 10);

        
        await pool.execute(
            'INSERT INTO felhasznalok (nev,telefonszam,email, jelszo ,berelt_eszkozok_szama, jogosultsag,iranyitoszam, varos, utca,haz_szam) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)',
            ['ADMIN', '3612345678', 'admin@example.com', hashedPassword,'0', 'admin','6300', 'kalocsa', 'Admin utca', '1.']
        );

        console.log('Admin felhasználó létrehozva.');
    } catch (err) {
        console.error('Hiba az admin létrehozásakor:', err);
    } finally {
        await pool.end();
    }
}

createAdmin();
