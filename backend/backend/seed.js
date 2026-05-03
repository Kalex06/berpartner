const pool = require('./config/db');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

async function createExamples() {
    try {
        
        const [rows] = await pool.execute(
            'SELECT * FROM felhasznalok'
        );

        if (rows.length > 2) {
            console.log('Felhasználók már létrehozva!');
            return;
        }

       
        const password = process.env.EXAMPLE_USERS_PASSWORD; 
        const hashedPassword = await bcrypt.hash(password, 10);

        
        await pool.execute(`
    INSERT INTO felhasznalok (nev, telefonszam, email, jelszo, jogosultsag, iranyitoszam, varos, utca, haz_szam) VALUES 
    ('Tóth Béla', '36201013168', 'tothbela@example.com', '${hashedPassword}', 'user', '6300', 'kalocsa', 'Ady Endre utca', '35.'),
    ('Horváth István', '36705267588', 'horvathisti@example.com', '${hashedPassword}', 'user', '3500', 'Miskolc', 'Mátyás Király utca', '20.'),
    ('Kovács Gergő', '36204562621', 'kovacsgergo@example.com', '${hashedPassword}', 'user', '6500', 'Baja', 'Hunyadi János utca', '9.')
`);

await pool.execute(`
    INSERT INTO eszkozok (nev, kategoria_id, ar_egy_napra, allapot_id, leiras, tulajdonos_id) VALUES 
    ('Makita Fúró', '1', '3000', '3', 'Tökéletesen működő Makita fúró\\nKaukció: 10.000Ft', (SELECT id FROM felhasznalok WHERE email = 'tothbela@example.com')),
    ('Motoros Fűnyíró', '2', '4000', '3', 'Tökéletesen működő Motoros fűnyíró\\nKaukció: 25.000Ft', (SELECT id FROM felhasznalok WHERE email = 'tothbela@example.com')),
    ('Nyomatékkulcs', '3', '1500', '2', 'Fél méteres nyomatékkulcs, cserélhető fejjel\\nKaukció: 5.000Ft', (SELECT id FROM felhasznalok WHERE email = 'tothbela@example.com')),
    ('Raklapemelő', '4', '1000', '2', 'Hidraulikus kézi raklapemelő, 2,5 tonna teherbírással\\nKaukció: 12.000Ft', (SELECT id FROM felhasznalok WHERE email = 'tothbela@example.com')),
    ('Evő készletek', '5', '10000', '2', 'Evő készletek és tányérok esküvőkre, rendezvényekre\\nKaukció: 20.000Ft', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com')),
    ('Asus Laptop', '6', '4000', '2', 'Ausus laptop Win 10 operációs rendszerel\\nKaukció: 10.000Ft', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com')),
    ('Opel Vivaro', '7', '1500', '3', 'Opel Vivaró kisteherautó\\n2016-os évjárat, 1.6 Dízelmotorral\\nKaukció: 50.000Ft', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com')),
    ('Mazda2', '8', '7000', '4', '5 személyes családi autó', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com')),
    ('MAN teherautó', '9', '8000', '4', 'Billenőplatós teherautó\\nKaukció: 100.000Ft', (SELECT id FROM felhasznalok WHERE email = 'kovacsgergo@example.com')),
    ('Egyszemélyes emelő', '10', '11000', '3', 'Egyszemélyes önjáró ollós emelő\\nKaukció: 80.000Ft', (SELECT id FROM felhasznalok WHERE email = 'kovacsgergo@example.com')),
    ('Egytengelyes utánfutó', '11', '4000', '3', 'Alap egytengelyes utánfutó 500kg-os teherbírásal\\nKaukció: 45.000Ft', (SELECT id FROM felhasznalok WHERE email = 'kovacsgergo@example.com')),
    ('Bérelhető raktárkonténer', '12', '20', '4', 'Bérelhető raktárkonténerek\\nÁr: 14.000 Ft/hó', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com')),
    ('Kiadó Autószervíz', '13', '100', '4', 'Kiadó teljesen felszerelt autószervíz\\nÁr: 140.000 Ft/hó', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com')),
    ('Party helyszín', '14', '10000', '2', 'Bérelhető Party/Buli helyszín,\\ntökéletes összejövetelekre.', (SELECT id FROM felhasznalok WHERE email = 'horvathisti@example.com'))
`);


await pool.execute(`
    INSERT INTO eszkoz_kepek (eszkoz_id, kep_nev) VALUES 
    ((SELECT id FROM eszkozok WHERE nev = 'Makita Fúró'), 'mintakep1.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Motoros Fűnyíró'), 'mintakep2.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Nyomatékkulcs'), 'mintakep3.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Raklapemelő'), 'mintakep4.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Evő készletek'), 'mintakep5.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Asus Laptop'), 'mintakep6.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Opel Vivaro'), 'mintakep7.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Mazda2'), 'mintakep8.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'MAN teherautó'), 'mintakep9.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Egyszemélyes emelő'), 'mintakep10.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Egytengelyes utánfutó'), 'mintakep11.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Bérelhető raktárkonténer'), 'mintakep12.avif'),
    ((SELECT id FROM eszkozok WHERE nev = 'Kiadó Autószervíz'), 'mintakep13.jpg'),
    ((SELECT id FROM eszkozok WHERE nev = 'Party helyszín'), 'mintakep14.jpg')
  `);


        console.log('Alapadatok létrehozva!');
    } catch (err) {
        console.error('Hiba az alapadatok létrehozásakor!', err);
    } finally {
        await pool.end();
    }
}

createExamples();
