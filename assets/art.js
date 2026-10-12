// Generované ilustrace produktů (SVG) podle typu balení – dokud nejsou k dispozici fotky.
(function () {
  const PAL = {
    pokemon: ["#8a6cff", "#2ec4b6", "#4b3aa8"],
    mtg: ["#f2a65e", "#c2413a", "#7a2420"],
    lorcana: ["#5aa9ff", "#b06cf0", "#4a2f8a"],
    prislusenstvi: ["#e4e2ee", "#7d7a92", "#4a4760"]
  };
  let uid = 0;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function defs(id, c) {
    return `<defs>
      <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>
      <linearGradient id="s${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>
      <linearGradient id="f${id}" x1="0" y1="0" x2="1" y2="1"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <filter id="d${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#000" flood-opacity=".55"/></filter>
    </defs>`;
  }
  const T = (x, y, s, txt, fill, extra) => `<text x="${x}" y="${y}" font-family="Anton, Impact, sans-serif" font-size="${s}" fill="${fill}" text-anchor="middle" ${extra || ""}>${esc(txt)}</text>`;

  // 3D krabice: x,y levý horní roh čela, w,h čelo, d hloubka
  function box(id, x, y, w, h, d, l1, l2, opts) {
    const o = opts || {};
    const top = `M${x},${y} L${x + d},${y - d * .6} L${x + w + d},${y - d * .6} L${x + w},${y} Z`;
    const side = `M${x + w},${y} L${x + w + d},${y - d * .6} L${x + w + d},${y + h - d * .6} L${x + w},${y + h} Z`;
    const fs = Math.min(w / (Math.max(l1.length, 4) * .52), o.max || 30);
    return `<g filter="url(#d${id})">
      <path d="${side}" fill="url(#s${id})"/>
      <path d="${top}" fill="url(#g${id})" opacity=".75"/>
      <path d="${top}" fill="#fff" opacity=".18"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g${id})"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#f${id})"/>
      ${o.lid ? `<rect x="${x}" y="${y}" width="${w}" height="${h * .22}" fill="#000" opacity=".18"/>` : ""}
      <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" fill="none" stroke="#fff" stroke-opacity=".3"/>
      ${T(x + w / 2, y + h / 2 + fs * .2, fs, l1, "#15131f")}
      ${l2 ? T(x + w / 2, y + h / 2 + fs * .2 + 16, 11, l2, "#fff", 'letter-spacing="1"') : ""}
    </g>`;
  }

  function pack(id, cx, cy, w, h, rot, l1, l2) {
    const x = -w / 2, y = -h / 2, n = 10, zw = w / n;
    let zt = `M${x},${y + 6}`, zb = "";
    for (let i = 0; i < n; i++) zt += ` L${x + zw * (i + .5)},${y} L${x + zw * (i + 1)},${y + 6}`;
    zb = ` L${x + w},${y + h - 6}`;
    for (let i = n - 1; i >= 0; i--) zb += ` L${x + zw * (i + .5)},${y + h} L${x + zw * i},${y + h - 6}`;
    const d = zt + zb + " Z";
    return `<g transform="translate(${cx} ${cy}) rotate(${rot})" filter="url(#d${id})">
      <path d="${d}" fill="url(#g${id})"/>
      <path d="${d}" fill="url(#f${id})"/>
      <rect x="${x}" y="${y + 8}" width="${w}" height="10" fill="#000" opacity=".15"/>
      <rect x="${x}" y="${y + h - 18}" width="${w}" height="10" fill="#000" opacity=".15"/>
      ${T(0, 4, Math.min(22, w / (Math.max(l1.length, 4) * .5)), l1, "#15131f")}
      ${l2 ? T(0, 20, 9, l2, "#fff", 'letter-spacing="1"') : ""}
    </g>`;
  }

  function tin(id, l1, l2) {
    return `<g filter="url(#d${id})">
      <rect x="44" y="52" width="112" height="112" rx="16" fill="url(#s${id})"/>
      <rect x="40" y="46" width="120" height="30" rx="12" fill="url(#g${id})"/>
      <rect x="44" y="76" width="112" height="88" rx="14" fill="url(#g${id})"/>
      <rect x="44" y="76" width="112" height="88" rx="14" fill="url(#f${id})"/>
      <rect x="40" y="46" width="120" height="30" rx="12" fill="#fff" opacity=".18"/>
      ${T(100, 126, 22, l1, "#15131f")}${T(100, 144, 10, l2, "#fff", 'letter-spacing="1"')}
    </g>`;
  }

  function binder(id, l1, l2) {
    return `<g filter="url(#d${id})">
      <rect x="54" y="34" width="104" height="136" rx="8" fill="url(#g${id})"/>
      <rect x="54" y="34" width="104" height="136" rx="8" fill="url(#f${id})"/>
      <rect x="54" y="34" width="18" height="136" rx="6" fill="#000" opacity=".25"/>
      <circle cx="63" cy="62" r="3" fill="#fff" opacity=".6"/><circle cx="63" cy="102" r="3" fill="#fff" opacity=".6"/><circle cx="63" cy="142" r="3" fill="#fff" opacity=".6"/>
      <rect x="82" y="52" width="64" height="88" rx="4" fill="none" stroke="#fff" stroke-opacity=".35"/>
      ${T(114, 100, 16, l1, "#15131f")}${T(114, 116, 9, l2, "#fff", 'letter-spacing="1"')}
    </g>`;
  }

  function toploader(id, l1, l2) {
    return `<g filter="url(#d${id})" transform="rotate(-6 100 100)">
      <rect x="58" y="32" width="84" height="122" rx="6" fill="#fff" fill-opacity=".14" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>
      <rect x="66" y="46" width="68" height="100" rx="5" fill="url(#g${id})"/>
      <rect x="66" y="46" width="68" height="100" rx="5" fill="url(#f${id})"/>
      <rect x="58" y="32" width="84" height="12" rx="4" fill="#fff" opacity=".25"/>
      ${T(100, 100, 13, l1, "#15131f")}${T(100, 114, 8, l2, "#fff")}
    </g>`;
  }

  function sleeves(id, l1, l2) {
    let s = "";
    for (let i = 4; i >= 0; i--) s += `<rect x="${64 + i * 5}" y="${42 - i * 4}" width="70" height="98" rx="5" fill="#fff" fill-opacity="${.08 + (4 - i) * .04}" stroke="#fff" stroke-opacity=".4"/>`;
    return `<g filter="url(#d${id})">${s}
      <rect x="54" y="122" width="92" height="42" rx="6" fill="url(#g${id})"/>
      ${T(100, 145, 15, l1, "#15131f")}${T(100, 158, 8, l2, "#fff", 'letter-spacing="1"')}
    </g>`;
  }

  function pages(id, l1, l2) {
    let g = "";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) g += `<rect x="${66 + c * 24}" y="${46 + r * 32}" width="20" height="28" rx="2" fill="url(#g${id})" opacity="${.55 + ((r + c) % 2) * .3}"/>`;
    return `<g filter="url(#d${id})">
      <rect x="70" y="36" width="80" height="112" rx="4" fill="#fff" fill-opacity=".08" stroke="#fff" stroke-opacity=".25" transform="translate(10 -6)"/>
      <rect x="60" y="40" width="82" height="112" rx="4" fill="#fff" fill-opacity=".12" stroke="#fff" stroke-opacity=".5"/>${g}
      <rect x="54" y="140" width="92" height="30" rx="6" fill="url(#g${id})"/>
      ${T(100, 160, 13, l1, "#15131f")}
    </g>`;
  }

  function draw(p) {
    const id = ++uid, c = PAL[p.cat] || PAL.pokemon;
    const L = p.label, S = p.sub;
    let body;
    switch (p.type) {
      case "Booster Box": body = box(id, 34, 82, 112, 78, 26, L, S) + pack(id, 72, 70, 30, 46, -8, "", "") + pack(id, 104, 66, 30, 46, 6, "", ""); break;
      case "Booster": body = pack(id, 100, 100, 82, 132, -6, L, S); break;
      case "Elite Trainer Box": case "Illumineer's Trove": body = box(id, 46, 54, 92, 112, 22, L, S, { lid: true }); break;
      case "Kolekce": case "Bundle": body = box(id, 38, 68, 112, 92, 22, L, S, { lid: true }); break;
      case "Commander Deck": case "Starter Deck": body = box(id, 62, 50, 68, 112, 20, L.length > 8 ? "DECK" : L, S, { max: 22 }); break;
      case "Tin": body = tin(id, L, S); break;
      case "Album": case "Alba": body = binder(id, L, S); break;
      case "Toploadery": body = toploader(id, L, S); break;
      case "Obaly": body = sleeves(id, L, S); break;
      case "Stránky do alba": body = pages(id, L, S); break;
      default: body = box(id, 46, 60, 100, 100, 22, L, S);
    }
    return `<svg viewBox="0 0 200 200" class="art-svg" aria-hidden="true">${defs(id, c)}${body}</svg>`;
  }

  window.DP_ART = draw;
})();
