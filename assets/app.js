(function () {
  const CATS = window.DP_CATEGORIES;
  const PRODUCTS = window.DP_PRODUCTS;
  const IG = "https://www.instagram.com/dirtypulls.cz/";
  const INFO = [
    ["kontakt.html", "Kontakt"],
    ["doprava-a-platba.html", "Doprava a platba"],
    ["reklamacni-rad.html", "Reklamační řád"],
    ["ochrana-osobnich-udaju.html", "Ochrana osobních údajů"]
  ];

  const czk = (n) => n.toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catById = (id) => CATS.find((c) => c.id === id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;

  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
  const CART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>';
  const BELL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>';
  const IGI = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="dot"/></svg>';
  const SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';

  // ---------- drobnosti ----------
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function watchModal(p) {
    let m = document.querySelector(".modal");
    if (!m) {
      m = document.createElement("div");
      m.className = "modal";
      m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="mtitle">
          <button class="modal-x" aria-label="Zavřít">×</button>
          <div class="modal-ico">${BELL}</div>
          <h3 id="mtitle">Hlídat dostupnost</h3>
          <p class="modal-p"></p>
          <a class="btn" href="${IG}" target="_blank" rel="noopener">${IGI}Sledovat @dirtypulls.cz</a>
          <p class="modal-note">E-shop spouštíme brzy. Novinky a naskladnění oznamujeme jako první na Instagramu.</p>
        </div>`;
      document.body.appendChild(m);
      m.addEventListener("click", (e) => { if (e.target === m || e.target.closest(".modal-x")) m.classList.remove("open"); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") m.classList.remove("open"); });
    }
    m.querySelector(".modal-p").innerHTML = `<strong>${esc(p.name)}</strong> zatím není skladem. Dej nám follow a napiš do DM, že o něj máš zájem – ozveme se, jakmile dorazí.`;
    m.classList.add("open");
    m.querySelector(".modal-x").focus();
  }

  // ---------- hlavička a patička ----------
  function header() {
    const activeCat = new URLSearchParams(location.search).get("c");
    const nav = CATS.map((c) => `<a href="kategorie.html?c=${c.id}" class="${page === "kategorie" && activeCat === c.id ? "active" : ""}">${esc(c.short)}</a>`).join("");
    return `
      <div class="topbar">
        <div class="wrap topbar-row">
          <span class="topbar-msg"><span class="pulse"></span>E-shop spouštíme brzy – zatím si prohlédni nabídku</span>
          <nav class="topbar-links">
            ${INFO.slice(0, 2).map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
            <a href="${IG}" target="_blank" rel="noopener" class="ig-link">${IGI}<span>Instagram</span></a>
          </nav>
        </div>
      </div>
      <header class="site-header">
        <div class="wrap head-row">
          <a href="index.html" class="logo" aria-label="Dirty Pulls – úvod">
            <span class="logo-star">${STAR}</span>
            <span class="logo-text"><span>DIRTY</span><span class="grad">PULLS</span></span>
          </a>
          <form class="search" action="kategorie.html" role="search">
            <input type="search" name="q" placeholder="Hledat booster, ETB, toploader…" aria-label="Vyhledat" value="${esc(new URLSearchParams(location.search).get("q") || "")}">
            <button type="submit" aria-label="Hledat">${SEARCH}</button>
          </form>
          <a href="kosik.html" class="cart-btn" aria-label="Košík">${CART}<span>0 Kč</span><span class="cart-count">0</span></a>
        </div>
        <nav class="main-nav" aria-label="Kategorie"><div class="wrap">${nav}<a href="kategorie.html" class="${page === "kategorie" && !activeCat ? "active" : ""}">Vše</a></div></nav>
      </header>`;
  }

  function footer() {
    return `
      <section class="ig-band">
        <div class="wrap ig-row">
          <div>
            <h2>Buď u toho od prvního pullu.</h2>
            <p>Novinky, naskladnění a otevírání boosterů sdílíme na Instagramu.</p>
          </div>
          <a class="btn light" href="${IG}" target="_blank" rel="noopener">${IGI}@dirtypulls.cz</a>
        </div>
      </section>
      <footer class="site-footer">
        <div class="wrap foot-grid">
          <div>
            <div class="logo small"><span class="logo-star">${STAR}</span><span class="logo-text"><span>DIRTY</span><span class="grad">PULLS</span></span></div>
            <p>Sběratelské karty a příslušenství pro sběratele a hráče. Vybrané kousky bez zbytečného balastu.</p>
          </div>
          <div>
            <h4>Kategorie</h4>
            ${CATS.map((c) => `<a href="kategorie.html?c=${c.id}">${esc(c.name)}</a>`).join("")}
          </div>
          <div>
            <h4>Informace</h4>
            ${INFO.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
          </div>
          <div>
            <h4>Provozovatel</h4>
            <span>Radek Šedina</span>
            <span>Doubravčice, Česká republika</span>
            <a href="${IG}" target="_blank" rel="noopener">Instagram @dirtypulls.cz</a>
          </div>
        </div>
        <div class="wrap foot-note">© ${new Date().getFullYear()} Dirty Pulls · Ceny jsou orientační. Pokémon, Magic: The Gathering, Disney Lorcana a Ultra PRO jsou ochranné známky jejich vlastníků; Dirty Pulls není jejich oficiálním partnerem.</div>
      </footer>`;
  }

  // ---------- produkty ----------
  function art(p, size) {
    const cat = catById(p.cat);
    if (p.img) return `<div class="art photo ${size || ""}"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>`;
    return `<div class="art art-${p.cat} ${size || ""}" role="img" aria-label="${esc(p.name)}">
      <div class="art-glow"></div>
      ${window.DP_ART(p)}
      <span class="art-foot">${esc(cat.name.toUpperCase())}</span>
    </div>`;
  }

  function badges(p) {
    let out = "";
    if (p.badge) out += `<span class="badge new">${esc(p.badge)}</span>`;
    if (p.lang) out += `<span class="badge lang">${esc(p.lang)}</span>`;
    return out;
  }

  function card(p) {
    return `<article class="pcard">
      <a href="produkt.html?id=${p.id}" class="pcard-media">${art(p)}<span class="pcard-flags">${badges(p)}</span></a>
      <div class="pcard-body">
        <span class="pcat">${esc(catById(p.cat).short)} · ${esc(p.type)}</span>
        <a href="produkt.html?id=${p.id}" class="pname">${esc(p.name)}</a>
        <div class="pfoot">
          <div>
            <div class="price">${czk(p.price)}</div>
            <div class="stock">Není skladem</div>
          </div>
          <button class="icon-btn" data-watch="${p.id}" aria-label="Hlídat dostupnost: ${esc(p.name)}" title="Hlídat dostupnost">${BELL}</button>
        </div>
      </div>
    </article>`;
  }

  // ---------- stránky ----------
  function pageHome() {
    document.getElementById("home-cats").innerHTML = CATS.map((c) => {
      const n = PRODUCTS.filter((p) => p.cat === c.id).length;
      return `<a class="catcard cat-${c.id}" href="kategorie.html?c=${c.id}">
        <span class="catcard-fan"><i></i><i></i><i></i></span>
        <span class="catcard-name">${esc(c.name)}</span>
        <span class="catcard-tag">${esc(c.tagline)}</span>
        <span class="catcard-count">${n} produktů <b>→</b></span>
      </a>`;
    }).join("");

    const tabs = [
      { label: "Novinky", list: PRODUCTS.filter((p) => p.badge === "Novinka") },
      { label: "Booster boxy", list: PRODUCTS.filter((p) => p.type === "Booster Box") },
      { label: "Ochrana karet", list: PRODUCTS.filter((p) => p.cat === "prislusenstvi") }
    ];
    const tabsEl = document.getElementById("home-tabs");
    const gridEl = document.getElementById("home-grid");
    tabsEl.innerHTML = tabs.map((t, i) => `<button type="button" role="tab">${t.label}<span class="count">${t.list.length}</span></button>`).join("");
    const show = (i) => {
      tabsEl.querySelectorAll("button").forEach((b, j) => { b.classList.toggle("active", i === j); b.setAttribute("aria-selected", i === j); });
      gridEl.innerHTML = tabs[i].list.slice(0, 8).map(card).join("");
    };
    tabsEl.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => show(i)));
    show(0);
  }

  function pageCategory() {
    const qs = new URLSearchParams(location.search);
    const c = catById(qs.get("c"));
    const q = (qs.get("q") || "").trim().toLowerCase();
    let list = PRODUCTS;
    let title = "Všechny produkty", tag = "Celá nabídka napříč hrami a příslušenstvím.";
    if (c) { list = list.filter((p) => p.cat === c.id); title = c.name; tag = c.tagline; }
    if (q) {
      list = list.filter((p) => (p.name + " " + p.type + " " + p.desc).toLowerCase().includes(q));
      title = `Hledání: „${qs.get("q")}“`;
      tag = `${list.length} ${list.length === 1 ? "výsledek" : list.length >= 2 && list.length <= 4 ? "výsledky" : "výsledků"}`;
    }
    const head = document.getElementById("cat-head");
    head.className = "cat-hero " + (c ? "cat-" + c.id : "cat-all");
    document.getElementById("cat-title").textContent = title;
    document.getElementById("cat-tag").textContent = tag;
    document.getElementById("crumb").innerHTML = `<a href="index.html">Úvod</a><span>/</span><span>${esc(title)}</span>`;
    document.title = title + " | Dirty Pulls";

    const types = [...new Set(list.map((p) => p.type))];
    const filterEl = document.getElementById("cat-filters");
    const sortEl = document.getElementById("cat-sort");
    const gridEl = document.getElementById("cat-grid");
    const countEl = document.getElementById("cat-count");
    let activeType = "";
    filterEl.innerHTML = ["", ...types].map((t) => `<button type="button" data-t="${esc(t)}">${t ? esc(t) : "Vše"}</button>`).join("");
    function render() {
      let l = list.filter((p) => !activeType || p.type === activeType);
      if (sortEl.value === "asc") l = [...l].sort((a, b) => a.price - b.price);
      if (sortEl.value === "desc") l = [...l].sort((a, b) => b.price - a.price);
      filterEl.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.t === activeType));
      countEl.textContent = `${l.length} produktů`;
      gridEl.innerHTML = l.length ? l.map(card).join("") : '<p class="empty">Nic jsme nenašli. Zkus jiný výraz.</p>';
    }
    filterEl.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { activeType = b.dataset.t; render(); } });
    sortEl.addEventListener("change", render);
    render();
  }

  function pageProduct() {
    const p = byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
    const c = catById(p.cat);
    document.title = p.name + " | Dirty Pulls";
    const related = PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat).slice(0, 3)
      .concat(p.cat === "prislusenstvi" ? [] : PRODUCTS.filter((x) => x.cat === "prislusenstvi").slice(0, 1));
    document.getElementById("product").innerHTML = `
      <div class="crumbs"><a href="index.html">Úvod</a><span>/</span><a href="kategorie.html?c=${c.id}">${esc(c.name)}</a><span>/</span><span>${esc(p.name)}</span></div>
      <div class="pdetail">
        <div class="pdetail-media">${art(p, "big")}<span class="pcard-flags">${badges(p)}</span></div>
        <div class="pinfo">
          <span class="pcat">${esc(c.name)} · ${esc(p.type)}</span>
          <h1>${esc(p.name)}</h1>
          <p class="lead">${esc(p.desc)}</p>
          <div class="buybox">
            <div class="price big">${czk(p.price)}</div>
            <div class="stock big"><span class="dot-off"></span>Není skladem</div>
            <button class="btn wide" data-watch="${p.id}">${BELL}Hlídat dostupnost</button>
          </div>
          <dl class="params">
            <dt>Obsah balení</dt><dd>${esc(p.contents)}</dd>
            <dt>Hra</dt><dd>${esc(c.name)}</dd>
            <dt>Typ</dt><dd>${esc(p.type)}</dd>
            ${p.lang ? `<dt>Jazyk</dt><dd>${p.lang === "EN" ? "anglicky" : esc(p.lang)}</dd>` : ""}
            <dt>Stav</dt><dd>nový, originálně zapečetěný</dd>
          </dl>
          <ul class="perks">
            <li>Originální zboží od oficiálních distributorů v EU</li>
            <li>Balíme do bubliny a pevné krabice</li>
            <li>Doprava zdarma od 2 000 Kč</li>
          </ul>
        </div>
      </div>
      <h2 class="section-title">Mohlo by se hodit</h2>
      <div class="grid">${related.map(card).join("")}</div>`;
  }

  function pageCart() {
    document.getElementById("cart").innerHTML = `<div class="empty-cart">
      <div class="empty-ico">${CART}</div>
      <h2>Košík je zatím prázdný</h2>
      <p>Objednávky spustíme brzy. Do té doby si můžeš prohlédnout nabídku a nechat si hlídat dostupnost.</p>
      <a class="btn" href="kategorie.html">Prohlédnout nabídku</a>
    </div>`;
  }

  // ---------- start ----------
  document.getElementById("header").innerHTML = header();
  document.getElementById("footer").innerHTML = footer();
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-watch]");
    if (b) { e.preventDefault(); watchModal(byId(b.dataset.watch)); }
  });
  document.querySelectorAll(".info-nav a").forEach((a) => {
    if (location.pathname.endsWith("/" + a.getAttribute("href"))) a.classList.add("active");
  });
  if (page === "home") pageHome();
  if (page === "kategorie") pageCategory();
  if (page === "produkt") pageProduct();
  if (page === "kosik") pageCart();
})();
