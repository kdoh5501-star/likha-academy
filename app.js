(function () {
  "use strict";
  var C = window.COURSE, VQ = window.VIDQ || [];
  var app = document.getElementById("app");

  /* ---------- storage (falls back to memory) ---------- */
  var mem = {};
  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; } }

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function week(n) { for (var i = 0; i < C.weeks.length; i++) if (C.weeks[i].n === n) return C.weeks[i]; return null; }
  function cur() { return load("lk:cur", 1); }

  /* ---------- speech ---------- */
  var voice = null, canSpeak = "speechSynthesis" in window;
  function pickVoice() { if (!canSpeak) return; var vs = speechSynthesis.getVoices(); for (var i = 0; i < vs.length; i++) if (/^ko/i.test(vs[i].lang)) { voice = vs[i]; return; } }
  if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(t) {
    if (!canSpeak) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(String(t).replace(/___/g, "")); u.lang = "ko-KR"; u.rate = 0.85; if (voice) u.voice = voice; speechSynthesis.speak(u); } catch (e) {}
  }
  document.addEventListener("click", function (e) { var el = e.target.closest("[data-say]"); if (el) speak(el.getAttribute("data-say")); });

  /* ---------- daily stats ---------- */
  function stats() {
    var s = load("lk:stats", { days: {}, best: 0 });
    var t = s.days[today()] || { done: 0, right: 0 };
    var streak = 0, d = new Date();
    for (;;) { var k = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); if (s.days[k] && s.days[k].done >= 50) { streak++; d.setDate(d.getDate() - 1); } else break; }
    return { s: s, t: t, streak: streak };
  }
  function record(right) {
    var s = load("lk:stats", { days: {}, best: 0 }), k = today();
    s.days[k] = s.days[k] || { done: 0, right: 0 }; s.days[k].done++; if (right) s.days[k].right++;
    save("lk:stats", s);
  }

  /* ---------- views ---------- */
  function home() {
    var st = stats(), c = cur(), w = week(c);
    var h = '<section class="hero">' +
      '<p class="hero-k" aria-hidden="true">오늘의 50</p>' +
      '<h1>Today\'s 50 questions</h1>' +
      '<p class="hero-n"><b>' + st.t.done + '</b> answered today' + (st.streak ? ' · ' + st.streak + '-day streak' : '') + '</p>' +
      '<div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="50" aria-valuenow="' + Math.min(st.t.done, 50) + '"><span style="width:' + Math.min(100, st.t.done * 2) + '%"></span></div>' +
      '<div class="hero-act"><a class="btn sun" href="#/quiz/' + c + '">Start 50 questions</a>' +
      '<a class="btn ghost" href="#/quiz/review">Review my mistakes</a></div>' +
      '<label class="weekpick">My class is in week <select id="curw">' +
      C.weeks.map(function (x) { return '<option value="' + x.n + '"' + (x.n === c ? " selected" : "") + ">" + x.n + "</option>"; }).join("") +
      '</select></label></section>';
    h += '<section class="now"><h2>This week: ' + esc(w.title) + '</h2><p>' + esc(w.goalKo) + '</p><p>' + esc(w.goalVid) + '</p>' +
      '<div class="row"><a class="btn" href="#/w' + c + '/korean">Korean</a><a class="btn" href="#/w' + c + '/video">Video</a><a class="btn" href="#/w' + c + '/homework">Homework</a></div></section>';
    h += '<p class="sched">' + esc(C.schedule) + '</p>';
    C.phases.forEach(function (p) {
      h += '<section class="phase"><h2><span class="pn">Phase ' + p.n + '</span> ' + esc(p.name) + '</h2>' +
        '<p class="pd">' + esc(p.ko) + '<br>' + esc(p.vid) + '</p><ol class="weeks">';
      p.weeks.forEach(function (n) {
        var x = week(n);
        h += '<li><a href="#/w' + n + '/korean"' + (n === c ? ' class="on"' : "") + '><span class="wn">' + n + '</span><span class="wt">' + esc(x.title) + '</span></a></li>';
      });
      h += "</ol></section>";
    });
    h += '<p class="center"><a class="btn ghost" href="#/resources">Textbooks, past papers and free footage</a></p>';
    app.innerHTML = h;
    var sel = document.getElementById("curw");
    sel.addEventListener("change", function () { save("lk:cur", +sel.value); home(); });
  }

  function weekHead(w, tab) {
    var tabs = [["korean", "Korean"], ["video", "Video"], ["homework", "Homework"]];
    return '<header class="wk"><p class="wk-p"><a href="#/">All weeks</a> / Phase ' + w.phase + '</p>' +
      '<h1><span class="big">' + w.n + '</span> ' + esc(w.title) + '</h1>' +
      '<p class="wk-test">Week check: ' + esc(w.test) + '</p>' +
      '<nav class="tabs" aria-label="Week sections">' + tabs.map(function (t) {
        return '<a href="#/w' + w.n + "/" + t[0] + '"' + (t[0] === tab ? ' aria-current="page"' : "") + ">" + t[1] + "</a>";
      }).join("") + '<a href="#/quiz/' + w.n + '/only">Quiz</a></nav></header>';
  }

  function pattern(rows, title) {
    return '<details class="pat"><summary>' + esc(title) + '</summary><table>' +
      rows.map(function (r) { return "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table></details>";
  }

  function korean(w) {
    var h = weekHead(w, "korean");
    h += '<section class="block"><h2>Goal</h2><p>' + esc(w.goalKo) + '</p>' +
      '<p class="day"><b>Tuesday</b> ' + esc(w.ko.tue) + '</p><p class="day"><b>Saturday</b> ' + esc(w.ko.sat) + '</p>' +
      pattern(C.koPattern, "How each 3-hour Korean class runs") + '</section>';
    if (w.ko.grammar) {
      h += '<section class="block"><h2>Grammar</h2><div class="gram">';
      w.ko.grammar.forEach(function (g) {
        h += '<article><h3>' + esc(g[0]) + '</h3><p>' + esc(g[1]) + '</p><button class="ex" data-say="' + esc(g[2].replace(/\s*\(.*\)$/, "")) + '">' + esc(g[2]) + '</button></article>';
      });
      h += "</div></section>";
    }
    w.ko.sections.forEach(function (s) {
      h += '<section class="block"><h2>' + esc(s.title) + ' <span class="cnt">' + s.items.length + '</span></h2>' + (s.note ? '<p class="note">' + esc(s.note) + "</p>" : "");
      if (s.type === "tiles") {
        h += '<div class="tiles">' + s.items.map(function (i) {
          var say = /^[ㄱ-ㅎ]$/.test(i[0]) ? i[0] + "아" : i[0];
          return '<button data-say="' + esc(say) + '"><span class="hk">' + esc(i[0]) + '</span><span class="rm">' + esc(i[1]) + "</span></button>";
        }).join("") + "</div>";
      } else {
        h += '<ul class="words">' + s.items.map(function (i) {
          return '<li><button data-say="' + esc(i[0]) + '"><span class="ko">' + esc(i[0]) + '</span><span class="rm">' + esc(i[1]) + '</span><span class="en">' + esc(i[2]) + "</span></button></li>";
        }).join("") + "</ul>";
      }
      h += "</section>";
    });
    if (w.ko.scripts) {
      h += '<section class="block"><h2>Client chat practice</h2><p class="note">Read both parts aloud. Tap a line to hear it. Cover the Korean and try to say it from the English.</p>';
      w.ko.scripts.forEach(function (sc) {
        h += '<details class="chat"><summary>' + esc(sc.title) + "</summary>" + sc.turns.map(function (t) {
          return '<button class="bub ' + t.who + '" data-say="' + esc(t.ko) + '"><span class="ko">' + esc(t.ko) + '</span><span class="rm">' + esc(t.rom) + '</span><span class="en">' + esc(t.en) + "</span></button>";
        }).join("") + "</details>";
      });
      h += "</section>";
    }
    h += '<p class="center"><a class="btn sun" href="#/quiz/' + w.n + '/only">Quiz this week</a></p>';
    return h;
  }

  function checks(id, items) {
    return '<ul class="checks">' + items.map(function (t, i) {
      var k = id + ":" + i;
      return '<li><label><input type="checkbox" data-k="' + k + '"' + (load(k, false) ? " checked" : "") + "> <span>" + esc(t) + "</span></label></li>";
    }).join("") + "</ul>";
  }

  function video(w) {
    var v = w.vid, h = weekHead(w, "video");
    h += '<section class="block"><h2>Goal</h2><p>' + esc(w.goalVid) + '</p>' + pattern(C.vidPattern, "How each 3-hour video class runs") + '</section>';
    if (w.links) {
      h += '<section class="block"><h2>Watch and practice</h2><p class="note">Tutorials and references open in YouTube. Use the free footage for practice edits, never downloaded YouTube videos.</p><ul class="links">';
      w.links.forEach(function (l) {
        h += '<li><a href="' + esc(l[2]) + '" target="_blank" rel="noopener"><span class="lt lt-' + l[0].toLowerCase() + '">' + esc(l[0]) + '</span><span>' + esc(l[1]) + "</span></a></li>";
      });
      h += "</ul></section>";
    }
    h += '<section class="block"><h2>' + esc(v.tue.title) + '</h2><ol class="steps">' + v.tue.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
    if (w.n <= 4) h += "<li>Practice block: repeat every step above on 3 new free clips until you can do it without help.</li><li>Speed drill: your teacher calls out an edit, you do it in under a minute.</li>";
    h += "</ol></section>";
    h += '<section class="block"><h2>' + esc(v.sat.title) + "</h2>";
    if (v.sat.blocks) {
      h += '<ol class="tl">' + v.sat.blocks.map(function (b) {
        return '<li><span class="tm">' + esc(b.t) + ' min</span><b>' + esc(b.name) + "</b>" + (b.steps.length ? "<ul>" + b.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "") + "</li>";
      }).join("") + "</ol>";
    } else {
      h += '<ol class="steps">' + v.sat.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
    }
    h += "</section>";
    h += '<section class="block deliver"><h2>' + esc(v.deliver.title) + "</h2>" + checks("lk:" + w.n + ":d", v.deliver.checks) + "</section>";
    h += '<section class="block"><h2>Common mistakes</h2><ul class="plain">' + v.mistakes.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul></section>";
    return h;
  }

  function homework(w) {
    var h = weekHead(w, "homework");
    [["mon", "Given out Monday", "m"], ["wed", "Given out Wednesday", "w"]].forEach(function (x) {
      var hw = w.hw[x[0]];
      h += '<section class="block sheet"><p class="note">' + x[1] + '</p><h2>Week ' + w.n + ": " + esc(hw.title) + "</h2>" + checks("lk:" + w.n + ":" + x[2], hw.items) +
        '<p class="sign">Name: ______________________ &nbsp; Done: ☐</p></section>';
    });
    h += '<p class="center"><button class="btn" id="pr">Print homework</button></p>';
    return h;
  }

  function resources() {
    var h = '<header class="wk"><p class="wk-p"><a href="#/">All weeks</a></p><h1>Textbooks and practice</h1></header><section class="block"><ul class="links">';
    C.resources.forEach(function (r) { h += '<li><a href="' + esc(r.u) + '" target="_blank" rel="noopener"><span>' + esc(r.t) + "</span></a></li>"; });
    h += '</ul><p class="note">The EPS-TOPIK test takes its questions from the official textbook, so study it unit by unit along with this course.</p></section>';
    app.innerHTML = h;
  }

  /* ---------- quiz ---------- */
  function wordPool(maxW, onlyW) {
    var out = [];
    C.weeks.forEach(function (w) {
      if (onlyW ? w.n !== onlyW : w.n > maxW) return;
      w.ko.sections.forEach(function (s, si) {
        s.items.forEach(function (i) { if (i[0].indexOf("___") < 0) out.push({ ko: i[0], rom: i[1], en: i[2], w: w.n, sec: w.n + ":" + si, tile: s.type === "tiles" }); });
      });
    });
    return out;
  }

  function choices(item, pool, field) {
    var same = pool.filter(function (p) { return p.sec === item.sec && p[field] !== item[field]; });
    var other = pool.filter(function (p) { return p.tile === item.tile && p[field] !== item[field]; });
    var seen = {}, out = [item[field]]; seen[item[field]] = 1;
    shuffle(same).concat(shuffle(other)).forEach(function (p) { if (out.length < 4 && !seen[p[field]]) { seen[p[field]] = 1; out.push(p[field]); } });
    return shuffle(out);
  }

  function makeQ(item, pool) {
    var types = item.tile ? ["rom"] : ["mean", "mean", "rev", "rom"];
    if (canSpeak && !item.tile) types.push("listen", "listen");
    var t = types[Math.floor(Math.random() * types.length)];
    var key = "w:" + item.ko;
    if (t === "mean") return { key: key, kind: "Meaning", say: item.ko, prompt: item.ko, big: true, ans: item.en, opts: choices(item, pool, "en"), item: item };
    if (t === "rev") return { key: key, kind: "Say it in Korean", prompt: item.en, ans: item.ko, opts: choices(item, pool, "ko"), item: item, koOpts: true };
    if (t === "listen") return { key: key, kind: "Listen", listen: item.ko, prompt: "Tap play, then choose what you heard", ans: item.ko, opts: choices(item, pool, "ko"), item: item, koOpts: true };
    return { key: key, kind: item.tile ? "Sound" : "How do you read it?", say: item.tile ? null : item.ko, prompt: item.ko, big: true, ans: item.rom, opts: choices(item, pool, "rom"), item: item };
  }

  function vidQ(v) { return { key: "v:" + v[1], kind: "Video editing", prompt: v[1], ans: v[2], opts: shuffle([v[2]].concat(v[3])), koOpts: /[가-힣]/.test(v[2]) }; }

  function buildQuiz(mode, n) {
    var qs = [], pool, vq;
    if (mode === "review") {
      var wrong = load("lk:wrong", []), all = wordPool(12);
      wrong.slice(-50).forEach(function (k) {
        if (k.indexOf("w:") === 0) { var it = all.filter(function (p) { return "w:" + p.ko === k; })[0]; if (it) qs.push(makeQ(it, all)); }
        else { var v = VQ.filter(function (x) { return "v:" + x[1] === k; })[0]; if (v) qs.push(vidQ(v)); }
      });
      return shuffle(qs);
    }
    var only = mode === "only";
    pool = wordPool(n, only ? n : 0);
    vq = VQ.filter(function (v) { return only ? v[0] === n : v[0] <= n; });
    var nowP = pool.filter(function (p) { return p.w >= n - 1; }), oldP = pool.filter(function (p) { return p.w < n - 1; });
    var nV = Math.min(vq.length, 8), nOld = only || !oldP.length ? 0 : 12, nNow = 50 - nV - nOld;
    function take(src, k) { var r = []; while (r.length < k && src.length) r = r.concat(shuffle(src)); return r.slice(0, k); }
    take(nowP.length ? nowP : pool, nNow).forEach(function (it) { qs.push(makeQ(it, pool)); });
    take(oldP, nOld).forEach(function (it) { qs.push(makeQ(it, pool)); });
    shuffle(vq).slice(0, nV).forEach(function (v) { qs.push(vidQ(v)); });
    return shuffle(qs);
  }

  function quiz(mode, n) {
    var qs = buildQuiz(mode, n), i = 0, right = 0, missed = [];
    if (!qs.length) {
      app.innerHTML = '<section class="block center"><h1>No mistakes saved yet</h1><p>Questions you get wrong are saved here so you can try them again.</p><a class="btn sun" href="#/quiz/' + cur() + '">Start 50 questions</a></section>';
      return;
    }
    var title = mode === "review" ? "Review my mistakes" : mode === "only" ? "Week " + n + " quiz" : "Today's 50: weeks 1 to " + n;
    function show() {
      var q = qs[i];
      var h = '<section class="quiz"><div class="qbar"><a href="#/" class="qx">Quit</a><span>' + esc(title) + '</span><span class="qn">' + (i + 1) + " / " + qs.length + '</span></div>' +
        '<div class="meter"><span style="width:' + (i / qs.length * 100) + '%"></span></div>' +
        '<p class="qk">' + esc(q.kind) + '</p>';
      if (q.listen) h += '<button class="play" data-say="' + esc(q.listen) + '" aria-label="Play the word">▶ Play</button><p class="qp">' + esc(q.prompt) + "</p>";
      else h += '<p class="qp' + (q.big ? " qbig" : "") + '">' + esc(q.prompt) + "</p>";
      h += '<div class="opts">' + q.opts.map(function (o, j) { return '<button class="opt' + (q.koOpts ? " koo" : "") + '" data-i="' + j + '">' + esc(o) + "</button>"; }).join("") + "</div>" +
        '<div class="fb" aria-live="polite"></div></section>';
      app.innerHTML = h;
      if (q.listen) setTimeout(function () { speak(q.listen); }, 250);
      app.querySelectorAll(".opt").forEach(function (b) { b.addEventListener("click", function () { answer(+b.getAttribute("data-i")); }); });
    }
    function answer(j) {
      var q = qs[i], ok = q.opts[j] === q.ans, wrong = load("lk:wrong", []);
      app.querySelectorAll(".opt").forEach(function (b, k) { b.disabled = true; if (q.opts[k] === q.ans) b.classList.add("right"); else if (k === j) b.classList.add("bad"); });
      record(ok);
      if (ok) { right++; wrong = wrong.filter(function (k) { return k !== q.key; }); }
      else { missed.push(q); if (wrong.indexOf(q.key) < 0) wrong.push(q.key); }
      save("lk:wrong", wrong.slice(-200));
      var fb = app.querySelector(".fb"), it = q.item;
      fb.innerHTML = '<p class="' + (ok ? "ok" : "no") + '">' + (ok ? "Correct" : "Answer: " + esc(q.ans)) + "</p>" +
        (it ? '<button class="ex" data-say="' + esc(it.ko) + '">' + esc(it.ko) + " · " + esc(it.rom) + " · " + esc(it.en) + "</button>" : "") +
        '<button class="btn sun next">' + (i + 1 < qs.length ? "Next" : "See score") + "</button>";
      if (it && ok) speak(it.ko);
      fb.querySelector(".next").addEventListener("click", function () { i++; if (i < qs.length) show(); else done(); });
      fb.querySelector(".next").focus();
    }
    function done() {
      var pct = Math.round(right / qs.length * 100), st = stats();
      var h = '<section class="block center score"><p class="qk">' + esc(title) + '</p><p class="big">' + right + " / " + qs.length + "</p><p>" + pct + "% correct. " + st.t.done + " questions answered today.</p>" +
        '<div class="row"><a class="btn sun" href="#/quiz/' + (mode === "review" ? cur() : n) + (mode === "only" ? "/only" : "") + '" id="again">New ' + (mode === "review" ? "50" : qs.length) + "</a>" +
        (missed.length ? '<a class="btn" href="#/quiz/review">Practice my mistakes</a>' : "") + '<a class="btn ghost" href="#/">Home</a></div>';
      if (missed.length) h += '<h2>Missed</h2><ul class="words">' + missed.map(function (q) {
        return q.item ? '<li><button data-say="' + esc(q.item.ko) + '"><span class="ko">' + esc(q.item.ko) + '</span><span class="rm">' + esc(q.item.rom) + '</span><span class="en">' + esc(q.item.en) + "</span></button></li>"
          : '<li class="vm"><b>' + esc(q.prompt) + "</b><br>" + esc(q.ans) + "</li>";
      }).join("") + "</ul>";
      app.innerHTML = h + "</section>";
      var again = document.getElementById("again");
      again.addEventListener("click", function (e) { if (location.hash === again.getAttribute("href")) { e.preventDefault(); route(); } });
    }
    show();
  }

  /* ---------- router ---------- */
  function route() {
    var hsh = location.hash, m;
    if (canSpeak) try { speechSynthesis.cancel(); } catch (e) {}
    if ((m = hsh.match(/^#\/w(\d+)\/(korean|video|homework)$/)) && week(+m[1])) {
      var w = week(+m[1]);
      app.innerHTML = m[2] === "korean" ? korean(w) : m[2] === "video" ? video(w) : homework(w);
      app.querySelectorAll("[data-k]").forEach(function (c) { c.addEventListener("change", function () { save(c.getAttribute("data-k"), c.checked); }); });
      var pr = document.getElementById("pr"); if (pr) pr.addEventListener("click", function () { window.print(); });
    } else if (hsh === "#/quiz/review") quiz("review", 0);
    else if ((m = hsh.match(/^#\/quiz\/(\d+)(\/only)?$/)) && week(+m[1])) quiz(m[2] ? "only" : "daily", +m[1]);
    else if (hsh === "#/quiz") quiz("daily", cur());
    else if (hsh === "#/resources") resources();
    else home();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  route();
})();
