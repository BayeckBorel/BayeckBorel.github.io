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
    $("#langBtn").textContent = lang === "en" ? "FR" : "EN";
    document.querySelectorAll("[data-i18n]").forEach(n => { const v = get(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });

    const tg = $("#tagline"), parts = T[lang].hero.lede.split(" | "); tg.replaceChildren();
    if (parts.length === 3) tg.append(el("p", "role", parts[0]), el("p", "field", parts[1]), el("p", "pill", parts[2]));
    else tg.append(el("p", "field", T[lang].hero.lede));

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

  function spy() {
    let cur = "";
    SECTIONS.forEach(id => { const s = document.getElementById(id); if (s && s.getBoundingClientRect().top < 140) cur = id; });
    document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.id === cur));
  }

  $("#langBtn").addEventListener("click", () => { lang = lang === "en" ? "fr" : "en"; store.set("lang", lang); render(); });
  $("#themeBtn").addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme === "dark";
    root.dataset.theme = dark ? "light" : "dark"; store.set("theme", root.dataset.theme);
  });
  $("#menuBtn").addEventListener("click", () => { const open = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", String(open)); });
  $("#nav").addEventListener("click", e => { if (e.target.tagName === "A") { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); } });
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

  /* Motif anime : neurones relies par des synapses ou passent des signaux, molecules en hexagone,
     et une double helice d'ADN au bas du bandeau. */
  function motif(cv, host, o) {
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext("2d"), still = matchMedia("(prefers-reduced-motion: reduce)").matches, fixed = host === window;
    let W = 0, H = 0, pts = [], hexes = [], pulses = [], raf = 0, on = true, t = 0, rgb = o.rgb || "22,70,127";
    const rnd = (a, b) => a + Math.random() * (b - a);
    function size() {
      const d = Math.min(devicePixelRatio || 1, 2);
      W = fixed ? innerWidth : host.clientWidth; H = fixed ? innerHeight : host.clientHeight;
      cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.max(14, Math.min(o.max, Math.round(W * H / o.density)));
      pts = Array.from({ length: n }, () => ({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-.22, .22), vy: rnd(-.22, .22), r: Math.random() < .22 ? 3.4 : 1.9 }));
      hexes = Array.from({ length: Math.max(2, Math.round(W * H / o.hexDensity)) }, () => ({ x: rnd(0, W), y: rnd(0, H), s: rnd(14, 30), a: rnd(0, 6.28), va: rnd(-.003, .003), vx: rnd(-.1, .1), vy: rnd(-.1, .1) }));
      pulses = [];
    }
    function frame() {
      if (!o.rgb && t % 40 === 0) rgb = getComputedStyle(document.documentElement).getPropertyValue("--motif").trim() || rgb;
      t++; ctx.clearRect(0, 0, W, H);
      const c = a => `rgba(${rgb},${a})`, R = o.reach, edges = [];
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) for (let k = i + 1; k < pts.length; k++) {
        const p = pts[i], q = pts[k], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < R) { ctx.strokeStyle = c((1 - d / R) * o.line); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); edges.push([p, q]); }
      }
      if (edges.length && pulses.length < o.pulses && Math.random() < .08) { const e = edges[(Math.random() * edges.length) | 0]; pulses.push({ a: e[0], b: e[1], p: 0, s: rnd(.01, .022) }); }
      pulses = pulses.filter(q => (q.p += q.s) < 1);
      for (const q of pulses) {
        const x = q.a.x + (q.b.x - q.a.x) * q.p, y = q.a.y + (q.b.y - q.a.y) * q.p;
        ctx.fillStyle = c(o.node * .28); ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fill();
        ctx.fillStyle = c(Math.min(1, o.node * 1.3)); ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.283); ctx.fill();
      }
      for (const p of pts) {
        ctx.fillStyle = c(o.node * (p.r > 3 ? 1 : .7)); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        if (p.r > 3) { ctx.strokeStyle = c(o.node * .4); ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 4, 0, 6.283); ctx.stroke(); }
      }
      ctx.lineWidth = 1.2;
      for (const x of hexes) {
        x.x += x.vx; x.y += x.vy; x.a += x.va;
        if (x.x < -40) x.x = W + 40; if (x.x > W + 40) x.x = -40; if (x.y < -40) x.y = H + 40; if (x.y > H + 40) x.y = -40;
        const v = i => [x.x + x.s * Math.cos(x.a + i * Math.PI / 3), x.y + x.s * Math.sin(x.a + i * Math.PI / 3)];
        const w = i => [x.x + x.s * .74 * Math.cos(x.a + i * Math.PI / 3), x.y + x.s * .74 * Math.sin(x.a + i * Math.PI / 3)];
        ctx.strokeStyle = c(o.hex); ctx.beginPath(); for (let i = 0; i < 6; i++) { const p = v(i); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); } ctx.closePath(); ctx.stroke();
        ctx.beginPath(); for (let i = 0; i < 6; i += 2) { const p = w(i), q = w(i + 1); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); } ctx.stroke();
      }
      if (o.helix) {
        const base = H - 44, A = 15, k = 2 * Math.PI / 170, ph = t * .018;
        for (let x = 0; x <= W; x += 17) { const s = Math.sin(x * k + ph); ctx.strokeStyle = c(.1 + .22 * Math.abs(Math.cos(x * k + ph))); ctx.beginPath(); ctx.moveTo(x, base + A * s); ctx.lineTo(x, base - A * s); ctx.stroke(); }
        ctx.lineWidth = 1.6;
        for (const sh of [0, Math.PI]) { ctx.strokeStyle = c(.5); ctx.beginPath(); for (let x = 0; x <= W; x += 6) { const y = base + A * Math.sin(x * k + ph + sh); if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); }
      }
      if (!still && on) raf = requestAnimationFrame(frame);
    }
    const restart = () => { cancelAnimationFrame(raf); size(); frame(); };
    if (fixed) { let tm; addEventListener("resize", () => { clearTimeout(tm); tm = setTimeout(restart, 150); }); restart(); }
    else if ("ResizeObserver" in window) new ResizeObserver(restart).observe(host); else restart();
    document.addEventListener("visibilitychange", () => { const v = !document.hidden; if (v && !on) { on = true; cancelAnimationFrame(raf); frame(); } else on = v; });
  }
  motif($("#net"), $("#net") && $("#net").parentElement, { rgb: "190,225,255", max: 70, density: 15000, reach: 135, line: .34, node: .8, hex: .24, hexDensity: 160000, pulses: 8, helix: true });
  motif($("#bg"), window, { max: 46, density: 30000, reach: 150, line: .13, node: .24, hex: .17, hexDensity: 200000, pulses: 5 });

  /* Apparition douce des rubriques au defilement. */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("main section").forEach(sec => { if (sec.getBoundingClientRect().top > innerHeight * .9) { sec.classList.add("reveal"); io.observe(sec); } });
    setTimeout(() => document.querySelectorAll(".reveal").forEach(x => x.classList.add("in")), 4000);
  }
})();
