export const RECIPE_DATABASE = [
  {
    id: 1,
    name: "Dovğa",
    category: "Azərbaycan Mətbəxi",
    ingredients: ["qatıq", "düyü", "göyərti", "yumurta", "un", "noxud"],
    instructions:
      "1. Qatığı un və yumurta ilə yaxşıca çalın.\n2. Düyünü əlavə edib ocağa qoyun.\n3. Qaynayana qədər taxta qaşıqla dayanmadan qarışdırın (yoxsa çürüyər).\n4. Qaynayan kimi doğranmış göyərtiləri və əvvəlcədən bişmiş noxudu əlavə edin.\n5. Bir az qaynadıqdan sonra duzu əlavə edib ocaqdan götürün.",
    difficulty: "Orta",
    time: "40 dəq",
    image: "🥣",
  },
  {
    id: 2,
    name: "Pomidor-Yumurta",
    category: "Səhər Yeməyi",
    ingredients: ["pomidor", "yumurta", "kərə yağı", "duz", "istiot"],
    instructions:
      "1. Pomidorların qabığını soyub kub şəklində doğrayın.\n2. Tavada yağı qızdırın və pomidorları əlavə edin.\n3. Pomidorlar suyunu çəkib pörtlənənə qədər bişirin.\n4. Yumurtaları bir qabda çırpın və ya birbaşa tavanın içinə vurun.\n5. Duz və istiot vurub qarışdırın, yumurta bişənə qədər gözləyin.",
    difficulty: "Asan",
    time: "15 dəq",
    image: "🍳",
  },
  {
    id: 3,
    name: "Yarpaq Dolması",
    category: "Azərbaycan Mətbəxi",
    ingredients: [
      "mal əti",
      "düyü",
      "soğan",
      "üzüm yarpağı",
      "nanə",
      "şüyüd",
      "duz",
      "istiot",
    ],
    instructions:
      "1. Əti çəkin, soğan və göyərtiləri xırda doğrayıb qarışdırın.\n2. Düyünü yuyub ətə əlavə edin, ədviyyatları vurun.\n3. Üzüm yarpaqlarını qaynar suda pörtlədin.\n4. İçliyi yarpaqlara bükün.\n5. Qazana yığıb üzərinə çıxana qədər su tökün və vam odda bişirin.",
    difficulty: "Çətin",
    time: "90 dəq",
    image: "🍃",
  },
  {
    id: 4,
    name: "Südlü Plov",
    category: "Azərbaycan Mətbəxi",
    ingredients: ["düyü", "süd", "kərə yağı", "duz", "zəfəran", "kişmiş", "qaysı"],
    instructions:
      "1. Düyünü yuyun.\n2. Südü qazana töküb qaynadırın, düyünü əlavə edin.\n3. Düyü südü çəkib bişənə qədər qarışdırın.\n4. Dəmə qoyarkən üzərinə ərinmiş kərə yağı və zəfəran şirəsi gəzdirin.\n5. Süfrəyə verərkən yanında quru meyvələr qoya bilərsiniz.",
    difficulty: "Orta",
    time: "45 dəq",
    image: "🍚",
  },
  {
    id: 5,
    name: "Kükü",
    category: "Səhər Yeməyi",
    ingredients: ["yumurta", "göyərti", "kərə yağı", "duz", "qoz"],
    instructions:
      "1. Göyərtiləri (kəvər, keşniş, şüyüd) təmizləyib xırda doğrayın.\n2. Yumurtaları, duzu və istiotu əlavə edib yaxşıca qarışdırın.\n3. İstəyə görə xırdalanmış qoz əlavə edin.\n4. Tavada yağı qızdırın və qarışımı tökün.\n5. Alt hissəsi qızardıqdan sonra çevirib digər üzünü də bişirin.",
    difficulty: "Asan",
    time: "20 dəq",
    image: "🌿",
  },
  {
    id: 6,
    name: "Bozbaş",
    category: "Azərbaycan Mətbəxi",
    ingredients: ["mal əti", "kartof", "noxud", "soğan", "tomat pastası", "nanə qurusu"],
    instructions:
      "1. Əti sümüklü şəkildə doğrayıb suda qaynadın, kəfini yığın.\n2. Ət bişənə yaxın isladılmış noxudu əlavə edin.\n3. Soğanı yağda qovurub tomat pastası ilə qarışdırın, bulyona əlavə edin.\n4. Kartofları soyub bütöv və ya böyük doğrayıb yeməyə salın.\n5. Hazır olana yaxın duz, istiot və nanə qurusu səpin.",
    difficulty: "Orta",
    time: "60 dəq",
    image: "🥘",
  },
  {
    id: 7,
    name: "Kartof Qızartması",
    category: "Qəlyanaltı",
    ingredients: ["kartof", "duru yağ", "duz", "ketçup", "mayonez"],
    instructions:
      "1. Kartofları soyun və uzunsov formada doğrayın.\n2. Kartofları soyuq suda yuyub nişastasını təmizləyin və kağız dəsmalla qurudun.\n3. Tavada bol yağı qızdırın.\n4. Kartofları qızıl rəng alana qədər qızardın.\n5. İsti ikən duzlayın.",
    difficulty: "Asan",
    time: "20 dəq",
    image: "🍟",
  },
  {
    id: 8,
    name: "Toyuq Çığırtması",
    category: "Azərbaycan Mətbəxi",
    ingredients: ["toyuq əti", "soğan", "pomidor", "yumurta", "kərə yağı", "limon"],
    instructions:
      "1. Toyuq ətini hissələrə bölüb qaynadın və ya yağda qızardın.\n2. Soğanı aypara şəklində doğrayıb qızardın.\n3. Pomidorları doğrayıb soğanın üzərinə əlavə edin, sous halına gələnə qədər bişirin.\n4. Toyuqları tavanın içinə düzün.\n5. Yumurtaları çırpıb yeməyin üzərinə gəzdirin və qapağı bağlayın.",
    difficulty: "Orta",
    time: "50 dəq",
    image: "🍗",
  },
];

export const COMMON_INGREDIENTS = [
  "Yumurta",
  "Kartof",
  "Pomidor",
  "Soğan",
  "Düyü",
  "Qatıq",
  "Mal əti",
  "Toyuq əti",
  "Göyərti",
  "Un",
  "Süd",
];

