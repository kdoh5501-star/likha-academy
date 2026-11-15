// Weeks 5 to 12, phase info, and practice links for every week.
(function () {
  var C = window.COURSE;
  function yt(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }
  function px(q) { return "https://www.pexels.com/search/videos/" + encodeURIComponent(q) + "/"; }

  C.phases = [
    { n: 1, weeks: [1, 2, 3, 4], name: "Month 1: Foundation", ko: "Hangul, survival Korean and first 400 words. Aim: TOPIK I level 1 basics.", vid: "CapCut basics, talking videos, captions, first client job." },
    { n: 2, weeks: [5, 6, 7, 8], name: "Month 2: Everyday and workplace Korean", ko: "Verb endings, past and future, workplace and safety words from the EPS-TOPIK book. Aim: TOPIK I level 1 pass.", vid: "Short-form formats: hooks, vlog and mukbang edits, info shorts, color and sound." },
    { n: 3, weeks: [9, 10, 11, 12], name: "Month 3: Exam and client ready", ko: "Level 2 grammar, mock tests for TOPIK I and EPS-TOPIK, video-industry Korean. Aim: TOPIK I level 2.", vid: "Thumbnails, long-form, AI tools, speed editing and a 3-video portfolio." }
  ];

  C.schedule = "Saturday in person at 8:00, then Tuesday online. Each day is 6 hours: Korean 3 hours, then video 3 hours. Month 1 starts Saturday, November 21.";
  C.start = new Date(2026, 10, 21);
  C.koPattern = [
    ["30 min", "Daily quiz review: last class's words and wrong answers"],
    ["45 min", "New words: listen, repeat, write"],
    ["45 min", "Grammar: pattern, examples, make your own sentences"],
    ["15 min", "Break"],
    ["30 min", "Listening and reading from the EPS-TOPIK book or TOPIK past paper"],
    ["15 min", "Speaking in pairs with the day's sentences and a short test"]
  ];
  C.vidPattern = [
    ["20 min", "Watch the tutorial and the reference videos together"],
    ["25 min", "Teacher demo on the projector"],
    ["60 min", "Guided practice with the free footage"],
    ["10 min", "Break"],
    ["45 min", "Build the week's deliverable"],
    ["20 min", "Show and feedback"]
  ];

  C.resources = [
    { t: "EPS-TOPIK official textbook (free PDF, many languages)", u: "https://epstopik.hrdkorea.or.kr/" },
    { t: "TOPIK past papers with audio", u: "https://www.topikguide.com/previous-papers/" },
    { t: "TOPIK online mock tests", u: "https://www.topikguide.com/mock-tests/" },
    { t: "TOPIK official site", u: "https://www.topik.go.kr/" },
    { t: "Free stock video footage (Pexels)", u: "https://www.pexels.com/videos/" },
    { t: "CapCut beginner guide", u: "https://www.capcut.com/resource/capcut-tutorial-for-beginners" }
  ];

  // Practice links for weeks 1 to 4 (weeks 5 to 12 carry their own below)
  var early = {
    1: [["Tutorial", "CapCut mobile basics for beginners", yt("capcut mobile tutorial for beginners")],
        ["Tutorial", "Split and trim in CapCut", yt("capcut how to split and trim clip")],
        ["Reference", "Short 30-second travel edits", yt("30 second travel shorts edit")],
        ["Footage", "Free clips: city and street", px("city street")],
        ["Korean", "Hangul pronunciation (listen and repeat)", yt("hangul alphabet pronunciation for beginners")]],
    2: [["Tutorial", "Auto captions in CapCut", yt("capcut auto captions tutorial")],
        ["Tutorial", "Cut pauses in a talking video", yt("capcut jump cut talking head tutorial")],
        ["Reference", "Korean talking-head shorts with captions", yt("유튜브 쇼츠 자막 편집 토킹헤드")],
        ["Footage", "Free clips: people talking", px("person talking to camera")],
        ["Korean", "Korean numbers explained", yt("korean numbers sino native explained")]],
    3: [["Tutorial", "Keyframes and slow zoom in CapCut", yt("capcut keyframe zoom tutorial")],
        ["Tutorial", "AI voice-over and text to speech in CapCut", yt("capcut text to speech voice over tutorial")],
        ["Reference", "Korean small-shop promo shorts", yt("카페 홍보 영상 쇼츠")],
        ["Footage", "Free clips: coffee shop", px("coffee shop")],
        ["Korean", "Korean days of the week and time", yt("korean days of the week telling time")]],
    4: [["Tutorial", "Export settings for YouTube, Reels and TikTok", yt("capcut best export settings 1080p")],
        ["Tutorial", "How freelance video editors work with clients", yt("freelance video editor client workflow")],
        ["Reference", "Korean product promo shorts", yt("제품 홍보 쇼츠 편집")],
        ["Footage", "Free clips: product shots", px("product")],
        ["Korean", "Polite Korean for work messages", yt("korean formal polite speech for work")]]
  };
  C.weeks.forEach(function (w) { if (early[w.n]) w.links = early[w.n]; });

  function S(title, items, note) { return { title: title, type: "words", items: items, note: note }; }

  C.weeks.push(
  /* ---------------------------------------------------------- WEEK 5 */
  { n: 5, title: "Daily verbs. Hook the viewer.",
    goalKo: "Say what you do every day with -아요/어요 and place words.",
    goalVid: "Edit a 30-second short whose first 3 seconds make people stay.",
    test: "Describe your day in 6 sentences.",
    ko: { tue: "Polite -아요/어요 endings and 16 daily verbs", sat: "Places, the particles 에 and 에서, and describing your day",
      grammar: [
        ["-아요/어요", "Polite everyday ending. 가다 → 가요, 먹다 → 먹어요, 하다 → 해요.", "저는 밥을 먹어요. (I eat rice.)"],
        ["은/는, 이/가", "Topic and subject markers. After a final consonant use 은/이.", "저는 학생이에요. 회사가 커요."],
        ["을/를", "Object marker.", "커피를 마셔요."],
        ["에 / 에서", "에 = to or at a place. 에서 = where an action happens.", "회사에 가요. 회사에서 일해요."]
      ],
      sections: [
        S("Daily verbs", [["가요", "gayo", "go"], ["와요", "wayo", "come"], ["먹어요", "meogeoyo", "eat"], ["마셔요", "masyeoyo", "drink"],
          ["해요", "haeyo", "do"], ["봐요", "bwayo", "see, watch"], ["자요", "jayo", "sleep"], ["일해요", "ilhaeyo", "work"],
          ["공부해요", "gongbuhaeyo", "study"], ["만나요", "mannayo", "meet"], ["사요", "sayo", "buy"], ["읽어요", "ilgeoyo", "read"],
          ["써요", "sseoyo", "write, use"], ["들어요", "deureoyo", "listen"], ["기다려요", "gidaryeoyo", "wait"], ["좋아해요", "joahaeyo", "like"]],
          "The dictionary form ends in -다. Tap to hear the polite form."),
        S("Places", [["회사", "hoesa", "company, office"], ["공장", "gongjang", "factory"], ["집", "jip", "home"], ["식당", "sikdang", "restaurant"],
          ["시장", "sijang", "market"], ["병원", "byeongwon", "hospital"], ["은행", "eunhaeng", "bank"], ["약국", "yakguk", "pharmacy"],
          ["화장실", "hwajangsil", "toilet"], ["사무실", "samusil", "office room"], ["기숙사", "gisuksa", "dormitory"], ["편의점", "pyeonuijeom", "convenience store"]]),
        S("Sentences", [["어디에 가요?", "eodie gayo?", "Where are you going?"], ["회사에 가요", "hoesae gayo", "I am going to work"],
          ["공장에서 일해요", "gongjangeseo ilhaeyo", "I work at a factory"], ["뭐 해요?", "mwo haeyo?", "What are you doing?"],
          ["영상을 편집해요", "yeongsangeul pyeonjiphaeyo", "I am editing a video"], ["매일 한국어를 공부해요", "maeil hangugeoreul gongbuhaeyo", "I study Korean every day"]])
      ] },
    vid: { tue: { title: "Tuesday online: the short-form formula", mins: 180, steps: [
        "Watch 10 top Korean shorts. Write down what happens in the first 3 seconds of each.",
        "Learn the three hook types: a question, a surprising picture, or the result shown first.",
        "Learn pacing: change the picture every 1 to 2 seconds in shorts.",
        "Practice jump cuts on the free footage: cut out every slow part.",
        "Make 3 different first-3-second openings for the same clip set."] },
      sat: { title: "Saturday in person: rebuild a reference short", mins: 180, steps: [
        "Pick one reference short from the links. Write its structure: hook, middle, end, call to action.",
        "Rebuild the same structure with free Pexels footage.",
        "Add captions, one sound effect on the hook, and music under 20 percent.",
        "Export 9:16 1080p. Compare side by side with the reference."] },
      deliver: { title: "Deliverable: a 30-second hook short", checks: ["The first 3 seconds show the hook clearly.", "The picture changes every 1 to 2 seconds.", "Captions are correct and inside the safe area.", "It follows the reference structure.", "Exported 9:16 at 1080p."] },
      mistakes: ["A slow logo or title at the start.", "Long shots with nothing changing.", "Copying someone else's footage instead of using free or your own clips."] },
    links: [["Tutorial", "How to make a strong hook for shorts", yt("how to hook viewers first 3 seconds shorts editing")],
      ["Tutorial", "Jump cuts and pacing in CapCut", yt("capcut jump cut pacing tutorial")],
      ["Reference", "Popular Korean shorts (study the openings)", yt("인기 쇼츠 편집 후킹")],
      ["Footage", "Free clips: daily life", px("daily life")],
      ["Korean", "Korean present tense -아요/어요", yt("korean present tense 아요 어요 explained")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the 16 daily verbs.", "Read the 4 grammar cards.", "Watch 5 Korean shorts and write each hook in one line."] },
      wed: { title: "Practice sheet", items: ["Write 8 sentences about your day with 에 and 에서.", "Do the daily 50 quiz 3 times this week.", "Finish your 3 hook openings and bring them."] } } },

  /* ---------------------------------------------------------- WEEK 6 */
  { n: 6, title: "Past tense, family and food. Edit a vlog.",
    goalKo: "Talk about yesterday with -았어요/었어요. Family and food words.",
    goalVid: "Edit a 60-second vlog or mukbang short with B-roll and sound.",
    test: "Tell what you did yesterday in 6 sentences.",
    ko: { tue: "Past tense and time words", sat: "Family, food, ordering and likes",
      grammar: [
        ["-았어요/었어요", "Past tense. 가요 → 갔어요, 먹어요 → 먹었어요, 해요 → 했어요.", "어제 친구를 만났어요."],
        ["안 + verb", "Not. Put 안 before the verb.", "오늘은 안 가요."],
        ["-고", "And (joining two actions).", "밥을 먹고 커피를 마셔요."],
        ["N 주세요", "Please give me N. Use it to order food.", "김치찌개 하나 주세요."]
      ],
      sections: [
        S("Past tense", [["갔어요", "gasseoyo", "went"], ["왔어요", "wasseoyo", "came"], ["먹었어요", "meogeosseoyo", "ate"], ["했어요", "haesseoyo", "did"],
          ["봤어요", "bwasseoyo", "saw"], ["잤어요", "jasseoyo", "slept"], ["일했어요", "ilhaesseoyo", "worked"], ["샀어요", "sasseoyo", "bought"]]),
        S("Family", [["가족", "gajok", "family"], ["아버지", "abeoji", "father"], ["어머니", "eomeoni", "mother"], ["형", "hyeong", "older brother (said by a man)"],
          ["오빠", "oppa", "older brother (said by a woman)"], ["누나", "nuna", "older sister (said by a man)"], ["언니", "eonni", "older sister (said by a woman)"],
          ["동생", "dongsaeng", "younger sibling"], ["남편", "nampyeon", "husband"], ["아내", "anae", "wife"], ["아들", "adeul", "son"], ["딸", "ttal", "daughter"], ["친구", "chingu", "friend"]]),
        S("Food", [["밥", "bap", "rice, meal"], ["김치", "gimchi", "kimchi"], ["고기", "gogi", "meat"], ["생선", "saengseon", "fish"], ["라면", "ramyeon", "ramen"],
          ["과일", "gwail", "fruit"], ["빵", "ppang", "bread"], ["계란", "gyeran", "egg"], ["물", "mul", "water"], ["맛있어요", "masisseoyo", "It is delicious"],
          ["매워요", "maewoyo", "It is spicy"], ["배고파요", "baegopayo", "I am hungry"]]),
        S("Time", [["어제", "eoje", "yesterday"], ["지난주", "jinanju", "last week"], ["아침", "achim", "morning"], ["점심", "jeomsim", "lunch, noon"], ["저녁", "jeonyeok", "evening, dinner"], ["주말", "jumal", "weekend"]])
      ] },
    vid: { tue: { title: "Tuesday online: vlog and mukbang editing", mins: 180, steps: [
        "Watch Korean mukbang and vlog shorts. Note the close-ups, sound and text.",
        "Learn B-roll: short extra shots that cover cuts and show details.",
        "Learn sound design: chewing and cooking sounds louder, music lower, small sound effects on text.",
        "Plan a 60-second vlog of your own day or a meal: list 12 shots."] },
      sat: { title: "Saturday in person: edit your vlog", mins: 180, steps: [
        "Film your 12 shots during the morning break, or use the free footage.",
        "Cut to the beat of the music. Add B-roll over every jump cut.",
        "Add emphasis text on key moments (big, short, colored outline).",
        "Balance sound: voice or eating sounds first, music under them.",
        "Export and present."] },
      deliver: { title: "Deliverable: a 60-second vlog or mukbang short", checks: ["At least 12 different shots.", "Cuts follow the music beat.", "Eating or voice sound is clear over the music.", "Emphasis text is short and readable.", "Exported 9:16 at 1080p."] },
      mistakes: ["Music covering the main sound.", "Too much emphasis text, so nothing stands out.", "Shaky shots with no B-roll to hide them."] },
    links: [["Tutorial", "B-roll and cutting to the beat in CapCut", yt("capcut beat sync b-roll tutorial")],
      ["Tutorial", "Mukbang editing tips", yt("먹방 편집 하는법")],
      ["Reference", "Korean mukbang shorts", yt("먹방 쇼츠")],
      ["Reference", "Korean daily vlog shorts", yt("브이로그 쇼츠 일상")],
      ["Footage", "Free clips: cooking and food", px("cooking food")],
      ["Korean", "Korean past tense", yt("korean past tense 았어요 었어요")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the family words.", "Change 8 verbs from Month 2 Week 1 into the past tense.", "Plan your 12 vlog shots."] },
      wed: { title: "Practice sheet", items: ["Write 6 sentences about last weekend.", "Order 3 foods aloud with 주세요.", "Do the daily 50 quiz 3 times.", "Film your 12 shots."] } } },

  /* ---------------------------------------------------------- WEEK 7 */
  { n: 7, title: "Workplace and safety Korean. Edit an info short.",
    goalKo: "Understand workplace orders and safety signs from the EPS-TOPIK book.",
    goalVid: "Edit a 45-second info short with Korean keyword captions and graphics.",
    test: "Read 10 safety signs and follow 5 spoken instructions.",
    ko: { tue: "Instructions with -(으)세요 and -지 마세요", sat: "Safety signs, tools, work schedule and pay",
      grammar: [
        ["-(으)세요", "Polite request or order. 하다 → 하세요, 앉다 → 앉으세요.", "안전모를 쓰세요."],
        ["-지 마세요", "Please do not.", "여기에서 담배를 피우지 마세요."],
        ["-아야/어야 해요", "Must, have to.", "장갑을 껴야 해요."],
        ["-아도/어도 돼요", "It is okay to, may.", "지금 쉬어도 돼요."]
      ],
      sections: [
        S("Safety", [["안전", "anjeon", "safety"], ["위험", "wiheom", "danger"], ["조심하세요", "josimhaseyo", "Be careful"], ["금지", "geumji", "prohibited"],
          ["출입금지", "churipgeumji", "No entry"], ["금연", "geumyeon", "No smoking"], ["소화기", "sohwagi", "fire extinguisher"], ["비상구", "bisanggu", "emergency exit"],
          ["불이야!", "buriya!", "Fire!"], ["다쳤어요", "dachyeosseoyo", "I got hurt"], ["도와주세요", "dowajuseyo", "Help me"], ["119", "il-il-gu", "emergency number in Korea"]]),
        S("Work gear and tools", [["안전모", "anjeonmo", "safety helmet"], ["장갑", "janggap", "gloves"], ["안전화", "anjeonhwa", "safety shoes"], ["작업복", "jageopbok", "work clothes"],
          ["기계", "gigye", "machine"], ["공구", "gonggu", "tool"], ["망치", "mangchi", "hammer"], ["상자", "sangja", "box"], ["창고", "changgo", "warehouse"]]),
        S("Work life", [["출근", "chulgeun", "going to work"], ["퇴근", "toegeun", "leaving work"], ["야근", "yageun", "night overtime"], ["휴가", "hyuga", "vacation, leave"],
          ["월급", "wolgeup", "monthly pay"], ["사장님", "sajangnim", "boss, owner"], ["반장님", "banjangnim", "team leader"], ["동료", "dongnyo", "coworker"],
          ["회의", "hoeui", "meeting"], ["쉬는 시간", "swineun sigan", "break time"]]),
        S("Instructions", [["이것을 옮기세요", "igeoseul omgiseyo", "Move this"], ["기계를 끄세요", "gigyereul kkeuseyo", "Turn off the machine"],
          ["여기에 두세요", "yeogie duseyo", "Put it here"], ["만지지 마세요", "manjiji maseyo", "Do not touch"], ["천천히 하세요", "cheoncheonhi haseyo", "Do it slowly"],
          ["다시 해 주세요", "dasi hae juseyo", "Please do it again"]])
      ] },
    vid: { tue: { title: "Tuesday online: info shorts and graphics", mins: 180, steps: [
        "Study Korean info shorts: one topic, three points, big keyword captions.",
        "Learn keyword highlighting: color one key word per caption line.",
        "Add stickers, arrows and simple shapes to point at things.",
        "Write a 3-point script: '3 safety rules at work' using this week's Korean."] },
      sat: { title: "Saturday in person: make the info short", mins: 180, steps: [
        "Record your voice or use TTS for the script.",
        "Find matching free footage for every point.",
        "Add numbered points on screen (1, 2, 3) with highlighted Korean keywords.",
        "Add a simple intro hook and an ending line.",
        "Export and present."] },
      deliver: { title: "Deliverable: a 45-second info short", checks: ["Exactly 3 clear points.", "Korean keywords are spelled correctly.", "One highlight color, used the same way each time.", "Graphics do not cover faces or key objects.", "Exported 9:16 at 1080p."] },
      mistakes: ["Too many colors and fonts.", "Text that disappears before people can read it.", "Graphics covering the main subject."] },
    links: [["Tutorial", "Text animation and keyword highlight in CapCut", yt("capcut text highlight animation tutorial")],
      ["Tutorial", "Stickers and arrows in CapCut", yt("capcut stickers shapes arrows tutorial")],
      ["Reference", "Korean info shorts", yt("정보 쇼츠 자막 편집")],
      ["Footage", "Free clips: factory and workers", px("factory worker")],
      ["Korean", "EPS-TOPIK workplace vocabulary", yt("EPS TOPIK workplace vocabulary")],
      ["Korean", "EPS-TOPIK safety signs", yt("EPS TOPIK safety signs korean")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the 12 safety words.", "Read the EPS-TOPIK book unit on safety (link on the Resources page).", "Write your 3-point script."] },
      wed: { title: "Practice sheet", items: ["Write 6 instructions with -(으)세요 and 4 with -지 마세요.", "Draw and label 5 safety signs.", "Do the daily 50 quiz 3 times.", "Record your script voice."] } } },

  /* ---------------------------------------------------------- WEEK 8 */
  { n: 8, title: "Health, shopping and plans. Color and sound.",
    goalKo: "Explain where it hurts, buy things and talk about plans.",
    goalVid: "Color-correct and clean the sound of a 60-second edit. Phase 2 portfolio piece.",
    test: "Phase 2 test: TOPIK I style listening and reading, 40 questions.",
    ko: { tue: "Body, health and wanting to: -고 싶어요", sat: "Shopping, transport and plans: -(으)ㄹ 거예요. Phase 2 test.",
      grammar: [
        ["-고 싶어요", "I want to.", "한국에서 일하고 싶어요."],
        ["-(으)ㄹ 거예요", "Will, going to (plans).", "내일 병원에 갈 거예요."],
        ["-(으)러 가요", "Go to do something.", "약을 사러 약국에 가요."],
        ["N이/가 아파요", "My N hurts.", "머리가 아파요."]
      ],
      sections: [
        S("Body and health", [["머리", "meori", "head"], ["눈", "nun", "eye"], ["배", "bae", "stomach"], ["손", "son", "hand"], ["발", "bal", "foot"], ["허리", "heori", "lower back"],
          ["아파요", "apayo", "It hurts"], ["감기", "gamgi", "a cold"], ["열", "yeol", "fever"], ["약", "yak", "medicine"], ["의사", "uisa", "doctor"], ["괜찮아요?", "gwaenchanayo?", "Are you okay?"]]),
        S("Shopping", [["얼마예요?", "eolmayeyo?", "How much is it?"], ["비싸요", "bissayo", "It is expensive"], ["싸요", "ssayo", "It is cheap"],
          ["깎아 주세요", "kkakka juseyo", "Please give a discount"], ["이거 주세요", "igeo juseyo", "This one, please"], ["카드", "kadeu", "card"], ["현금", "hyeongeum", "cash"], ["영수증", "yeongsujeung", "receipt"]]),
        S("Transport", [["버스", "beoseu", "bus"], ["지하철", "jihacheol", "subway"], ["역", "yeok", "station"], ["정류장", "jeongnyujang", "bus stop"],
          ["타요", "tayo", "ride, get on"], ["내려요", "naeryeoyo", "get off"], ["갈아타요", "garatayo", "transfer"], ["길", "gil", "road, way"]])
      ] },
    vid: { tue: { title: "Tuesday online: color and sound", mins: 180, steps: [
        "Learn the color order: fix brightness and white balance first, then add a look.",
        "Match two clips filmed in different light.",
        "Learn sound clean-up: noise reduction, voice volume, and music ducking under speech.",
        "Collect your best edits from Month 2 Weeks 1 to 3."] },
      sat: { title: "Saturday in person: polish and phase 2 portfolio", mins: 180, steps: [
        "Pick your best Month 2 Week 1 to 3 edit and re-edit it to 60 seconds.",
        "Color-correct every clip so they match.",
        "Clean the sound: no noise, voice steady, music ducked.",
        "Export and add it to your portfolio folder."] },
      deliver: { title: "Deliverable: phase 2 portfolio short", checks: ["All clips match in color.", "No background noise in the voice.", "Music drops under speech.", "No caption mistakes.", "Saved in the portfolio folder with a clear file name."] },
      mistakes: ["Heavy filters that change skin color.", "Music at the same volume as the voice.", "Mixing clips with very different brightness."] },
    links: [["Tutorial", "Color correction in CapCut mobile", yt("capcut color correction mobile tutorial")],
      ["Tutorial", "Noise reduction and audio in CapCut", yt("capcut reduce noise audio ducking tutorial")],
      ["Reference", "Before and after color grading", yt("color grading before and after phone video")],
      ["Footage", "Free clips: city market", px("market")],
      ["Korean", "TOPIK I listening practice", yt("TOPIK 1 listening practice")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the body and health words.", "Write 5 plans with -(으)ㄹ 거예요.", "Choose the edit for your portfolio."] },
      wed: { title: "Practice sheet", items: ["Do one TOPIK I past paper listening section (link on Resources).", "Role-play buying something with a classmate.", "Do the daily 50 quiz 3 times.", "Prepare for the phase 2 test."] } } },

  /* ---------------------------------------------------------- WEEK 9 */
  { n: 9, title: "Level 2 grammar. Thumbnails and long videos.",
    goalKo: "Join sentences with reasons, contrasts and conditions.",
    goalVid: "Edit a 3 to 5 minute 16:9 YouTube video and design its thumbnail.",
    test: "TOPIK I reading, 20 questions.",
    ko: { tue: "Reasons and contrasts: -아서/어서, -지만, -(으)니까", sat: "Conditions and ability: -(으)면, -(으)ㄹ 수 있어요. Weather and feelings.",
      grammar: [
        ["-아서/어서", "Because, so (reason).", "바빠서 못 갔어요."],
        ["-지만", "But.", "한국어는 어렵지만 재미있어요."],
        ["-(으)면", "If, when.", "비가 오면 집에 있어요."],
        ["-(으)ㄹ 수 있어요/없어요", "Can, cannot.", "오늘 끝낼 수 있어요."],
        ["-(으)니까", "Since, because (used with requests).", "늦었으니까 빨리 가세요."]
      ],
      sections: [
        S("Weather and seasons", [["날씨", "nalssi", "weather"], ["봄", "bom", "spring"], ["여름", "yeoreum", "summer"], ["가을", "gaeul", "autumn"], ["겨울", "gyeoul", "winter"],
          ["비가 와요", "biga wayo", "It is raining"], ["눈이 와요", "nuni wayo", "It is snowing"], ["더워요", "deowoyo", "It is hot"], ["추워요", "chuwoyo", "It is cold"], ["맑아요", "malgayo", "It is clear"]]),
        S("Feelings", [["기뻐요", "gippeoyo", "I am happy"], ["슬퍼요", "seulpeoyo", "I am sad"], ["피곤해요", "pigonhaeyo", "I am tired"], ["바빠요", "bappayo", "I am busy"],
          ["재미있어요", "jaemiisseoyo", "It is fun"], ["어려워요", "eoryeowoyo", "It is difficult"], ["쉬워요", "swiwoyo", "It is easy"], ["걱정돼요", "geokjeongdwaeyo", "I am worried"]]),
        S("Level 2 sentences", [["시간이 없어서 못 했어요", "sigani eopseoseo mot haesseoyo", "I could not do it because I had no time"],
          ["어렵지만 할 수 있어요", "eoryeopjiman hal su isseoyo", "It is hard but I can do it"], ["끝나면 연락할게요", "kkeunnamyeon yeollakhalgeyo", "I will contact you when it is done"],
          ["오늘은 할 수 없어요", "oneureun hal su eopseoyo", "I cannot do it today"]])
      ] },
    vid: { tue: { title: "Tuesday online: long-form structure and thumbnails", mins: 180, steps: [
        "Study a Korean YouTube video: intro hook, main parts, ending. Write the timestamps.",
        "Learn chapter titles and lower-third name captions.",
        "Thumbnail rules: one face or object, 3 to 5 big words, strong contrast.",
        "Design 2 thumbnails for the same video in Canva or CapCut."] },
      sat: { title: "Saturday in person: 16:9 edit", mins: 180, steps: [
        "Edit a 3 to 5 minute 16:9 video from the free footage and your voice.",
        "Add an intro hook, 3 chapter titles and an ending.",
        "Finish the better of your two thumbnails.",
        "Export 16:9 1080p and present with the thumbnail."] },
      deliver: { title: "Deliverable: a 16:9 video with thumbnail", checks: ["The intro hook is under 15 seconds.", "There are clear chapter titles.", "The thumbnail is readable on a small phone screen.", "Sound is steady from start to end.", "Exported 16:9 at 1080p."] },
      mistakes: ["A long slow intro.", "Thumbnail text too small or too many words.", "Forgetting to switch the project to 16:9."] },
    links: [["Tutorial", "How to make a YouTube thumbnail in Canva", yt("canva youtube thumbnail tutorial beginners")],
      ["Tutorial", "Editing a long YouTube video in CapCut", yt("capcut youtube video editing 16:9 tutorial")],
      ["Reference", "Korean YouTube thumbnail styles", yt("유튜브 썸네일 만드는법")],
      ["Footage", "Free clips: nature and travel", px("travel")],
      ["Korean", "TOPIK I grammar -아서/어서 and -지만", yt("korean grammar 아서 어서 지만")]],
    hw: { mon: { title: "Preview sheet", items: ["Read the 5 grammar cards.", "Write 2 sentences with each pattern.", "Plan your 16:9 video in 3 parts."] },
      wed: { title: "Practice sheet", items: ["Do one TOPIK I reading section.", "Learn the weather and feeling words.", "Do the daily 50 quiz 3 times.", "Make 2 thumbnail drafts."] } } },

  /* ---------------------------------------------------------- WEEK 10 */
  { n: 10, title: "Phone, schedule and Korean culture. AI tools.",
    goalKo: "Make and change appointments, and know basic Korean work culture.",
    goalVid: "Use AI tools for captions, translation, voice and background removal, and check them.",
    test: "EPS-TOPIK style mock test, 40 questions.",
    ko: { tue: "Phone calls, appointments and changes", sat: "Korean culture and manners from the EPS-TOPIK book. Mock test.",
      grammar: [
        ["-(으)ㄹ게요", "I will (promise to the listener).", "내일 전화할게요."],
        ["-(으)ㄹ까요?", "Shall we? / Shall I?", "3시에 만날까요?"],
        ["-기 전에 / -(으)ㄴ 후에", "Before / after.", "보내기 전에 확인하세요. 끝난 후에 연락 주세요."],
        ["-고 있어요", "Is doing (now).", "지금 편집하고 있어요."]
      ],
      sections: [
        S("Phone and schedule", [["전화", "jeonhwa", "phone call"], ["문자", "munja", "text message"], ["연락", "yeollak", "contact"], ["약속", "yaksok", "appointment"],
          ["취소", "chwiso", "cancel"], ["변경", "byeongyeong", "change"], ["회의", "hoeui", "meeting"], ["주소", "juso", "address"], ["이메일", "imeil", "email"],
          ["여보세요", "yeoboseyo", "Hello (on the phone)"], ["누구세요?", "nuguseyo?", "Who is it?"], ["나중에 다시 전화할게요", "najunge dasi jeonhwahalgeyo", "I will call again later"]]),
        S("Culture and manners", [["존댓말", "jondaenmal", "polite speech"], ["반말", "banmal", "casual speech"], ["설날", "seollal", "Lunar New Year"], ["추석", "chuseok", "Korean harvest holiday"],
          ["인사", "insa", "greeting, bow"], ["두 손으로 주세요", "du soneuro juseyo", "Give with two hands"], ["어른", "eoreun", "elder"], ["회식", "hoesik", "team dinner"]])
      ] },
    vid: { tue: { title: "Tuesday online: AI tools in real work", mins: 180, steps: [
        "Auto captions in Korean: generate, then fix every line with the word lists.",
        "Auto translate captions Korean to English and back. Mark the mistakes.",
        "AI voice: compare 3 voices for a Korean script. Pick the most natural.",
        "Background removal and AI image extension. Check edges and hands.",
        "Rules: only use music, images and voices you are allowed to use for business."] },
      sat: { title: "Saturday in person: one script, two languages", mins: 180, steps: [
        "Edit a 45-second short with Korean AI voice and Korean captions.",
        "Make a second version with English captions.",
        "Use at least one AI image or background removal and check it.",
        "Present both versions."] },
      deliver: { title: "Deliverable: a bilingual short (two versions)", checks: ["Korean captions have no mistakes.", "English captions match the meaning.", "The AI voice sounds natural and matches the captions.", "AI images have no strange details.", "Both versions exported 9:16 at 1080p."] },
      mistakes: ["Trusting auto translation without checking.", "Robotic voices with wrong word stress.", "Using AI images with broken text."] },
    links: [["Tutorial", "CapCut auto captions and translation", yt("capcut auto caption translate tutorial")],
      ["Tutorial", "CapCut remove background", yt("capcut remove background video tutorial")],
      ["Tutorial", "AI tools for video editors", yt("ai tools for video editors beginners")],
      ["Footage", "Free clips: office and meetings", px("office meeting")],
      ["Korean", "Korean phone call phrases", yt("korean phone call phrases beginner")],
      ["Korean", "EPS-TOPIK Korean culture questions", yt("EPS TOPIK korean culture")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the phone words.", "Read the EPS-TOPIK book unit on culture.", "Write the 45-second script."] },
      wed: { title: "Practice sheet", items: ["Make a role-play call to change an appointment.", "Take one online mock test (Resources).", "Do the daily 50 quiz 3 times.", "Fix all auto-caption errors in your draft."] } } },

  /* ---------------------------------------------------------- WEEK 11 */
  { n: 11, title: "Video-industry Korean. Speed editing.",
    goalKo: "Understand the words Korean clients use about videos.",
    goalVid: "Edit 3 shorts in one day from client briefs.",
    test: "Read 3 real-style Korean client briefs and list what they want.",
    ko: { tue: "YouTube and editing words", sat: "Reading Korean briefs and feedback. Offering: -아/어 드릴까요?",
      grammar: [
        ["-아/어 드릴게요", "I will do it for you (very polite).", "자막을 수정해 드릴게요."],
        ["-아/어 드릴까요?", "Shall I do it for you?", "썸네일도 만들어 드릴까요?"],
        ["-는데요", "Soft background or polite disagreement.", "음악이 조금 큰데요."],
        ["-(으)ㄴ/는 것 같아요", "I think, it seems.", "이 부분이 더 좋은 것 같아요."]
      ],
      sections: [
        S("YouTube words", [["구독자", "gudokja", "subscriber"], ["조회수", "johoesu", "view count"], ["좋아요", "joayo", "like"], ["댓글", "daetgeul", "comment"],
          ["채널", "chaeneol", "channel"], ["업로드", "eobrodeu", "upload"], ["알고리즘", "algorijeum", "algorithm"], ["쇼츠", "syocheu", "Shorts"]]),
        S("Editing words", [["컷편집", "keotpyeonjip", "cut editing"], ["인트로", "inteuro", "intro"], ["효과음", "hyogwaeum", "sound effect"], ["배경음악", "baegyeongeumak", "background music"],
          ["색보정", "saekbojeong", "color correction"], ["레퍼런스", "repeoreonseu", "reference"], ["톤앤매너", "tonaenmaeneo", "tone and manner, style"], ["컨펌", "keonpeom", "approval"],
          ["피드백", "pideubaek", "feedback"], ["납품", "nappum", "delivery of finished work"], ["세로형", "serohyeong", "vertical"], ["가로형", "garohyeong", "horizontal"],
          ["해상도", "haesangdo", "resolution"], ["렌더링", "rendeoring", "rendering"]]),
        S("Client feedback lines", [["자막이 너무 작아요", "jamagi neomu jagayo", "The captions are too small"], ["음악을 줄여 주세요", "eumageul juryeo juseyo", "Please turn down the music"],
          ["더 빠르게 해 주세요", "deo ppareuge hae juseyo", "Please make it faster"], ["이 부분은 빼 주세요", "i bubuneun ppae juseyo", "Please take this part out"],
          ["레퍼런스처럼 해 주세요", "repeoreonseucheoreom hae juseyo", "Please make it like the reference"], ["좋아요, 컨펌합니다", "joayo, keonpeomhamnida", "Good, approved"]])
      ] },
    vid: { tue: { title: "Tuesday online: templates and workflow", mins: 180, steps: [
        "Build your own caption and title templates so you can reuse them.",
        "Set up a folder system: brief, raw, project, export, delivery.",
        "Read 3 Korean briefs. Translate each into a 5-line checklist.",
        "Time yourself: a 30-second short in 40 minutes."] },
      sat: { title: "Saturday in person: 3 jobs in 3 hours", mins: 180, steps: [
        "Brief 1: a cafe promo short. 45 minutes.",
        "Brief 2: a talking-head info short. 45 minutes.",
        "Brief 3: a vlog-style product short. 45 minutes.",
        "The teacher gives Korean feedback on each. Fix and reply in Korean."] },
      deliver: { title: "Deliverable: 3 shorts in one day", checks: ["Each short matches its brief checklist.", "Each was finished within its time.", "Korean feedback was fixed.", "Replies used polite Korean from the lists.", "Files are named and in the delivery folder."] },
      mistakes: ["Starting without a checklist.", "Spending too long on one detail.", "Replying with words you do not understand."] },
    links: [["Tutorial", "CapCut templates and saving text styles", yt("capcut save text template style tutorial")],
      ["Tutorial", "Video editor workflow and file organization", yt("video editor file organization workflow")],
      ["Reference", "Korean editing request examples", yt("영상편집 외주 의뢰 피드백")],
      ["Footage", "Free clips: cafe", px("cafe")],
      ["Korean", "Korean honorific -아/어 드릴게요", yt("korean grammar 드릴게요 드릴까요")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the 14 editing words.", "Make your caption template.", "Set up your 5 folders."] },
      wed: { title: "Practice sheet", items: ["Translate one Korean brief into English.", "Write 5 replies with -아/어 드릴게요.", "Do the daily 50 quiz 3 times.", "Practice a 30-second short in 40 minutes."] } } },

  /* ---------------------------------------------------------- WEEK 12 */
  { n: 12, title: "Final exams and portfolio.",
    goalKo: "Pass the final TOPIK I and EPS-TOPIK mock tests and handle a full client chat.",
    goalVid: "Finish a 3-video portfolio and set up your LIKHA profile.",
    test: "Final: TOPIK I mock (70 questions), EPS-TOPIK mock (40 questions), live client chat.",
    ko: { tue: "Contracts, payment and full client chat review", sat: "Final mock tests and live chat test",
      grammar: [
        ["-기로 했어요", "We decided to.", "금요일까지 보내기로 했어요."],
        ["-(으)ㄴ 적이 있어요", "I have done before.", "광고 영상을 편집한 적이 있어요."],
        ["-게 되다", "It turned out, came to.", "다음 주부터 일하게 됐어요."]
      ],
      sections: [
        S("Contract and payment", [["계약", "gyeyak", "contract"], ["계약서", "gyeyakseo", "contract document"], ["견적서", "gyeonjeokseo", "written quote"], ["선금", "seongeum", "deposit, advance"],
          ["잔금", "jangeum", "remaining payment"], ["송금", "songgeum", "money transfer"], ["계좌", "gyejwa", "bank account"], ["비용", "biyong", "cost"],
          ["추가", "chuga", "additional"], ["포함", "poham", "included"], ["급해요", "geupaeyo", "It is urgent"], ["일정 조율", "iljeong joyul", "adjusting the schedule"]]),
        S("Portfolio Korean", [["포트폴리오", "poteupollio", "portfolio"], ["경력", "gyeongnyeok", "experience, career"], ["자기소개", "jagisogae", "self-introduction"],
          ["영상 편집 1년 차입니다", "yeongsang pyeonjip illyeon chaimnida", "I am in my first year of video editing"],
          ["숏폼 편집을 잘합니다", "syotpom pyeonjibeul jalhamnida", "I am good at short-form editing"],
          ["빠르게 작업할 수 있습니다", "ppareuge jageophal su itseumnida", "I can work fast"]])
      ] },
    vid: { tue: { title: "Tuesday online: portfolio and LIKHA profile", mins: 180, steps: [
        "Choose your best 3 videos: one short promo, one vlog or info short, one 16:9 video.",
        "Re-export each in the best quality and name them clearly.",
        "Write your LIKHA profile in Korean and English using the portfolio phrases.",
        "Set your prices for a 30-second short, a 60-second short and a 5-minute video."] },
      sat: { title: "Saturday in person: final client job and graduation", mins: 180, steps: [
        "Receive a mock client brief in Korean only.",
        "Ask questions, edit, take feedback, fix and deliver, all in Korean messages.",
        "Upload your 3 portfolio videos to LIKHA.",
        "Present your portfolio. Certificates for everyone who passed."] },
      deliver: { title: "Deliverable: LIKHA-ready portfolio", checks: ["Three finished videos in different styles.", "Korean and English profile written.", "Prices set.", "Final client job delivered in Korean.", "Uploaded to LIKHA."] },
      mistakes: ["Including weak videos just to have more.", "A profile with mistakes in Korean.", "Prices with no clear revision limit."] },
    links: [["Tutorial", "How to build a video editing portfolio", yt("how to build a video editing portfolio beginner")],
      ["Tutorial", "How to price freelance video editing", yt("how to price freelance video editing")],
      ["Reference", "Short-form editor portfolio examples", yt("short form video editor portfolio reel")],
      ["Korean", "TOPIK I full mock test", yt("TOPIK 1 full mock test")],
      ["Korean", "EPS-TOPIK mock test", yt("EPS TOPIK mock test")]],
    hw: { mon: { title: "Preview sheet", items: ["Learn the contract and payment words.", "Choose your 3 portfolio videos.", "Draft your profile."] },
      wed: { title: "Practice sheet", items: ["Take one full TOPIK I past paper.", "Take one EPS-TOPIK online mock test.", "Do the daily 50 quiz every day.", "Practice the 6 client chats from Month 1 Week 4 aloud."] } } }
  );

  C.weeks.forEach(function (w) {
    w.phase = w.n <= 4 ? 1 : w.n <= 8 ? 2 : 3;
    if (w.vid && w.vid.tue && w.n <= 4) w.vid.tue.mins = 180;
    // Classes start on Saturday: the first lesson of each week is the in-person Saturday class.
    var k = w.ko.tue; w.ko.tue = w.ko.sat; w.ko.sat = k;
    var v = w.vid.tue; w.vid.tue = w.vid.sat; w.vid.sat = v;
    w.vid.sat.title = w.vid.sat.title.replace(/^Tuesday online: /, "Saturday in person: ");
    w.vid.tue.title = w.vid.tue.title.replace(/^Saturday in person: /, "Tuesday online: ");
    if (w.n === 1) { w.ko.sat = "Orientation 8:00 to 10:00, then Korean 10:00 to 12:00: " + w.ko.sat; w.vid.sat.title = "Saturday in person: 12:00 to 2:00 · meet your editing app"; }
  });
})();
