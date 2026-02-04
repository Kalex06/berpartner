CREATE DATABASE `berpartner` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE berpartner;


CREATE TABLE felhasznalok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    telefonszam VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    jelszo VARCHAR(255) NOT NULL,
    berelt_eszkozok_szama INT NOT NULL,
    jogosultsag ENUM('user','admin') NOT NULL,
    varos VARCHAR(100) NOT NULL,
    utca VARCHAR(100) NOT NULL,
    haz_szam VARCHAR(10) NOT NULL,
    profil_kep VARCHAR(255)
);



CREATE TABLE kategoriak (
     id INT AUTO_INCREMENT PRIMARY KEY,
     kategoria VARCHAR(100) UNIQUE NOT NULL
);

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
)

CREATE TABLE berlesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eszkoz_id INT NOT NULL,
    berlo_id INT NOT NULL,
    tulajdonos_id INT NOT NULL,
    datum_tol DATE NOT NULL,
    datum_ig DATE NOT NULL,
    FOREIGN KEY (eszkoz_id) REFERENCES eszkozok(id),
    FOREIGN KEY (berlo_id) REFERENCES felhasznalok(id),
    FOREIGN KEY (tulajdonos_id) REFERENCES felhasznalok(id)
);


