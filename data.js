// Course content for LIKHA Academy. Edit this file to change lessons.
// type "tiles" = letters (3 per row), type "words" = phrases (one per row).
window.COURSE = {
  weeks: [
    {
      n: 1,
      title: "Hangul basics and greetings",
      goalKo: "Read and write simple Korean syllables. Say hello and thank you.",
      goalVid: "Edit a 30-second clip on your phone.",
      korean: {
        sections: [
          { title: "Vowels", note: "Tap a letter to hear it.", type: "tiles", items: [
            { ko: "ㅏ", rom: "a", en: "like 'ah'" },
            { ko: "ㅓ", rom: "eo", en: "like 'uh'" },
            { ko: "ㅗ", rom: "o", en: "like 'oh'" },
            { ko: "ㅜ", rom: "u", en: "like 'oo'" },
            { ko: "ㅡ", rom: "eu", en: "like 'uh', lips flat" },
            { ko: "ㅣ", rom: "i", en: "like 'ee'" },
            { ko: "ㅐ", rom: "ae", en: "like 'eh'" },
            { ko: "ㅔ", rom: "e", en: "like 'eh'" }
          ]},
          { title: "First consonants", type: "tiles", items: [
            { ko: "ㄱ", rom: "g / k", en: "" },
            { ko: "ㄴ", rom: "n", en: "" },
            { ko: "ㄷ", rom: "d / t", en: "" },
            { ko: "ㄹ", rom: "r / l", en: "" },
            { ko: "ㅁ", rom: "m", en: "" },
            { ko: "ㅂ", rom: "b / p", en: "" },
            { ko: "ㅅ", rom: "s", en: "" },
            { ko: "ㅇ", rom: "silent / ng", en: "" },
            { ko: "ㅈ", rom: "j", en: "" },
            { ko: "ㅎ", rom: "h", en: "" }
          ]},
          { title: "Greetings", type: "words", items: [
            { ko: "안녕하세요", rom: "annyeonghaseyo", en: "Hello" },
            { ko: "감사합니다", rom: "gamsahamnida", en: "Thank you" },
            { ko: "네", rom: "ne", en: "Yes" },
            { ko: "아니요", rom: "aniyo", en: "No" },
            { ko: "죄송합니다", rom: "joesonghamnida", en: "I am sorry" }
          ]}
        ]
      },
      video: {
        tip: "Use a free phone editing app such as CapCut. Everything below works on a phone.",
        steps: [
          "Install the editing app and open it once.",
          "Start a new project and import 3 short clips from your phone.",
          "Trim the start and end of each clip.",
          "Split a clip in the middle and delete the part you do not need.",
          "Put the clips in a good order.",
          "Export a 30-second video and save it."
        ]
      },
      homework: {
        monday: { title: "Preview sheet (read before Tuesday)", items: [
          "Look at the 8 Korean vowels. Say each one out loud.",
          "Learn 안녕하세요 and 감사합니다.",
          "Video words: clip, trim, split, export."
        ]},
        wednesday: { title: "Practice sheet (done before Saturday)", items: [
          "Write each vowel 5 times in your notebook.",
          "Write 안녕하세요 3 times and say it to one person.",
          "Make a 15-second video with 2 clips and bring it on your phone."
        ]}
      }
    },
    {
      n: 2,
      title: "Introduce yourself in Korean",
      goalKo: "Introduce yourself in Korean.",
      goalVid: "Add captions and sound to a short video.",
      korean: {
        sections: [
          { title: "More consonants", type: "tiles", items: [
            { ko: "ㅊ", rom: "ch", en: "" },
            { ko: "ㅋ", rom: "k", en: "" },
            { ko: "ㅌ", rom: "t", en: "" },
            { ko: "ㅍ", rom: "p", en: "" }
          ]},
          { title: "Self-introduction", type: "words", items: [
            { ko: "저는 ___입니다", rom: "jeoneun ___ imnida", en: "I am ___ (say your name)" },
            { ko: "필리핀 사람입니다", rom: "pillipin saramimnida", en: "I am Filipino" },
            { ko: "이름이 뭐예요?", rom: "ireumi mwoyeyo?", en: "What is your name?" },
            { ko: "만나서 반갑습니다", rom: "mannaseo bangapseumnida", en: "Nice to meet you" }
          ]}
        ]
      },
      video: {
        tip: "Short vertical videos (9:16) are what most Korean clients ask for.",
        steps: [
          "Open your Week 1 video and set the format to vertical 9:16.",
          "Add a title text on the first clip.",
          "Use auto captions, then fix any wrong words.",
          "Add background music and lower it so the voice is clear.",
          "Add one sound effect.",
          "Export and compare with your Week 1 video."
        ]
      },
      homework: {
        monday: { title: "Preview sheet (read before Tuesday)", items: [
          "Learn 저는 ___입니다 and say your own name.",
          "Learn 만나서 반갑습니다.",
          "Video words: caption, music, vertical, text."
        ]},
        wednesday: { title: "Practice sheet (done before Saturday)", items: [
          "Write your own self-introduction in Korean letters, 3 lines.",
          "Practice it out loud 5 times.",
          "Make a 20-second vertical video with captions."
        ]}
      }
    },
    {
      n: 3,
      title: "Numbers, time and work words",
      goalKo: "Understand simple work messages from a client.",
      goalVid: "Finish a draft with AI-made elements.",
      korean: {
        sections: [
          { title: "Numbers 1 to 10", note: "These are the numbers used for dates and money.", type: "words", items: [
            { ko: "일", rom: "il", en: "1" },
            { ko: "이", rom: "i", en: "2" },
            { ko: "삼", rom: "sam", en: "3" },
            { ko: "사", rom: "sa", en: "4" },
            { ko: "오", rom: "o", en: "5" },
            { ko: "육", rom: "yuk", en: "6" },
            { ko: "칠", rom: "chil", en: "7" },
            { ko: "팔", rom: "pal", en: "8" },
            { ko: "구", rom: "gu", en: "9" },
            { ko: "십", rom: "sip", en: "10" }
          ]},
          { title: "Time and requests", type: "words", items: [
            { ko: "오늘", rom: "oneul", en: "Today" },
            { ko: "내일", rom: "naeil", en: "Tomorrow" },
            { ko: "주세요", rom: "juseyo", en: "Please give me" }
          ]},
          { title: "Work words", type: "words", items: [
            { ko: "영상", rom: "yeongsang", en: "Video" },
            { ko: "편집", rom: "pyeonjip", en: "Editing" },
            { ko: "파일", rom: "pa-il", en: "File" },
            { ko: "자막", rom: "jamak", en: "Caption" },
            { ko: "수정", rom: "sujeong", en: "Revision" },
            { ko: "마감", rom: "magam", en: "Deadline" }
          ]}
        ]
      },
      video: {
        tip: "AI tools save time, but you must still check every result yourself.",
        steps: [
          "Write a 3-sentence script. Ask an AI assistant to improve it.",
          "Make 2 images with an AI image tool that match your script.",
          "Make a voice-over with an AI voice tool, or record your own.",
          "Put the images, voice and captions on the timeline.",
          "Check that nothing looks wrong or fake in a bad way.",
          "Export a draft."
        ]
      },
      homework: {
        monday: { title: "Preview sheet (read before Tuesday)", items: [
          "Learn numbers 일 to 십.",
          "Learn 영상, 편집, 파일, 자막, 수정, 마감.",
          "Video words: script, AI image, voice-over."
        ]},
        wednesday: { title: "Practice sheet (done before Saturday)", items: [
          "Write the numbers 1 to 10 in Korean 3 times.",
          "Match each work word to its English meaning.",
          "Finish the script for your Saturday video."
        ]}
      }
    },
    {
      n: 4,
      title: "Client chat and final project",
      goalKo: "Reply to a Korean client in basic Korean.",
      goalVid: "One finished video for your portfolio.",
      korean: {
        sections: [
          { title: "Client phrases", note: "Use these when you chat with a Korean client.", type: "words", items: [
            { ko: "안녕하세요", rom: "annyeonghaseyo", en: "Hello" },
            { ko: "영상 편집 가능합니다", rom: "yeongsang pyeonjip ganeunghamnida", en: "I can edit videos" },
            { ko: "내일까지 보내드리겠습니다", rom: "naeilkkaji bonaedeurigetseumnida", en: "I will send it by tomorrow" },
            { ko: "수정해 드리겠습니다", rom: "sujeonghae deurigetseumnida", en: "I will revise it for you" },
            { ko: "확인 부탁드립니다", rom: "hwagin butakdeurimnida", en: "Please check it" },
            { ko: "감사합니다", rom: "gamsahamnida", en: "Thank you" }
          ]}
        ]
      },
      video: {
        tip: "Your final video is your first sample for Korean clients. Make it your best work.",
        steps: [
          "Pick your best draft from Week 3.",
          "Read the class feedback and fix the top 3 problems.",
          "Check captions, sound level and the first 3 seconds.",
          "Export in vertical format.",
          "Show it to the class on Saturday.",
          "Upload it to LIKHA as your first portfolio sample."
        ]
      },
      homework: {
        monday: { title: "Preview sheet (read before Tuesday)", items: [
          "Learn the 6 client phrases.",
          "Say each phrase out loud 3 times.",
          "Video words: feedback, revise, portfolio."
        ]},
        wednesday: { title: "Practice sheet (done before Saturday)", items: [
          "Write a short Korean reply to a client who asks for a video by tomorrow.",
          "Finish and export your final video.",
          "Bring your phone with the video ready to present."
        ]}
      }
    }
  ]
};
