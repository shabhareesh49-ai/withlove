/**
 * ========================================================
 * 🎂 BIRTHDAY SURPRISE WEBSITE CONFIGURATION 🎂
 * ========================================================
 * All personal details, messages, captions, and text
 * are kept here for easy editing!
 * ========================================================
 */

export const birthdayData = {
  // Personal Names
  recipientName: "Ankitha",
  recipientBadge: "Ankitha 🩷🧿",
  senderName: "Shabrii",
  senderSignature: "— Shabrii ❤️",

  // Audio configuration
  // Place your audio file at public/audio/birthday.mp3
  // If not present, the website automatically plays an elegant Web Audio music box tune!
  audioSrc: "/audio/birthday.mp3",

  // Photo paths (place images inside public/images/)
  photos: {
    portrait: "/images/ankitha-portrait.jpg",
    memory1: "/images/ankitha-shabrii-1.jpg",
    memory2: "/images/ankitha-shabrii-2.jpg",
  },

  // SCREEN 1: SECRET ENTRY
  secretEntry: {
    greeting: "Hey Ankitha... 🩷",
    message: "Someone made something secretly for you.",
    hint: "And yes... you're finally allowed to open it. 👀",
    buttonText: "OPEN YOUR SURPRISE 🎁",
  },

  // SCREEN 2: HERO
  hero: {
    tag: "FOR MY FAVORITE SISTER 🌸🧿",
    headingPrefix: "Happy Birthday,",
    headingName: "Ankitha",
    evilEye: "🧿",
    heart: "🩷",
    nicknamesList: "Ankuuuu... Kandaa... Paapu...",
    emotionalQuote: "Today is your day. So I made a little corner of the internet just for you.",
    scrollText: "There's more... ↓",
  },

  // SCREEN 3: THE THREE NAMES
  nicknamesSection: {
    title: "The Three Names ✨",
    subtitle: "Different moods, different moments, same precious sister. Click each one to see what it really means:",
    cards: [
      {
        id: "ankuu",
        name: "Ankuuuu 🩷",
        tag: "The Classic",
        meaning: "The name that somehow makes you sound cute and dangerous at the same time. 😂🩷",
        color: "from-pink-500/20 to-rose-500/20",
        borderHover: "hover:border-pink-300",
        icon: "Sparkles",
      },
      {
        id: "kandaa",
        name: "Kandaa 😂",
        tag: "The Mischief Maker",
        meaning: "Officially responsible for at least 50% of the random laughs.",
        color: "from-amber-500/20 to-pink-500/20",
        borderHover: "hover:border-amber-300",
        icon: "Laugh",
      },
      {
        id: "paapu",
        name: "Paapu 🧿",
        tag: "The Precious One",
        meaning: "Because some people are just too precious for a normal nickname. 🧿",
        color: "from-purple-500/20 to-pink-500/20",
        borderHover: "hover:border-purple-300",
        icon: "ShieldHeart",
      },
    ],
  },

  // SCREEN 4: WHY YOU ARE SPECIAL
  specialQualities: {
    title: "Why is Ankitha so special? 🩷",
    subtitle: "Just a few of the million reasons why you're irreplaceable to us",
    qualities: [
      {
        icon: "🩷",
        title: "Kind Heart",
        description: "Your kindness is one of the things that makes you beautiful.",
        detail: "You have a natural softness and empathy that brings comfort to anyone lucky enough to be around you.",
      },
      {
        icon: "😂",
        title: "Certified Funny",
        description: "You somehow turn normal moments into memories.",
        detail: "Half the time you aren't even trying, yet everyone around you is laughing until their stomach hurts.",
      },
      {
        icon: "🫶",
        title: "Always Caring",
        description: "You care about people more than you realize.",
        detail: "Quietly noticing small things, making sure everyone is okay, and always having people's backs.",
      },
      {
        icon: "🌸",
        title: "Lovely Soul",
        description: "Some people have a beautiful personality. You have a beautiful heart.",
        detail: "The gentleness, the loyalty, and that pure positive energy that makes tough days feel lighter.",
      },
      {
        icon: "🧿",
        title: "Too Precious",
        description: "Some bonds deserve a little extra protection.",
        detail: "Badi nazar na lage — always protected, always cherished, and never taken for granted.",
      },
    ],
  },

  // SCREEN 5: OUR MEMORIES
  memoryGallery: {
    title: "Some Memories With You 📸",
    subtitle: "Frozen in time, forever kept close to the heart.",
    hint: "Tap on any photo to take a closer look & feel the warmth 🩷",
    memories: [
      {
        id: 1,
        image: "/images/ankitha-shabrii-1.jpg",
        caption: "Just us. 🩷",
        subcaption: "One photo, countless memories.",
        rotation: "-rotate-2",
        date: "Cherished Moment",
      },
      {
        id: 2,
        image: "/images/ankitha-shabrii-2.jpg",
        caption: "Some moments don't need a caption.",
        subcaption: "Partners in silliness, laughs, and life.",
        rotation: "rotate-2",
        date: "Special Memory",
      },
    ],
  },

  // SCREEN 6: FUNNY SECTION
  funnySection: {
    badge: "HUMOR CORNER 😂",
    title: "WARNING ⚠️\nANKITHA MODE ACTIVATED 😂",
    subtitle: "Proceed with caution: highly unpredictable, lovable chaos ahead",
    cards: [
      {
        title: "The Ratio",
        content: "99% Cute 🩷\n1% Innocent 👀",
        tag: "Scientifically Proven",
        emoji: "😇",
      },
      {
        title: "Master Degree",
        content: "Professional overthinker 🤔",
        tag: "Specializes at 1:00 AM",
        emoji: "🧠",
      },
      {
        title: "Job Description",
        content: "Full-time lovely person,\npart-time troublemaker 😂",
        tag: "Promotion Pending",
        emoji: "🎭",
      },
      {
        title: "Talent Alert",
        content: "Can turn a normal conversation\ninto a whole story.",
        tag: "Storyteller Extraordinaire",
        emoji: "🎙️",
      },
    ],
    bonusFacts: [
      "Can start a 2-minute story and turn it into a 45-minute cinematic universe with character backstories. 😂🎙️",
      "When she asks 'do you want food?', what she really means is 'order food so I can eat half of yours'. 🍟",
      "Will vigorously deny being dramatic while dramatically rolling her eyes into another dimension. 🙄✨",
      "Has an unmatched emotional spectrum: crying, laughing, and getting hungry all within 90 seconds. 🥹",
      "Officially protected by sibling warranty — no returns, no exchanges, permanently treasured. 🧿🩷",
      "Superpower: Giving the warmest, most genuine smiles that make the whole house feel peaceful. 🌸",
    ],
  },

  // BONUS INTERACTIVE: SISTER TRIVIA QUIZ
  quiz: {
    badge: "Official Sibling Trivia 🎓",
    title: "How Well Do You Know Anku? 😂🩷",
    subtitle: "Three scientific questions to prove you understand Ankitha's real mindset.",
    questions: [
      {
        question: "When Anku says: 'I'll be ready in 5 minutes', what is the actual time?",
        options: [
          { text: "Exactly 5 minutes (Impossible)", correct: false },
          { text: "35 to 45 minutes minimum 😂", correct: true },
          { text: "She hasn't even picked an outfit yet", correct: true },
          { text: "Next year", correct: false },
        ],
        explanation: "100% verified! Getting ready is an artistic process that cannot be rushed. ✨"
      },
      {
        question: "What is the certified safest reaction when Anku is hungry?",
        options: [
          { text: "Tell her to wait politely (High Risk ⚠️)", correct: false },
          { text: "Hand over food immediately with zero questions 🍟", correct: true },
          { text: "Suggest eating a salad", correct: false },
        ],
        explanation: "Rule #1 of the household: never stand between Anku and her food! 😂"
      },
      {
        question: "Who is officially and undisputed her #1 favorite brother in the universe?",
        options: [
          { text: "Shabrii 🩷", correct: true },
          { text: "Shabrii (Obviously) 🏆", correct: true },
          { text: "Shabrii with zero competition 🧿", correct: true },
        ],
        explanation: "No wrong answers here! Shabrii wins 100% of the votes. ❤️"
      }
    ],
    diploma: {
      title: "CERTIFICATE OF SISTERHOOD 🎓",
      verdict: "Certified Anku Expert (100% Sibling Honor)",
      note: "Conclusion: Ankitha is one-in-a-billion. Treat with endless love, laughter, and snacks. 🩷🧿"
    }
  },

  // SCREEN 7: A LETTER FROM SHABRII
  letter: {
    envelopeSeal: "SHABRII 💌",
    heading: "Dear Ankitha... 💌",
    salutation: "Dear Ankitha,",
    paragraphs: [
      "I don't always say everything I feel, so I wanted to put a little bit of it here.",
      "You are one of those people who make life feel warmer just by being around.",
      "You are emotional. You are funny. You are kind-hearted. And honestly, you are one of a kind.",
      "Ankuuuu, Kandaa, Paapu... Whatever name I call you, the bond behind it means much more than a nickname.",
      "We've shared laughs, silly moments, random conversations, and memories that I hope we'll keep making for years.",
      "On your birthday, I just want you to know one thing:",
      "You are loved. You are appreciated. And you are genuinely special.",
      "Never stop being the person you are.",
      "Keep smiling. Keep laughing. Keep annoying everyone a little. 😂",
      "And most importantly, keep being YOU.",
    ],
    closing: "Happy Birthday, Ankitha. 🩷🧿",
    signature: "With lots of love,",
    author: "Shabrii ❤️",
  },

  // SCREEN 8: INTERACTIVE BIRTHDAY CAKE
  birthdayCake: {
    intro: "Okay... enough emotions. 😂",
    title: "Now make a wish, Paapu. 🎂",
    instruction: "Close your eyes, think of the happiest wish, and blow out the candle!",
    buttonBlow: "MAKE A WISH ✨",
    buttonRelight: "Relight Candle 🕯️",
    wishGrantedTitle: "Wish granted... hopefully. 😌🩷",
    wishGrantedSub: "May this year bring you all the endless happiness, peace, and sweet adventures you deserve!",
  },

  // SCREEN 9: THE SECRET MESSAGE
  secretMessage: {
    suspense1: "Wait...",
    suspense2: "There's still one more thing.",
    instruction: "Tap the 🧿",
    heading: "Ankitha 🩷🧿",
    paragraphs: [
      "No matter how much life changes, some bonds will always remain special.",
      "And I hope this little website reminds you that someone took the time to create a whole little world just for you.",
      "Happy Birthday, Paapu. 🎂🩷",
    ],
    signature: "— Shabrii",
  },

  // SCREEN 10: FINAL SCREEN
  finalScreen: {
    title: "Happy Birthday, Ankitha 🩷🧿",
    subtitle: "Made with love,\na little craziness,\nand lots of memories.",
    signature: "— Shabrii",
    copyright: "Specially coded with 🩷 for Ankitha's Birthday",
    whatsappButtonText: "Send Shabrii a Sister Hug 🫂",
    whatsappMessage: "Hey Shabrii! 🥹 I just saw the whole birthday surprise website you made for me... 🩷🧿 It made me smile so much! Thank you for being the most amazing brother! ✨🎂",
    whatsappPhone: "", // Optional: Shabrii can add his phone number here (e.g. "919876543210")
  },
};
