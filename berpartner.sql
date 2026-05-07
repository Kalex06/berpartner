-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Máj 08. 01:40
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `berpartner`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `allapotok`
--

CREATE TABLE `allapotok` (
  `id` int(11) NOT NULL,
  `allapot` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `allapotok`
--

INSERT INTO `allapotok` (`id`, `allapot`) VALUES
(1, 'Új'),
(2, 'Újszerű'),
(3, 'Jó / megkímélt'),
(4, 'Használt');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berlesek`
--

CREATE TABLE `berlesek` (
  `id` int(11) NOT NULL,
  `eszkoz_id` int(11) NOT NULL,
  `berlo_id` int(11) NOT NULL,
  `tulajdonos_id` int(11) NOT NULL,
  `datum_tol` date NOT NULL,
  `datum_ig` date NOT NULL,
  `statusz` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eszkozok`
--

CREATE TABLE `eszkozok` (
  `id` int(11) NOT NULL,
  `nev` varchar(200) NOT NULL,
  `kategoria_id` int(11) NOT NULL,
  `ar_egy_napra` int(11) NOT NULL,
  `allapot_id` int(11) NOT NULL,
  `leiras` text DEFAULT NULL,
  `tulajdonos_id` int(11) NOT NULL,
  `letrehozva_ekkor` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eszkoz_kepek`
--

CREATE TABLE `eszkoz_kepek` (
  `id` int(11) NOT NULL,
  `eszkoz_id` int(11) NOT NULL,
  `kep_nev` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `telefonszam` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `jogosultsag` enum('user','admin') NOT NULL,
  `iranyitoszam` varchar(100) NOT NULL,
  `varos` varchar(100) NOT NULL,
  `utca` varchar(100) NOT NULL,
  `haz_szam` varchar(10) NOT NULL,
  `profil_kep` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fokategoriak`
--

CREATE TABLE `fokategoriak` (
  `id` int(11) NOT NULL,
  `fo_kategoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `fokategoriak`
--

INSERT INTO `fokategoriak` (`id`, `fo_kategoria`) VALUES
(1, 'Eszközök'),
(3, 'Helyszínek'),
(2, 'Járművek');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int(11) NOT NULL,
  `fo_kategoriaId` int(11) NOT NULL,
  `kategoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `fo_kategoriaId`, `kategoria`) VALUES
(1, 1, 'Építőipari & gépi szerszámok'),
(2, 1, 'Kert & Kültér'),
(3, 1, 'Jármű szerelés'),
(4, 1, 'Szállítás'),
(5, 1, 'Rendezvény'),
(6, 1, 'Elektronika'),
(7, 2, 'Kisteherautó'),
(8, 2, 'Személyautó'),
(9, 2, 'Teherautó'),
(10, 2, 'Földmunka & Emelőgépek'),
(11, 2, 'Pótkocsi/Utánfutó'),
(12, 3, 'Tárolás & Raktár'),
(13, 3, 'Műhely'),
(14, 3, 'Rendezvényhelyszín');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `id` int(11) NOT NULL,
  `felado_id` int(11) DEFAULT NULL,
  `cimzett_id` int(11) NOT NULL,
  `berles_id` int(11) DEFAULT NULL,
  `cim` varchar(50) DEFAULT NULL,
  `tartalom` text DEFAULT NULL,
  `tipus` enum('request','message') NOT NULL,
  `megnyitva` tinyint(1) DEFAULT 0,
  `statusz` enum('pending','accepted','rejected') DEFAULT NULL,
  `letrehozva_ekkor` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `allapotok`
--
ALTER TABLE `allapotok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `berlesek`
--
ALTER TABLE `berlesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eszkoz_id` (`eszkoz_id`),
  ADD KEY `berlo_id` (`berlo_id`),
  ADD KEY `tulajdonos_id` (`tulajdonos_id`);

--
-- A tábla indexei `eszkozok`
--
ALTER TABLE `eszkozok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tulajdonos_id` (`tulajdonos_id`),
  ADD KEY `kategoria_id` (`kategoria_id`),
  ADD KEY `allapot_id` (`allapot_id`);

--
-- A tábla indexei `eszkoz_kepek`
--
ALTER TABLE `eszkoz_kepek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eszkoz_id` (`eszkoz_id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefonszam` (`telefonszam`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `fokategoriak`
--
ALTER TABLE `fokategoriak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fo_kategoria` (`fo_kategoria`);

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fo_kategoriaId` (`fo_kategoriaId`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felado_id` (`felado_id`),
  ADD KEY `cimzett_id` (`cimzett_id`),
  ADD KEY `berles_id` (`berles_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `allapotok`
--
ALTER TABLE `allapotok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `berlesek`
--
ALTER TABLE `berlesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `eszkozok`
--
ALTER TABLE `eszkozok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `eszkoz_kepek`
--
ALTER TABLE `eszkoz_kepek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `fokategoriak`
--
ALTER TABLE `fokategoriak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `berlesek`
--
ALTER TABLE `berlesek`
  ADD CONSTRAINT `berlesek_ibfk_1` FOREIGN KEY (`eszkoz_id`) REFERENCES `eszkozok` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `berlesek_ibfk_2` FOREIGN KEY (`berlo_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `berlesek_ibfk_3` FOREIGN KEY (`tulajdonos_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `eszkozok`
--
ALTER TABLE `eszkozok`
  ADD CONSTRAINT `eszkozok_ibfk_1` FOREIGN KEY (`tulajdonos_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eszkozok_ibfk_2` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eszkozok_ibfk_3` FOREIGN KEY (`allapot_id`) REFERENCES `allapotok` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `eszkoz_kepek`
--
ALTER TABLE `eszkoz_kepek`
  ADD CONSTRAINT `eszkoz_kepek_ibfk_1` FOREIGN KEY (`eszkoz_id`) REFERENCES `eszkozok` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD CONSTRAINT `kategoriak_ibfk_1` FOREIGN KEY (`fo_kategoriaId`) REFERENCES `fokategoriak` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD CONSTRAINT `uzenetek_ibfk_1` FOREIGN KEY (`felado_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `uzenetek_ibfk_2` FOREIGN KEY (`cimzett_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `uzenetek_ibfk_3` FOREIGN KEY (`berles_id`) REFERENCES `berlesek` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
