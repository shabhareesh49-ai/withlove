# Happy Birthday Ankitha 🩷🧿
### A Bespoke, Interactive Birthday Surprise Website Coded by Shabrii ❤️

A luxury, romantic, emotional, and interactive birthday surprise website built exclusively for **Ankitha** (*Ankuuuu*, *Kandaa*, *Paapu*).

---

## 🌟 Live Preview Access

* **Local Machine:** `http://localhost:3000`
* **Mobile (Same Wi-Fi Network):** `http://10.147.212.78:3000` *(You can load this directly on your phone or Ankitha's phone!)*

---

## 📸 Adding Ankitha's Photos

You can add pictures in either of two ways:

### Option 1: File Drop (Recommended for Production)
Place your pictures directly into the `public/images/` folder with these filenames:
1. `ankitha-portrait.jpg` — Her hero glowing circle portrait
2. `ankitha-shabrii-1.jpg` — Polaroid Memory #1
3. `ankitha-shabrii-2.jpg` — Polaroid Memory #2

### Option 2: Direct In-Browser Selection
Click the **"Select Photo"** button directly on any polaroid card or portrait frame on the web page. The selected image will be saved directly into your browser's persistent storage!

---

## 🎵 Music & Audio Options

The website has a built-in Web Audio API music-box synthesizer that requires **no external files**:
* **Track 1:** Happy Birthday to You Lullaby 🎂
* **Track 2:** Dreamy Starlight Canon ✨
* **Custom MP3:** Click the **"Custom Song"** button on the top-right music bar to upload and loop any song directly from your device, or place an audio file at `public/audio/birthday.mp3`.

---

## 🚀 Free 1-Click Online Deployment (Share with Ankitha Anywhere)

To share this surprise website as a permanent link with Ankitha on her own phone:

### Deploy to Vercel (Fastest & Free)
1. Install Vercel CLI (or push to GitHub):
   ```bash
   npx vercel
   ```
2. Follow the prompts. In less than 1 minute, you will get a live link like `https://ankitha-birthday.vercel.app`!

### Deploy to Netlify (Free)
1. Run `npm run build`
2. Drag and drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
3. Instant live link generated!

---

## 🗺️ Narrative Journey & Features

1. **Secret Curtain Entry 🎁:** Encrypted surprise suspense gate with unlocking confetti.
2. **Hero Screen 🌸:** Glowing portrait aura, evil eye talisman 🧿, heart badge, and nickname ticker.
3. **The Three Personas ✨:** Flip cards for *Ankuuuu*, *Kandaa*, and *Paapu* revealing their humorous and emotional meanings.
4. **The Ankitha Impact 📊:** Milestone counters (`∞` Shared Laughs, `100%` Heart of Gold, `1 in 8B` Sister, `365+` Days Ahead) with secret expandable notes.
5. **Special Qualities 🩷:** 5 core traits celebrating her kind heart, humor, and lovely soul.
6. **Sister Affirmation Jar 🫙:** Tap the glowing glass jar to draw a folded paper note from Shabrii with loving reminders.
7. **Polaroid Memory Gallery 📸:** Real tilted polaroids with washi tape, heart bursts, and full-screen lightbox modal.
8. **Humor Corner ⚠️:** Sister warnings and the interactive **Sister Oracle** random fact generator.
9. **Sister Trivia Quiz 🎓:** 3 sibling-accurate questions with progress bar, chimes, and an official **Certificate of Sisterhood** diploma.
10. **Handwritten Letter from Shabrii 💌:** Vintage postmark, parchment paper, typewriter text with speed controls, wax seal, and **Save/Print Keepsake 📜** mode.
11. **3D Interactive Birthday Cake 🎂:** SVG multi-tier cake with blowable candles via **Tap** OR **Real-Time Microphone Breath Detection 🎙️**, smoke puffs, and a 200+ particle confetti celebration.
12. **Digital Birthday Time Capsule 🍾:** Ankitha writes her private dream for the year ahead and seals it in a glowing bottle.
13. **The Birthday Wishes Wall 📝:** Pinned pastel sticky notes with custom colors where family can leave warm birthday messages.
14. **Secret 🧿 Talisman:** Tap the protective evil-eye charm to unlock the heartfelt brotherly blessing.
15. **Final Cinematic Screen:** Emotional signoff, **"Send Shabrii a Sister Hug 🫂"** direct WhatsApp reply button, and **"Share Surprise 🔗"** link copy.
16. **Candlelight Twilight Mode 🕯️:** Toggle in the top-left to dim the site into a starry midnight-rose twilight with glowing, twinkling fairy lights garland!
17. **Mobile App Mode (PWA) 📱:** Tap *"Add to Home Screen"* on iPhone or Android to install it as an app named **Anku 🩷🧿**.

---

## ✏️ Customizing Text & Content

All personal nicknames, messages, jokes, letter text, and your WhatsApp phone number are organized in one single file:
👉 **[`src/data/birthdayContent.js`](./src/data/birthdayContent.js)**

To add your WhatsApp number for the direct hug button:
Open `src/data/birthdayContent.js` and set:
```javascript
whatsappPhone: "919876543210", // Your country code + mobile number
```

---

*Coded with pure sibling love for Ankitha's Birthday by Shabrii ❤️*
