const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "aiReplyPlus",
    version: "2.0",
    author: "Tanu Bruh + ChatGPT",
    category: "events",
    role: 0
  },

  onStart: async ({ event, message, api }) => {
    try {
      if (!event.body) return;
      const text = event.body.toLowerCase().trim();
      const sender = event.senderID;

      // সময় ও দিন
      const now = moment().tz("Asia/Dhaka");
      const time = now.format("h:mm A");
      const day = now.format("dddd");

      // সময় অনুযায়ী greet
      let timeGreeting;
      const hour = Number(now.format("H"));
      if (hour >= 5 && hour < 12) timeGreeting = "সুপ্রভাত";
      else if (hour >= 12 && hour < 17) timeGreeting = "শুভ দুপুর";
      else if (hour >= 17 && hour < 20) timeGreeting = "শুভ সন্ধ্যা";
      else timeGreeting = "শুভ রাত";

      let reply = null;

      // ==== GREETING / GENERAL TALK ====
      if (/hi|hello|হ্যালো|ভাইসা|assalamu alaikum|আসসালামু আলাইকুম/.test(text)) {
        const greets = [
          `${timeGreeting} ভাই 🌸\nকেমন আছিস?`,
          `ওই ভাই, কেমন আছিস? 😄\nআজ ${day}, আশা করি দিনটা ভালই কাটতেছে।`,
          `ওয়ালাইকুম আসসালাম ভাই ❤️\nআল্লাহ তোর উপর রহমত বর্ষণ করুন।`
        ];
        reply = greets[Math.floor(Math.random() * greets.length)];
      }

      // ==== HOW ARE YOU ====
      else if (/কেমন আছ|কেমন চলছে|how are you|how r u/.test(text)) {
        const howAre = [
          `আলহামদুলিল্লাহ আমি ভালো আছি ভাই ❤️\nতুই কেমন আছিস?`,
          `ভালো আছি ভাই, আলহামদুলিল্লাহ 🤍\nতোর দোয়া আর আল্লাহর রহমতেই সব।`,
          `মন আর কোড দুটোই মোটামুটি ভালো চলছে ভাই 😅\nতোর কী অবস্থা?`
        ];
        reply = howAre[Math.floor(Math.random() * howAre.length)];
      }

      // ==== LOVE / FEELINGS ====
      else if (/ভালবাসা|ভালোবাসা|love|valobasa/.test(text)) {
        const loveReplies = [
          `ভালবাসা মানে শুধু কথা না ভাই, দায়িত্ব আর দোয়ার মিশ্রণ 💞`,
          `সঠিক মানুষকে সঠিক সময়ে পেলে ভালবাসা আসলেই নেকাম না, নে’মত 🥹❤️`,
          `ভালবাসা হক হলেই বরকত আসে ভাই, হালাল পথে থাক ✨`
        ];
        reply = loveReplies[Math.floor(Math.random() * loveReplies.length)];
      }

      // ==== TIME / DATE ====
      else if (/সময়|time|স সময়|কটা বাজে|সময় কত/.test(text)) {
        reply = `⏰ এখন সময় ${time}, আজ ${day}।\nমনে রাখিস ভাই, সময় কারো জন্য থেমে থাকে না 🙂\nযা করার, আলসেমি না করে আজকেই শুরু করে দে।`;
      }

      // ==== NAME / WHO ARE YOU ====
      else if (/নাম কি|who are you|তুমি কে|তোর নাম কি/.test(text)) {
        reply = `আমি 🆃🅰🅽🆅🅸🆁 🅱🅾🆃 🤖\n\nতোর ভাই **Tanvir Ahmmed Chowdhury**-এর তৈরি একটি ছোট্ট AI সিস্টেম 😄\nদোয়া রাখিস, যেন আরও ভালোভাবে তোকে সার্ভ করতে পারি ইনশা'আল্লাহ ❤️`;
      }

      // ==== SAD / DEPRESSED / MON KHARAP ====
      else if (/ভালো না|মন খারাপ|ডিপ্রেস|ডিপ্রেশন|কষ্ট লাগছে|bad mood/.test(text)) {
        const sad = [
          `মন খারাপ থাকা অবস্থায়ও আল্লাহ তোকে ভুলে যাননি ভাই 💔\nতুই শুধু একটু তাওবা করে দোয়া কর, ইনশা'আল্লাহ ঠিক হয়ে যাবে 🌙`,
          `ভাই, সব কিছু সময়ের সাথে বদলায়, এই কষ্টও একদিন গল্প হয়ে যাবে ইনশা'আল্লাহ 🙂\nহাল ছাড়িস না প্লিজ।`,
          `মন খারাপ থাকলে কুরআন শুনে দেখিস ভাই, ভেতরটা একটু হলেও হালকা লাগবে 🤍`
        ];
        reply = sad[Math.floor(Math.random() * sad.length)];
      }

      // ==== ISLAMIC / DUA / HADIS ====
      else if (/হাদিস|দোয়া|দোয়া|আয়াত|আয়াত|dua|hadith|allah|আল্লাহ/.test(text)) {
        const islamicMsgs = [
          "রাসুল ﷺ বলেছেন: যে ব্যক্তি অন্যকে ক্ষমা করে, আল্লাহ তায়ালা তার মর্যাদা বাড়িয়ে দেন 🤲",
          "আল্লাহ বলেন: ‘অবশ্যই কষ্টের সাথে স্বস্তি আছে।’ (সূরা ইনশিরাহ ৯৪:৬) 🌙",
          "একবার ‘সুবহানাল্লাহ’ বললে জান্নাতে একটি গাছ রোপণ হয় 🌴 – তাই বেশি বেশি তাসবিহ পড় ভাই।",
          "দোয়া কখনোই ব্যর্থ যায় না ভাই, আল্লাহ হয় সাথে সাথে দেন, নয়তো আরও ভালো কিছু রেখে দেন 🕋",
          "নামাজ শুধু ফরজ না, এটা আসলে তোর আর আল্লাহর প্রাইভেট মিটিং ভাই 💚"
        ];
        reply = islamicMsgs[Math.floor(Math.random() * islamicMsgs.length)];
      }

      // ==== STUDY / EXAM ====
      else if (/পরীক্ষা|exam|study|পড়াশোনা|পড়ালেখা|পড়ালেখা/.test(text)) {
        const studyMsgs = [
          `পরিশ্রম করলে ব্যর্থতা সাময়িক, না পড়লে ব্যর্থতা স্থায়ী ভাই 📚🙂`,
          `একটু একটু করে পড়, একদিন অনেকটা হয়ে যাবে দেখবি ইনশা'আল্লাহ 💪`,
          `বিশ্বাস রাখিস, আল্লাহ পরিশ্রমীর প্রাপ্য কখনো কম দিয়ে রাখেন না 🤍`
        ];
        reply = studyMsgs[Math.floor(Math.random() * studyMsgs.length)];
      }

      // ==== SLEEP / BORED ====
      else if (/ঘুম|ঘুম আসছে|ঘুমাইতে চাই|ঘুমাতে চাই|boring|বোরিং/.test(text)) {
        const sleepMsgs = [
          `ঘুম আসতেছে মানে মস্তিষ্ক রিস্ট চাইতেছে ভাই 😴\nএকটু ওজু করে, দু’আ করে ঘুমিয়ে পড় – বরকতময় ঘুম হবে ইনশা'আল্লাহ 🌙`,
          `বোরিং লাগলে ফোনটা একটু দূরে রেখে বাস্তব জীবনের মানুষের সাথে একটু কথা বলিস ভাই 🙂`,
          `ঘুমের আগেই নিজের জন্য আর উম্মাহর জন্য দু’আ করে নিস, খুব সুন্দর অভ্যাস এটা 🤍`
        ];
        reply = sleepMsgs[Math.floor(Math.random() * sleepMsgs.length)];
      }

      // ==== INSULT / BAD WORDS ====
      else if (/খারাপ|বোকা|চুপ|চুপ থাক|গাধা|হারামি|ফালতু/.test(text)) {
        const angry = [
          `রাগ কইরো না ভাই 😅\nআমি তোকে কষ্ট দিতে না, একটু হাসি দিতে এসেছি মাত্র।`,
          `শান্ত হও ভাই 😌\nগালাগালি দিলে তোরই মানসিক শান্তি নষ্ট হয়, আমি তো বটই থাকব 😂`,
          `চল শান্তভাবে কথা বলি ভাই 🙂\nগালি দিয়ে তোকে কেউ বড় ভাই বানাবে না।`
        ];
        reply = angry[Math.floor(Math.random() * angry.length)];
      }

      // ==== THANKS / GRATITUDE ====
      else if (/ধন্যবাদ|thanks|thank you|tnx|শুকরিয়া/.test(text)) {
        const thanksMsgs = [
          `আলহামদুলিল্লাহ ভাই, তোর কাজ হতে পেরে আমারই ভালো লাগলো 🤍`,
          `সবসময় পাশে থাকার চেষ্টা করব ইনশা'আল্লাহ ❤️`,
          `তুই খুশি হলেই তো আমার সিস্টেম আপডেট হয়ে যায় ভাই 😄`
        ];
        reply = thanksMsgs[Math.floor(Math.random() * thanksMsgs.length)];
      }

      // ==== FRIEND / BRO / BONDHU ====
      else if (/ভাই|vai|friend|বন্ধু|দোস্ত|fnd/.test(text)) {
        const friendMsgs = [
          `তুই আমার ভার্চুয়াল বন্ধু ভাই 💖\nদোয়া করি, তোর দুনিয়া আর আখিরাত দুইটাই সুন্দর হোক।`,
          `ভাই মানে শুধু নাম না, একটা ভরসার জায়গা 🙂\nআমি চেষ্টা করব সে জায়গায় থাকতে।`,
          `চিন্তা করিস না ভাই, একদিন সব ঠিক হয়ে যাবে ইনশা'আল্লাহ 🤍`
        ];
        reply = friendMsgs[Math.floor(Math.random() * friendMsgs.length)];
      }

      // ==== ONLY EMOJI / SHORT REACT ====
      else if (/^(:?\p{Emoji}|😂|😅|🤣|😐|🙂|😑|😮)+$/u.test(text)) {
        const emo = [
          `ইমোজি দিয়ে সব বুঝিয়ে দিলি ভাই 😆`,
          `হাসি দেখি মন্দ না ভাই 😄`,
          `হুমম, ইমোজি-এক্সপার্ট বলা যায় তোকে 😎`
        ];
        reply = emo[Math.floor(Math.random() * emo.length)];
      }

      // ==== DEFAULT RANDOM REPLY ====
      else {
        const random = [
          "বাহ ভাই, দারুণ কথা বললি 😄",
          "হুমম, বুঝলাম ভাই 🙂",
          "তুই তো একদম ভাইববাজ 😎",
          "এটা নিয়ে বেশি চিন্তা করিস না ভাই, আল্লাহর উপর ভরসা রাখ ☝️",
          "আমি আছি পাশে ভাই 🤍\nযা বলার খুলে বল।",
          "মনে হয় তুই অনেক কিছুই ভিতরে চেপে রাখিস ভাই 🙂\nকথা বললে হালকা লাগবে।"
        ];
        reply = random[Math.floor(Math.random() * random.length)];
      }

      if (!reply) return;
      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (err) {
      console.error("aiReplyPlus error:", err);
    }
  }
};
