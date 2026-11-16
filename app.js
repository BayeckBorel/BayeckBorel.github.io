(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const SECTIONS = ["about", "education", "research", "publications", "experience", "skills", "certificates", "aspirations", "referees", "contact"];

  let lang = "en"; /* le site s'ouvre toujours en anglais ; le bouton de langue est cache */
  let filter = "all";
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), T[lang]);

  function fmtDate(d) {
    if (d.length === 4) return d;
    return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d + "T12:00:00"));
  }

  function entry(when, title, where, bullets, kind) {
    const e = el("div", "entry");
    e.append(el("div", "when", when));
    const b = el("div");
    const h = el("h3", null, title);
    if (kind) h.append(el("span", "kind", kind));
    b.append(h, el("p", "where", where));
    if (bullets && bullets.length) { const ul = el("ul"); bullets.forEach(x => ul.append(el("li", null, x))); b.append(ul); }
    e.append(b);
    return e;
  }

  function drawChart() {
    const W = 460, H = 300, L = 44, R = 20, Tp = 26, B = 78, min = 2, max = 4;
    const x = i => L + (W - L - R) * (GPA.length === 1 ? .5 : i / (GPA.length - 1)) * .86 + (W - L - R) * .07;
    const y = v => Tp + (H - Tp - B) * (1 - (v - min) / (max - min));
    const NS = "http://www.w3.org/2000/svg";
    const s = (tag, attrs, text) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; return n; };
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, "aria-hidden": "true" });
    [2, 2.5, 3, 3.5, 4].forEach(t => {
      svg.append(s("line", { x1: L, x2: W - R, y1: y(t), y2: y(t), stroke: "var(--line)", "stroke-width": 1 }));
      svg.append(s("text", { x: L - 8, y: y(t) + 4, "text-anchor": "end", "font-size": 11, fill: "var(--muted)" }, t.toFixed(1)));
    });
    const pts = GPA.map((p, i) => [x(i), y(p.v)]);
    svg.append(s("path", { d: `M${pts[0][0]},${y(min)} ` + pts.map(p => `L${p[0]},${p[1]}`).join(" ") + ` L${pts[pts.length - 1][0]},${y(min)} Z`, fill: "var(--accent-soft)" }));
    svg.append(s("path", { d: "M" + pts.map(p => p.join(",")).join(" L"), fill: "none", stroke: "var(--accent)", "stroke-width": 2.5, "stroke-linejoin": "round", "stroke-linecap": "round" }));
    GPA.forEach((p, i) => {
      const last = i === GPA.length - 1;
      svg.append(s("circle", { cx: pts[i][0], cy: pts[i][1], r: last ? 6.5 : 5, fill: last ? "var(--accent)" : "var(--surface)", stroke: "var(--accent)", "stroke-width": 2.5 }));
      svg.append(s("text", { x: pts[i][0], y: pts[i][1] - 13, "text-anchor": "middle", "font-size": 14, "font-weight": 600, fill: "var(--fg)" }, p.v.toFixed(2)));
      p[lang].forEach((line, j) => svg.append(s("text", { x: pts[i][0], y: H - B + 22 + j * 16, "text-anchor": "middle", "font-size": j === 0 ? 12.5 : 11.5, "font-weight": j === 0 ? 600 : 400, fill: j === 0 ? "var(--fg)" : "var(--muted)" }, line)));
    });
    const c = $("#chart"); c.replaceChildren(svg); c.setAttribute("aria-label", get("chart.aria"));
  }

  function drawTrain() {
    const cats = Object.keys(T[lang].cert.cats), years = [...new Set(CERTS.map(c => c.date.slice(0, 4)))].sort();
    const n = years.map(y => cats.map(k => CERTS.filter(c => c.date.slice(0, 4) === y && c.cat === k).length));
    const tot = n.map(r => r.reduce((a, b) => a + b, 0)), max = Math.max(...tot);
    const W = 560, H = 250, L = 30, R = 10, Tp = 22, B = 30, top = Math.ceil(max / 4) * 4;
    const NS = "http://www.w3.org/2000/svg";
    const s = (tag, attrs, text) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; };
    const y = v => Tp + (H - Tp - B) * (1 - v / top), band = (W - L - R) / years.length, bw = Math.min(54, band * .6);
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, "aria-hidden": "true" });
    for (let t = 0; t <= top; t += 4) {
      svg.append(s("line", { x1: L, x2: W - R, y1: y(t), y2: y(t), stroke: "var(--line)", "stroke-width": 1 }));
      svg.append(s("text", { x: L - 7, y: y(t) + 4, "text-anchor": "end", "font-size": 11, fill: "var(--muted)" }, t));
    }
    years.forEach((yr, i) => {
      const x = L + band * i + (band - bw) / 2; let acc = 0;
      cats.forEach((k, ci) => { const v = n[i][ci]; if (!v) return;
        svg.append(s("rect", { x, y: y(acc + v), width: bw, height: y(acc) - y(acc + v), fill: `var(--c-${k})`, stroke: "var(--surface)", "stroke-width": 1.5 })); acc += v; });
      svg.append(s("text", { x: x + bw / 2, y: y(acc) - 6, "text-anchor": "middle", "font-size": 13, "font-weight": 600, fill: "var(--fg)" }, tot[i]));
      svg.append(s("text", { x: x + bw / 2, y: H - 10, "text-anchor": "middle", "font-size": 12, fill: "var(--muted)" }, yr));
    });
    const box = $("#trainChart"); box.replaceChildren(svg); box.setAttribute("aria-label", T[lang].cert.chartAria(years, tot));
    const lg = $("#trainLegend"); lg.replaceChildren();
    cats.forEach(k => { const li = el("li"); const sw = el("i"); sw.style.background = `var(--c-${k})`; li.append(sw, document.createTextNode(T[lang].cert.cats[k])); lg.append(li); });
  }

  function renderCerts() {
    const t = T[lang].cert, grid = $("#certGrid");
    const list = CERTS.filter(c => filter === "all" || (filter === "doc" ? c.imgs.length : c.cat === filter));
    grid.replaceChildren();
    list.forEach(c => {
      const card = el("article", "cert");
      if (c.imgs.length) {
        const b = el("button", "cert-thumb"); b.type = "button"; b.setAttribute("aria-label", `${t.view}: ${c.title}`);
        const im = el("img"); im.src = "assets/certs/" + c.imgs[0]; im.alt = ""; im.loading = "lazy"; b.append(im);
        b.addEventListener("click", () => openLb(c, 0)); card.append(b);
      } else card.append(el("div", "cert-pending", t.pending));
      const body = el("div", "cert-body");
      body.append(el("h3", null, c.title), el("p", "cert-meta", `${c.org} · ${fmtDate(c.date)}` + (c.imgs.length > 1 ? ` · ${t.pages(c.imgs.length)}` : "")));
      if (c[lang]) body.append(el("p", "cert-extra", c[lang]));
      card.append(body); grid.append(card);
    });
    $("#certCount").textContent = t.count(list.length, CERTS.length);
  }

  function renderFilters() {
    const t = T[lang].cert, box = $("#filters"); box.replaceChildren();
    [["all", t.all], ["doc", t.withDoc]].concat(Object.keys(t.cats).map(k => [k, t.cats[k]])).forEach(([k, label]) => {
      const b = el("button", "chip", label); b.type = "button"; b.setAttribute("aria-pressed", String(filter === k));
      b.addEventListener("click", () => { filter = k; renderFilters(); renderCerts(); });
      box.append(b);
    });
  }

  let lb = { c: null, i: 0 };
  function showLb() {
    const n = lb.c.imgs.length;
    $("#lbImg").src = "assets/certs/" + lb.c.imgs[lb.i]; $("#lbImg").alt = lb.c.title;
    $("#lbTitle").textContent = lb.c.title;
    $("#lbPos").textContent = n > 1 ? `${lb.i + 1} / ${n}` : "";
    $("#lbPrev").hidden = $("#lbNext").hidden = n < 2;
  }
  function openLb(c, i) { lb = { c, i }; showLb(); $("#lightbox").showModal(); }
  function step(d) { const n = lb.c.imgs.length; lb.i = (lb.i + d + n) % n; showLb(); }

  function render() {
    document.documentElement.lang = lang;
    if ($("#langBtn")) $("#langBtn").textContent = lang === "en" ? "FR" : "EN";
    document.querySelectorAll("[data-i18n]").forEach(n => { const v = get(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });

    const tg = $("#tagline"), parts = T[lang].hero.lede.split(" | "); tg.replaceChildren();
    if (parts.length === 3) tg.append(el("p", "role", parts[0]), el("p", "field", parts[1]), el("p", "pill", parts[2]));
    else tg.append(el("p", "field", T[lang].hero.lede));

    buildTabs();

    const facts = $("#facts"); facts.replaceChildren();
    T[lang].facts.forEach(([n, l]) => { const li = el("li"); li.append(el("b", null, n), document.createTextNode(l)); facts.append(li); });

    const edu = $("#eduList"); edu.replaceChildren();
    EDU.forEach(e => edu.append(entry(e.when, e[lang].t, e[lang].w, e[lang].b)));
    drawChart();

    const hon = $("#honours"); hon.replaceChildren(); hon.className = "sub-block";
    hon.append(el("h3", null, T[lang].honoursTitle), entry(HONOURS.when, HONOURS[lang].t, HONOURS[lang].w, [HONOURS[lang].b]));
    const lg = $("#languages"); lg.replaceChildren(); lg.className = "sub-block";
    const tb = el("table", "lang-table"); LANGS[lang].forEach(([a, b]) => { const tr = el("tr"); tr.append(el("td", null, a), el("td", null, b)); tb.append(tr); });
    lg.append(el("h3", null, T[lang].languagesTitle), tb);

    const tags = $("#researchTags"); tags.replaceChildren(); T[lang].research.tags.forEach(x => tags.append(el("li", null, x)));

    const pubs = $("#pubList"); pubs.replaceChildren();
    PUBS.forEach(p => {
      const d = el("div", "pub"); d.append(el("span", "status", T[lang].pubStatus[p.status]));
      const a = el("p"); a.append(document.createTextNode(p.authors[0]), el("span", "me", p.authors[1]), document.createTextNode(p.authors[2]));
      const t = el("p"); t.append(el("em", null, p.title), document.createTextNode(p.venue ? " " + p.venue : ""));
      if (p.doi) { t.append(document.createTextNode(" DOI: ")); const l = el("a", null, p.doi); l.href = "https://doi.org/" + p.doi; l.target = "_blank"; l.rel = "noopener"; t.append(l); }
      d.append(a, t, el("p", "small", p[lang])); pubs.append(d);
    });
    const cf = el("div", "pub"); cf.append(el("span", "status", T[lang].conf), el("p", null, CONF[lang])); pubs.append(cf);

    const wk = $("#workGrid"); wk.replaceChildren();
    T[lang].work.items.forEach(w => {
      const c = el("article", "work"); const a = el("a", "work-link", w.link + " →"); a.href = w.href;
      if (w.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
      c.append(el("p", "work-fig", w.fig), el("h3", null, w.t), el("p", "work-d", w.d), a); wk.append(c);
    });

    const exp = $("#expList"), more = $("#expMore"); exp.replaceChildren(); more.replaceChildren();
    EXP.forEach(e => { const x = e[lang]; (e.top ? exp : more).append(entry(x.when, x.t, x.w, x.b, x.k)); });
    expLabel();

    const sk = $("#skillList"); sk.replaceChildren();
    SKILLS[lang].forEach(([a, b]) => sk.append(el("dt", null, a), el("dd", null, b)));

    drawTrain(); renderFilters(); renderCerts();
    const sel = $("#f-reason"), keep = sel.selectedIndex; sel.replaceChildren();
    T[lang].form.reasons.forEach(r => { const o = el("option", null, r); o.value = r; sel.append(o); });
    if (keep > 0) sel.selectedIndex = keep;

    const rf = $("#refList"); rf.replaceChildren();
    REFS.forEach(r => { const c = el("div", "ref"); c.append(el("p", "role", r[lang].role), el("h3", null, r.name), el("p", null, r[lang].d)); rf.append(c); });

    $("#updated").textContent = fmtDate(UPDATED) + ".";
    spy();
  }

  function expLabel() {
    const open = !$("#expMore").hidden;
    $("#expBtn").textContent = open ? T[lang].exp.less : T[lang].exp.more(EXP.filter(e => !e.top).length);
    $("#expBtn").setAttribute("aria-expanded", String(open));
  }

  /* ---------- Onglets : une rubrique a la fois, barre collante, progression au defilement ---------- */
  const TABS = ["about", "education", "research", "experience", "certificates", "contact"];
  const TL = {
    en: { about: "About", education: "Education", research: "Research", experience: "Experience & skills", certificates: "Certificates", contact: "Contact", next: "Next", prev: "Previous" },
    fr: { about: "Présentation", education: "Formation", research: "Recherche", experience: "Expérience et compétences", certificates: "Certificats", contact: "Contact", next: "Suivant", prev: "Précédent" }
  };
  let cur = "about";
  const panel = k => document.getElementById("panel-" + k);
  function stick() { const h = $(".top"); return h && getComputedStyle(h).position === "sticky" ? h.offsetHeight : 0; }

  function buildTabs() {
    const box = $("#tabs"); box.replaceChildren();
    TABS.forEach(k => {
      const b = el("button", "tab", TL[lang][k]); b.type = "button"; b.id = "tab-" + k; b.dataset.k = k;
      b.setAttribute("role", "tab"); b.setAttribute("aria-controls", "panel-" + k); box.append(b);
    });
    TABS.forEach((k, i) => {
      const p = panel(k); p.querySelectorAll(".pager").forEach(x => x.remove());
      const pg = el("div", "pager"); pg.setAttribute("role", "group");
      [[TABS[i - 1], "prev", "← " + TL[lang].prev], [TABS[i + 1], "next", TL[lang].next + " →"]].forEach(([t, cls, dir]) => {
        if (!t) { pg.append(el("span")); return; }
        const b = el("button", "pg " + cls); b.type = "button"; b.dataset.k = t;
        b.append(el("span", "pg-dir", dir), el("strong", null, TL[lang][t])); pg.append(b);
      });
      p.append(pg);
    });
    mark();
  }

  function mark() {
    TABS.forEach(k => {
      const on = k === cur, t = $("#tab-" + k);
      t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; panel(k).hidden = !on;
    });
  }

  function show(k, o) {
    o = o || {}; if (!TABS.includes(k)) k = "about";
    const changed = k !== cur; cur = k; mark();
    const p = panel(k);
    if (changed) { p.classList.remove("enter"); void p.offsetWidth; p.classList.add("enter"); }
    const tb = $("#tabs"), t = $("#tab-" + k);
    tb.scrollTo({ left: Math.max(0, t.offsetLeft - (tb.clientWidth - t.offsetWidth) / 2), behavior: o.instant ? "instant" : "smooth" });
    if (o.hash !== false) { try { history.replaceState(null, "", "#" + (o.id || k)); } catch (e) {} }
    if (o.scroll !== false) {
      const bar = $("#tabbar"), st = stick(), band = $(".hero-band");
      let y = band.offsetTop + band.offsetHeight - st;
      if (o.id) y = document.getElementById(o.id).getBoundingClientRect().top + scrollY - st - bar.offsetHeight - 14;
      scrollTo({ top: Math.max(0, y), behavior: o.instant ? "instant" : "smooth" });
    }
    progress();
  }

  function route(h, initial) {
    const id = decodeURIComponent((h || "").replace(/^#/, ""));
    if (!id || id === "home") { if (!initial) scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (TABS.includes(id)) return show(id, { instant: initial });
    const t = document.getElementById(id), pan = t && t.closest(".tabpanel");
    if (pan) show(pan.id.replace("panel-", ""), { id, instant: initial });
  }

  function progress() {
    const br = $("#tabbar").getBoundingClientRect().bottom, r = panel(cur).getBoundingClientRect();
    const total = r.height - (innerHeight - br);
    $("#tabprog").style.transform = "scaleX(" + (total > 0 ? Math.min(1, Math.max(0, (br - r.top) / total)) : 1) + ")";
  }
  function spy() {
    const hh = stick() + "px"; if (document.documentElement.style.getPropertyValue("--hh") !== hh) document.documentElement.style.setProperty("--hh", hh);
    progress();
  }

  $("#langBtn")?.addEventListener("click", () => { lang = lang === "en" ? "fr" : "en"; store.set("lang", lang); render(); });
  $("#themeBtn")?.addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme !== "light";
    root.dataset.theme = dark ? "light" : "dark"; store.set("theme", root.dataset.theme);
  });
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (a) { const h = a.getAttribute("href"); if (h === "#main") return; e.preventDefault(); route(h); return; }
    const t = e.target.closest(".tab, .pg"); if (t) show(t.dataset.k);
  });
  $("#tabs").addEventListener("keydown", e => {
    const i = TABS.indexOf(cur); let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length; else if (e.key === "ArrowLeft") n = (i + TABS.length - 1) % TABS.length;
    else if (e.key === "Home") n = 0; else if (e.key === "End") n = TABS.length - 1;
    if (n < 0) return; e.preventDefault(); show(TABS[n], { scroll: false }); $("#tab-" + TABS[n]).focus();
  });
  let sx = 0, sy = 0, skip = false;
  $("#main").addEventListener("touchstart", e => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; skip = !!e.target.closest("input,textarea,select,table,.filters,.chart-card"); }, { passive: true });
  $("#main").addEventListener("touchend", e => {
    if (skip) return; const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 90 && Math.abs(dx) > 2.2 * Math.abs(dy)) { const n = TABS[TABS.indexOf(cur) + (dx < 0 ? 1 : -1)]; if (n) show(n); }
  }, { passive: true });
  addEventListener("hashchange", () => route(location.hash));
  addEventListener("resize", spy);
  $("#copyMail").addEventListener("click", async () => {
    const b = $("#copyMail");
    try { await navigator.clipboard.writeText($("#mail").textContent); b.textContent = T[lang].contact.copied; setTimeout(() => (b.textContent = T[lang].contact.copy), 1600); }
    catch (e) { const r = document.createRange(); r.selectNodeContents($("#mail")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  });
  $("#expBtn").addEventListener("click", () => { $("#expMore").hidden = !$("#expMore").hidden; expLabel(); });
  $("#lbClose").addEventListener("click", () => $("#lightbox").close());
  $("#lbPrev").addEventListener("click", () => step(-1));
  $("#lbNext").addEventListener("click", () => step(1));
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") e.target.close(); });
  $("#lightbox").addEventListener("keydown", e => { if (!lb.c || lb.c.imgs.length < 2) return; if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
  addEventListener("scroll", spy, { passive: true });

  if (typeof FORM_ENDPOINT === "string" && FORM_ENDPOINT) {
    const f = $("#visitorForm"), st = $("#f-status"); f.hidden = false;
    f.addEventListener("submit", async e => {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      const t = T[lang].form; $("#f-send").disabled = true; st.textContent = t.sending;
      try {
        const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
        if (!r.ok) throw new Error(String(r.status));
        st.textContent = t.ok; f.reset();
      } catch (err) { st.textContent = t.fail; }
      $("#f-send").disabled = false;
    });
  }
  if (typeof GOATCOUNTER === "string" && GOATCOUNTER) {
    const g = document.createElement("script"); g.async = true; g.src = "https://gc.zgo.at/count.js";
    g.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`; document.head.append(g);
  }

  render();
  route(location.hash, true);
  spy();

  /* Fond anime : ADN en double helice, sequence du genome (A T G C) lue par une tete de lecture,
     chromosomes, cellules (membrane, noyau, organites) et neurones relies par des synapses. */
  function motif(cv, host, o) {
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext("2d"), still = matchMedia("(prefers-reduced-motion: reduce)").matches, fixed = host === window;
    let W = 0, H = 0, cells = [], nodes = [], helices = [], chroms = [], seqs = [], pulses = [], raf = 0, on = true, t = 0, rgb = o.rgb || "22,70,127";
    const rnd = (a, b) => a + Math.random() * (b - a), clamp = (v, a, b) => Math.max(a, Math.min(b, v)), BASES = "ATGC";
    function size() {
      const d = Math.min(devicePixelRatio || 1, 2), area = innerWidth * innerHeight;
      W = fixed ? innerWidth : host.clientWidth; H = fixed ? innerHeight : host.clientHeight;
      cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      const A = W * H;
      cells = o.cells === false ? [] : Array.from({ length: clamp(Math.round(A / o.cellDen), 3, o.maxCells) }, () => ({
        x: rnd(0, W), y: rnd(0, H), r: rnd(15, o.cellMax), vx: rnd(-.14, .14), vy: rnd(-.14, .14), ph: rnd(0, 6.28), rot: rnd(0, 6.28), vr: rnd(-.003, .003), nuc: rnd(.3, .44),
        org: Array.from({ length: 3 + ((Math.random() * 3) | 0) }, () => ({ a: rnd(0, 6.28), d: rnd(.52, .8), s: rnd(1.1, 2.3) }))
      }));
      nodes = Array.from({ length: clamp(Math.round(A / o.nodeDen), 10, 46) }, () => ({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-.2, .2), vy: rnd(-.2, .2), r: Math.random() < .2 ? 3.2 : 1.8 }));
      helices = Array.from({ length: o.helices }, (_, i) => ({
        x: rnd(.08, .92) * W, y: rnd(.1, .9) * H, a: i % 2 ? rnd(.5, 1.1) : rnd(-1.2, -.6), len: rnd(.32, .5) * Math.hypot(W, H), A: rnd(11, 17), wl: rnd(120, 170), sp: rnd(.012, .02), vx: rnd(-.1, .1), vy: rnd(-.08, .08)
      }));
      chroms = Array.from({ length: o.chroms }, () => ({ x: rnd(0, W), y: rnd(0, H), s: rnd(8, 13), a: rnd(0, 6.28), va: rnd(-.004, .004), vx: rnd(-.12, .12), vy: rnd(-.12, .12) }));
      const cols = Math.ceil(W / 15) + 4, startRows = o.seqs;
      seqs = Array.from({ length: startRows }, (_, i) => ({ y: (i + .7) * H / (startRows + .4) + rnd(-20, 20), off: rnd(0, 400), v: (i % 2 ? -1 : 1) * rnd(.18, .34), head: rnd(0, W), hv: rnd(.7, 1.3) * (i % 2 ? -1 : 1), s: Array.from({ length: cols }, () => BASES[(Math.random() * 4) | 0]) }));
      pulses = [];
    }
    function frame() {
      if (!o.rgb && t % 40 === 0) rgb = getComputedStyle(document.documentElement).getPropertyValue("--motif").trim() || rgb;
      t++; ctx.clearRect(0, 0, W, H);
      const c = a => `rgba(${rgb},${Math.min(1, a * o.k)})`;

      /* sequence du genome */
      ctx.font = "600 12px ui-monospace,Consolas,Menlo,monospace"; ctx.textBaseline = "middle";
      for (const r of seqs) {
        r.off = (r.off + r.v) % 15; r.head += r.hv; if (r.head > W + 60) r.head = -60; if (r.head < -60) r.head = W + 60;
        for (let i = 0; i < r.s.length; i++) {
          const x = i * 15 - r.off - 15 * (r.v > 0 ? 1 : 0), dist = Math.abs(x - r.head), hot = dist < 54;
          ctx.fillStyle = c(hot ? .9 - dist / 90 : .17); ctx.fillText(r.s[i], x, r.y);
        }
        ctx.strokeStyle = c(.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.rect(r.head - 56, r.y - 9, 112, 18); ctx.stroke();
      }

      /* ADN */
      for (const h of helices) {
        h.x += h.vx; h.y += h.vy; if (h.x < -80 || h.x > W + 80) h.vx *= -1; if (h.y < -80 || h.y > H + 80) h.vy *= -1;
        const dx = Math.cos(h.a), dy = Math.sin(h.a), nx = -dy, ny = dx, k = 6.2832 / h.wl, ph = t * h.sp;
        ctx.lineWidth = 1.4;
        for (let s = -h.len / 2; s <= h.len / 2; s += h.wl / 8) {
          const q = Math.sin(s * k + ph), z = Math.cos(s * k + ph);
          ctx.strokeStyle = c((.1 + .3 * Math.abs(z)) * (o.hk || 1)); ctx.beginPath();
          ctx.moveTo(h.x + dx * s + nx * h.A * q, h.y + dy * s + ny * h.A * q); ctx.lineTo(h.x + dx * s - nx * h.A * q, h.y + dy * s - ny * h.A * q); ctx.stroke();
        }
        ctx.lineWidth = 1.8;
        for (const sh of [0, Math.PI]) {
          ctx.strokeStyle = c(.55 * (o.hk || 1)); ctx.beginPath();
          for (let s = -h.len / 2; s <= h.len / 2; s += 5) { const q = Math.sin(s * k + ph + sh), x = h.x + dx * s + nx * h.A * q, y = h.y + dy * s + ny * h.A * q; if (s > -h.len / 2) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
          ctx.stroke();
        }
      }

      /* cellules */
      for (const e of cells) {
        e.x += e.vx; e.y += e.vy; e.rot += e.vr; if (e.x < -e.r || e.x > W + e.r) e.vx *= -1; if (e.y < -e.r || e.y > H + e.r) e.vy *= -1;
        const w = 1 + .035 * Math.sin(t * .02 + e.ph), r = e.r * w;
        ctx.strokeStyle = c(.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 6.2832); ctx.stroke();
        ctx.strokeStyle = c(.18); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(e.x, e.y, r * .86, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = c(.2); ctx.beginPath(); ctx.arc(e.x + r * .06, e.y - r * .05, r * e.nuc, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = c(.5); ctx.beginPath(); ctx.arc(e.x + r * .06, e.y - r * .05, r * e.nuc, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = c(.7); ctx.beginPath(); ctx.arc(e.x + r * .1, e.y - r * .02, Math.max(1.6, r * .09), 0, 6.2832); ctx.fill();
        for (const g of e.org) { const a = g.a + e.rot; ctx.fillStyle = c(.48); ctx.beginPath(); ctx.arc(e.x + Math.cos(a) * r * g.d, e.y + Math.sin(a) * r * g.d, g.s, 0, 6.2832); ctx.fill(); }
      }

      /* chromosomes */
      ctx.lineCap = "round";
      for (const h of chroms) {
        h.x += h.vx; h.y += h.vy; h.a += h.va; if (h.x < 0 || h.x > W) h.vx *= -1; if (h.y < 0 || h.y > H) h.vy *= -1;
        ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(h.a); ctx.strokeStyle = c(.55); ctx.lineWidth = 4.2;
        ctx.beginPath(); ctx.moveTo(-h.s, -h.s * 1.25); ctx.quadraticCurveTo(-h.s * .15, 0, h.s, h.s * 1.25); ctx.moveTo(h.s, -h.s * 1.25); ctx.quadraticCurveTo(h.s * .15, 0, -h.s, h.s * 1.25); ctx.stroke();
        ctx.fillStyle = c(.85); ctx.beginPath(); ctx.arc(0, 0, 2.2, 0, 6.2832); ctx.fill(); ctx.restore();
      }
      ctx.lineCap = "butt";

      /* neurones et synapses */
      for (const p of nodes) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      const edges = []; ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) for (let k = i + 1; k < nodes.length; k++) {
        const p = nodes[i], q = nodes[k], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < o.reach) { ctx.strokeStyle = c((1 - d / o.reach) * .3); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); edges.push([p, q]); }
      }
      if (edges.length && pulses.length < 6 && Math.random() < .07) { const e = edges[(Math.random() * edges.length) | 0]; pulses.push({ a: e[0], b: e[1], p: 0, s: rnd(.012, .022) }); }
      pulses = pulses.filter(q => (q.p += q.s) < 1);
      for (const q of pulses) { const x = q.a.x + (q.b.x - q.a.x) * q.p, y = q.a.y + (q.b.y - q.a.y) * q.p; ctx.fillStyle = c(.28); ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.2832); ctx.fill(); ctx.fillStyle = c(.95); ctx.beginPath(); ctx.arc(x, y, 2.3, 0, 6.2832); ctx.fill(); }
      for (const p of nodes) { ctx.fillStyle = c(p.r > 3 ? .8 : .55); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); }

      if (!still && on) raf = requestAnimationFrame(frame);
    }
    const restart = () => { cancelAnimationFrame(raf); size(); frame(); };
    if (fixed) { let tm; addEventListener("resize", () => { clearTimeout(tm); tm = setTimeout(restart, 150); }); restart(); }
    else if ("ResizeObserver" in window) new ResizeObserver(restart).observe(host); else restart();
    document.addEventListener("visibilitychange", () => { const v = !document.hidden; if (v && !on) { on = true; cancelAnimationFrame(raf); frame(); } else on = v; });
  }
  motif($("#net"), $("#net") && $("#net").parentElement, { rgb: "122,132,150", k: .8, hk: 1.5, cells: false, cellDen: 52000, maxCells: 14, cellMax: 40, nodeDen: 30000, reach: 120, helices: 3, chroms: 3, seqs: 3 });
  motif($("#bg"), window, { k: .55, hk: 1.5, cellDen: 95000, maxCells: 14, cellMax: 48, nodeDen: 60000, reach: 150, helices: 3, chroms: 6, seqs: 3 });

  /* Photo : se souleve et s'incline vers la souris au survol. */
  (function () {
    const pw = $(".portrait-wrap"), pi = $(".portrait");
    if (!pw || !pi || !matchMedia("(hover: hover)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pw.addEventListener("pointerenter", () => pi.classList.add("lift"));
    pw.addEventListener("pointermove", e => {
      const r = pw.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      pi.style.setProperty("--ry", (x * 16).toFixed(2) + "deg"); pi.style.setProperty("--rx", (-y * 16).toFixed(2) + "deg");
    });
    pw.addEventListener("pointerleave", () => { pi.classList.remove("lift"); pi.style.setProperty("--rx", "0deg"); pi.style.setProperty("--ry", "0deg"); });
  })();

  /* Apparition douce des rubriques au defilement. */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("main section").forEach(sec => { if (sec.getBoundingClientRect().top > innerHeight * .9) { sec.classList.add("reveal"); io.observe(sec); } });
    setTimeout(() => document.querySelectorAll(".reveal").forEach(x => x.classList.add("in")), 4000);
  }
})();
