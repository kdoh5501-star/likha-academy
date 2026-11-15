(function () {
  var app = document.getElementById("app");
  var weeks = window.COURSE.weeks;

  // ---------- storage (works even if the browser blocks it) ----------
  var mem = {};
  function save(k, v) { mem[k] = v; try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) {
    try { var v = localStorage.getItem(k); if (v !== null) return v; } catch (e) {}
    return mem[k] || null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- speech ----------
  var koVoice = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices();
    for (var i = 0; i < vs.length; i++) {
      if (/^ko/i.test(vs[i].lang)) { koVoice = vs[i]; break; }
    }
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    var t = text.replace(/_+/g, "").trim();
    if (!t) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t);
    u.lang = "ko-KR";
    u.rate = 0.8;
    if (koVoice) u.voice = koVoice;
    speechSynthesis.speak(u);
  }

  // ---------- progress ----------
  function totals(w) {
    var total = w.video.steps.length + w.homework.monday.items.length + w.homework.wednesday.items.length;
    var done = 0, i;
    for (i = 0; i < w.video.steps.length; i++) if (load("lk:" + w.n + ":v:" + i) === "1") done++;
    for (i = 0; i < w.homework.monday.items.length; i++) if (load("lk:" + w.n + ":m:" + i) === "1") done++;
    for (i = 0; i < w.homework.wednesday.items.length; i++) if (load("lk:" + w.n + ":w:" + i) === "1") done++;
    return Math.round((done / total) * 100);
  }

  // ---------- views ----------
  function home() {
    var h = '<h1>4-week course</h1>' +
      '<p class="muted">Korean language and video editing with AI. Tuesday online, Saturday in person. Pick your week.</p>' +
      '<div class="weeks">';
    weeks.forEach(function (w) {
      h += '<a class="weekcard" href="#/w' + w.n + '/korean">' +
        '<div class="n">Week ' + w.n + '</div>' +
        '<div class="t">' + esc(w.title) + '</div>' +
        '<div class="small muted">Korean: ' + esc(w.goalKo) + '<br>Video: ' + esc(w.goalVid) + '</div>' +
        '<div class="bar"><i style="width:' + totals(w) + '%"></i></div></a>';
    });
    h += '</div>';
    app.innerHTML = h;
  }

  function header(w, tab) {
    return '<a class="crumb" href="#/">&larr; All weeks</a>' +
      '<h1>Week ' + w.n + ': ' + esc(w.title) + '</h1>' +
      '<div class="tabs">' +
      tabLink(w, tab, "korean", "Korean") +
      tabLink(w, tab, "video", "Video") +
      tabLink(w, tab, "homework", "Homework") +
      '</div>';
  }
  function tabLink(w, tab, id, label) {
    return '<a class="' + (tab === id ? "on" : "") + '" href="#/w' + w.n + "/" + id + '">' + label + "</a>";
  }

  function korean(w) {
    var h = header(w, "korean");
    h += '<p><b>Goal:</b> ' + esc(w.goalKo) + "</p>";
    if (!("speechSynthesis" in window)) {
      h += '<div class="note">Sound is not available in this browser. You can still read and practice.</div>';
    }
    w.korean.sections.forEach(function (s, si) {
      h += "<h2>" + esc(s.title) + "</h2>";
      if (s.note) h += '<p class="muted small">' + esc(s.note) + "</p>";
      h += '<div class="grid ' + (s.type === "words" ? "words" : "") + '">';
      s.items.forEach(function (it, ii) {
        if (s.type === "words") {
          h += '<button class="tile" data-say="' + esc(it.ko) + '"><span class="ko">' + esc(it.ko) + '</span>' +
            '<span class="side"><span class="en">' + esc(it.en) + '</span><span class="rom">' + esc(it.rom) + "</span></span></button>";
        } else {
          h += '<button class="tile" data-say="' + esc(it.ko) + '"><span class="ko">' + esc(it.ko) + '</span>' +
            '<span class="rom">' + esc(it.rom) + "</span>" + (it.en ? '<span class="en">' + esc(it.en) + "</span>" : "") + "</button>";
        }
      });
      h += "</div>";
    });
    h += '<h2>Quick quiz</h2><div class="card quiz" id="quiz"></div>';
    h += '<p class="small muted">Next: <a href="#/w' + w.n + '/video">Video lesson</a></p>';
    app.innerHTML = h;
    app.querySelectorAll("[data-say]").forEach(function (b) {
      b.addEventListener("click", function () { speak(b.getAttribute("data-say")); });
    });
    startQuiz(w);
  }

  function startQuiz(w) {
    var pool = [];
    w.korean.sections.forEach(function (s) {
      s.items.forEach(function (it) {
        var ans = s.type === "tiles" ? it.rom : it.en;
        if (it.ko.indexOf("___") === -1 && ans) pool.push({ ko: it.ko, ans: ans, type: s.type });
      });
    });
    var box = document.getElementById("quiz");
    var asked = 0, right = 0, total = Math.min(5, pool.length);

    function next() {
      if (asked >= total) {
        box.innerHTML = '<p class="score">Score: ' + right + " / " + total + '</p>' +
          '<div class="row"><button class="btn" id="again">Try again</button></div>';
        document.getElementById("again").onclick = function () { asked = 0; right = 0; next(); };
        return;
      }
      var q = pool[Math.floor(Math.random() * pool.length)];
      var others = pool.filter(function (p) { return p.type === q.type && p.ans !== q.ans; });
      others.sort(function () { return Math.random() - 0.5; });
      var opts = [q.ans].concat(others.slice(0, 3).map(function (o) { return o.ans; }));
      opts.sort(function () { return Math.random() - 0.5; });
      var h = '<div class="small muted">Question ' + (asked + 1) + " of " + total + '</div>' +
        '<div class="q">' + esc(q.ko) + '</div><div class="opts">';
      opts.forEach(function (o) { h += '<button class="opt" data-a="' + esc(o) + '">' + esc(o) + "</button>"; });
      h += "</div>";
      box.innerHTML = h;
      speak(q.ko);
      var locked = false;
      box.querySelectorAll(".opt").forEach(function (b) {
        b.addEventListener("click", function () {
          if (locked) return;
          locked = true;
          var ok = b.getAttribute("data-a") === q.ans;
          if (ok) right++;
          b.classList.add(ok ? "right" : "wrong");
          if (!ok) box.querySelectorAll(".opt").forEach(function (x) {
            if (x.getAttribute("data-a") === q.ans) x.classList.add("right");
          });
          asked++;
          setTimeout(next, 900);
        });
      });
    }
    if (pool.length < 2) { box.innerHTML = '<p class="muted">No quiz this week.</p>'; return; }
    next();
  }

  function checklist(w, kind, items) {
    var h = "";
    items.forEach(function (text, i) {
      var key = "lk:" + w.n + ":" + kind + ":" + i;
      var on = load(key) === "1";
      h += '<div class="check ' + (on ? "done" : "") + '"><input type="checkbox" id="' + key + '" data-key="' + key + '"' + (on ? " checked" : "") + '>' +
        '<label for="' + key + '">' + esc(text) + "</label></div>";
    });
    return h;
  }
  function bindChecks() {
    app.querySelectorAll("input[data-key]").forEach(function (c) {
      c.addEventListener("change", function () {
        save(c.getAttribute("data-key"), c.checked ? "1" : "0");
        c.parentNode.classList.toggle("done", c.checked);
      });
    });
  }

  function video(w) {
    var h = header(w, "video");
    h += "<p><b>Goal:</b> " + esc(w.goalVid) + "</p>";
    h += '<div class="note">' + esc(w.video.tip) + "</div>";
    h += '<h2>Steps</h2><div class="card">' + checklist(w, "v", w.video.steps) + "</div>";
    h += '<p class="small muted">Tick each step when you finish it.</p>';
    app.innerHTML = h;
    bindChecks();
  }

  function homework(w) {
    var h = header(w, "homework");
    h += '<div class="printonly"><b>LIKHA Academy</b> &middot; Week ' + w.n + ' &middot; Name: ______________________</div>';
    h += '<h2>Monday</h2><div class="card hw"><b>' + esc(w.homework.monday.title) + "</b>" + checklist(w, "m", w.homework.monday.items) + "</div>";
    h += '<h2>Wednesday</h2><div class="card hw"><b>' + esc(w.homework.wednesday.title) + "</b>" + checklist(w, "w", w.homework.wednesday.items) + "</div>";
    h += '<div class="row noprint"><button class="btn alt" id="print">Print this page</button></div>';
    h += '<p class="small muted noprint">The church can print these sheets for students who study on paper.</p>';
    app.innerHTML = h;
    bindChecks();
    document.getElementById("print").onclick = function () { window.print(); };
  }

  // ---------- router ----------
  function route() {
    var m = (location.hash || "#/").match(/^#\/w(\d)\/(korean|video|homework)$/);
    window.scrollTo(0, 0);
    if (!m) { home(); return; }
    var w = weeks[parseInt(m[1], 10) - 1];
    if (!w) { home(); return; }
    if (m[2] === "korean") korean(w);
    else if (m[2] === "video") video(w);
    else homework(w);
  }
  window.addEventListener("hashchange", route);
  route();
})();
