(function () {
  "use strict";
  var C = window.COURSE, VQ = window.VIDQ || [], VL = window.VLESSONS || {};
  var app = document.getElementById("app");

  /* ---------- storage ---------- */
  var mem = {};
  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function week(n) { for (var i = 0; i < C.weeks.length; i++) if (C.weeks[i].n === n) return C.weeks[i]; return null; }
  function cur() { return load("lk:cur", 1); }
  function M(n) { return Math.ceil(n / 4); }
  function WL(n) { return "Month " + M(n) + " · Week " + ((n - 1) % 4 + 1); }
  function dates(n) { if (n > 4 || !C.start) return ""; var s = new Date(C.start); s.setDate(s.getDate() + 7 * (n - 1)); var t = new Date(s); t.setDate(t.getDate() + 3); var f = function (d) { return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); }; return "Sat " + f(s) + " · Tue " + f(t); }
  function WS(n) { return "M" + M(n) + " W" + ((n - 1) % 4 + 1); }
  function titles(w) { var p = w.title.split(/\.\s+/); return { ko: p[0].replace(/\.$/, ""), vid: (p[1] || p[0]).replace(/\.$/, "") }; }

  /* ---------- speech ---------- */
  var voice = null, canSpeak = "speechSynthesis" in window, voicesChecked = false;
  function pickVoice() {
    if (!canSpeak) return;
    var vs = speechSynthesis.getVoices();
    if (vs.length) voicesChecked = true;
    for (var i = 0; i < vs.length; i++) if (/^ko/i.test(vs[i].lang)) { voice = vs[i]; break; }
    var n = document.getElementById("voicenote"); if (n) n.innerHTML = voiceNote();
  }
  if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; setTimeout(function () { voicesChecked = true; pickVoice(); }, 1500); }
  function speak(t, el) {
    if (!canSpeak) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(t).replace(/___/g, "")); u.lang = "ko-KR"; u.rate = 0.85; if (voice) u.voice = voice;
      if (el) { el.classList.add("saying"); u.onend = u.onerror = function () { el.classList.remove("saying"); }; }
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function voiceNote() {
    if (!canSpeak) return '<p class="warn">This browser cannot play sound. Open the page in Chrome or Safari.</p>';
    if (voicesChecked && !voice) return '<p class="warn">No Korean voice found on this phone. Android: Settings › Google text-to-speech › install Korean. iPhone: Settings › Accessibility › Spoken Content › Voices › Korean.</p>';
    return "";
  }
  document.addEventListener("click", function (e) { var el = e.target.closest("[data-say]"); if (el) speak(el.getAttribute("data-say"), el); });
  var SPK = '<svg class="spk" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>';

  /* ---------- daily stats ---------- */
  function stats() {
    var s = load("lk:stats", { days: {} }), t = s.days[today()] || { done: 0, right: 0 }, streak = 0, d = new Date();
    for (;;) { var k = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); if (s.days[k] && s.days[k].done >= 50) { streak++; d.setDate(d.getDate() - 1); } else break; }
    return { t: t, streak: streak };
  }
  function record(ok) { var s = load("lk:stats", { days: {} }), k = today(); s.days[k] = s.days[k] || { done: 0, right: 0 }; s.days[k].done++; if (ok) s.days[k].right++; save("lk:stats", s); }

  /* ---------- shared pieces ---------- */
  function crumbs(list) { return '<nav class="crumbs" aria-label="Breadcrumb">' + list.map(function (c) { return c[1] ? '<a href="' + c[1] + '">' + esc(c[0]) + "</a>" : "<span>" + esc(c[0]) + "</span>"; }).join("<i>›</i>") + "</nav>"; }
  function weekPick() {
    return '<label class="wpick">My class is in <select id="curw">' + C.weeks.map(function (x) { return '<option value="' + x.n + '"' + (x.n === cur() ? " selected" : "") + ">" + WL(x.n) + "</option>"; }).join("") + "</select></label>";
  }
  function bindWeekPick(cb) { var s = document.getElementById("curw"); if (s) s.addEventListener("change", function () { save("lk:cur", +s.value); cb(); }); }
  function pattern(rows, title) { return '<details class="pat"><summary>' + esc(title) + "</summary><table>" + rows.map(function (r) { return "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table></details>"; }
  function weekNav(base, n) {
    return '<div class="wnav">' + (week(n - 1) ? '<a class="btn btn-line" href="' + base + (n - 1) + '">‹ ' + WS(n - 1) + "</a>" : "<span></span>") +
      (week(n + 1) ? '<a class="btn btn-line" href="' + base + (n + 1) + '">' + WS(n + 1) + " ›</a>" : "<span></span>") + "</div>";
  }
  function weekList(track) {
    var h = "", c = cur();
    C.phases.forEach(function (p) {
      h += '<section class="phase"><div class="ph-head"><h2>' + esc(p.name) + '</h2></div><p class="muted sm">' + esc(track === "ko" ? p.ko : p.vid) + '</p><ul class="wlist">';
      p.weeks.forEach(function (n) {
        var w = week(n), t = titles(w), meta = track === "ko" ? countWords(w) + " words" : (VL[n] || []).length + " video lessons";
        h += '<li><a href="#/' + track + "/" + n + '"' + (n === c ? ' class="on"' : "") + '><span class="wnum"><small>W</small>' + ((n - 1) % 4 + 1) + '</span><span class="wbody"><b>' + esc(track === "ko" ? t.ko : t.vid) + '</b><span class="muted sm">' + esc(track === "ko" ? w.goalKo : w.goalVid) + '</span></span><span class="wmeta">' + meta + (n === c ? '<em>Now</em>' : "") + "</span></a></li>";
      });
      h += "</ul></section>";
    });
    return h;
  }
  function countWords(w) { var n = 0; w.ko.sections.forEach(function (s) { n += s.items.length; }); return n; }
  function checks(id, items) {
    return '<ul class="checks">' + items.map(function (t, i) { var k = id + ":" + i; return '<li><label><input type="checkbox" data-k="' + k + '"' + (load(k, false) ? " checked" : "") + "><span>" + esc(t) + "</span></label></li>"; }).join("") + "</ul>";
  }

  /* ---------- home ---------- */
  function home() {
    var st = stats(), c = cur(), w = week(c), t = titles(w), totalWords = 0;
    C.weeks.forEach(function (x) { totalWords += countWords(x); });
    var lessons = 0; Object.keys(VL).forEach(function (k) { lessons += VL[k].length; });
    app.innerHTML =
      '<section class="hero"><p class="eyebrow">Free · three 1-month courses</p><h1>Learn Korean and video editing on your phone</h1>' +
      '<p class="lead">Korean and video editing, taught together. Each month is a complete 4-week course: Saturday in person at 8:00, then Tuesday online. Month 1 starts Saturday, November 21. Finish Month 1, then go on to Month 2 and Month 3.</p>' + weekPick() + "</section>" +
      '<a class="otbanner card" href="#/ot"><span class="otdot">OT</span><span><b>Start here: Orientation</b><span class="sm muted">Why Korean, where it can take you, how the course works</span></span><span class="arr">›</span></a>' +
      '<div class="courses">' +
      '<a class="course ko" href="#/ko"><span class="cbig" aria-hidden="true">한</span><span class="ctag">Course 1</span><h2>Korean</h2><p>From Hangul to TOPIK I and EPS-TOPIK level. Tap any word to hear it.</p>' +
      '<span class="cstats"><b>' + totalWords + '</b> words and phrases · <b>3</b> months</span><span class="ccta">This week: ' + esc(t.ko) + " ›</span></a>" +
      '<a class="course vid" href="#/vid"><span class="cbig play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><span class="ctag">Course 2</span><h2>Video editing</h2><p>CapCut on your phone. Watch the lesson, then practice the same edit.</p>' +
      '<span class="cstats"><b>' + lessons + '</b> video lessons · <b>3</b> months</span><span class="ccta">This week: ' + esc(t.vid) + " ›</span></a></div>" +
      '<section class="today card"><div><p class="sm muted">Today\'s Korean quiz</p><p class="tnum"><b>' + Math.min(st.t.done, 50) + '</b> / 50' + (st.streak ? ' <span class="chip ok">' + st.streak + "-day streak</span>" : "") + '</p><div class="meter"><span style="width:' + Math.min(100, st.t.done * 2) + '%"></span></div></div>' +
      '<a class="btn btn-accent" href="#/quiz/ko">Start 50 questions</a></section>' +
      '<p class="more"><a href="#/hw/' + c + '">Print this week\'s homework</a> · <a href="#/books">Textbooks and past papers</a></p>';
    bindWeekPick(home);
  }


  /* ---------- orientation ---------- */
  function ot() {
    app.innerHTML = crumbs([["Home", "#/"], ["Orientation"]]) +
      '<section class="phero ko"><div><p class="eyebrow">Start here</p><h1>Orientation</h1><p class="lead">Why we learn Korean and video editing, where it can take you, and how the course works.</p></div></section>' +
      '<section class="sec"><h2>Korean opens three doors</h2><div class="otgrid">' +
      '<div class="card otc"><b>1</b><h3>Work from home</h3><p class="sm">Edit videos for Korean clients through LIKHA and get paid without leaving the Philippines.</p></div>' +
      '<div class="card otc"><b>2</b><h3>Pass a Korean test</h3><p class="sm">TOPIK proves your Korean. EPS-TOPIK is the test you need for an E-9 work visa in Korea.</p></div>' +
      '<div class="card otc"><b>3</b><h3>Go to Korea</h3><p class="sm">Our goal: the best students come to Korea for advanced training.</p></div></div></section>' +
      '<section class="sec"><h2>Pay in Korea, 2026</h2><div class="otgrid two"><div class="card otn"><p class="n">₩10,320</p><p class="sm muted">Minimum pay per hour</p></div><div class="card otn"><p class="n">₩2,156,880</p><p class="sm muted">Minimum pay per month, full time</p></div></div><p class="sm muted" style="margin-top:8px">The same minimum applies to foreign workers. Most jobs need Korean.</p></section>' +
      '<section class="sec"><h2>Start earning from home on LIKHA</h2><div class="otgrid two"><div class="card otn"><p class="n">₱500</p><p class="sm muted">per short video</p></div><div class="card otn"><p class="n">₱2,500</p><p class="sm muted">per 10-minute video</p></div></div><p class="sm muted" style="margin-top:8px">Example: 2 short videos a day for 20 days = ₱20,000 a month. Better Korean and better edits mean more jobs.</p></section>' +
      '<section class="sec"><h2>Your path</h2><ol class="path"><li><b>Month 1</b> Basics</li><li><b>Month 2</b> Everyday and workplace Korean</li><li><b>Month 3</b> Exam and client ready</li><li><b>LIKHA</b> Paid freelance work</li><li><b>Korean test</b> TOPIK or EPS-TOPIK</li><li class="acc"><b>Korea</b> Training and work</li></ol><p class="sm muted">Each month ends with a test. Pass it to go on to the next month.</p></section>' +
      '<section class="sec"><h2>How each week works</h2><div class="days"><div><b>Saturday · in person</b><span>8:00 to 11:00 Korean, 11:00 to 2:00 video. Up to 10 students. First class: Saturday, November 21 (orientation 8:00 to 10:00).</span></div><div><b>Tuesday · online</b><span>Korean 3 hours, then video 3 hours. Watch live on YouTube.</span></div></div></section>' +
      '<section class="sec"><h2>Bring every class</h2><ul class="plain"><li>Your phone, charged, with CapCut installed</li><li>Earphones, a notebook and a pen</li><li>Your homework sheets</li></ul></section>' +
      '<section class="sec"><h2>Class rules</h2><ul class="plain"><li>Come on time. Tell us if you will miss a class.</li><li>Practice every day, even 20 minutes. Do the 50 quiz.</li><li>Mistakes are normal. Ask questions and help each other.</li><li>Use only your own clips or free footage.</li></ul></section>' +
      '<div class="endcta card"><div><b>Ready?</b><p class="sm muted">Start with Month 1, Week 1.</p></div><a class="btn btn-accent" href="#/ko/1">Start Korean</a></div>';
  }

  /* ---------- Korean course ---------- */
  function koHome() {
    var st = stats();
    app.innerHTML = crumbs([["Home", "#/"], ["Korean"]]) +
      '<section class="phero ko"><div><p class="eyebrow">Course 1</p><h1>Korean</h1><p class="lead">Hangul, everyday and workplace Korean, then TOPIK I and EPS-TOPIK exam practice.</p>' + weekPick() + '</div></section>' +
      '<section class="quizcard card"><div><h2>Today\'s 50 questions</h2><p class="muted sm">Mostly this week\'s words, plus review from earlier weeks. Listening questions play the sound.</p>' +
      '<div class="meter"><span style="width:' + Math.min(100, st.t.done * 2) + '%"></span></div><p class="sm"><b>' + Math.min(st.t.done, 50) + '</b> of 50 done today</p></div>' +
      '<div class="qa"><a class="btn btn-accent btn-lg" href="#/quiz/ko">Start</a><a class="btn btn-line" href="#/quiz/ko/review">My mistakes</a></div></section>' +
      weekList("ko") + '<p class="more"><a href="#/books">Textbooks, past papers and mock tests</a></p>';
    bindWeekPick(koHome);
  }

  function koWeek(w) {
    var t = titles(w), h = crumbs([["Home", "#/"], ["Korean", "#/ko"], [WL(w.n)]]);
    h += '<header class="whead"><span class="wbadge">' + WL(w.n) + '</span><h1>' + esc(t.ko) + '</h1><p class="lead">' + esc(w.goalKo) + '</p>' +
      '<div class="days"><div><b>Sat · in person' + (dates(w.n) ? " · " + dates(w.n).split(" · ")[0].slice(4) : "") + '</b><span>' + esc(w.ko.sat) + '</span></div><div><b>Tue · online' + (dates(w.n) ? " · " + dates(w.n).split(" · ")[1].slice(4) : "") + '</b><span>' + esc(w.ko.tue) + "</span></div></div>" +
      '<p class="sm muted">Week check: ' + esc(w.test) + "</p>" + pattern(C.koPattern, "How each 3-hour Korean class runs") + "</header>";
    h += '<div id="voicenote">' + voiceNote() + "</div><p class=\"hint\">" + SPK + " Tap any word or sentence to hear it.</p>";
    if (w.ko.grammar) {
      h += '<section class="sec"><h2>Grammar</h2><div class="gram">' + w.ko.grammar.map(function (g) {
        var ex = g[2].replace(/\s*\(.*\)$/, "");
        return '<article class="card"><h3>' + esc(g[0]) + '</h3><p class="sm">' + esc(g[1]) + '</p><button class="ex" data-say="' + esc(ex) + '">' + SPK + "<span>" + esc(g[2]) + "</span></button></article>";
      }).join("") + "</div></section>";
    }
    w.ko.sections.forEach(function (s) {
      h += '<section class="sec"><h2>' + esc(s.title) + ' <span class="cnt">' + s.items.length + "</span></h2>" + (s.note ? '<p class="muted sm">' + esc(s.note) + "</p>" : "");
      if (s.type === "tiles") {
        h += '<div class="tiles">' + s.items.map(function (i) {
          var say = /^[ㄱ-ㅎ]$/.test(i[0]) ? i[0] + "아" : i[0];
          return '<button data-say="' + esc(say) + '"><span class="hk">' + esc(i[0]) + '</span><span class="rm">' + esc(i[1]) + "</span></button>";
        }).join("") + "</div>";
      } else {
        h += '<ul class="words card">' + s.items.map(function (i) {
          return '<li><button data-say="' + esc(i[0]) + '"><span class="wk"><span class="ko">' + esc(i[0]) + '</span><span class="rm">' + esc(i[1]) + '</span></span><span class="en">' + esc(i[2]) + "</span>" + SPK + "</button></li>";
        }).join("") + "</ul>";
      }
      h += "</section>";
    });
    if (w.ko.scripts) {
      h += '<section class="sec"><h2>Client chat practice</h2><p class="muted sm">Read both parts aloud. Then cover the Korean and say it from the English.</p>' + w.ko.scripts.map(function (sc) {
        return '<details class="chat card"><summary>' + esc(sc.title) + "</summary>" + sc.turns.map(function (tn) {
          return '<button class="bub ' + tn.who + '" data-say="' + esc(tn.ko) + '"><span class="who">' + (tn.who === "me" ? "You" : "Client") + '</span><span class="ko">' + esc(tn.ko) + '</span><span class="rm">' + esc(tn.rom) + '</span><span class="en">' + esc(tn.en) + "</span></button>";
        }).join("") + "</details>";
      }).join("") + "</section>";
    }
    var kl = (w.links || []).filter(function (l) { return l[0] === "Korean"; });
    if (kl.length) h += '<section class="sec"><h2>Listen and learn more</h2><ul class="links">' + kl.map(function (l) { return '<li><a href="' + esc(l[2]) + '" target="_blank" rel="noopener">' + esc(l[1]) + "<span>YouTube ›</span></a></li>"; }).join("") + "</ul></section>";
    h += '<div class="endcta card"><div><b>Check yourself</b><p class="sm muted">Questions from this week only.</p></div><a class="btn btn-accent" href="#/quiz/ko/' + w.n + '/only">' + WS(w.n) + " quiz</a></div>";
    h += weekNav("#/ko/", w.n);
    return h;
  }

  /* ---------- Video course ---------- */
  function vidHome() {
    app.innerHTML = crumbs([["Home", "#/"], ["Video editing"]]) +
      '<section class="phero vid"><div><p class="eyebrow">Course 2</p><h1>Video editing</h1><p class="lead">Every week: watch the lessons here, practice the same edit in CapCut, then hand in one finished video.</p>' + weekPick() + "</div></section>" +
      '<section class="steps3"><div><b>1</b><span>Watch the lesson video on the week page</span></div><div><b>2</b><span>Practice the same edit with the free footage</span></div><div><b>3</b><span>Finish and show the week\'s video</span></div></section>' +
      weekList("vid") +
      '<div class="endcta card"><div><b>Video editing quiz</b><p class="sm muted">Questions from week 1 up to your week.</p></div><a class="btn btn-brand" href="#/quiz/vid/' + cur() + '">Start</a></div>';
    bindWeekPick(vidHome);
  }

  function vidWeek(w) {
    var v = w.vid, t = titles(w), les = VL[w.n] || [], h = crumbs([["Home", "#/"], ["Video editing", "#/vid"], [WL(w.n)]]);
    h += '<header class="whead"><span class="wbadge vid">' + WL(w.n) + '</span><h1>' + esc(t.vid) + '</h1><p class="lead">' + esc(w.goalVid) + "</p>" + pattern(C.vidPattern, "How each 3-hour video class runs") + "</header>";
    h += '<section class="sec"><h2>Watch and practice <span class="cnt">' + les.length + '</span></h2><p class="muted sm">Tap a video to play it here. After each one, do the practice task in CapCut.</p><div class="lessons">';
    les.forEach(function (l, i) {
      var k = "lk:" + w.n + ":vl:" + i;
      h += '<article class="lesson card"><button class="yt" data-yt="' + esc(l[0]) + '" aria-label="Play: ' + esc(l[1]) + '"><img src="https://i.ytimg.com/vi/' + esc(l[0]) + '/hqdefault.jpg" alt="" loading="lazy"><span class="pbtn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><span class="lno">Lesson ' + (i + 1) + "</span></button>" +
        '<div class="lbody"><h3>' + esc(l[1]) + '</h3><p class="task"><b>Practice</b> ' + esc(l[2]) + '</p><div class="lfoot"><label><input type="checkbox" data-k="' + k + '"' + (load(k, false) ? " checked" : "") + '> Done</label><a href="https://www.youtube.com/watch?v=' + esc(l[0]) + '" target="_blank" rel="noopener">Open in YouTube ›</a></div></div></article>';
    });
    h += "</div></section>";
    var refs = (w.links || []).filter(function (l) { return l[0] === "Reference" || l[0] === "Footage"; });
    if (refs.length) h += '<section class="sec"><h2>Examples and free footage</h2><ul class="links">' + refs.map(function (l) {
      return '<li><a href="' + esc(l[2]) + '" target="_blank" rel="noopener"><span class="chip ' + (l[0] === "Footage" ? "ok" : "") + '">' + (l[0] === "Footage" ? "Free footage" : "Examples") + "</span>" + esc(l[1]) + "<span>›</span></a></li>";
    }).join("") + '</ul><p class="muted sm">Practice only with free footage or your own clips. Do not download other people\'s YouTube videos.</p></section>';
    h += '<section class="sec"><h2>In class</h2><div class="cls"><div class="card"><h3>Sat · in person' + (dates(w.n) ? " · " + dates(w.n).split(" · ")[0].slice(4) : "") + '</h3><p class="sm muted">' + esc(v.sat.title.replace(/^Saturday in person[^:]*: /, "")) + "</p>";
    if (v.sat.blocks) h += '<ol class="tl">' + v.sat.blocks.map(function (b) { return '<li><span class="tm">' + esc(b.t) + " min</span><b>" + esc(b.name) + "</b>" + (b.steps.length ? "<ul>" + b.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "") + "</li>"; }).join("") + "</ol>";
    else h += '<ol class="ol">' + v.sat.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
    h += '</div><div class="card"><h3>Tue · online' + (dates(w.n) ? " · " + dates(w.n).split(" · ")[1].slice(4) : "") + '</h3><p class="sm muted">' + esc(v.tue.title.replace(/^Tuesday online: /, "")) + "</p>";
    if (v.tue.blocks) h += '<ol class="tl">' + v.tue.blocks.map(function (b) { return '<li><span class="tm">' + esc(b.t) + " min</span><b>" + esc(b.name) + "</b>" + (b.steps.length ? "<ul>" + b.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "") + "</li>"; }).join("") + "</ol>";
    else h += '<ol class="ol">' + v.tue.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
    h += "</div></div></section>";
    h += '<section class="sec"><div class="card deliver"><h2>' + esc(v.deliver.title) + '</h2><p class="muted sm">Check every item before you show your video.</p>' + checks("lk:" + w.n + ":d", v.deliver.checks) + "</div></section>";
    h += '<section class="sec"><h2>Common mistakes</h2><ul class="plain">' + v.mistakes.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul></section>";
    h += '<div class="endcta card"><div><b>Check yourself</b><p class="sm muted">Video questions from this week.</p></div><a class="btn btn-brand" href="#/quiz/vid/' + w.n + '/only">' + WS(w.n) + " quiz</a></div>";
    h += weekNav("#/vid/", w.n);
    return h;
  }

  /* ---------- homework & books ---------- */
  function hw(w) {
    var h = crumbs([["Home", "#/"], ["Homework · " + WL(w.n)]]) + '<div class="noprint">' + weekPick() + "</div>";
    [["mon", "Given out Monday", "m"], ["wed", "Given out Wednesday", "w"]].forEach(function (x) {
      var s = w.hw[x[0]];
      h += '<section class="sheet card"><p class="sm muted">LIKHA Academy · ' + x[1] + '</p><h2>' + WL(w.n) + ": " + esc(s.title) + "</h2>" + checks("lk:" + w.n + ":" + x[2], s.items) + '<p class="sign">Name: ______________________</p></section>';
    });
    return h + '<p class="center noprint"><button class="btn btn-brand" id="pr">Print</button></p>';
  }
  function books() {
    app.innerHTML = crumbs([["Home", "#/"], ["Textbooks"]]) + '<h1 class="ptitle">Textbooks and practice tests</h1><ul class="links">' +
      C.resources.map(function (r) { return '<li><a href="' + esc(r.u) + '" target="_blank" rel="noopener">' + esc(r.t) + "<span>›</span></a></li>"; }).join("") +
      '</ul><p class="muted sm">EPS-TOPIK questions come from the official textbook, so study it unit by unit along with the Korean course.</p>';
  }

  /* ---------- quiz ---------- */
  function wordPool(maxW, onlyW) {
    var out = [];
    C.weeks.forEach(function (w) {
      if (onlyW ? w.n !== onlyW : w.n > maxW) return;
      w.ko.sections.forEach(function (s, si) { s.items.forEach(function (i) { if (i[0].indexOf("___") < 0) out.push({ ko: i[0], rom: i[1], en: i[2], w: w.n, sec: w.n + ":" + si, tile: s.type === "tiles" }); }); });
    });
    return out;
  }
  function choices(item, pool, f) {
    var same = pool.filter(function (p) { return p.sec === item.sec && p[f] !== item[f]; }), other = pool.filter(function (p) { return p.tile === item.tile && p[f] !== item[f]; });
    var seen = {}, out = [item[f]]; seen[item[f]] = 1;
    shuffle(same).concat(shuffle(other)).forEach(function (p) { if (out.length < 4 && !seen[p[f]]) { seen[p[f]] = 1; out.push(p[f]); } });
    return shuffle(out);
  }
  function makeQ(it, pool) {
    var types = it.tile ? ["rom"] : ["mean", "mean", "rev", "rom"];
    if (canSpeak && !it.tile) types.push("listen", "listen");
    var t = types[Math.floor(Math.random() * types.length)], key = "w:" + it.ko;
    if (t === "mean") return { key: key, kind: "What does it mean?", prompt: it.ko, big: true, ans: it.en, opts: choices(it, pool, "en"), item: it };
    if (t === "rev") return { key: key, kind: "Say it in Korean", prompt: it.en, ans: it.ko, opts: choices(it, pool, "ko"), item: it, koOpts: true };
    if (t === "listen") return { key: key, kind: "Listen and choose", listen: it.ko, prompt: "", ans: it.ko, opts: choices(it, pool, "ko"), item: it, koOpts: true };
    return { key: key, kind: it.tile ? "What sound is it?" : "How do you read it?", prompt: it.ko, big: true, ans: it.rom, opts: choices(it, pool, "rom"), item: it };
  }
  function vidQ(v) { return { key: "v:" + v[1], kind: "Video editing", prompt: v[1], ans: v[2], opts: shuffle([v[2]].concat(v[3])), koOpts: /[가-힣]/.test(v[2]) }; }
  function take(src, k) { var r = []; while (r.length < k && src.length) r = r.concat(shuffle(src)); return r.slice(0, k); }

  function buildQuiz(track, mode, n) {
    var qs = [];
    if (track === "vid") return shuffle(VQ.filter(function (v) { return mode === "only" ? v[0] === n : v[0] <= n; })).slice(0, 30).map(vidQ);
    if (mode === "review") {
      var all = wordPool(12);
      load("lk:wrong", []).slice(-50).forEach(function (k) { var it = all.filter(function (p) { return "w:" + p.ko === k; })[0]; if (it) qs.push(makeQ(it, all)); });
      return shuffle(qs);
    }
    var only = mode === "only", pool = wordPool(n, only ? n : 0);
    var nowP = pool.filter(function (p) { return p.w >= n - 1; }), oldP = pool.filter(function (p) { return p.w < n - 1; });
    var nOld = only || !oldP.length ? 0 : 15;
    take(nowP.length ? nowP : pool, 50 - nOld).forEach(function (it) { qs.push(makeQ(it, pool)); });
    take(oldP, nOld).forEach(function (it) { qs.push(makeQ(it, pool)); });
    return shuffle(qs);
  }

  function quiz(track, mode, n) {
    var qs = buildQuiz(track, mode, n), i = 0, right = 0, missed = [], back = track === "vid" ? "#/vid" : "#/ko";
    var title = mode === "review" ? "My mistakes" : track === "vid" ? (mode === "only" ? "Video quiz · " + WS(n) : "Video quiz · up to " + WS(n)) : (mode === "only" ? "Korean quiz · " + WS(n) : "Today's 50 · up to " + WS(n));
    if (!qs.length) { app.innerHTML = '<section class="card center pad"><h1>No mistakes saved yet</h1><p class="muted">Questions you get wrong are saved here so you can try them again.</p><a class="btn btn-accent" href="#/quiz/ko">Start 50 questions</a></section>'; return; }
    function show() {
      var q = qs[i], h = '<section class="quiz"><div class="qbar"><a href="' + back + '">✕ Quit</a><span class="sm muted">' + esc(title) + '</span><b>' + (i + 1) + " / " + qs.length + '</b></div><div class="meter"><span style="width:' + (i / qs.length * 100) + '%"></span></div>' +
        '<p class="qk">' + esc(q.kind) + "</p>";
      if (q.listen) h += '<button class="play" data-say="' + esc(q.listen) + '">' + SPK + " Play again</button>";
      else h += '<p class="qp' + (q.big ? " qbig" : "") + '">' + esc(q.prompt) + "</p>";
      h += '<div class="opts">' + q.opts.map(function (o, j) { return '<button class="opt' + (q.koOpts ? " koo" : "") + '" data-i="' + j + '">' + esc(o) + "</button>"; }).join("") + '</div><div class="fb" aria-live="polite"></div></section>';
      app.innerHTML = h;
      if (q.listen) setTimeout(function () { speak(q.listen); }, 250);
      app.querySelectorAll(".opt").forEach(function (b) { b.addEventListener("click", function () { answer(+b.getAttribute("data-i")); }); });
    }
    function answer(j) {
      var q = qs[i], ok = q.opts[j] === q.ans, wrong = load("lk:wrong", []);
      app.querySelectorAll(".opt").forEach(function (b, k) { b.disabled = true; if (q.opts[k] === q.ans) b.classList.add("right"); else if (k === j) b.classList.add("bad"); });
      if (track === "ko") record(ok);
      if (ok) { right++; wrong = wrong.filter(function (k) { return k !== q.key; }); } else { missed.push(q); if (q.item && wrong.indexOf(q.key) < 0) wrong.push(q.key); }
      save("lk:wrong", wrong.slice(-200));
      var fb = app.querySelector(".fb"), it = q.item;
      fb.innerHTML = '<p class="' + (ok ? "ok" : "no") + '">' + (ok ? "Correct!" : "Answer: " + esc(q.ans)) + "</p>" +
        (it ? '<button class="ex" data-say="' + esc(it.ko) + '">' + SPK + "<span>" + esc(it.ko) + " · " + esc(it.rom) + " · " + esc(it.en) + "</span></button>" : "") +
        '<button class="btn btn-accent btn-lg btn-block next">' + (i + 1 < qs.length ? "Next" : "See my score") + "</button>";
      if (it && ok) speak(it.ko);
      var nx = fb.querySelector(".next"); nx.addEventListener("click", function () { i++; if (i < qs.length) show(); else done(); }); nx.focus();
    }
    function done() {
      var st = stats(), again = "#/quiz/" + track + (mode === "review" ? "/review" : "/" + n + (mode === "only" ? "/only" : ""));
      var h = '<section class="card center pad score"><p class="sm muted">' + esc(title) + '</p><p class="big">' + right + " / " + qs.length + '</p><p class="muted">' + Math.round(right / qs.length * 100) + "% correct" + (track === "ko" ? " · " + st.t.done + " Korean questions today" : "") + "</p>" +
        '<div class="row"><a class="btn btn-accent" id="again" href="' + again + '">Try again</a>' + (missed.length && track === "ko" ? '<a class="btn btn-line" href="#/quiz/ko/review">Practice my mistakes</a>' : "") + '<a class="btn btn-ghost" href="' + back + '">Back to course</a></div></section>';
      if (missed.length) h += '<section class="sec"><h2>Missed</h2><ul class="words card">' + missed.map(function (q) {
        return q.item ? '<li><button data-say="' + esc(q.item.ko) + '"><span class="wk"><span class="ko">' + esc(q.item.ko) + '</span><span class="rm">' + esc(q.item.rom) + '</span></span><span class="en">' + esc(q.item.en) + "</span>" + SPK + "</button></li>"
          : '<li class="vm"><b>' + esc(q.prompt) + "</b><span>" + esc(q.ans) + "</span></li>";
      }).join("") + "</ul></section>";
      app.innerHTML = h;
      document.getElementById("again").addEventListener("click", function (e) { if (location.hash === again) { e.preventDefault(); route(); } });
    }
    show();
  }

  /* ---------- router ---------- */
  function setNav(sec) {
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-nav") === sec); });
    document.querySelectorAll("[data-tab]").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-tab") === sec); });
  }
  function bindAfter() {
    app.querySelectorAll("[data-k]").forEach(function (c) { c.addEventListener("change", function () { save(c.getAttribute("data-k"), c.checked); }); });
    app.querySelectorAll("[data-yt]").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + b.getAttribute("data-yt") + "?autoplay=1&rel=0&playsinline=1";
        f.title = b.getAttribute("aria-label"); f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true;
        f.className = "ytf"; b.replaceWith(f);
      });
    });
    var pr = document.getElementById("pr"); if (pr) pr.addEventListener("click", function () { window.print(); });
  }
  function route() {
    var h = location.hash, m;
    if (canSpeak) try { speechSynthesis.cancel(); } catch (e) {}
    document.body.classList.remove("inquiz");
    if ((m = h.match(/^#\/ko\/(\d+)$/)) && week(+m[1])) { app.innerHTML = koWeek(week(+m[1])); setNav("ko"); }
    else if ((m = h.match(/^#\/vid\/(\d+)$/)) && week(+m[1])) { app.innerHTML = vidWeek(week(+m[1])); setNav("vid"); }
    else if ((m = h.match(/^#\/hw\/(\d+)$/)) && week(+m[1])) { app.innerHTML = hw(week(+m[1])); bindWeekPick(function () { location.hash = "#/hw/" + cur(); }); setNav("home"); }
    else if (h === "#/ko") { koHome(); setNav("ko"); }
    else if (h === "#/vid") { vidHome(); setNav("vid"); }
    else if (h === "#/books") { books(); setNav("ko"); }
    else if (h === "#/ot") { ot(); setNav("home"); }
    else if (h === "#/quiz/ko/review") { document.body.classList.add("inquiz"); quiz("ko", "review", 0); setNav("quiz"); }
    else if ((m = h.match(/^#\/quiz\/(ko|vid)(?:\/(\d+)(\/only)?)?$/))) { var n = m[2] && week(+m[2]) ? +m[2] : cur(); document.body.classList.add("inquiz"); quiz(m[1], m[3] ? "only" : "daily", n); setNav(m[1] === "ko" ? "quiz" : "vid"); }
    else { home(); setNav("home"); }
    bindAfter();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  route();
})();
