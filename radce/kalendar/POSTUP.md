# Údržba Kalendáře novinek – postup pro naplánovanou úlohu

Kalendář: Shoptet článek id 11 (`/radce/kalendar-novinek-2027/`), sekce Rádce (id 682).
Obrázek: `kalendar-novinek-<rok>.png` v tomto adresáři, článek ho načítá z
`https://raw.githubusercontent.com/Dirtystar/dirtypulls-web/main/radce/kalendar/kalendar-novinek-<rok>.png?v=<YYYYMMDD>`.

## 1. Ověření dat (každý běh)
- Pro každou událost v `events.json` a pro nové oznámené sety hledej (WebSearch) aktuální stav.
- **Official** = datum potvrdil vydavatel (pokemon.com / press.pokemon.com, magic.wizards.com, disneylorcana.com / ravensburger) **a** shoduje se aspoň 1 další nezávislý zdroj (ICv2, PokeBeach, Wargamer, TCGplayer, lorcana.gg…). Jinak `unofficial` nebo `window`.
- Nikdy nepiš nic, co nemá zdroj. Když se zdroje liší, uveď to.
- Sleduj i Pokémon/Magic/Lorcana novinky na další rok (`year` + 1) – pokud jich je dost, založ nový kalendář (nový events-<rok>.json se stejnou strukturou) a dej vědět.

## 2. Když se něco změnilo
1. Uprav `events.json` (status, datum, label, products, sources), nastav `updated`.
2. `python3 radce/kalendar/render.py` → zkontroluj PNG (Read), ať se nic nepřekrývá.
3. Commit + push (`Kalendář: <co se změnilo>`).
4. Přes Shoptet MCP (`blog_article_update`, id 11) uprav tabulky, zdroje, větu „Stav k …“ a `?v=` u obrázku. Ostatní text neměň.

## 3. Samostatný článek ke každému releasu
Článek vyjde **v předstihu, ale až když je kompletní**:
- konkrétní oficiální datum vydání (status `official`),
- seznam produktů (booster, booster box/display, ETB / bundle / Trove, kolekce, starter decky…),
- obsah každého produktu (počet balíčků, karet v balíčku, příslušenství),
- vše potvrzené aspoň 2 zdroji, z toho 1 oficiální.

Dokud něco chybí → článek nezakládej, jen do `events.json` zapiš do `missing` co chybí.

Když je vše → `blog_article_create` (sectionId 682, publish true):
- titulek „<Set>: datum vydání, produkty a co v nich najdeš“
- úvod (Ich-forma, tykání, bez hypu), datum, tabulka produktů s obsahem, co je na setu zajímavého (mechaniky, hlavní karty – jen ověřené), odkaz na kalendář a průvodce, sekce **Zdroje** s odkazy, podpis „Radek, Dirtypulls“.
- nikdy nepsat „originální / nepřebalené“ apod., žádné ceny konkurence, žádné sliby o dostupnosti u nás, pokud produkt nemáme v e-shopu.
- kontakt jen info@dirtypulls.cz.
- id článku zapiš do `events.json` (`article`) a v kalendáři (článek 11) nalinkuj název setu na článek.
- Když se po vydání článku změní fakta, článek oprav a připiš „Aktualizováno <datum>: …“.
