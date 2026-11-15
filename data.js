// LIKHA Academy course content. Edit this file to change lessons.
// Items are [korean, romanization, english]. For letters, english = sound hint.
// "tiles" = letters or short items shown as cells. "words" = phrases shown as rows.
window.COURSE = {
  weeks: [
    /* ------------------------------------------------------------ WEEK 1 */
    {
      n: 1,
      title: "Read Hangul. Edit your first clip.",
      goalKo: "Read all of Hangul and use 15 greetings.",
      goalVid: "Edit a 30-second video from 3 clips.",
      test: "Read 20 syllables aloud without help.",
      sat: { ot: true, ko: "8:00 to 10:00 is orientation, then Korean 10:00 to 12:00", vid: "Video 12:00 to 2:00" },
      ko: {
        tue: "Vowels and the 14 basic consonants (1 hour)",
        sat: "Compound vowels, double consonants, final consonants and reading drills (2 hours)",
        sections: [
          { title: "Basic vowels", note: "Tap any letter to hear it. Korean vowels stay the same sound every time.", type: "tiles", items: [
            ["ㅏ", "a", "ah, like father"], ["ㅑ", "ya", "yah"], ["ㅓ", "eo", "uh, like cup"], ["ㅕ", "yeo", "yuh"],
            ["ㅗ", "o", "oh"], ["ㅛ", "yo", "yoh"], ["ㅜ", "u", "oo"], ["ㅠ", "yu", "yoo"], ["ㅡ", "eu", "uh with flat lips"], ["ㅣ", "i", "ee"]
          ]},
          { title: "Basic consonants", note: "The letter ㅇ is silent at the start of a syllable. Add a vowel to hear each one.", type: "tiles", items: [
            ["ㄱ", "g / k", "g in go"], ["ㄴ", "n", "n"], ["ㄷ", "d / t", "d in do"], ["ㄹ", "r / l", "between r and l"],
            ["ㅁ", "m", "m"], ["ㅂ", "b / p", "b in bay"], ["ㅅ", "s", "s"], ["ㅇ", "ng / silent", "silent at the start"],
            ["ㅈ", "j", "j in jam"], ["ㅊ", "ch", "ch with a puff of air"], ["ㅋ", "k", "k with a puff of air"],
            ["ㅌ", "t", "t with a puff of air"], ["ㅍ", "p", "p with a puff of air"], ["ㅎ", "h", "h"]
          ]},
          { title: "Compound vowels", type: "tiles", items: [
            ["ㅐ", "ae", "eh"], ["ㅔ", "e", "eh"], ["ㅒ", "yae", "yeh"], ["ㅖ", "ye", "yeh"], ["ㅘ", "wa", "wah"],
            ["ㅙ", "wae", "weh"], ["ㅚ", "oe", "weh"], ["ㅝ", "wo", "wuh"], ["ㅞ", "we", "weh"], ["ㅟ", "wi", "wee"], ["ㅢ", "ui", "uh-ee"]
          ]},
          { title: "Double consonants", note: "Say them tight and strong, with no puff of air.", type: "tiles", items: [
            ["ㄲ", "kk", "tight k"], ["ㄸ", "tt", "tight t"], ["ㅃ", "pp", "tight p"], ["ㅆ", "ss", "tight s"], ["ㅉ", "jj", "tight j"]
          ]},
          { title: "Final consonants (batchim)", note: "A consonant under the syllable is a closing sound. Only 7 sounds are possible: k, n, t, l, m, p, ng.", type: "words", items: [
            ["밥", "bap", "rice"], ["집", "jip", "house"], ["물", "mul", "water"], ["책", "chaek", "book"],
            ["강", "gang", "river"], ["말", "mal", "word, speech"], ["문", "mun", "door"], ["산", "san", "mountain"]
          ]},
          { title: "Read these words you already know", note: "These come from English. Sound them out, then tap to check.", type: "words", items: [
            ["커피", "keopi", "coffee"], ["택시", "taeksi", "taxi"], ["버스", "beoseu", "bus"], ["피자", "pija", "pizza"],
            ["카메라", "kamera", "camera"], ["인터넷", "inteonet", "internet"], ["컴퓨터", "keompyuteo", "computer"],
            ["유튜브", "yutyubeu", "YouTube"], ["인스타그램", "inseutageuraem", "Instagram"], ["아이스크림", "aiseukeurim", "ice cream"],
            ["뉴스", "nyuseu", "news"], ["호텔", "hotel", "hotel"], ["필리핀", "pillipin", "Philippines"], ["한국", "hanguk", "Korea"], ["마닐라", "manila", "Manila"]
          ]},
          { title: "Greetings and survival phrases", type: "words", items: [
            ["안녕하세요", "annyeonghaseyo", "Hello"],
            ["처음 뵙겠습니다", "cheoeum boepgesseumnida", "Nice to meet you (first time)"],
            ["감사합니다", "gamsahamnida", "Thank you"],
            ["죄송합니다", "joesonghamnida", "I am sorry"],
            ["괜찮습니다", "gwaenchanseumnida", "It is okay"],
            ["네", "ne", "Yes"],
            ["아니요", "aniyo", "No"],
            ["잠시만요", "jamsimanyo", "Just a moment"],
            ["안녕히 가세요", "annyeonghi gaseyo", "Goodbye (to someone leaving)"],
            ["안녕히 계세요", "annyeonghi gyeseyo", "Goodbye (to someone staying)"],
            ["수고하셨습니다", "sugohasyeotseumnida", "Thank you for your hard work"],
            ["잘 부탁드립니다", "jal butakdeurimnida", "I look forward to working with you"],
            ["다시 말씀해 주세요", "dasi malsseumhae juseyo", "Please say that again"],
            ["천천히 말씀해 주세요", "cheoncheonhi malsseumhae juseyo", "Please speak slowly"],
            ["잘 모르겠습니다", "jal moreugesseumnida", "I do not understand"]
          ]}
        ]
      },
      vid: {
        tue: { title: "Tuesday online: meet your editing app", mins: 60, steps: [
          "Your teacher shows three real short videos Korean clients ordered, 15 to 60 seconds each. Watch how often the picture changes.",
          "Install CapCut from the app store. Allow access to your photos and videos.",
          "Tour the screen: the preview on top, the timeline in the middle, the tool bar at the bottom.",
          "Set the shape of your video. Vertical 9:16 is for Shorts, Reels and TikTok. Wide 16:9 is for YouTube.",
          "Start a new project. Import 3 short clips from your phone and play them.",
          "Practice moving along the timeline with your fingers and pinching to zoom in."
        ]},
        sat: { title: "Saturday in person: your first edit", mins: 120, blocks: [
          { t: "0 to 15", name: "Show your Tuesday project", steps: ["Show your project to a classmate and say one thing you want to fix."] },
          { t: "15 to 40", name: "Teacher demo", steps: ["Trim the start and end of a clip.", "Split a clip at the playhead and delete the middle.", "Undo a mistake."] },
          { t: "40 to 70", name: "Guided practice", steps: ["Cut each of your 3 clips down to its best 3 to 5 seconds.", "Remove every black gap between clips."] },
          { t: "70 to 80", name: "Break", steps: [] },
          { t: "80 to 110", name: "Build", steps: ["Reorder the clips so the video has a start, a middle and an end.", "Change speed on one clip, slower or faster.", "Add a title text and keep it large enough to read on a phone.", "Set the sound level so music, if any, is quiet."] },
          { t: "110 to 120", name: "Export", steps: ["Export at 1080p and 30 fps.", "Open the saved video in your phone gallery and watch it from start to end."] }
        ]},
        deliver: { title: "Deliverable: a 30-second edit", checks: [
          "The video uses at least 3 clips.",
          "The length is between 25 and 35 seconds.",
          "There are no black gaps or frozen frames.",
          "The title text is easy to read.",
          "It was exported at 1080p and plays in the phone gallery."
        ]},
        mistakes: [
          "Black gaps left between clips.",
          "Text too small or too close to the edge of the screen.",
          "Exporting in low quality to save space.",
          "Deleting the original clips before you finish."
        ]
      },
      hw: {
        mon: { title: "Preview sheet (read before Tuesday)", items: [
          "Open the Hangul table on the website and tap 10 syllables to hear them.",
          "Read the 15 words you already know. Say each one out loud.",
          "Video words to learn: clip, trim, split, timeline, export."
        ]},
        wed: { title: "Practice sheet (done before Saturday)", items: [
          "Write each of the 14 basic consonants 3 times in your notebook.",
          "Write 안녕하세요 and 감사합니다 5 times each.",
          "Read 20 syllables aloud and record yourself on your phone.",
          "Edit a 15-second video from 2 clips and bring it on your phone."
        ]}
      }
    },

    /* ------------------------------------------------------------ WEEK 2 */
    {
      n: 2,
      title: "Introduce yourself. Edit a talking video.",
      goalKo: "Introduce yourself in 30 seconds using polite Korean.",
      goalVid: "Edit a 45-second talking video with captions.",
      test: "Introduce yourself in Korean in 30 seconds.",
      sat: { ko: "Korean 8:00 to 11:00", vid: "Video 11:00 to 2:00" },
      ko: {
        tue: "Numbers 1 to 100 and the polite ending -ㅂ니다 / -습니다 (1 hour)",
        sat: "Self-introduction, nationality and job words, 24 work nouns (3 hours)",
        sections: [
          { title: "Numbers (Sino-Korean)", note: "Use these for dates, prices, phone numbers and minutes.", type: "words", items: [
            ["일", "il", "1"], ["이", "i", "2"], ["삼", "sam", "3"], ["사", "sa", "4"], ["오", "o", "5"],
            ["육", "yuk", "6"], ["칠", "chil", "7"], ["팔", "pal", "8"], ["구", "gu", "9"], ["십", "sip", "10"],
            ["이십", "isip", "20"], ["백", "baek", "100"]
          ]},
          { title: "Self-introduction", note: "The ending -입니다 means am, is or are. Replace ___ with your own words.", type: "words", items: [
            ["저는 ___입니다", "jeoneun ___ imnida", "I am ___ (say your name)"],
            ["이름은 ___입니다", "ireumeun ___ imnida", "My name is ___"],
            ["필리핀 사람입니다", "pillipin saramimnida", "I am Filipino"],
            ["영상 편집자입니다", "yeongsang pyeonjipjaimnida", "I am a video editor"],
            ["학생입니다", "haksaengimnida", "I am a student"],
            ["만나서 반갑습니다", "mannaseo bangapseumnida", "Nice to meet you"],
            ["이름이 무엇입니까?", "ireumi mueosimnikka?", "What is your name?"],
            ["어느 나라 사람입니까?", "eoneu nara saramimnikka?", "Which country are you from?"],
            ["한국 사람입니다", "hanguk saramimnida", "I am Korean"]
          ]},
          { title: "Work words", note: "You will hear these in almost every client message.", type: "words", items: [
            ["영상", "yeongsang", "video"], ["편집", "pyeonjip", "editing"], ["파일", "pa-il", "file"], ["자막", "jamak", "caption"],
            ["음악", "eumak", "music"], ["사진", "sajin", "photo"], ["시간", "sigan", "time"], ["가격", "gagyeok", "price"],
            ["견적", "gyeonjeok", "quote"], ["수정", "sujeong", "revision"], ["마감", "magam", "deadline"], ["일정", "iljeong", "schedule"],
            ["의뢰", "uiroe", "request, commission"], ["고객", "gogaek", "customer"], ["작업", "jageop", "work, task"], ["결과물", "gyeolgwamul", "finished work"],
            ["링크", "ringkeu", "link"], ["메시지", "mesiji", "message"], ["숏폼", "syotpom", "short-form video"], ["광고", "gwanggo", "advertisement"],
            ["썸네일", "sseomneil", "thumbnail"], ["원본", "wonbon", "original file"], ["초안", "choan", "first draft"], ["최종본", "choejongbon", "final version"]
          ]}
        ]
      },
      vid: {
        tue: { title: "Tuesday online: cutting a talking video", mins: 60, steps: [
          "A talking video is one person speaking to the camera. Editors keep it moving by cutting every pause and every mistake.",
          "Watch an uncut talking clip, then the same clip edited. Count how many cuts the editor made.",
          "Learn the three tools you will use: split, delete, and picture layers for extra footage.",
          "Caption rules: one or two short lines, big text, and always inside the safe area, away from the screen edge.",
          "Korean clients often want Korean captions. Auto captions can write them, but you must check every line using the word lists.",
          "Record a 30 to 45 second video of yourself talking about your work. Do not edit it yet."
        ]},
        sat: { title: "Saturday in person: captions, sound and pace", mins: 180, blocks: [
          { t: "0 to 20", name: "Show last week's work", steps: ["Show your last week's video. Classmates say one good thing and one thing to fix."] },
          { t: "20 to 40", name: "Teacher demo", steps: ["Cut pauses with split and delete.", "Add extra footage on a second layer.", "Turn on auto captions and fix a wrong word."] },
          { t: "40 to 80", name: "Guided practice", steps: ["Cut every pause longer than half a second in your recording.", "Add 2 pieces of extra footage while you speak.", "Generate captions and correct every mistake."] },
          { t: "80 to 90", name: "Break", steps: [] },
          { t: "90 to 150", name: "Build", steps: ["Style the captions: one font, one color, a clear outline.", "Add quiet background music at about 10 to 20 percent volume with a fade-out.", "Add one sound effect where it helps.", "Set the video to vertical 9:16 and export at 1080p."] },
          { t: "150 to 180", name: "Feedback", steps: ["Show your video to the teacher and one classmate. Write down 2 fixes for homework."] }
        ]},
        deliver: { title: "Deliverable: a 45-second talking video", checks: [
          "No pause is longer than half a second.",
          "Captions match what is said, with no spelling mistakes.",
          "Music is quieter than the voice.",
          "Text stays inside the safe area.",
          "Exported in 9:16 at 1080p."
        ]},
        mistakes: [
          "Captions that are too long to read in time.",
          "Music louder than the voice.",
          "Cutting in the middle of a word.",
          "Leaving auto-caption errors unfixed."
        ]
      },
      hw: {
        mon: { title: "Preview sheet (read before Tuesday)", items: [
          "Learn the numbers 일 to 십, 이십 and 백.",
          "Write your self-introduction in 5 lines using the templates.",
          "Video words to learn: caption, layer, pause, safe area."
        ]},
        wed: { title: "Practice sheet (done before Saturday)", items: [
          "Say your self-introduction aloud 5 times and time it.",
          "Learn 12 of the 24 work words. Use the Cards page.",
          "Fix the 2 problems your teacher wrote down on your video.",
          "Record a 30-second talking video to edit on Saturday."
        ]}
      }
    },

    /* ------------------------------------------------------------ WEEK 3 */
    {
      n: 3,
      title: "Requests, time and AI. Edit a promo.",
      goalKo: "Understand and answer short client messages about time and requests.",
      goalVid: "Edit a 45 to 60 second promo using AI-made parts.",
      test: "Answer a short client voice message in Korean.",
      sat: { ko: "Korean 8:00 to 11:00", vid: "Video 11:00 to 2:00" },
      ko: {
        tue: "Days, dates, time and 주세요 (1 hour)",
        sat: "Requests and deadlines, work verbs, prices in won (3 hours)",
        sections: [
          { title: "Days and time", type: "words", items: [
            ["오늘", "oneul", "today"], ["내일", "naeil", "tomorrow"], ["어제", "eoje", "yesterday"], ["이번 주", "ibeon ju", "this week"],
            ["월요일", "woryoil", "Monday"], ["화요일", "hwayoil", "Tuesday"], ["수요일", "suyoil", "Wednesday"], ["목요일", "mogyoil", "Thursday"],
            ["금요일", "geumyoil", "Friday"], ["토요일", "toyoil", "Saturday"], ["일요일", "iryoil", "Sunday"],
            ["몇 시", "myeot si", "what time"], ["시", "si", "o'clock"], ["분", "bun", "minute"], ["오전", "ojeon", "AM"], ["오후", "ohu", "PM"]
          ]},
          { title: "Counting (native Korean)", note: "Use these for hours, people and things.", type: "words", items: [
            ["하나", "hana", "1"], ["둘", "dul", "2"], ["셋", "set", "3"], ["넷", "net", "4"], ["다섯", "daseot", "5"],
            ["여섯", "yeoseot", "6"], ["일곱", "ilgop", "7"], ["여덟", "yeodeol", "8"], ["아홉", "ahop", "9"], ["열", "yeol", "10"]
          ]},
          { title: "Money and deadlines", type: "words", items: [
            ["천", "cheon", "1,000"], ["만", "man", "10,000"], ["원", "won", "won (Korean money)"],
            ["얼마입니까?", "eolmaimnikka?", "How much is it?"], ["언제까지", "eonjekkaji", "until when"]
          ]},
          { title: "Requests and answers", type: "words", items: [
            ["주세요", "juseyo", "Please give me"], ["보내 주세요", "bonae juseyo", "Please send it"],
            ["확인해 주세요", "hwaginhae juseyo", "Please check it"], ["수정해 주세요", "sujeonghae juseyo", "Please revise it"],
            ["잠시만 기다려 주세요", "jamsiman gidaryeo juseyo", "Please wait a moment"],
            ["알겠습니다", "algesseumnida", "Understood"], ["가능합니다", "ganeunghamnida", "It is possible"], ["어렵습니다", "eoryeopseumnida", "It is difficult"]
          ]},
          { title: "What I will do", note: "The ending -겠습니다 means I will. Use it to promise work.", type: "words", items: [
            ["보내겠습니다", "bonaegesseumnida", "I will send it"], ["수정하겠습니다", "sujeonghagesseumnida", "I will revise it"],
            ["확인하겠습니다", "hwaginhagesseumnida", "I will check it"], ["올리겠습니다", "olligesseumnida", "I will upload it"],
            ["완료했습니다", "wallyohaesseumnida", "It is finished"]
          ]}
        ]
      },
      vid: {
        tue: { title: "Tuesday online: AI in your editing work", mins: 60, steps: [
          "AI can help with four jobs: script ideas, images, voice-overs and sound clean-up. It can also make mistakes, so you must check everything.",
          "Common AI problems: wrong spelling inside images, strange hands and faces, voices that sound fake, and music you are not allowed to use.",
          "A good prompt names the subject, the style and the shape. Example: a coffee cup on a wooden table, bright morning light, vertical.",
          "Write a 3-sentence script for a 30-second promo for a small local shop, real or imagined.",
          "Ask an AI assistant to improve your script, then rewrite it in your own words."
        ]},
        sat: { title: "Saturday in person: build a promo with AI parts", mins: 180, blocks: [
          { t: "0 to 20", name: "Show last week's work", steps: ["Show your talking video. Classmates say one good thing and one thing to fix."] },
          { t: "20 to 40", name: "Teacher demo", steps: ["Generate an AI image from a prompt.", "Create an AI voice-over, or record your own.", "Remove a background and reduce noise."] },
          { t: "40 to 80", name: "Guided practice", steps: ["Make 3 AI images for your script.", "Record or generate the voice-over.", "Place everything on the timeline in script order."] },
          { t: "80 to 90", name: "Break", steps: [] },
          { t: "90 to 150", name: "Build", steps: ["Add captions and fix every word.", "Add a slow zoom with keyframes on one image.", "Use at most 2 kinds of transition.", "Adjust brightness and contrast so all clips match.", "Use music that is licensed for business use."] },
          { t: "150 to 180", name: "Feedback", steps: ["Show your promo. Check every AI image for strange details or wrong text."] }
        ]},
        deliver: { title: "Deliverable: a 45 to 60 second promo", checks: [
          "The length is between 45 and 60 seconds.",
          "No AI image has wrong spelling or strange faces or hands.",
          "The voice is clear and the captions match it.",
          "No more than 2 kinds of transition are used.",
          "The music is licensed for business use."
        ]},
        mistakes: [
          "Using an AI image without checking small details.",
          "Too many different transitions.",
          "Music with unclear usage rights.",
          "A voice-over that does not match the captions."
        ]
      },
      hw: {
        mon: { title: "Preview sheet (read before Tuesday)", items: [
          "Learn the 7 days of the week.",
          "Learn the native numbers 하나 to 열.",
          "Video words to learn: prompt, AI image, voice-over, keyframe."
        ]},
        wed: { title: "Practice sheet (done before Saturday)", items: [
          "Say all 5 -겠습니다 phrases out loud 3 times.",
          "Write a 3-line prompt for the promo you will make.",
          "Collect 3 photos or clips of your own for the promo.",
          "Fix the 2 problems your teacher wrote down on your last week's video."
        ]}
      }
    },

    /* ------------------------------------------------------------ WEEK 4 */
    {
      n: 4,
      title: "Talk to clients. Deliver your final video.",
      goalKo: "Hold a short chat with a Korean client from sentence templates.",
      goalVid: "Deliver one portfolio video through a full client workflow.",
      test: "Written client chat and 20 phrases read aloud.",
      sat: { ko: "Korean 8:00 to 11:00", vid: "Video 11:00 to 2:00" },
      ko: {
        tue: "Review and read the chat templates aloud (1 hour)",
        sat: "Client chat scripts for 6 situations, role-play with the interpreter (3 hours)",
        sections: [
          { title: "Question words", type: "words", items: [
            ["무엇", "mueot", "what"], ["누구", "nugu", "who"], ["어디", "eodi", "where"], ["왜", "wae", "why"], ["어떻게", "eotteoke", "how"]
          ]},
          { title: "First contact", type: "words", items: [
            ["영상 편집자 ___입니다", "yeongsang pyeonjipja ___ imnida", "I am the video editor ___"],
            ["문의드립니다", "munuideurimnida", "I would like to ask about something"],
            ["의뢰하신 영상을 보았습니다", "uiroehasin yeongsangeul boasseumnida", "I saw the video you requested"],
            ["포트폴리오를 보내드리겠습니다", "poteupollioreul bonaedeurigesseumnida", "I will send you my portfolio"],
            ["어떤 영상이 필요하십니까?", "eotteon yeongsangi piryohasimnikka?", "What kind of video do you need?"]
          ]},
          { title: "Quote and schedule", type: "words", items: [
            ["길이는 몇 분입니까?", "girineun myeot bunimnikka?", "How many minutes long is it?"],
            ["가격은 ___원입니다", "gagyeogeun ___ wonimnida", "The price is ___ won"],
            ["수정은 두 번까지 가능합니다", "sujeongeun du beonkkaji ganeunghamnida", "Up to two revisions are possible"],
            ["마감은 언제입니까?", "magameun eonjeimnikka?", "When is the deadline?"]
          ]},
          { title: "Delivery and revision", type: "words", items: [
            ["영상을 완성했습니다", "yeongsangeul wanseonghaesseumnida", "I finished the video"],
            ["링크를 보내드립니다", "ringkeureul bonaedeurimnida", "I am sending the link"],
            ["확인 부탁드립니다", "hwagin butakdeurimnida", "Please check it"],
            ["확인했습니다", "hwaginhaesseumnida", "I checked it"],
            ["어느 부분을 수정할까요?", "eoneu bubuneul sujeonghalkkayo?", "Which part should I revise?"],
            ["자막을 수정하겠습니다", "jamageul sujeonghagesseumnida", "I will revise the captions"],
            ["음악을 바꾸겠습니다", "eumageul bakkugesseumnida", "I will change the music"],
            ["다시 보내드리겠습니다", "dasi bonaedeurigesseumnida", "I will send it again"],
            ["바로 수정하겠습니다", "baro sujeonghagesseumnida", "I will fix it right away"]
          ]},
          { title: "Payment and closing", type: "words", items: [
            ["입금 부탁드립니다", "ipgeum butakdeurimnida", "Please make the payment"],
            ["입금 확인했습니다", "ipgeum hwaginhaesseumnida", "I confirmed the payment"],
            ["정말 감사합니다", "jeongmal gamsahamnida", "Thank you very much"],
            ["또 연락 주세요", "tto yeonrak juseyo", "Please contact me again"],
            ["좋은 하루 되세요", "joeun haru doeseyo", "Have a good day"],
            ["앞으로도 잘 부탁드립니다", "apeurodo jal butakdeurimnida", "I hope we keep working together"]
          ]}
        ],
        scripts: [
          { title: "First contact", turns: [
            { who: "client", ko: "안녕하세요. 영상 편집 가능하십니까?", rom: "annyeonghaseyo. yeongsang pyeonjip ganeunghasimnikka?", en: "Hello. Can you edit videos?" },
            { who: "me", ko: "네, 가능합니다. 포트폴리오를 보내드리겠습니다.", rom: "ne, ganeunghamnida. poteupollioreul bonaedeurigesseumnida.", en: "Yes, I can. I will send my portfolio." },
            { who: "client", ko: "감사합니다. 영상 길이는 3분입니다.", rom: "gamsahamnida. yeongsang girineun sambunimnida.", en: "Thank you. The video is 3 minutes long." },
            { who: "me", ko: "알겠습니다. 마감은 언제입니까?", rom: "algesseumnida. magameun eonjeimnikka?", en: "Understood. When is the deadline?" }
          ]},
          { title: "Quote", turns: [
            { who: "client", ko: "가격은 얼마입니까?", rom: "gagyeogeun eolmaimnikka?", en: "How much is it?" },
            { who: "me", ko: "가격은 5만 원입니다. 수정은 두 번까지 가능합니다.", rom: "gagyeogeun oman wonimnida. sujeongeun du beonkkaji ganeunghamnida.", en: "The price is 50,000 won. Up to two revisions are possible." },
            { who: "client", ko: "알겠습니다. 내일까지 가능합니까?", rom: "algesseumnida. naeilkkaji ganeunghamnikka?", en: "Understood. Is it possible by tomorrow?" },
            { who: "me", ko: "네, 내일까지 보내드리겠습니다.", rom: "ne, naeilkkaji bonaedeurigesseumnida.", en: "Yes, I will send it by tomorrow." }
          ]},
          { title: "Delivery", turns: [
            { who: "client", ko: "영상 어떻게 됐습니까?", rom: "yeongsang eotteoke dwaetseumnikka?", en: "How is the video going?" },
            { who: "me", ko: "영상을 완성했습니다. 확인 부탁드립니다.", rom: "yeongsangeul wanseonghaesseumnida. hwagin butakdeurimnida.", en: "I finished the video. Please check it." },
            { who: "client", ko: "확인했습니다. 자막을 수정해 주세요.", rom: "hwaginhaesseumnida. jamageul sujeonghae juseyo.", en: "I checked it. Please revise the captions." },
            { who: "me", ko: "알겠습니다. 바로 수정하겠습니다.", rom: "algesseumnida. baro sujeonghagesseumnida.", en: "Understood. I will fix it right away." }
          ]},
          { title: "Revision", turns: [
            { who: "client", ko: "음악을 바꿔 주세요.", rom: "eumageul bakkwo juseyo.", en: "Please change the music." },
            { who: "me", ko: "알겠습니다. 음악을 바꾸겠습니다.", rom: "algesseumnida. eumageul bakkugesseumnida.", en: "Understood. I will change the music." },
            { who: "client", ko: "언제 가능합니까?", rom: "eonje ganeunghamnikka?", en: "When is it possible?" },
            { who: "me", ko: "오늘까지 다시 보내드리겠습니다.", rom: "oneulkkaji dasi bonaedeurigesseumnida.", en: "I will send it again by today." }
          ]},
          { title: "Payment", turns: [
            { who: "client", ko: "영상 잘 받았습니다. 입금했습니다.", rom: "yeongsang jal badasseumnida. ipgeumhaesseumnida.", en: "I received the video. I made the payment." },
            { who: "me", ko: "입금 확인했습니다. 감사합니다.", rom: "ipgeum hwaginhaesseumnida. gamsahamnida.", en: "I confirmed the payment. Thank you." },
            { who: "client", ko: "다음에 또 부탁드립니다.", rom: "daeume tto butakdeurimnida.", en: "Please work with me again next time." },
            { who: "me", ko: "네, 앞으로도 잘 부탁드립니다.", rom: "ne, apeurodo jal butakdeurimnida.", en: "Yes, I hope we keep working together." }
          ]},
          { title: "Change of deadline", turns: [
            { who: "client", ko: "죄송합니다. 마감을 바꿀 수 있습니까?", rom: "joesonghamnida. magameul bakkul su itseumnikka?", en: "Sorry. Can we change the deadline?" },
            { who: "me", ko: "네, 괜찮습니다. 언제까지 가능합니까?", rom: "ne, gwaenchanseumnida. eonjekkaji ganeunghamnikka?", en: "Yes, it is okay. Until when is it possible?" },
            { who: "client", ko: "금요일까지 가능합니다.", rom: "geumyoilkkaji ganeunghamnida.", en: "Until Friday is possible." },
            { who: "me", ko: "알겠습니다. 금요일까지 기다리겠습니다.", rom: "algesseumnida. geumyoilkkaji gidarigesseumnida.", en: "Understood. I will wait until Friday." }
          ]}
        ]
      },
      vid: {
        tue: { title: "Tuesday online: how a client job works", mins: 60, steps: [
          "A job follows seven steps: brief, questions, first version, feedback, revision, delivery, payment.",
          "Read the brief for five facts: length, platform, style, deadline, and number of revisions. If one is missing, ask before you start.",
          "Name your files clearly, for example clientname_project_v1. Keep every version.",
          "Deliver by link. Send a short message in Korean using your chat templates.",
          "Plan your final project: pick your best video from Weeks 2 and 3 of this month or start a new one from the mock client brief."
        ]},
        sat: { title: "Saturday in person: a full client job", mins: 180, blocks: [
          { t: "0 to 20", name: "Show and review", steps: ["Show your last week's promo and list what you will improve."] },
          { t: "20 to 40", name: "Receive the brief", steps: ["Your teacher plays the client and gives a mock brief in Korean and English.", "Write down the five facts from the brief and ask one question."] },
          { t: "40 to 80", name: "First version", steps: ["Build the first version from the brief."] },
          { t: "80 to 90", name: "Break", steps: [] },
          { t: "90 to 120", name: "Revision round", steps: ["Your teacher sends feedback as a short Korean message.", "Fix every point and reply using your chat templates."] },
          { t: "120 to 150", name: "Export", steps: ["Export the version for the platform the brief names.", "Name the file clearly and check it plays from start to end."] },
          { t: "150 to 180", name: "Present", steps: ["Show your video to the class.", "Upload it to LIKHA as your first portfolio sample."] }
        ]},
        deliver: { title: "Deliverable: a portfolio video", checks: [
          "Every point in the brief is met.",
          "The revision feedback has been fixed.",
          "The file is named clearly and exported for the right platform.",
          "You sent a delivery message in Korean from the templates.",
          "The video is uploaded to LIKHA."
        ]},
        mistakes: [
          "Starting before you understand the brief.",
          "Sending a file with an unclear name.",
          "Answering feedback with a message you do not understand.",
          "Forgetting to keep the earlier versions."
        ]
      },
      hw: {
        mon: { title: "Preview sheet (read before Tuesday)", items: [
          "Read all 6 chat scripts aloud, both the client and your lines.",
          "Do the Chat practice on the website two times.",
          "Video words to learn: brief, version, feedback, deliver."
        ]},
        wed: { title: "Practice sheet (done before Saturday)", items: [
          "Write a delivery message in Korean using the templates.",
          "Finish your final video and export it.",
          "Choose 20 phrases from this week and practice them aloud.",
          "Bring your phone with the video ready to present."
        ]}
      }
    }
  ]
};
