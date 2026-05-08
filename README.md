------------| Bérpartner ©2026|-------------

-|Készítők|-
Kopó Alex
Maros Máté

---| Program Beüzemelése |---

1. A github repository tartalmának letöltése után a backend mappában lévő tartalmat megnyitja egy erre alkalmas keretrendszerrel pl(Visual Studio Code) és az "npm i" parancsal letöltjük a csomagokat.

2. Az Adatbázist vagyis a berpartner.sql fájlt beimportálod egy erre alkalmas programon keresztül pl (XAMPP - PHPMYADMIN).

3. Az adatbázis felállítása után már elindíthatod a backendet a "node index.js" parancs kiadásával a terminálban.

4. Az Admin Felhasználót a "node seedadmin.js" parancsal tudja létrehozni. (Fontos hogy csak 1db Admin felhasználót lehet generálni.)

Az Admin felhasználó email és jelszavait a .env fájlba lehet módosítani. A .env fájlba egy alapértelmezett példa adatok vannak amik éles helyzetben való használat előt javasoljuk az átírását de sima teszteléskor nem indokolt.
A .env fájban továbbá a tikosítási kulcs is helyet kapott amit rendes körülmények között érdemes átírni. A node -p "require('crypto').randomBytes(64).toString('hex')" parancs egy 64 karakter hosszű karaktersorozatot generál a terminálba. Amit kimásolva betudja helyezni a tiktosítási kulcs helyére.

5. Ha van igény akkor alapadatokal is feltudja tölteeni az adatbázis a "node seed.js" paracsal. (Ezt a parancsot is csak egyszer lehet kiadni.)

6. Nyissa meg a Fronted mapparészbe található tarlamat egy erre alkalmas keretrendszerrel pl(Visual Studio Code) és az "npm i" parancsal letöltjük a csomagokat.
   FONTOS hogy a gépen lelegyen töltve az angular 18-as verziója mert a fejlesztéshez ezt használtuk.

7. A megnyitás után egy "ng serve -o" parancsot kell kiadni a terminálban ami megnyitja az oldalt helyihálózaton.

8. A programhoz tartozik még egy asztali Admin felület amit a .env-ben megadott adatok alapján létrehozott Admin tud belépni.

9. A programot a futtatható admin desktop mappában található meg ami a Admin felület indító parancsfájlját tartalmazza. Ehhez nem kell letölteni semmit. Egy kattintásal működik.
    FONTOS hogy a backend és az adatbázis fusson különben hibát ír.


*A projekt csak szemléltetésként készült el a 2026-os Szoftver tesztelő és fejlesztő vizsgára. A program globális felhasználása és világhálóra való hostolása továbbfejlesztést igényel.
