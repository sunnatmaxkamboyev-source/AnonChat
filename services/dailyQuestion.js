
const QUESTIONS = [
  // 1. Tanishuv
  "O‘zingni uchta so‘z bilan qanday ta’riflaysan?",
  "Bo‘sh vaqtingda nima qilishni yoqtirasan?",
  "Senga qanday ism bilan murojaat qilishlarini yoqtirasan?",
  "Ko‘proq uyda dam olishni yoqtirasanmi yoki tashqaridami?",
  "Ertalabki odating qanday?",
  "Odamlar sendagi qaysi xususiyatni ko‘p maqtashadi?",
  "Yangi odamlar bilan tanishish senga osonmi?",
  "Seni yaxshiroq tanish uchun nima haqida so‘rash kerak?",
  "O‘zing haqingda ko‘pchilik bilmaydigan qiziq fakt nima?",
  "Qaysi fasl senga ko‘proq yoqadi?",

  // 2. Do‘stlik
  "Seningcha, haqiqiy do‘st qanday bo‘lishi kerak?",
  "Do‘stlikda eng muhim narsa nima?",
  "Do‘sting uchun qilgan eng yaxshi ishing nima?",
  "Do‘st bilan qancha vaqtda bir marta gaplashish kerak?",
  "Kechirim so‘rash osonmi yoki kechirish?",
  "Do‘st tanlashda nimaga e’tibor berasan?",
  "Eski do‘stlikni qayta tiklash mumkinmi?",
  "Do‘sting xafa bo‘lsa, uni qanday ovutasan?",
  "Senga ko‘p do‘st kerakmi yoki bir nechta yaqin do‘st?",
  "Do‘stlikda yolg‘onning o‘rni bormi?",

  // 3. Sevgi va munosabatlar
  "Seningcha, muhabbat nima?",
  "Insonda birinchi bo‘lib nimaga e’tibor berasan?",
  "Senga ko‘ra, ideal uchrashuv qanday bo‘ladi?",
  "Munosabatlarda ishonch qanchalik muhim?",
  "Romantik sovg‘alardan qaysi birini yoqtirasan?",
  "Sevgi yoki hurmat — qaysi biri muhimroq?",
  "Bir qarashda sevib qolishga ishonasanmi?",
  "Munosabatlarda ochiq gaplashish nega muhim?",
  "Seningcha, uzoq masofali munosabatlar ishlaydimi?",
  "Yoqtirgan insoningga birinchi bo‘lib yozarmiding?",

  // 4. Orzular va maqsadlar
  "Eng katta orzuing nima?",
  "Besh yildan keyin o‘zingni qayerda ko‘rasan?",
  "Qaysi kasbni sinab ko‘rishni xohlaysan?",
  "Agar pul muammo bo‘lmasa, nima bilan shug‘ullanarding?",
  "Hayotingdagi eng muhim maqsading qaysi?",
  "Qaysi ko‘nikmani o‘rganishni xohlaysan?",
  "Orzularing uchun nimadan voz kechishga tayyorsan?",
  "Senga motivatsiyani nima beradi?",
  "Qaysi odatingni yaxshilashni xohlaysan?",
  "O‘zingga bir yil oldin qanday maslahat bergan bo‘larding?",

  // 5. Hayot va qadriyatlar
  "Seningcha, baxt nima?",
  "Pul baxt sotib olishi mumkinmi?",
  "Hayotda eng ko‘p nimani qadrlaysan?",
  "Senga tinchlik muhimmi yoki sarguzasht?",
  "Odamning xarakteri o‘zgarishi mumkinmi?",
  "Qaysi hayotiy saboqni hech qachon unutmaysan?",
  "Muvaffaqiyatni qanday o‘lchaysan?",
  "Xato qilishdan qo‘rqasanmi?",
  "Odamlar seni qanday eslab qolishlarini istaysan?",
  "Seningcha, vaqtni qanday qadrlash kerak?",

  // 6. Sayohat va joylar
  "Istalgan joyga sayohat qila olsang, qayerga borarding?",
  "Qaysi mamlakatda bir yil yashab ko‘rishni xohlaysan?",
  "Dengizmi yoki tog‘lar?",
  "Sayohatga yolg‘iz chiqarmiding yoki do‘stlar bilan?",
  "Orzuingdagi dam olish maskani qanday?",
  "Qaysi tarixiy joyni ko‘rishni istaysan?",
  "Samolyotda uchish yoqadimi?",
  "Sayohatda reja bilan yurasanmi yoki erkin?",
  "O‘zbekistondagi eng yoqimli joying qayer?",
  "Bir oy bepul sayohat qilish imkoning bo‘lsa, qayerdan boshlarding?",

  // 7. Kulgili savollar
  "Bir kun ko‘rinmas bo‘lib qolsang, nima qilarding?",
  "Hayoting film bo‘lsa, uning nomi nima bo‘lardi?",
  "Bir kun hayvon bo‘lib qolsang, qaysi hayvonni tanlarding?",
  "Eng kulgili noqulay vaziyating qanday bo‘lgan?",
  "Hech kim ko‘rmayotganda raqsga tushasanmi?",
  "Bir hafta faqat bitta taom yesang, nimani tanlarding?",
  "Telefoning gapira olsa, sen haqingda nima derdi?",
  "Bir kun mashhur inson o‘rnida bo‘lsang, kim bo‘larding?",
  "Eng g‘alati orzuing nima bo‘lgan?",
  "Zombi apokalipsisi boshlansa, birinchi nima qilarding?",

  // 8. Tasavvur va tanlovlar
  "Bir super kuch tanlasang, qaysini tanlarding?",
  "O‘tmishga qaytarmiding yoki kelajakni ko‘rarmiding?",
  "Bir tilni bir zumda o‘rgana olsang, qaysi tilni tanlarding?",
  "Bir kun dunyodagi istalgan inson bilan vaqt o‘tkazsang, kimni tanlarding?",
  "Bir tilak tilash imkoning bo‘lsa, nima so‘rarding?",
  "Biror xotirani qayta yashash imkoning bo‘lsa, qaysini tanlarding?",
  "Biror narsani dunyodan yo‘q qila olsang, nimani tanlarding?",
  "Bir kun kelajakdagi o‘zing bilan uchrashsang, nima so‘rarding?",
  "Bir kunda yangi iste’dodga ega bo‘lsang, qanday iste’dod istarding?",
  "Biror film ichida yashash imkoning bo‘lsa, qaysini tanlarding?",

  // 9. Sevimli narsalar
  "Eng sevimli filming qaysi?",
  "Qaysi qo‘shiqni ko‘p tinglaysan?",
  "Eng sevimli taoming nima?",
  "Choymi yoki qahva?",
  "Qaysi rang kayfiyatingni ko‘taradi?",
  "Kitob o‘qishni yoqtirasanmi?",
  "Qaysi sport turini yoqtirasan?",
  "Qaysi bayramni intiqlik bilan kutasan?",
  "Qaysi ilovadan eng ko‘p foydalanasan?",
  "Kayfiyating tushganda nima tinglaysan?",

  // 10. Xotiralar
  "Bolaligingdagi eng yoqimli xotirang qaysi?",
  "Maktabdagi eng esda qolarli kuning qaysi?",
  "Hech qachon unutmaydigan inson kim?",
  "Oxirgi marta nimadan chin dildan xursand bo‘lding?",
  "Hayotingdagi eng jasoratli qaroring qaysi?",
  "Qachon o‘zing bilan faxrlangansan?",
  "Senga berilgan eng yaxshi maslahat qaysi?",
  "Bolaligingda kim bo‘lishni orzu qilarding?",
  "Qaysi kunni yana bir marta yashashni xohlaysan?",
  "Seni doim kuldiradigan xotira bormi?",

  // 11. Texnologiya va kelajak
  "Sun’iy intellekt kelajakni qanday o‘zgartiradi deb o‘ylaysan?",
  "Texnologiyasiz bir hafta yashay olasanmi?",
  "Qaysi texnologiyani yaratishni xohlarding?",
  "Robotlar insonlarning ishini to‘liq egallashi mumkinmi?",
  "Internet bo‘lmagan dunyo qanday bo‘lardi?",
  "Kelajakda qaysi kasblar eng muhim bo‘ladi?",
  "Telefoningdagi qaysi ilovadan voz kecholmaysan?",
  "Onlayn tanishuvga qanday qaraysan?",
  "Ijtimoiy tarmoqlar foydalimi yoki zararliroq?",
  "Kelajakda qanday uyda yashashni istaysan?",

  // 12. Chuqurroq savollar
  "Seni chinakam baxtli qiladigan narsa nima?",
  "Odamlarda qaysi fazilatni eng ko‘p qadrlaysan?",
  "Hayotingda o‘zgartirmoqchi bo‘lgan bitta narsa nima?",
  "Seningcha, odamni kuchli qiladigan narsa nima?",
  "Yolg‘iz qolganingda nimalar haqida o‘ylaysan?",
  "Qiyin paytlarda o‘zingni qanday qo‘llab-quvvatlaysan?",
  "Seningcha, odamlar bir-birini tushunishi uchun nima kerak?",
  "Qaysi qo‘rquvingni yengishni xohlaysan?",
  "Senga ko‘proq maslahat kerakmi yoki tinglaydigan inson?",
  "Bugungi kuningni yaxshiroq qiladigan bitta narsa nima?",
];

function getDailyQuestion() {
  const dateString = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const [year, month, day] = dateString.split("-").map(Number);

  const dayNumber = Math.floor(
    Date.UTC(year, month - 1, day) / 86400000
  );

  const questionIndex =
    ((dayNumber % QUESTIONS.length) + QUESTIONS.length) %
    QUESTIONS.length;

  return QUESTIONS[questionIndex];
}

module.exports = getDailyQuestion;
