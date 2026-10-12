(function () {
  const CATS = window.DP_CATEGORIES;
  const PRODUCTS = window.DP_PRODUCTS;
  const CART_KEY = "dp_cart";

  const czk = (n) => n.toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catById = (id) => CATS.find((c) => c.id === id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---- košík (jen v prohlížeči) ----
  let memCart = {};
  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return memCart; }
  }
  function saveCart(c) {
    memCart = c;
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    updateCartBadge();
  }
  function addToCart(id, qty) {
    const c = loadCart();
    c[id] = (c[id] || 0) + (qty || 1);
    saveCart(c);
    toast("Přidáno do košíku");
  }
  function cartTotals() {
    const c = loadCart();
    let count = 0, total = 0;
    Object.keys(c).forEach((id) => { const p = byId(id); if (p) { count += c[id]; total += c[id] * p.price; } });
    return { count, total };
  }
  function updateCartBadge() {
    const t = cartTotals();
    document.querySelectorAll("[data-cart-count]").forEach((el) => (el.textContent = t.count));
    document.querySelectorAll("[data-cart-total]").forEach((el) => (el.textContent = czk(t.total)));
  }

  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 1800);
  }

  // ---- sdílené kusy ----
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
  const CART_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>';

  function header() {
    const page = document.body.dataset.page;
    const activeCat = new URLSearchParams(location.search).get("c");
    const nav = CATS.map((c) => `<a href="kategorie.html?c=${c.id}" class="${page === "kategorie" && activeCat === c.id ? "active" : ""}">${esc(c.short)}</a>`).join("");
    return `
      <div class="mockbar">Ukázková verze e-shopu – objednávky zatím nepřijímáme.</div>
      <header class="site-header">
        <div class="wrap head-row">
          <a href="index.html" class="logo" aria-label="Dirty Pulls – úvod">
            <span class="logo-star">${STAR}</span>
            <span class="logo-text"><span>DIRTY</span><span class="grad">PULLS</span></span>
          </a>
          <form class="search" action="kategorie.html" role="search">
            <input type="search" name="q" placeholder="Vyhledat" aria-label="Vyhledat">
          </form>
          <a href="kosik.html" class="cart-btn" aria-label="Košík">
            ${CART_ICON}<span data-cart-total>0 Kč</span><span class="cart-count" data-cart-count>0</span>
          </a>
        </div>
        <nav class="main-nav"><div class="wrap">${nav}</div></nav>
      </header>`;
  }

  function footer() {
    return `
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
            <h4>Kontakt</h4>
            <a href="https://www.instagram.com/dirtypulls.cz/" target="_blank" rel="noopener">Instagram @dirtypulls.cz</a>
            <span>Doubravčice, Česká republika</span>
          </div>
        </div>
        <div class="wrap foot-note">© ${new Date().getFullYear()} Dirty Pulls · Ukázková verze, ceny jsou ilustrační. Všechny ochranné známky patří jejich vlastníkům.</div>
      </footer>`;
  }

  function art(p, big) {
    const cat = catById(p.cat);
    return `<div class="art art-${p.cat}${big ? " big" : ""}">
      <div class="art-card"><span class="art-l">${esc(p.label)}</span><span class="art-s">${esc(p.sub)}</span></div>
      <span class="art-foot">${esc(cat.name.toUpperCase())}</span>
    </div>`;
  }

  function badge(p) {
    if (!p.badge) return "";
    const cls = p.badge === "Novinka" ? "new" : p.badge === "Předprodej" ? "pre" : p.badge === "JP" ? "jp" : "soon";
    return `<span class="badge ${cls}">${esc(p.badge)}</span>`;
  }

  function card(p) {
    const buyable = p.stock === "Skladem" || p.stock === "Předprodej";
    return `<article class="pcard">
      <a href="produkt.html?id=${p.id}" class="pcard-link">${art(p)}</a>
      <div class="pcard-body">
        <div class="badges">${badge(p)}</div>
        <a href="produkt.html?id=${p.id}" class="pname">${esc(p.name)}</a>
        <div class="price">${czk(p.price)}</div>
        ${buyable
          ? `<button class="btn" data-add="${p.id}">${CART_ICON}Do košíku</button>`
          : `<button class="btn ghost" disabled>${esc(p.stock)}</button>`}
      </div>
    </article>`;
  }

  // ---- stránky ----
  function pageHome() {
    const tabs = [
      { id: "new", label: "Novinka", list: PRODUCTS.filter((p) => p.badge === "Novinka") },
      { id: "soon", label: "Brzy", list: PRODUCTS.filter((p) => p.badge === "Brzy" || p.badge === "Předprodej") }
    ];
    const tabsEl = document.getElementById("home-tabs");
    const gridEl = document.getElementById("home-grid");
    function show(i) {
      tabsEl.querySelectorAll("button").forEach((b, j) => b.classList.toggle("active", i === j));
      gridEl.innerHTML = tabs[i].list.map(card).join("");
    }
    tabsEl.innerHTML = tabs.map((t) => `<button type="button">${t.label}<span class="count">${t.list.length}</span></button>`).join("");
    tabsEl.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => show(i)));
    show(0);

    document.getElementById("home-cats").innerHTML = CATS.map((c) => `
      <a class="catcard cat-${c.id}" href="kategorie.html?c=${c.id}">
        <span class="catcard-name">${esc(c.name)}</span>
        <span class="catcard-tag">${esc(c.tagline)}</span>
        <span class="catcard-count">${PRODUCTS.filter((p) => p.cat === c.id).length} produktů →</span>
      </a>`).join("");
  }

  function pageCategory() {
    const qs = new URLSearchParams(location.search);
    const c = catById(qs.get("c"));
    const q = (qs.get("q") || "").trim().toLowerCase();
    let list = PRODUCTS;
    let title = "Všechny produkty", tag = "Celá nabídka napříč kategoriemi.";
    if (c) { list = list.filter((p) => p.cat === c.id); title = c.name; tag = c.tagline; }
    if (q) { list = list.filter((p) => p.name.toLowerCase().includes(q)); title = `Hledání: „${qs.get("q")}“`; tag = `${list.length} výsledků`; }
    document.getElementById("cat-title").textContent = title;
    document.getElementById("cat-tag").textContent = tag;
    document.getElementById("crumb").innerHTML = `<a href="index.html">Úvod</a> / <span>${esc(title)}</span>`;
    document.title = title + " | Dirty Pulls";

    const types = [...new Set(list.map((p) => p.type))];
    const filterEl = document.getElementById("cat-filters");
    const sortEl = document.getElementById("cat-sort");
    const gridEl = document.getElementById("cat-grid");
    let activeType = "";
    filterEl.innerHTML = ["", ...types].map((t) => `<button type="button" data-t="${esc(t)}">${t ? esc(t) : "Vše"}</button>`).join("");
    function render() {
      let l = list.filter((p) => !activeType || p.type === activeType);
      if (sortEl.value === "asc") l = [...l].sort((a, b) => a.price - b.price);
      if (sortEl.value === "desc") l = [...l].sort((a, b) => b.price - a.price);
      filterEl.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.t === activeType));
      gridEl.innerHTML = l.length ? l.map(card).join("") : '<p class="empty">Nic jsme nenašli.</p>';
    }
    filterEl.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { activeType = b.dataset.t; render(); } });
    sortEl.addEventListener("change", render);
    render();
  }

  function pageProduct() {
    const p = byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
    const c = catById(p.cat);
    document.title = p.name + " | Dirty Pulls";
    const buyable = p.stock === "Skladem" || p.stock === "Předprodej";
    document.getElementById("product").innerHTML = `
      <div class="crumbs"><a href="index.html">Úvod</a> / <a href="kategorie.html?c=${c.id}">${esc(c.name)}</a> / <span>${esc(p.name)}</span></div>
      <div class="pdetail">
        ${art(p, true)}
        <div class="pinfo">
          <div class="badges">${badge(p)}</div>
          <h1>${esc(p.name)}</h1>
          <div class="price big">${czk(p.price)}</div>
          <dl class="params">
            <dt>Dostupnost</dt><dd class="${p.stock === "Skladem" ? "ok" : ""}">${esc(p.stock)}</dd>
            <dt>Kategorie</dt><dd>${esc(c.name)}</dd>
            <dt>Typ</dt><dd>${esc(p.type)}</dd>
            ${p.lang ? `<dt>Jazyk</dt><dd>${esc(p.lang)}</dd>` : ""}
          </dl>
          <div class="buy">
            <input type="number" min="1" value="1" id="qty" aria-label="Množství" ${buyable ? "" : "disabled"}>
            ${buyable ? `<button class="btn" id="buy">${CART_ICON}Do košíku</button>` : `<button class="btn ghost" disabled>${esc(p.stock)}</button>`}
          </div>
          <p class="note">Originální zapečetěné produkty od oficiálních distributorů v EU. Balíme do bubliny a pevné krabice, aby tvůj pull dorazil v pořádku.</p>
        </div>
      </div>
      <h2 class="section-title">Mohlo by se hodit</h2>
      <div class="grid">${PRODUCTS.filter((x) => x.id !== p.id && (x.cat === p.cat || x.cat === "prislusenstvi")).slice(0, 4).map(card).join("")}</div>`;
    const buy = document.getElementById("buy");
    if (buy) buy.addEventListener("click", () => addToCart(p.id, Math.max(1, parseInt(document.getElementById("qty").value, 10) || 1)));
  }

  function pageCart() {
    const el = document.getElementById("cart");
    function render() {
      const c = loadCart();
      const ids = Object.keys(c).filter((id) => byId(id) && c[id] > 0);
      if (!ids.length) {
        el.innerHTML = `<div class="empty-cart"><p>Košík je prázdný.</p><a class="btn" href="index.html">Zpět do obchodu</a></div>`;
        return;
      }
      const t = cartTotals();
      el.innerHTML = `
        <div class="cart-list">
          ${ids.map((id) => { const p = byId(id); return `
            <div class="cart-row">
              <div class="cart-art">${art(p)}</div>
              <a class="pname" href="produkt.html?id=${p.id}">${esc(p.name)}</a>
              <div class="qty">
                <button type="button" data-dec="${id}" aria-label="Ubrat">−</button>
                <span>${c[id]}</span>
                <button type="button" data-inc="${id}" aria-label="Přidat">+</button>
              </div>
              <div class="price">${czk(p.price * c[id])}</div>
              <button type="button" class="remove" data-rm="${id}" aria-label="Odebrat">×</button>
            </div>`; }).join("")}
        </div>
        <aside class="cart-sum">
          <div class="sum-row"><span>Mezisoučet</span><span>${czk(t.total)}</span></div>
          <div class="sum-row"><span>Doprava</span><span>${t.total >= 1500 ? "Zdarma" : "od 79 Kč"}</span></div>
          <div class="sum-row total"><span>Celkem</span><span>${czk(t.total)}</span></div>
          <button class="btn wide" id="checkout">Pokračovat k objednávce</button>
          <p class="note">Doprava zdarma od 1 500 Kč.</p>
        </aside>`;
    }
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const c = loadCart();
      if (b.dataset.inc) c[b.dataset.inc]++;
      else if (b.dataset.dec) { c[b.dataset.dec]--; if (c[b.dataset.dec] <= 0) delete c[b.dataset.dec]; }
      else if (b.dataset.rm) delete c[b.dataset.rm];
      else if (b.id === "checkout") { toast("Ukázková verze – objednávky spustíme brzy."); return; }
      else return;
      saveCart(c);
      render();
    });
    render();
  }

  // ---- start ----
  document.getElementById("header").innerHTML = header();
  document.getElementById("footer").innerHTML = footer();
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (b) addToCart(b.dataset.add, 1);
  });
  const page = document.body.dataset.page;
  if (page === "home") pageHome();
  if (page === "kategorie") pageCategory();
  if (page === "produkt") pageProduct();
  if (page === "kosik") pageCart();
  updateCartBadge();
})();
