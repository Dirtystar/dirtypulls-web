// Mock katalog – ceny a produkty jsou ilustrační.
window.DP_CATEGORIES = [
  { id: "pokemon", name: "Pokémon TCG", short: "Pokémon", tagline: "Boostery, ETB a booster boxy – EN i JP." },
  { id: "mtg", name: "Magic: The Gathering", short: "Magic", tagline: "Play boostery, Collector boostery a Commander decky." },
  { id: "lorcana", name: "Disney Lorcana", short: "Lorcana", tagline: "Boostery, starter decky a Illumineer's Trove." },
  { id: "prislusenstvi", name: "Příslušenství", short: "Příslušenství", tagline: "Sleeves, toploadery, binders a deck boxy od Ultra PRO." }
];

window.DP_PRODUCTS = [
  { id: "pkm-etb", cat: "pokemon", type: "Elite Trainer Box", label: "ELITE", sub: "TRAINER BOX", name: "Pokémon TCG – Elite Trainer Box", price: 1290, badge: "Novinka", stock: "Skladem", lang: "EN" },
  { id: "pkm-booster", cat: "pokemon", type: "Booster", label: "BOOSTER", sub: "1 KS", name: "Pokémon TCG – Booster (1 ks)", price: 149, badge: "Novinka", stock: "Skladem", lang: "EN" },
  { id: "pkm-bbox", cat: "pokemon", type: "Booster Box", label: "BOOSTER", sub: "BOX 36 KS", name: "Pokémon TCG – Booster Box (36 ks)", price: 4490, badge: "Předprodej", stock: "Předprodej", lang: "EN" },
  { id: "pkm-jp", cat: "pokemon", type: "Booster Box", label: "JP BOX", sub: "30 KS", name: "Pokémon TCG – japonský Booster Box", price: 1890, badge: "JP", stock: "Na dotaz", lang: "JP" },
  { id: "mtg-play", cat: "mtg", type: "Booster", label: "PLAY", sub: "BOOSTER", name: "Magic: The Gathering – Play Booster", price: 159, badge: "Novinka", stock: "Skladem", lang: "EN" },
  { id: "mtg-collector", cat: "mtg", type: "Booster", label: "COLLECTOR", sub: "BOOSTER", name: "Magic: The Gathering – Collector Booster", price: 649, badge: "Brzy", stock: "Brzy", lang: "EN" },
  { id: "mtg-commander", cat: "mtg", type: "Deck", label: "COMMANDER", sub: "DECK", name: "Magic: The Gathering – Commander Deck", price: 1190, badge: "Brzy", stock: "Brzy", lang: "EN" },
  { id: "lor-booster", cat: "lorcana", type: "Booster", label: "LORCANA", sub: "BOOSTER", name: "Disney Lorcana – Booster", price: 159, badge: "Brzy", stock: "Brzy", lang: "EN" },
  { id: "lor-starter", cat: "lorcana", type: "Deck", label: "STARTER", sub: "DECK", name: "Disney Lorcana – Starter Deck", price: 399, badge: "Brzy", stock: "Brzy", lang: "EN" },
  { id: "lor-trove", cat: "lorcana", type: "Box", label: "TROVE", sub: "GIFT BOX", name: "Disney Lorcana – Illumineer's Trove", price: 1390, badge: "Brzy", stock: "Brzy", lang: "EN" },
  { id: "acc-toploader", cat: "prislusenstvi", type: "Ochrana karet", label: "TOPLOADERY", sub: "25 KS", name: "Ultra PRO – Toploadery 3×4\" (25 ks)", price: 99, badge: "Novinka", stock: "Skladem", lang: "" },
  { id: "acc-sleeves", cat: "prislusenstvi", type: "Ochrana karet", label: "SLEEVES", sub: "100 KS", name: "Ultra PRO – Penny Sleeves (100 ks)", price: 49, badge: "", stock: "Skladem", lang: "" },
  { id: "acc-binder", cat: "prislusenstvi", type: "Album", label: "BINDER", sub: "9-POCKET", name: "Ultra PRO – 9-Pocket Binder", price: 690, badge: "", stock: "Skladem", lang: "" },
  { id: "acc-deckbox", cat: "prislusenstvi", type: "Deck box", label: "DECK BOX", sub: "100+", name: "Ultra PRO – Deck Box 100+", price: 249, badge: "", stock: "Skladem", lang: "" }
];
