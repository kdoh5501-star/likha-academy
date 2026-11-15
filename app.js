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

  /* ---------- language: English / Tagalog / Korean ---------- */
  var I18N = window.I18N || { tl: {}, ko: {} };
  function lang() { return load("lk:lang", "en"); }
  var PAT = [
    [/^Month (\d) · Week (\d)$/, { tl: "Buwan $1 · Linggo $2", ko: "$1개월차 · $2주차" }],
    [/^Next class · Month (\d) · Week (\d)$/, { tl: "Susunod na klase · Buwan $1 · Linggo $2", ko: "다음 수업 · $1개월차 $2주차" }],
    [/^(\d+) words$/, { tl: "$1 salita", ko: "$1단어" }],
    [/^In (\d+) days$/, { tl: "$1 araw pa", ko: "$1일 후" }],
    [/^(M\d W\d) · (\d+)\/(\d+) learned$/, { tl: "$1 · $2/$3 natutunan", ko: "$1 · $2/$3 외움" }],
    [/^(\d+) of (\d+) words learned\. Tap to turn, then say it\.$/, { tl: "$1 sa $2 salita ang natutunan. Pindutin para baligtarin, tapos sabihin.", ko: "$2단어 중 $1개 외움. 눌러서 뒤집고 말해 보세요." }],
    [/^Month (\d) · Week (\d) · (\d+) of (\d+) learned$/, { tl: "Buwan $1 · Linggo $2 · $3 sa $4 natutunan", ko: "$1개월차 $2주차 · $4개 중 $3개 외움" }],
    [/^(\d+) of (\d+) words learned this week$/, { tl: "$1 sa $2 salita ang natutunan ngayong linggo", ko: "이번 주 $2단어 중 $1개 외움" }],
    [/^(M\d W\d) quiz$/, { tl: "$1 quiz", ko: "$1 퀴즈" }],
    [/^(\d+) video lessons?$/, { tl: "$1 video lesson", ko: "영상 강의 $1개" }],
    [/^(\d+)% correct(?: · (\d+) Korean questions today)?$/, { tl: function (m) { return m[1] + "% tama" + (m[2] ? " · " + m[2] + " Korean na tanong ngayon" : ""); }, ko: function (m) { return "정답률 " + m[1] + "%" + (m[2] ? " · 오늘 " + m[2] + "문제" : ""); } }],
    [/^(Sat|Tue) · (in person|online)( · .+)?$/, { tl: function (m) { return (m[1] === "Sat" ? "Sabado" : "Martes") + " · " + (m[2] === "online" ? "online" : "personal") + (m[3] || ""); }, ko: function (m) { return (m[1] === "Sat" ? "토" : "화") + " · " + (m[2] === "online" ? "온라인" : "현장") + (m[3] || ""); } }],
    [/^This week: (.+) ›$/, { tl: function (m) { return "Ngayong linggo: " + tr(m[1]) + " ›"; }, ko: function (m) { return "이번 주: " + tr(m[1]) + " ›"; } }],
    [/^Month (\d): (.+)$/, { tl: function (m) { return "Buwan " + m[1] + ": " + tr(m[2]); }, ko: function (m) { return m[1] + "개월차: " + tr(m[2]); } }],
    [/^Answer: (.+)$/, { tl: function (m) { return "Sagot: " + tr(m[1]); }, ko: function (m) { return "정답: " + tr(m[1]); } }],
    [/^Homework · (.+)$/, { tl: function (m) { return "Homework · " + tr(m[1]); }, ko: function (m) { return "숙제 · " + tr(m[1]); } }],
    [/^(Month \d · Week \d): (.+)$/, { tl: function (m) { return tr(m[1]) + ": " + tr(m[2]); }, ko: function (m) { return tr(m[1]) + ": " + tr(m[2]); } }],
    [/^(Video quiz|Korean quiz|Flashcards) · (up to )?(.+)$/, { tl: function (m) { return ({ "Video quiz": "Video quiz", "Korean quiz": "Korean quiz", "Flashcards": "Flashcards" })[m[1]] + " · " + (m[2] ? "hanggang " : "") + tr(m[3]); }, ko: function (m) { return ({ "Video quiz": "영상 퀴즈", "Korean quiz": "한국어 퀴즈", "Flashcards": "플래시카드" })[m[1]] + " · " + tr(m[3]) + (m[2] ? "까지" : ""); } }],
    [/^Today's 50 · up to (.+)$/, { tl: function (m) { return "50 ngayong araw · hanggang " + m[1]; }, ko: function (m) { return "오늘의 50문제 · " + m[1] + "까지"; } }],
    [/^Practice my (\d+) mistakes$/, { tl: "I-practice ang $1 mali ko", ko: "오답 $1개 연습" }],
    [/^of (\d+) lessons marked done$/, { tl: "sa $1 lesson ang tapos na", ko: "/ $1개 강의 완료" }],
    [/^Lesson (\d+)$/, { tl: "Lesson $1", ko: "강의 $1" }],
    [/^(\d+) to (\d+) min$/, { tl: "$1 hanggang $2 min", ko: "$1~$2분" }],
    [/^(\d+) min$/, { tl: "$1 min", ko: "$1분" }],
    [/^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), [A-Z][a-z]{2} \d+(?: · 8:00 AM)?) · (.+)$/, { tl: function (m) { return m[1] + " · " + tr(m[2]); }, ko: function (m) { return m[1] + " · " + tr(m[2]); } }]
  ];
  function tr(s) {
    var L = lang(); if (L === "en" || !s) return s;
    var d = I18N[L] || {}; if (Object.prototype.hasOwnProperty.call(d, s)) return d[s];
    for (var i = 0; i < PAT.length; i++) {
      var m = s.match(PAT[i][0]); if (!m) continue;
      var r = PAT[i][1][L]; if (!r) return s;
      return typeof r === "function" ? r(m) : s.replace(PAT[i][0], r);
    }
    return s;
  }
  function trNode(root) {
    if (lang() === "en" || !root) return;
    if (root.nodeType === 3) { trText(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(trText);
    var els = root.querySelectorAll ? [root].concat([].slice.call(root.querySelectorAll("[placeholder],[aria-label]"))) : [];
    els.forEach(function (e) { ["placeholder", "aria-label"].forEach(function (a) { var v = e.getAttribute && e.getAttribute(a); if (v) { var t = tr(v.trim()); if (t !== v.trim()) e.setAttribute(a, t); } }); });
  }
  function trText(n) {
    if (!n.parentElement || n.parentElement.closest("script,style,[data-notr]")) return;
    var v = n.nodeValue, t = v.trim(); if (!t || !/[A-Za-z]/.test(t)) return;
    var r = tr(t); if (r !== t) n.nodeValue = v.replace(t, r);
  }
  /* header and tab bar are static: keep the English and translate a copy */
  function chrome() {
    document.querySelectorAll(".hdr .hnav a, .tabbar a, .logo .sub, .sitefoot p").forEach(function (a) {
      [].slice.call(a.childNodes).forEach(function (n) { if (n.nodeType === 3 && n.nodeValue.trim()) { if (n._en == null) n._en = n.nodeValue; n.nodeValue = tr(n._en.trim()); } });
    });
    document.documentElement.lang = { en: "en", tl: "tl", ko: "ko" }[lang()];
    document.querySelectorAll("#langsw button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-l") === lang()); b.setAttribute("aria-pressed", b.getAttribute("data-l") === lang()); });
  }
  function setLang(l) { save("lk:lang", l); save("lk:langset", true); var o = document.getElementById("langpick"); if (o) o.remove(); chrome(); route(); }
  document.addEventListener("click", function (e) { var b = e.target.closest("[data-l]"); if (b) setLang(b.getAttribute("data-l")); });
  function firstPick() {
    if (load("lk:langset", false)) return;
    var o = document.createElement("div"); o.id = "langpick"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("data-notr", "");
    o.innerHTML = '<div class="lpbox"><p class="lpt">Choose your language<br><span>Piliin ang wika · 언어를 선택하세요</span></p>' +
      '<button data-l="tl"><b>Tagalog</b><span>Filipino</span></button><button data-l="en"><b>English</b><span>English</span></button><button data-l="ko"><b>한국어</b><span>Korean</span></button>' +
      '<p class="lpn">You can change it any time at the top of the page.</p></div>';
    document.body.appendChild(o);
  }
  new MutationObserver(function (ms) { if (lang() === "en") return; ms.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { trNode(n); }); }); }).observe(app, { childList: true, subtree: true });

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
    var h = '<div class="phases">', c = cur();
    C.phases.forEach(function (p) {
      h += '<section class="phase"><div class="ph-head"><h2>' + esc(p.name) + '</h2></div><p class="muted sm">' + esc(track === "ko" ? p.ko : p.vid) + '</p><ul class="wlist">';
      p.weeks.forEach(function (n) {
        var w = week(n), t = titles(w), meta = track === "ko" ? countWords(w) + " words" : (VL[n] || []).length + " video lessons";
        h += '<li><a href="#/' + track + "/" + n + '"' + (n === c ? ' class="on"' : "") + '><span class="wnum"><small>W</small>' + ((n - 1) % 4 + 1) + '</span><span class="wbody"><b>' + esc(track === "ko" ? t.ko : t.vid) + '</b><span class="muted sm">' + esc(track === "ko" ? w.goalKo : w.goalVid) + '</span></span><span class="wmeta">' + meta + (n === c ? '<em>Now</em>' : "") + "</span></a></li>";
      });
      h += "</ul></section>";
    });
    return h + "</div>";
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
      '<div class="htop"><section class="hero"><p class="eyebrow">Free · three 1-month courses</p><h1>Learn Korean and video editing on your phone</h1>' +
      '<p class="lead">Korean and video editing, taught together. Each month is a complete 4-week course: Saturday in person at 8:00, then Tuesday online. Month 1 starts Saturday, November 21. Finish Month 1, then go on to Month 2 and Month 3.</p>' + weekPick() + "</section>" +
      '<div class="hside">' + nextClass() + '<section class="today card"><div><p class="sm muted">Today\'s Korean quiz</p><p class="tnum"><b>' + Math.min(st.t.done, 50) + '</b> / 50' + (st.streak ? ' <span class="chip ok">' + st.streak + "-day streak</span>" : "") + '</p><div class="meter"><span style="width:' + Math.min(100, st.t.done * 2) + '%"></span></div></div>' + '<a class="btn btn-accent" href="#/quiz/ko">Start 50 questions</a></section>' + '</div></div>' + installCard() + '<a class="otbanner card" href="#/ot"><span class="otdot">OT</span><span><b>Start here: Orientation</b><span class="sm muted">Why Korean, where it can take you, how the course works</span></span><span class="arr">›</span></a>' +
      '<a class="otbanner card aiban" href="#/ai"><span class="otdot">AI</span><span><b>AI Lab</b><span class="sm muted">Tool kit, 12 copy-paste prompts and weekly AI challenges</span></span><span class="arr">›</span></a>' +
      '<div class="courses">' +
      '<a class="course ko" href="#/ko"><span class="cbig" aria-hidden="true">한</span><span class="ctag">Course 1</span><h2>Korean</h2><p>From Hangul to TOPIK I and EPS-TOPIK level. Tap any word to hear it.</p>' +
      '<span class="cstats"><b>' + totalWords + '</b> words and phrases · <b>3</b> months</span><span class="ccta">This week: ' + esc(t.ko) + " ›</span></a>" +
      '<a class="course vid" href="#/vid"><span class="cbig play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><span class="ctag">Course 2</span><h2>Video editing</h2><p>CapCut on your phone. Watch the lesson, then practice the same edit.</p>' +
      '<span class="cstats"><b>' + lessons + '</b> video lessons · <b>3</b> months</span><span class="ccta">This week: ' + esc(t.vid) + " ›</span></a></div>" +
      '<p class="more"><a href="#/hw/' + c + '">Print this week\'s homework</a> · <a href="#/books">Textbooks and past papers</a></p>';
    bindWeekPick(home); bindInstall();
  }


  /* ---------- orientation ---------- */
  function ot() {
    app.innerHTML = crumbs([["Home", "#/"], ["Orientation"]]) +
      '<section class="phero ko"><div><p class="eyebrow">Start here</p><h1>Orientation</h1><p class="lead">Why we learn Korean and video editing, where it can take you, and how the course works.</p></div></section>' +
      '<p class="notice card">This course is free. LIKHA Academy teaches Korean and video editing only. It does not recruit, select or send anyone to work or train in Korea, and charges no fees.</p>' +
      '<section class="sec"><h2>Korean opens three doors</h2><div class="otgrid">' +
      '<div class="card otc"><b>1</b><h3>Work from home</h3><p class="sm">Upload your portfolio on LIKHA and take orders from Korean clients, without leaving the Philippines.</p></div>' +
      '<div class="card otc"><b>2</b><h3>Pass a Korean test</h3><p class="sm">TOPIK proves your Korean. EPS-TOPIK is the test you need for an E-9 work visa in Korea. You register only through the DMW (eps.dmw.gov.ph).</p></div>' +
      '<div class="card otc"><b>3</b><h3>Study further</h3><p class="sm">With a TOPIK score, you can apply on your own to Korean university language programs.</p></div></div></section>' +
      '<section class="sec"><h2>LIKHA is a marketplace, not a boss</h2><p class="sm muted">We do not hire you. You open your own shop on LIKHA with your profile and portfolio, and Korean clients choose you. The better your portfolio, the more orders you get.</p><div class="otgrid"><div class="card otc"><b>1</b><h3>Work from home</h3><p class="sm">All you need is your phone or a computer and the internet.</p></div><div class="card otc"><b>2</b><h3>Clients pick you</h3><p class="sm">Korean clients see your portfolio and order from you directly.</p></div><div class="card otc"><b>3</b><h3>Grow your income</h3><p class="sm">Better Korean and better edits bring more jobs and bigger jobs.</p></div></div></section>' +
      '<section class="sec"><h2>Your path</h2><ol class="path"><li><b>Month 1</b> Basics</li><li><b>Month 2</b> Everyday and workplace Korean</li><li><b>Month 3</b> Exam and client ready</li><li><b>LIKHA</b> Upload your portfolio, take orders</li><li><b>Korean test</b> TOPIK or EPS-TOPIK</li><li class="acc"><b>Next</b> Your choice: freelance on LIKHA, study further, or apply for EPS through the DMW</li></ol><p class="sm muted">Each month ends with a test. Pass it to go on to the next month.</p></section>' +
      '<section class="sec"><h2>How each week works</h2><div class="days"><div><b>Saturday · in person</b><span>8:00 to 11:00 Korean, 11:00 to 2:00 video. Up to 10 students. First class: Saturday, November 21 (orientation 8:00 to 10:00).</span></div><div><b>Tuesday · online</b><span>Korean 3 hours, then video 3 hours. Watch live on YouTube.</span></div></div></section>' +
      '<section class="sec"><h2>Bring every class</h2><ul class="plain"><li>Your phone, charged, with CapCut installed</li><li>Earphones, a notebook and a pen</li><li>Your homework sheets</li></ul></section>' +
      '<section class="sec"><h2>Class rules</h2><ul class="plain"><li>Come on time. Tell us if you will miss a class.</li><li>Practice every day, even 20 minutes. Do the 50 quiz.</li><li>Mistakes are normal. Ask questions and help each other.</li><li>Use only your own clips or free footage.</li></ul></section>' +
      '<div class="endcta card"><div><b>Ready?</b><p class="sm muted">Start with Month 1, Week 1.</p></div><a class="btn btn-accent" href="#/ko/1">Start Korean</a></div>';
  }


  /* ---------- desktop side panel for week pages ---------- */
  function sidePanel(track, n) {
    var w = week(n), t = titles(w), h = '<div class="sidecard card"><p class="sm muted">' + WL(n) + "</p><b>" + esc(track === "ko" ? t.ko : t.vid) + '</b><div class="sacts">';
    if (track === "ko") h += '<a class="btn btn-brand btn-block" href="#/cards/' + n + '">Flashcards</a><a class="btn btn-accent btn-block" href="#/quiz/ko/' + n + '/only">' + WS(n) + ' quiz</a>' + (n === 1 ? '<a class="btn btn-line btn-block" href="#/hangul">Hangul chart</a>' : "");
    else h += '<a class="btn btn-brand btn-block" href="#/quiz/vid/' + n + '/only">' + WS(n) + ' quiz</a><a class="btn btn-accent btn-block" href="#/ai">AI Lab</a>';
    h += '<a class="btn btn-line btn-block" href="#/' + (track === "ko" ? "vid" : "ko") + "/" + n + '">' + (track === "ko" ? "Video editing" : "Korean") + ' · ' + WS(n) + '</a><a class="btn btn-ghost btn-block" href="#/hw/' + n + '">Print this week\'s homework</a></div></div>';
    C.phases.forEach(function (p) {
      h += '<div class="sidecard card"><p class="sm"><b>' + esc(p.name) + '</b></p><ul class="sweeks">' + p.weeks.map(function (m) { var x = titles(week(m)); return '<li><a href="#/' + track + "/" + m + '"' + (m === n ? ' class="on"' : "") + '><span>' + WS(m) + "</span>" + esc(track === "ko" ? x.ko : x.vid) + "</a></li>"; }).join("") + "</ul></div>";
    });
    return '<aside class="wside">' + h + "</aside>";
  }
  /* ---------- Korean course ---------- */
  function koHome() {
    var st = stats();
    app.innerHTML = crumbs([["Home", "#/"], ["Korean"]]) +
      '<section class="phero ko"><div><p class="eyebrow">Course 1</p><h1>Korean</h1><p class="lead">Hangul, everyday and workplace Korean, then TOPIK I and EPS-TOPIK exam practice.</p>' + weekPick() + '</div></section>' +
      '<section class="quizcard card"><div><h2>Today\'s 50 questions</h2><p class="muted sm">Mostly this week\'s words, plus review from earlier weeks. Listening questions play the sound.</p>' +
      '<div class="meter"><span style="width:' + Math.min(100, st.t.done * 2) + '%"></span></div><p class="sm"><b>' + Math.min(st.t.done, 50) + '</b> of 50 done today</p></div>' +
      '<div class="qa"><a class="btn btn-accent btn-lg" href="#/quiz/ko">Start</a><a class="btn btn-line" href="#/quiz/ko/review">My mistakes</a></div></section>' +
      '<section class="tools3"><a class="card" href="#/hangul"><span class="ti">가</span><b>Hangul chart</b><span class="sm muted">Every letter and syllable</span></a><a class="card" href="#/cards/' + cur() + '"><span class="ti">⇄</span><b>Flashcards</b><span class="sm muted">' + WS(cur()) + ' · ' + mastered(cardPool(cur())) + '/' + cardPool(cur()).length + ' learned</span></a><a class="card" href="#/me"><span class="ti">★</span><b>My progress</b><span class="sm muted">Streak and scores</span></a></section>' +
      '<section class="sec"><label class="search"><span class="sr">Search all words</span><input id="wq" type="search" placeholder="Search a word: 안녕, hello, annyeong…" autocomplete="off"></label><div id="wres"></div></section>' +
      weekList("ko") + '<p class="more"><a href="#/books">Textbooks, past papers and mock tests</a></p>';
    bindWeekPick(koHome); bindSearch();
  }

  function koWeek(w) {
    var t = titles(w), h = crumbs([["Home", "#/"], ["Korean", "#/ko"], [WL(w.n)]]);
    h += '<header class="whead"><span class="wbadge">' + WL(w.n) + '</span><h1>' + esc(t.ko) + '</h1><p class="lead">' + esc(w.goalKo) + '</p>' +
      '<div class="days"><div><b>Sat · in person' + (dates(w.n) ? " · " + dates(w.n).split(" · ")[0].slice(4) : "") + '</b><span>' + esc(w.ko.sat) + '</span></div><div><b>Tue · online' + (dates(w.n) ? " · " + dates(w.n).split(" · ")[1].slice(4) : "") + '</b><span>' + esc(w.ko.tue) + "</span></div></div>" +
      '<p class="sm muted">Week check: ' + esc(w.test) + "</p>" + pattern(C.koPattern, "How each 3-hour Korean class runs") + "</header>";
    h += '<div id="voicenote">' + voiceNote() + "</div><p class=\"hint\">" + SPK + " Tap any word or sentence to hear it.</p>";
    if (w.n === 1) h += '<a class="otbanner card" href="#/hangul"><span class="otdot">가</span><span><b>Hangul chart and syllable builder</b><span class="sm muted">All 40 letters and every basic syllable, with sound</span></span><span class="arr">›</span></a>';
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
    var cp = cardPool(w.n);
    h += '<div class="endcta card"><div><b>Flashcards</b><p class="sm muted">' + mastered(cp) + " of " + cp.length + ' words learned. Tap to turn, then say it.</p></div><a class="btn btn-brand" href="#/cards/' + w.n + '">Practice cards</a></div>';
    h += '<div class="endcta card"><div><b>Check yourself</b><p class="sm muted">Questions from this week only.</p></div><a class="btn btn-accent" href="#/quiz/ko/' + w.n + '/only">' + WS(w.n) + " quiz</a></div>";
    h += weekNav("#/ko/", w.n);
    return h;
  }

  /* ---------- Video course ---------- */
  function vidHome() {
    app.innerHTML = crumbs([["Home", "#/"], ["Video editing"]]) +
      '<section class="phero vid"><div><p class="eyebrow">Course 2</p><h1>Video editing</h1><p class="lead">Every week: watch the lessons here, practice the same edit in CapCut, then hand in one finished video.</p>' + weekPick() + "</div></section>" +
      '<a class="otbanner card aiban" href="#/ai"><span class="otdot">AI</span><span><b>AI Lab</b><span class="sm muted">Tool kit, 12 copy-paste prompts and weekly AI challenges</span></span><span class="arr">›</span></a>' + '<section class="steps3"><div><b>1</b><span>Watch the lesson video on the week page</span></div><div><b>2</b><span>Practice the same edit with the free footage</span></div><div><b>3</b><span>Finish and show the week\'s video</span></div></section>' +
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
    h += aiChallenge(w.n);
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
      h += '<div class="opts">' + q.opts.map(function (o, j) { return '<button class="opt' + (q.koOpts ? " koo" : "") + '" data-i="' + j + '">' + esc(o) + "</button>"; }).join("") + '</div><div class="fb" aria-live="polite"></div><p class="kbd">Keyboard: 1 to 4 to answer, Enter for next</p></section>';
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

  /* ---------- Hangul chart & syllable builder ---------- */
  var CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", JUNG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
  var JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  var CR = { "ㄱ": "g/k", "ㄲ": "kk", "ㄴ": "n", "ㄷ": "d/t", "ㄸ": "tt", "ㄹ": "r/l", "ㅁ": "m", "ㅂ": "b/p", "ㅃ": "pp", "ㅅ": "s", "ㅆ": "ss", "ㅇ": "silent / ng", "ㅈ": "j", "ㅉ": "jj", "ㅊ": "ch", "ㅋ": "k", "ㅌ": "t", "ㅍ": "p", "ㅎ": "h" };
  var VR = { "ㅏ": "a", "ㅐ": "ae", "ㅑ": "ya", "ㅒ": "yae", "ㅓ": "eo", "ㅔ": "e", "ㅕ": "yeo", "ㅖ": "ye", "ㅗ": "o", "ㅘ": "wa", "ㅙ": "wae", "ㅚ": "oe", "ㅛ": "yo", "ㅜ": "u", "ㅝ": "wo", "ㅞ": "we", "ㅟ": "wi", "ㅠ": "yu", "ㅡ": "eu", "ㅢ": "ui", "ㅣ": "i" };
  var BASIC_C = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ", DOUBLE_C = "ㄲㄸㅃㅆㅉ", BASIC_V = "ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ", COMP_V = "ㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ";
  var BAT = ["", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  function syl(c, v, b) { return String.fromCharCode(0xAC00 + (CHO.indexOf(c) * 21 + JUNG.indexOf(v)) * 28 + (b ? JONG.indexOf(b) : 0)); }
  function jamoTiles(chars, isC) {
    return '<div class="tiles">' + chars.split("").map(function (j) {
      var say = isC ? syl(j, "ㅏ") : syl("ㅇ", j);
      return '<button data-say="' + say + '"><span class="hk">' + j + '</span><span class="rm">' + esc(isC ? CR[j] : VR[j]) + "</span></button>";
    }).join("") + "</div>";
  }
  function hangul() {
    var h = crumbs([["Home", "#/"], ["Korean", "#/ko"], ["Hangul chart"]]) +
      '<section class="phero ko"><div><p class="eyebrow">Week 1 helper</p><h1>Hangul chart</h1><p class="lead">All 40 letters, every basic syllable and a block builder. Tap anything to hear it.</p></div></section>' +
      '<div id="voicenote">' + voiceNote() + "</div>" +
      '<section class="sec"><h2>Build a syllable</h2><p class="muted sm">Pick a consonant, a vowel and, if you like, a bottom letter (batchim).</p><div class="builder card">' +
      '<div class="bout"><button class="bsyl" id="bsyl" data-say="가">가</button><p class="sm muted" id="brom">g + a</p></div>' +
      '<div class="bpick"><p class="bl">Consonant</p><div class="seg" id="bc">' + (BASIC_C + DOUBLE_C).split("").map(function (j, i) { return '<button data-v="' + j + '"' + (i ? "" : ' class="on"') + ">" + j + "</button>"; }).join("") + "</div>" +
      '<p class="bl">Vowel</p><div class="seg" id="bv">' + (BASIC_V + COMP_V).split("").map(function (j, i) { return '<button data-v="' + j + '"' + (i ? "" : ' class="on"') + ">" + j + "</button>"; }).join("") + "</div>" +
      '<p class="bl">Bottom letter</p><div class="seg" id="bb">' + BAT.map(function (j, i) { return '<button data-v="' + j + '"' + (i ? "" : ' class="on"') + ">" + (j || "none") + "</button>"; }).join("") + "</div></div></div></section>" +
      '<section class="sec"><h2>14 basic consonants</h2><p class="muted sm">Each one is said with ㅏ so you can hear it.</p>' + jamoTiles(BASIC_C, true) + "</section>" +
      '<section class="sec"><h2>5 double consonants</h2><p class="muted sm">Said tighter and stronger, with no puff of air.</p>' + jamoTiles(DOUBLE_C, true) + "</section>" +
      '<section class="sec"><h2>10 basic vowels</h2><p class="muted sm">Written with the silent ㅇ in front, like 아.</p>' + jamoTiles(BASIC_V, false) + "</section>" +
      '<section class="sec"><h2>11 compound vowels</h2><p class="muted sm">Two vowels joined. ㅐ and ㅔ sound almost the same today.</p>' + jamoTiles(COMP_V, false) + "</section>" +
      '<section class="sec"><h2>Syllable table</h2><p class="muted sm">Consonant down the side, vowel across the top. Scroll sideways on a phone.</p><div class="sylwrap"><table class="syltab"><tr><th></th>' +
      BASIC_V.split("").map(function (v) { return "<th>" + v + "</th>"; }).join("") + "</tr>" +
      BASIC_C.split("").map(function (c) { return "<tr><th>" + c + "</th>" + BASIC_V.split("").map(function (v) { var s = syl(c, v); return '<td><button data-say="' + s + '">' + s + "</button></td>"; }).join("") + "</tr>"; }).join("") +
      "</table></div></section>" +
      '<div class="endcta card"><div><b>Test yourself</b><p class="sm muted">Week 1 quiz: letters and greetings.</p></div><a class="btn btn-accent" href="#/quiz/ko/1/only">M1 W1 quiz</a></div>';
    app.innerHTML = h;
    var sel = { c: "ㄱ", v: "ㅏ", b: "" };
    function upd() {
      var s = syl(sel.c, sel.v, sel.b), o = document.getElementById("bsyl");
      o.textContent = s; o.setAttribute("data-say", s);
      document.getElementById("brom").textContent = (CR[sel.c] === "silent / ng" ? "silent ㅇ" : CR[sel.c]) + " + " + VR[sel.v] + (sel.b ? " + " + sel.b : "");
      speak(s, o);
    }
    [["bc", "c"], ["bv", "v"], ["bb", "b"]].forEach(function (p) {
      var box = document.getElementById(p[0]);
      box.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        box.querySelectorAll("button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on");
        sel[p[1]] = b.getAttribute("data-v"); upd();
      });
    });
  }

  /* ---------- flashcards (Leitner boxes) ---------- */
  function boxes() { return load("lk:box", {}); }
  function mastered(list) { var b = boxes(), n = 0; list.forEach(function (i) { if ((b[i.ko] || 0) >= 3) n++; }); return n; }
  function cardPool(n) { return wordPool(n, n).filter(function (i) { return !i.tile; }); }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function norm(s) { return String(s).replace(/[\s.,!?~…·'"()]/g, "").replace(/___/g, ""); }
  function cards(n) {
    var all = cardPool(n), b = boxes(), dir = load("lk:carddir", "ko");
    var deck = shuffle(all).sort(function (x, y) { return (b[x.ko] || 0) - (b[y.ko] || 0); }).slice(0, 20), i = 0, got = 0;
    var head = crumbs([["Home", "#/"], ["Korean", "#/ko"], [WS(n), "#/ko/" + n], ["Flashcards"]]);
    if (!deck.length) { app.innerHTML = head + '<section class="card center pad"><h1>No cards for this week</h1><a class="btn btn-accent" href="#/ko/' + n + '">Back</a></section>'; return; }
    function show() {
      var it = deck[i], front = dir === "ko" ? '<p class="fko">' + esc(it.ko) + "</p>" : '<p class="fen">' + esc(it.en) + "</p>";
      app.innerHTML = head + '<section class="fcwrap"><div class="qbar"><span class="sm muted">' + WL(n) + " · " + mastered(all) + " of " + all.length + ' learned</span><b>' + (i + 1) + " / " + deck.length + '</b></div><div class="meter"><span style="width:' + (i / deck.length * 100) + '%"></span></div>' +
        '<div class="fdir"><button data-d="ko"' + (dir === "ko" ? ' class="on"' : "") + '>Korean first</button><button data-d="en"' + (dir === "en" ? ' class="on"' : "") + ">English first</button></div>" +
        '<button class="fcard card" id="fc">' + front + '<span class="fhint sm muted">Tap to turn over</span><span class="fback" hidden><span class="fko2">' + esc(it.ko) + '</span><span class="rm">' + esc(it.rom) + '</span><span class="en">' + esc(it.en) + "</span></span></button>" +
        '<div class="frow" id="fr" hidden><button class="btn btn-line btn-lg" id="fa">Again</button><button class="btn btn-accent btn-lg" id="fg">I knew it</button></div>' +
        '<div class="frow"><button class="btn btn-ghost" id="fl">' + SPK + ' Listen</button>' + (SR ? '<button class="btn btn-ghost" id="fs">🎤 Say it</button>' : "") + '</div><p class="sm center" id="fsr" aria-live="polite"></p><p class="kbd">Keyboard: Space to turn, 1 Again, 2 I knew it</p></section>';
      if (dir === "ko") speak(it.ko);
      var fc = document.getElementById("fc");
      fc.addEventListener("click", function () { fc.classList.add("open"); fc.querySelector(".fback").hidden = false; fc.querySelector(".fhint").hidden = true; document.getElementById("fr").hidden = false; speak(it.ko); });
      document.getElementById("fa").addEventListener("click", function () { mark(0); });
      document.getElementById("fg").addEventListener("click", function () { mark(1); });
      document.getElementById("fl").addEventListener("click", function () { speak(it.ko); });
      app.querySelectorAll("[data-d]").forEach(function (x) { x.addEventListener("click", function () { dir = x.getAttribute("data-d"); save("lk:carddir", dir); show(); }); });
      var fs = document.getElementById("fs"); if (fs) fs.addEventListener("click", function () { listen(it, fs); });
    }
    function mark(ok) { var bb = boxes(); bb[deck[i].ko] = ok ? Math.min(5, (bb[deck[i].ko] || 0) + 1) : 0; save("lk:box", bb); if (ok) got++; i++; if (i < deck.length) show(); else end(); }
    function end() {
      app.innerHTML = head + '<section class="card center pad score"><p class="sm muted">Flashcards · ' + WL(n) + '</p><p class="big">' + got + " / " + deck.length + '</p><p class="muted">' + mastered(all) + " of " + all.length + ' words learned this week</p><div class="row"><a class="btn btn-accent" id="again" href="#/cards/' + n + '">20 more cards</a><a class="btn btn-line" href="#/quiz/ko/' + n + '/only">Take the quiz</a><a class="btn btn-ghost" href="#/ko/' + n + '">Back to week</a></div></section>';
      document.getElementById("again").addEventListener("click", function (e) { e.preventDefault(); cards(n); });
    }
    show();
  }
  function listen(it, btn) {
    var out = document.getElementById("fsr"), r;
    try { r = new SR(); } catch (e) { return; }
    r.lang = "ko-KR"; r.interimResults = false; r.maxAlternatives = 5;
    btn.disabled = true; out.textContent = "Listening… say it now";
    r.onresult = function (e) {
      var alts = [], ok = false, t = norm(it.ko);
      for (var k = 0; k < e.results[0].length; k++) { alts.push(e.results[0][k].transcript); if (norm(e.results[0][k].transcript) === t) ok = true; }
      out.innerHTML = ok ? '<span class="okc">Perfect! You said ' + esc(it.ko) + "</span>" : '<span class="noc">I heard: ' + esc(alts[0] || "?") + "</span> · try again";
    };
    r.onerror = function () { out.textContent = "Could not hear you. Allow the microphone and try again."; };
    r.onend = function () { btn.disabled = false; };
    r.start();
  }

  /* ---------- word search ---------- */
  function allWords() { var o = []; C.weeks.forEach(function (w) { w.ko.sections.forEach(function (s) { if (s.type !== "tiles") s.items.forEach(function (i) { o.push({ ko: i[0], rom: i[1], en: i[2], w: w.n }); }); }); }); return o; }
  function bindSearch() {
    var q = document.getElementById("wq"), out = document.getElementById("wres"); if (!q) return;
    var list = allWords();
    q.addEventListener("input", function () {
      var v = q.value.trim().toLowerCase();
      if (v.length < 1) { out.innerHTML = ""; return; }
      var r = list.filter(function (i) { return i.ko.indexOf(v) >= 0 || i.en.toLowerCase().indexOf(v) >= 0 || tr(i.en).toLowerCase().indexOf(v) >= 0 || i.rom.toLowerCase().replace(/-/g, "").indexOf(v.replace(/-/g, "")) >= 0; }).slice(0, 30);
      out.innerHTML = r.length ? '<ul class="words card">' + r.map(function (i) { return '<li><button data-say="' + esc(i.ko) + '"><span class="wk"><span class="ko">' + esc(i.ko) + '</span><span class="rm">' + esc(i.rom) + '</span></span><span class="en">' + esc(i.en) + ' <small class="chip">' + WS(i.w) + "</small></span>" + SPK + "</button></li>"; }).join("") + "</ul>" : '<p class="muted sm">No words found.</p>';
    });
  }

  /* ---------- next class ---------- */
  function sessions() {
    var out = []; if (!C.start) return out;
    for (var k = 0; k < 4; k++) {
      var s = new Date(C.start); s.setDate(s.getDate() + 7 * k); s.setHours(8, 0, 0, 0);
      var t = new Date(s); t.setDate(t.getDate() + 3); t.setHours(19, 0, 0, 0);
      out.push({ d: s, end: new Date(s.getTime() + 6 * 36e5), what: "Saturday class at the church", sub: k === 0 ? "8:00 Orientation, then Korean and video" : "8:00 to 2:00 · Korean, then video", n: k + 1 });
      out.push({ d: t, end: new Date(t.getTime() + 3 * 36e5), what: "Tuesday online class", sub: "Join from your phone", n: k + 1, online: true });
    }
    return out;
  }
  function nextClass() {
    var now = new Date(), s = sessions().filter(function (x) { return x.end > now; })[0];
    if (!s) return '<section class="nextc card"><div><p class="sm muted">Next class</p><b>Month 2 dates coming soon</b><p class="sm muted">Ask Teacher Charlie or Pastor Jun.</p></div></section>';
    var live = s.d <= now, days = Math.ceil((new Date(s.d.getFullYear(), s.d.getMonth(), s.d.getDate()) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
    var when = live ? "Now" : days === 0 ? "Today" : days === 1 ? "Tomorrow" : "In " + days + " days";
    var dl = s.d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + (s.online ? "" : " · 8:00 AM");
    return '<section class="nextc card' + (live || days <= 1 ? " soon" : "") + '"><div class="ncw"><span>' + when + '</span></div><div><p class="sm muted">Next class · ' + WL(s.n) + '</p><b>' + s.what + '</b><p class="sm muted">' + dl + " · " + s.sub + '</p></div><a class="btn btn-line" href="#/' + (s.online ? "vid" : "ko") + "/" + s.n + '">Prepare</a></section>';
  }

  /* ---------- my progress ---------- */
  function me() {
    var s = load("lk:stats", { days: {} }), st = stats(), name = load("lk:name", ""), tot = 0, ok = 0;
    Object.keys(s.days).forEach(function (k) { tot += s.days[k].done; ok += s.days[k].right; });
    var bars = "", d = new Date(), mx = 50;
    var days14 = []; for (var k = 13; k >= 0; k--) { var x = new Date(d); x.setDate(d.getDate() - k); var key = x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate(); days14.push({ l: x.toLocaleDateString("en-US", { weekday: "narrow" }), v: (s.days[key] || { done: 0 }).done }); }
    days14.forEach(function (x) { mx = Math.max(mx, x.v); });
    bars = days14.map(function (x) { return '<div class="bcol"><span class="bv' + (x.v >= 50 ? " full" : "") + '" style="height:' + Math.round(x.v / mx * 100) + '%" title="' + x.v + '"></span><small>' + x.l + "</small></div>"; }).join("");
    var words = allWords(), mw = mastered(words), vl = 0, vlt = 0;
    Object.keys(VL).forEach(function (n) { VL[n].forEach(function (_, i) { vlt++; if (load("lk:" + n + ":vl:" + i, false)) vl++; }); });
    var wrong = load("lk:wrong", []).length, c = cur();
    var weekRows = C.weeks.filter(function (w) { return w.n <= Math.max(4, c); }).map(function (w) { var p = cardPool(w.n), m = mastered(p); return '<li><a href="#/cards/' + w.n + '"><span>' + WS(w.n) + '</span><span class="meter"><span style="width:' + (p.length ? m / p.length * 100 : 0) + '%"></span></span><b>' + m + "/" + p.length + "</b></a></li>"; }).join("");
    app.innerHTML = crumbs([["Home", "#/"], ["My progress"]]) +
      '<section class="phero ko"><div><p class="eyebrow">My progress</p><h1>' + (name ? esc(name) : "Hello!") + '</h1><label class="namei">My name <input id="nm" value="' + esc(name) + '" placeholder="Type your name" autocomplete="name"></label></div></section>' +
      '<section class="kpis"><div class="card"><b>' + st.streak + '</b><span>day streak</span></div><div class="card"><b>' + Math.min(st.t.done, 50) + '/50</b><span>today</span></div><div class="card"><b>' + (tot ? Math.round(ok / tot * 100) : 0) + '%</b><span>correct, all time</span></div><div class="card"><b>' + mw + '</b><span>words learned</span></div></section>' +
      '<section class="sec"><h2>Quiz questions, last 14 days</h2><div class="bars card">' + bars + '</div><p class="sm muted">Orange bars mean you finished all 50 that day.</p></section>' +
      '<section class="sec"><h2>Words learned by week</h2><p class="muted sm">A word counts as learned after you get it right in flashcards 3 times.</p><ul class="wprog">' + weekRows + "</ul></section>" +
      '<section class="sec"><h2>Video lessons</h2><div class="card pad2"><div class="meter"><span style="width:' + (vlt ? vl / vlt * 100 : 0) + '%"></span></div><p class="sm"><b>' + vl + "</b> of " + vlt + " lessons marked done</p></div></section>" +
      '<div class="endcta card"><div><b>Send my progress to the teacher</b><p class="sm muted">Opens WhatsApp with your numbers ready to send.</p></div><a class="btn btn-accent" id="share" href="#">Send</a></div>' +
      (wrong ? '<p class="more"><a href="#/quiz/ko/review">Practice my ' + wrong + " mistakes</a></p>" : "");
    var nm = document.getElementById("nm");
    nm.addEventListener("change", function () { save("lk:name", nm.value.trim()); me(); });
    document.getElementById("share").addEventListener("click", function (e) {
      e.preventDefault();
      var t = "LIKHA Academy progress\nName: " + (load("lk:name", "") || "-") + "\nClass: " + WL(cur()) + "\nToday: " + Math.min(st.t.done, 50) + "/50 quiz\nStreak: " + st.streak + " days\nCorrect (all time): " + (tot ? Math.round(ok / tot * 100) : 0) + "%\nWords learned: " + mw + "\nVideo lessons done: " + vl + "/" + vlt;
      if (navigator.share) navigator.share({ text: t }).catch(function () {}); else window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank");
    });
  }

  /* ---------- install as app ---------- */
  var deferredInstall = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferredInstall = e; var b = document.getElementById("inst"); if (b) b.hidden = false; });
  function installCard() {
    var standalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
    if (standalone || load("lk:noinst", false)) return "";
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    return '<section class="inst card" id="instc"><div><b>Put LIKHA on your home screen</b><p class="sm muted">' + (ios ? "In Safari tap Share, then Add to Home Screen. It works offline too." : "Opens like an app and works even without Wi-Fi.") + "</p></div>" +
      (ios ? "" : '<button class="btn btn-brand" id="inst"' + (deferredInstall ? "" : " hidden") + ">Install</button>") + '<button class="x" id="instx" aria-label="Hide">✕</button></section>';
  }
  function bindInstall() {
    var b = document.getElementById("inst"), x = document.getElementById("instx");
    if (b) b.addEventListener("click", function () { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall.userChoice.then(function () { deferredInstall = null; var c = document.getElementById("instc"); if (c) c.remove(); }); });
    if (x) x.addEventListener("click", function () { save("lk:noinst", true); var c = document.getElementById("instc"); if (c) c.remove(); });
  }


  /* ---------- keyboard shortcuts on desktop (quiz and flashcards) ---------- */
  document.addEventListener("keydown", function (e) {
    if (!document.body.classList.contains("inquiz") || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target; if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
    var k = e.key, opts = app.querySelectorAll(".opt:not([disabled])");
    if (opts.length && /^[1-4]$/.test(k) && opts[+k - 1]) { e.preventDefault(); opts[+k - 1].click(); return; }
    if (k === "Enter") { var nx = app.querySelector(".next"); if (nx && document.activeElement !== nx) { e.preventDefault(); nx.click(); return; } }
    var fc = document.getElementById("fc");
    if (fc) {
      var open = !document.getElementById("fr").hidden;
      if ((k === " " || k === "Enter") && !open) { e.preventDefault(); fc.click(); return; }
      if (open && (k === "1" || k === "ArrowLeft")) { e.preventDefault(); document.getElementById("fa").click(); return; }
      if (open && (k === "2" || k === "ArrowRight")) { e.preventDefault(); document.getElementById("fg").click(); return; }
    }
  });
  /* ---------- AI Lab ---------- */
  var AI = window.AILAB || { flow: [], tools: [], prompts: [], challenge: {}, rules: [], checks: [] };
  function L(o) { return o ? (o[lang()] || o.en) : ""; }
  function aiChallenge(n) {
    var c = AI.challenge[n]; if (!c) return "";
    return '<section class="sec"><div class="aich card" data-notr><span class="aitag">AI</span><div><b>' + L({ en: "AI challenge this week", tl: "AI challenge ngayong linggo", ko: "이번 주 AI 챌린지" }) + "</b><p>" + esc(L(c)) + '</p><a href="#/ai">' + L({ en: "Open the AI Lab: tools and prompts ›", tl: "Buksan ang AI Lab: tools at prompts ›", ko: "AI 랩 열기: 도구와 프롬프트 ›" }) + "</a></div></div></section>";
  }
  function aiLab() {
    var h = crumbs([["Home", "#/"], ["Video editing", "#/vid"], ["AI Lab"]]) + '<div data-notr>' +
      '<section class="phero vid aihero"><div><p class="eyebrow">AI Lab</p><h1>' + L({ en: "Edit faster with AI", tl: "Mag-edit nang mas mabilis gamit ang AI", ko: "AI로 더 빠르게 편집하기" }) + '</h1><p class="lead">' +
      L({ en: "Korean clients want videos fast. AI does the slow parts: ideas, scripts, captions, voices, images and cut-outs. You stay the editor who checks and decides.", tl: "Gusto ng Korean clients ng mabilis na video. Ang AI ang gagawa ng mabagal na bahagi: ideya, script, captions, boses, images at cut-outs. Ikaw pa rin ang editor na nagche-check at nagpapasya.", ko: "한국 클라이언트는 빠른 영상을 원해요. 아이디어, 대본, 자막, 목소리, 이미지, 누끼 같은 오래 걸리는 일은 AI가 하고, 확인과 결정은 편집자인 내가 해요." }) + "</p></div></section>";
    h += '<section class="sec"><h2>' + L({ en: "Where AI fits in a client job", tl: "Saan pumapasok ang AI sa client job", ko: "클라이언트 작업 속 AI의 자리" }) + '</h2><ol class="aiflow">' +
      AI.flow.map(function (f, i) { return '<li' + (i === 5 ? ' class="you"' : "") + '><b>' + esc(L(f)) + "</b><span>" + esc(L(f.ai)) + "</span></li>"; }).join("") + "</ol></section>";
    h += '<section class="sec"><h2>' + L({ en: "Your AI tool kit", tl: "Ang AI tool kit mo", ko: "나의 AI 도구 모음" }) + '</h2><p class="muted sm">' + L({ en: "All of these have a free version that works on a phone.", tl: "Lahat ng ito ay may libreng version na gumagana sa phone.", ko: "모두 휴대폰에서 쓸 수 있는 무료 버전이 있어요." }) + '</p><div class="aitools">' +
      AI.tools.map(function (t) { return '<article class="card"><span class="aiic" aria-hidden="true">' + t.icon + "</span><h3>" + esc(L(t.job)) + '</h3><p class="ainames">' + esc(t.names) + '</p><p class="sm">' + esc(L(t.use)) + "</p></article>"; }).join("") + "</div></section>";
    h += '<section class="sec"><h2>' + L({ en: "Prompt library", tl: "Prompt library", ko: "프롬프트 모음" }) + ' <span class="cnt">' + AI.prompts.length + '</span></h2><p class="muted sm">' + L({ en: "Copy a prompt, paste it into ChatGPT, Claude or Gemini, and replace the [brackets] with your own details.", tl: "Kopyahin ang prompt, i-paste sa ChatGPT, Claude o Gemini, at palitan ang [brackets] ng sarili mong detalye.", ko: "프롬프트를 복사해 ChatGPT, Claude, Gemini에 붙여 넣고 [괄호] 부분을 내 내용으로 바꾸세요." }) + '</p><div class="prompts">' +
      AI.prompts.map(function (p, i) { return '<article class="card prm"><div class="prmh"><b>' + esc(L(p.t)) + '</b><span class="chip">' + WS(p.w) + '</span></div><pre id="pr' + i + '">' + esc(p.p) + '</pre><button class="btn btn-line cpy" data-cp="pr' + i + '">' + L({ en: "Copy prompt", tl: "Kopyahin", ko: "복사" }) + "</button></article>"; }).join("") + "</div></section>";
    h += '<section class="sec"><h2>' + L({ en: "12 weekly AI challenges", tl: "12 lingguhang AI challenge", ko: "주간 AI 챌린지 12개" }) + '</h2><ol class="aichl">' +
      C.weeks.map(function (w) { var c = AI.challenge[w.n]; return c ? '<li><a href="#/vid/' + w.n + '"><span class="chip">' + WS(w.n) + "</span><span>" + esc(L(c)) + "</span></a></li>" : ""; }).join("") + "</ol></section>";
    h += '<section class="sec two-col"><div class="card pad2"><h2>' + L({ en: "AI rules for LIKHA editors", tl: "Mga patakaran sa AI para sa LIKHA editors", ko: "LIKHA 편집자 AI 규칙" }) + '</h2><ul class="plain">' + AI.rules.map(function (r) { return "<li>" + esc(L(r)) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="card pad2"><h2>' + L({ en: "AI check before delivery", tl: "AI check bago mag-deliver", ko: "납품 전 AI 검수" }) + "</h2>" + checks("lk:aichk", AI.checks.map(L)) + "</div></section>";
    h += '<div class="endcta card"><div><b>' + L({ en: "Test your AI knowledge", tl: "Subukan ang alam mo sa AI", ko: "AI 지식 확인" }) + '</b><p class="sm muted">' + L({ en: "AI questions are mixed into the video quiz.", tl: "Kasama ang AI questions sa video quiz.", ko: "AI 문제가 영상 퀴즈에 섞여 있어요." }) + '</p></div><a class="btn btn-brand" href="#/quiz/vid/' + Math.max(cur(), 3) + '">' + L({ en: "Video quiz", tl: "Video quiz", ko: "영상 퀴즈" }) + "</a></div></div>";
    app.innerHTML = h;
    app.querySelectorAll(".cpy").forEach(function (b) {
      b.addEventListener("click", function () {
        var txt = document.getElementById(b.getAttribute("data-cp")).textContent, done = function () { var o = b.textContent; b.textContent = L({ en: "Copied ✓", tl: "Nakopya ✓", ko: "복사됨 ✓" }); setTimeout(function () { b.textContent = o; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt); done(); }); else { fallbackCopy(txt); done(); }
      });
    });
  }
  function fallbackCopy(t) { try { var a = document.createElement("textarea"); a.value = t; a.style.position = "fixed"; a.style.opacity = "0"; document.body.appendChild(a); a.select(); document.execCommand("copy"); a.remove(); } catch (e) {} }

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
    if ((m = h.match(/^#\/ko\/(\d+)$/)) && week(+m[1])) { app.innerHTML = '<div class="wlay"><div class="wmain">' + koWeek(week(+m[1])) + "</div>" + sidePanel("ko", +m[1]) + "</div>"; setNav("ko"); }
    else if ((m = h.match(/^#\/vid\/(\d+)$/)) && week(+m[1])) { app.innerHTML = '<div class="wlay"><div class="wmain">' + vidWeek(week(+m[1])) + "</div>" + sidePanel("vid", +m[1]) + "</div>"; setNav("vid"); }
    else if ((m = h.match(/^#\/hw\/(\d+)$/)) && week(+m[1])) { app.innerHTML = hw(week(+m[1])); bindWeekPick(function () { location.hash = "#/hw/" + cur(); }); setNav("home"); }
    else if (h === "#/ko") { koHome(); setNav("ko"); }
    else if (h === "#/vid") { vidHome(); setNav("vid"); }
    else if (h === "#/books") { books(); setNav("ko"); }
    else if (h === "#/ot") { ot(); setNav("home"); }
    else if (h === "#/hangul") { hangul(); setNav("ko"); }
    else if (h === "#/ai") { aiLab(); setNav("ai"); }
    else if (h === "#/me") { me(); setNav("me"); }
    else if ((m = h.match(/^#\/cards\/(\d+)$/)) && week(+m[1])) { document.body.classList.add("inquiz"); cards(+m[1]); setNav("ko"); }
    else if (h === "#/quiz/ko/review") { document.body.classList.add("inquiz"); quiz("ko", "review", 0); setNav("quiz"); }
    else if ((m = h.match(/^#\/quiz\/(ko|vid)(?:\/(\d+)(\/only)?)?$/))) { var n = m[2] && week(+m[2]) ? +m[2] : cur(); document.body.classList.add("inquiz"); quiz(m[1], m[3] ? "only" : "daily", n); setNav(m[1] === "ko" ? "quiz" : "vid"); }
    else { home(); setNav("home"); }
    bindAfter(); chrome(); trNode(app);
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  route(); firstPick();
})();
