(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const SECTIONS = ["about", "education", "research", "publications", "experience", "skills", "certificates", "aspirations", "referees", "contact"];

  let lang = store.get("lang") || ((navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en");
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
    $("#langBtn").textContent = lang === "en" ? "FR" : "EN";
    document.querySelectorAll("[data-i18n]").forEach(n => { const v = get(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });

    const nav = $("#nav"); nav.replaceChildren();
    SECTIONS.forEach(id => { const a = el("a", null, T[lang].nav[id]); a.href = "#" + id; a.dataset.id = id; nav.append(a); });

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

    const exp = $("#expList"); exp.replaceChildren();
    EXP.forEach(e => { const x = e[lang]; exp.append(entry(x.when, x.t, x.w, x.b, x.k)); });

    const sk = $("#skillList"); sk.replaceChildren();
    SKILLS[lang].forEach(([a, b]) => sk.append(el("dt", null, a), el("dd", null, b)));

    renderFilters(); renderCerts();

    const rf = $("#refList"); rf.replaceChildren();
    REFS.forEach(r => { const c = el("div", "ref"); c.append(el("p", "role", r[lang].role), el("h3", null, r.name), el("p", null, r[lang].d)); rf.append(c); });

    $("#updated").textContent = fmtDate(UPDATED) + ".";
    spy();
  }

  function spy() {
    let cur = "";
    SECTIONS.forEach(id => { const s = document.getElementById(id); if (s && s.getBoundingClientRect().top < 140) cur = id; });
    document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.id === cur));
  }

  $("#langBtn").addEventListener("click", () => { lang = lang === "en" ? "fr" : "en"; store.set("lang", lang); render(); });
  $("#themeBtn").addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark"; store.set("theme", root.dataset.theme);
  });
  $("#menuBtn").addEventListener("click", () => { const open = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", String(open)); });
  $("#nav").addEventListener("click", e => { if (e.target.tagName === "A") { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); } });
  $("#copyMail").addEventListener("click", async () => {
    const b = $("#copyMail");
    try { await navigator.clipboard.writeText($("#mail").textContent); b.textContent = T[lang].contact.copied; setTimeout(() => (b.textContent = T[lang].contact.copy), 1600); }
    catch (e) { const r = document.createRange(); r.selectNodeContents($("#mail")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  });
  $("#lbClose").addEventListener("click", () => $("#lightbox").close());
  $("#lbPrev").addEventListener("click", () => step(-1));
  $("#lbNext").addEventListener("click", () => step(1));
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") e.target.close(); });
  $("#lightbox").addEventListener("keydown", e => { if (!lb.c || lb.c.imgs.length < 2) return; if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
  addEventListener("scroll", spy, { passive: true });

  render();
})();
