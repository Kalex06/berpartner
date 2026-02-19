CREATE DATABASE `berpartner` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;;
USE berpartner;


CREATE TABLE felhasznalok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    telefonszam VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    jelszo VARCHAR(255) NOT NULL,
    berelt_eszkozok_szama INT DEFAULT 0,
    jogosultsag ENUM('user','admin') NOT NULL,
    iranyitoszam VARCHAR(100) NOT NULL,
    varos VARCHAR(100) NOT NULL,
    utca VARCHAR(100) NOT NULL,
    haz_szam VARCHAR(10) NOT NULL,
    profil_kep VARCHAR(255) DEFAULT NULL
);


CREATE TABLE foKategoriak (
     id INT AUTO_INCREMENT PRIMARY KEY,
     fo_kategoria VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO foKategoriak (fo_kategoria) VALUES 
('Eszközök'),
('Járművek'),
('Helyszínek');

CREATE TABLE kategoriak (
     id INT AUTO_INCREMENT PRIMARY KEY,
     fo_kategoriaId INT NOT NULL,
     kategoria VARCHAR(100) NOT NULL,
     FOREIGN KEY (fo_kategoriaId) REFERENCES foKategoriak(id)
);

INSERT INTO kategoriak (fo_kategoriaId, kategoria) VALUES 
(1,'Építőipari & gépi szerszámok'),
(1,'Kert & Kültér'),
(1,'Jármű szerelés'),
(1,'Szállítás'),
(1,'Rendezvény'),
(1,'Elektronika'),
(2,'Kisteherautó'),
(2,'Személyautó'),
(2,'Teherautó'),
(2,'Földmunka & Emelőgépek'),
(2,'Pótkocsi/Utánfutó'),
(3,'Tárolás & Raktár'),
(3,'Műhely'),
(3,'Rendezvényhelyszín');

CREATE TABLE eszkozok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(200) NOT NULL,
    kategoria_id INT NOT NULL,
    ar_egy_napra INT NOT NULL,
    allapot VARCHAR(100) NOT NULL,
    leiras TEXT,
    tulajdonos_id INT NOT NULL,
    FOREIGN KEY (tulajdonos_id) REFERENCES felhasznalok(id),
    FOREIGN KEY (kategoria_id) REFERENCES kategoriak(id)
);


CREATE TABLE eszkoz_kepek(
    id INT AUTO_INCREMENT PRIMARY KEY,
    eszkoz_id INT NOT NULL,
    kep_nev VARCHAR(255),
    FOREIGN KEY (eszkoz_id) REFERENCES eszkozok(id)
);

CREATE TABLE berlesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eszkoz_id INT NOT NULL,
    berlo_id INT NOT NULL,
    tulajdonos_id INT NOT NULL,
    datum_tol DATE NOT NULL,
    datum_ig DATE NOT NULL,
    statusz ENUM('függőben','elutasítva','elfogadva') NOT NULL,
    FOREIGN KEY (eszkoz_id) REFERENCES eszkozok(id),
    FOREIGN KEY (berlo_id) REFERENCES felhasznalok(id),
    FOREIGN KEY (tulajdonos_id) REFERENCES felhasznalok(id)
);

CREATE TABLE uzenetek(
    id INT AUTO_INCREMENT PRIMARY KEY,
    felado_id INT, 
    cimzett_id INT NOT NULL,
    cim VARCHAR(50),
    tartalom TEXT,
    tipus ENUM('request','message') NOT NULL,
    megnyitva BOOLEAN DEFAULT FALSE,
    letrehozva_ekkor TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (felado_id) REFERENCES felhasznalok(id),
    FOREIGN KEY (cimzett_id) REFERENCES felhasznalok(id)

);
