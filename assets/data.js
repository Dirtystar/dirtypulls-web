// Katalog Dirty Pulls (ukázka). Ceny orientační podle českého trhu, říjen 2026.
// Fotky: nahraj pack shot do assets/img/<id>.jpg – web ho použije automaticky,
// jinak zobrazí vygenerovaný obrázek.

window.DP_CATEGORIES = [
  { id: "pokemon", name: "Pokémon TCG", short: "Pokémon", tagline: "Booster boxy, Elite Trainer Boxy, tiny a kolekce – anglické edice." },
  { id: "mtg", name: "Magic: The Gathering", short: "Magic", tagline: "Play a Collector booster boxy, bundly a Commander decky." },
  { id: "lorcana", name: "Disney Lorcana", short: "Lorcana", tagline: "Boostery, booster boxy, starter decky a Illumineer's Trove." },
  { id: "prislusenstvi", name: "Příslušenství", short: "Příslušenství", tagline: "Obaly, toploadery, stránky a alba od Ultra PRO." }
];

window.DP_PRODUCTS = [
  // ---------- Pokémon TCG ----------
  {
    id: "pkm-me-perfect-order-bb", cat: "pokemon", type: "Booster Box", badge: "Novinka",
    label: "BOOSTER", sub: "BOX", name: "Pokémon TCG – Mega Evolution: Perfect Order Booster Box", price: 4999,
    lang: "EN", contents: "36 boosterů po 10 kartách",
    desc: "Celý display boosterů z rozšíření Perfect Order ze série Mega Evolution. Nejvýhodnější cena za balíček a nejlepší šance na vzácné ilustrace a Mega Evolution ex karty. Box přichází v originální fólii."
  },
  {
    id: "pkm-me-chaos-rising-bb", cat: "pokemon", type: "Booster Box", badge: "Novinka",
    label: "BOOSTER", sub: "BOX", name: "Pokémon TCG – Mega Evolution: Chaos Rising Booster Box", price: 4999,
    lang: "EN", contents: "36 boosterů po 10 kartách",
    desc: "Booster box rozšíření Chaos Rising. Ideální pro otevírání se partou, stavbu balíčku i pro sběratele, kteří chtějí box nechat zapečetěný jako dlouhodobý kus do sbírky."
  },
  {
    id: "pkm-30th-etb", cat: "pokemon", type: "Elite Trainer Box", badge: "Novinka",
    label: "ELITE", sub: "TRAINER BOX", name: "Pokémon TCG – 30th Celebration Elite Trainer Box", price: 1999,
    lang: "EN", contents: "boostery, promo karta, obaly, kostky a žetony",
    desc: "Elite Trainer Box k 30. výročí Pokémonů. Kromě boosterů obsahuje promo kartu, tematické obaly na karty, kostky, žetony stavu a box na uložení sbírky. Oblíbený dárek i sběratelský kus."
  },
  {
    id: "pkm-30th-binder", cat: "pokemon", type: "Kolekce", badge: "",
    label: "BINDER", sub: "COLLECTION", name: "Pokémon TCG – 30th Celebration Binder Collection", price: 1649,
    lang: "EN", contents: "album na karty a boostery",
    desc: "Kolekce s tematickým albem k 30. výročí a boostery, které album rovnou začnou plnit. Praktický start pro nové sběratele."
  },
  {
    id: "pkm-30th-greninja-box", cat: "pokemon", type: "Kolekce", badge: "",
    label: "GRENINJA", sub: "EX BOX", name: "Pokémon TCG – 30th Celebration Greninja ex Box", price: 899,
    lang: "EN", contents: "promo karta Greninja ex a boostery",
    desc: "Kolekční box s foil promo kartou Greninja ex a balíčky boosterů z výroční edice. Dobrá volba, když chceš konkrétní kartu a k tomu něco na otevírání."
  },
  {
    id: "pkm-30th-tin-sylveon", cat: "pokemon", type: "Tin", badge: "",
    label: "TIN", sub: "SYLVEON", name: "Pokémon TCG – 30th Celebration Tin: Sylveon", price: 899,
    lang: "EN", contents: "plechová krabička, promo karta a boostery",
    desc: "Sběratelská plechovka s motivem Sylveon. Uvnitř promo karta a boostery, plechovku pak využiješ na uložení karet."
  },

  // ---------- Magic: The Gathering ----------
  {
    id: "mtg-lorwyn-eclipsed-play-bb", cat: "mtg", type: "Booster Box", badge: "Novinka",
    label: "PLAY", sub: "BOOSTER BOX", name: "Magic: The Gathering – Lorwyn Eclipsed Play Booster Box", price: 3499,
    lang: "EN", contents: "30 Play boosterů",
    desc: "Display Play boosterů z rozšíření Lorwyn Eclipsed. Play boostery jsou navržené pro draft i pro otevírání pro radost – v každém je minimálně jedna rare nebo mythic rare karta."
  },
  {
    id: "mtg-lorwyn-eclipsed-collector-bb", cat: "mtg", type: "Booster Box", badge: "",
    label: "COLLECTOR", sub: "BOOSTER BOX", name: "Magic: The Gathering – Lorwyn Eclipsed Collector Booster Box", price: 8999,
    lang: "EN", contents: "12 Collector boosterů",
    desc: "Collector boostery jsou plné foil karet, alternativních ilustrací a speciálních verzí. Pro sběratele, kteří jdou po nejvzácnějších variantách karet z Lorwyn Eclipsed."
  },
  {
    id: "mtg-avatar-play-bb", cat: "mtg", type: "Booster Box", badge: "",
    label: "PLAY", sub: "BOOSTER BOX", name: "Magic: The Gathering – Avatar: The Last Airbender Play Booster Box", price: 3749,
    lang: "EN", contents: "30 Play boosterů",
    desc: "Play booster box ze spolupráce Magic: The Gathering a Avatar: The Last Airbender. Postavy a ohýbání živlů převedené do mechanik Magicu – pro fanoušky obou světů."
  },
  {
    id: "mtg-bloomburrow-play-bb", cat: "mtg", type: "Booster Box", badge: "",
    label: "PLAY", sub: "BOOSTER BOX", name: "Magic: The Gathering – Bloomburrow Play Booster Box", price: 3999,
    lang: "EN", contents: "30 Play boosterů",
    desc: "Bloomburrow, svět zvířecích hrdinů, patří k nejoblíbenějším setům posledních let. Play booster box pro draft i pro sbírku."
  },
  {
    id: "mtg-aetherdrift-bundle", cat: "mtg", type: "Bundle", badge: "",
    label: "BUNDLE", sub: "AETHERDRIFT", name: "Magic: The Gathering – Aetherdrift Bundle", price: 999,
    lang: "EN", contents: "9 Play boosterů, základní země, spindown kostka, promo karta",
    desc: "Bundle z rozšíření Aetherdrift: boostery, sada základních zemí, spindown kostka na počítání životů a promo karta. Vše v krabici, která poslouží jako úložný box."
  },
  {
    id: "mtg-aetherdrift-commander-living-energy", cat: "mtg", type: "Commander Deck", badge: "",
    label: "COMMANDER", sub: "DECK", name: "Magic: The Gathering – Aetherdrift Commander: Living Energy", price: 999,
    lang: "EN", contents: "100karetní hotový balíček",
    desc: "Hotový Commander balíček na sto karet, připravený ke hře hned po vybalení. Living Energy staví na energii a artefaktech – skvělý vstup do nejoblíbenějšího multiplayer formátu."
  },

  // ---------- Disney Lorcana ----------
  {
    id: "lor-azurite-sea-bb", cat: "lorcana", type: "Booster Box", badge: "",
    label: "BOOSTER", sub: "BOX", name: "Disney Lorcana – Azurite Sea Booster Box", price: 2749,
    lang: "EN", contents: "24 boosterů po 12 kartách",
    desc: "Booster box rozšíření Azurite Sea. Celý display za nejlepší cenu na boosteru – pro otevírání s přáteli i pro sběratele enchanted karet."
  },
  {
    id: "lor-azurite-sea-booster", cat: "lorcana", type: "Booster", badge: "",
    label: "BOOSTER", sub: "AZURITE SEA", name: "Disney Lorcana – Azurite Sea Booster", price: 125,
    lang: "EN", contents: "12 karet",
    desc: "Jeden booster rozšíření Azurite Sea s dvanácti kartami, z toho jedna foil. Ideální na vyzkoušení nebo jako drobný dárek."
  },
  {
    id: "lor-archazia-trove", cat: "lorcana", type: "Illumineer's Trove", badge: "",
    label: "TROVE", sub: "ARCHAZIA'S ISLAND", name: "Disney Lorcana – Archazia's Island Illumineer's Trove", price: 999,
    lang: "EN", contents: "8 boosterů, obaly, žetony, úložný box",
    desc: "Sběratelská sada k rozšíření Archazia's Island: osm boosterů, tematické obaly na karty, žetony a pevný box s přihrádkami na uložení balíčků."
  },
  {
    id: "lor-archazia-starter-ruby-sapphire", cat: "lorcana", type: "Starter Deck", badge: "",
    label: "STARTER", sub: "RUBY & SAPPHIRE", name: "Disney Lorcana – Archazia's Island Starter Deck: Ruby & Sapphire", price: 299,
    lang: "EN", contents: "60karetní balíček a 2 boostery",
    desc: "Hotový balíček ve spojení barev Ruby a Sapphire, se kterým můžeš hrát hned. K tomu dva boostery a pravidla pro začátečníky."
  },
  {
    id: "lor-azurite-starter-emerald-sapphire", cat: "lorcana", type: "Starter Deck", badge: "",
    label: "STARTER", sub: "EMERALD & SAPPHIRE", name: "Disney Lorcana – Azurite Sea Starter Deck: Emerald & Sapphire", price: 299,
    lang: "EN", contents: "60karetní balíček a 2 boostery",
    desc: "Startovní balíček z rozšíření Azurite Sea v barvách Emerald a Sapphire. Nejrychlejší cesta, jak se naučit Lorcanu, a navíc dva boostery."
  },
  {
    id: "lor-album-a4-card-back", cat: "lorcana", type: "Album", badge: "",
    label: "ALBUM", sub: "A4", name: "Disney Lorcana – Album A4: Card Back", price: 499,
    lang: "", contents: "A4 album s kapsami na karty",
    desc: "Oficiální album na karty Lorcana s motivem rubu karty. Kapsy pro bezpečné uložení sbírky a přehledné listování."
  },

  // ---------- Příslušenství (Ultra PRO) ----------
  {
    id: "acc-up-regular-toploader", cat: "prislusenstvi", type: "Toploadery", badge: "",
    label: "TOPLOADER", sub: "REGULAR 3×4\"", name: "Ultra PRO – Regular Toploader 3×4\"", price: 59,
    lang: "", contents: "pevné průhledné pouzdro na kartu",
    desc: "Klasický pevný toploader pro standardní karty. Pro pull, který si zaslouží víc než obyčejný obal – karta nejdřív do sleeve, pak do toploaderu."
  },
  {
    id: "acc-up-platinum-toploader", cat: "prislusenstvi", type: "Toploadery", badge: "",
    label: "TOPLOADER", sub: "PLATINUM", name: "Ultra PRO – Platinum Toploader", price: 119,
    lang: "", contents: "prémiové pouzdro s vysokou čirostí",
    desc: "Prémiová řada toploaderů s vyšší průhledností a pevnější konstrukcí. Pro nejcennější karty, které chceš vystavit."
  },
  {
    id: "acc-up-soft-sleeves", cat: "prislusenstvi", type: "Obaly", badge: "",
    label: "SOFT", sub: "SLEEVES 100", name: "Ultra PRO – Soft Sleeves (100 ks)", price: 25,
    lang: "", contents: "100 tenkých průhledných obalů",
    desc: "Tenké „penny“ obaly na každou kartu. Základní ochrana hned po vytažení z boosteru a první vrstva před vložením do toploaderu."
  },
  {
    id: "acc-up-platinum-sleeves", cat: "prislusenstvi", type: "Obaly", badge: "",
    label: "PLATINUM", sub: "SLEEVES", name: "Ultra PRO – Platinum Card Sleeves", price: 59,
    lang: "", contents: "čiré obaly ve standardní velikosti",
    desc: "Odolnější čiré obaly ve standardní velikosti pro Pokémon, Magic i Lorcanu. Vhodné pro sbírku i pro hrací balíček."
  },
  {
    id: "acc-up-9pocket-platinum-box", cat: "prislusenstvi", type: "Stránky do alba", badge: "",
    label: "9-POCKET", sub: "PLATINUM", name: "Ultra PRO – 9-Pocket Platinum stránky (box)", price: 629,
    lang: "", contents: "box stránek s 9 kapsami do kroužkového alba",
    desc: "Prémiové stránky s devíti kapsami do kroužkových alb. Čirý materiál bez PVC, karty se vkládají z boku a nevypadávají."
  },
  {
    id: "acc-up-pro-binder-foundations", cat: "prislusenstvi", type: "Alba", badge: "",
    label: "PRO-BINDER", sub: "PREMIUM", name: "Ultra PRO – Premium 9-Pocket Pro-Binder: Foundations", price: 499,
    lang: "", contents: "album s 9 kapsami na stránku",
    desc: "Album s pevnými deskami a kapsami se zásuvem z boku. Licencovaný motiv Magic: The Gathering Foundations, vejde se do něj velká část sbírky."
  }
];
