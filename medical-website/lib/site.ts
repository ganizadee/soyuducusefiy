// Saytın bütün mətn və əlaqə məlumatları burada saxlanılır.
// Klinikanın adı, telefon, ünvan və s. nümunədir — öz məlumatlarınızla əvəz edin.

export const clinic = {
  name: "Nəbz",
  fullName: "Nəbz Klinikası",
  tagline: "Sağlamlığınızın nəbzini tuturuq",
  phone: "+994 12 555 00 00",
  phoneHref: "tel:+994125550000",
  whatsapp: "+994 50 555 00 00",
  email: "info@nebz-klinika.az",
  address: "Bakı şəhəri, Nəsimi rayonu",
  hours: [
    { days: "Bazar ertəsi – Cümə", time: "08:00 – 20:00" },
    { days: "Şənbə", time: "09:00 – 18:00" },
    { days: "Bazar", time: "10:00 – 16:00" },
  ],
};

export const nav = [
  { href: "#xidmetler", label: "Xidmətlər" },
  { href: "#reqemsal", label: "Onlayn" },
  { href: "#hekimler", label: "Həkimlər" },
  { href: "#suallar", label: "Suallar" },
  { href: "#elaqe", label: "Əlaqə" },
];

export const stats = [
  { value: 15, suffix: "+", label: "il təcrübə" },
  { value: 40, suffix: "+", label: "həkim-mütəxəssis" },
  { value: 120, suffix: " min+", label: "pasiyentə kömək" },
  { value: 24, suffix: "/7", label: "təcili əlaqə xətti" },
];

export type IconName =
  | "heart"
  | "brain"
  | "baby"
  | "venus"
  | "scan"
  | "flask"
  | "stethoscope"
  | "smile"
  | "eye"
  | "ear"
  | "bone"
  | "droplet"
  | "calendar"
  | "file"
  | "video"
  | "bell"
  | "shield"
  | "award"
  | "wallet"
  | "hospital"
  | "users"
  | "clock";

// Steteskoplu həkim videosunun üzərində görünən əsas xidmətlər
export const featuredServices: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Kardiologiya", text: "EKQ, exokardioqrafiya və ürək-damar risklərinin qiymətləndirilməsi" },
  { icon: "brain", title: "Nevrologiya", text: "Baş ağrısı, yuxu pozuntuları və sinir sistemi xəstəlikləri" },
  { icon: "baby", title: "Pediatriya", text: "Doğulduğu gündən uşağınızın sağlam böyüməsinə nəzarət" },
  { icon: "scan", title: "Diaqnostika", text: "MRT, KT, USM və rentgen — nəticə eyni gündə" },
  { icon: "flask", title: "Laboratoriya", text: "500-dən çox analiz növü, nəticələr onlayn kabinetdə" },
];

export const departments: { icon: IconName; title: string; text: string }[] = [
  { icon: "stethoscope", title: "Terapiya", text: "Ümumi müayinə, check-up proqramları və profilaktika" },
  { icon: "heart", title: "Kardiologiya", text: "Ürək ritmi, təzyiq və xolesterinə nəzarət" },
  { icon: "brain", title: "Nevrologiya", text: "Miqren, onurğa ağrıları, yaddaş problemləri" },
  { icon: "baby", title: "Pediatriya", text: "Peyvənd təqvimi, inkişaf müayinələri" },
  { icon: "venus", title: "Ginekologiya", text: "Qadın sağlamlığı və hamiləliyin izlənməsi" },
  { icon: "droplet", title: "Endokrinologiya", text: "Diabet, qalxanabənzər vəzi, hormon balansı" },
  { icon: "eye", title: "Oftalmologiya", text: "Görmə yoxlanışı, göz dibi müayinəsi" },
  { icon: "ear", title: "LOR", text: "Qulaq, burun və boğaz xəstəlikləri" },
  { icon: "bone", title: "Ortopediya", text: "Oynaq və sümük travmaları, reabilitasiya" },
  { icon: "smile", title: "Stomatologiya", text: "Müalicə, gigiyena və estetik stomatologiya" },
  { icon: "scan", title: "Şüa diaqnostikası", text: "MRT, KT, USM, rəqəmsal rentgen" },
  { icon: "flask", title: "Laboratoriya", text: "Qan, hormon, allergiya və genetik testlər" },
];

export const digitalFeatures: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "Onlayn qeydiyyat", text: "Növbə gözləmədən, rahat vaxta 1 dəqiqəyə yazılın." },
  { icon: "file", title: "Elektron tibbi kart", text: "Bütün müayinə və analiz nəticələriniz bir yerdə." },
  { icon: "video", title: "Video konsultasiya", text: "Evdən çıxmadan həkimlə məsləhətləşin." },
  { icon: "bell", title: "Ağıllı xatırlatmalar", text: "Dərman qəbulu və növbəti görüş barədə SMS." },
];

export const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: "award", title: "Beynəlxalq protokollar", text: "Müalicə sübuta əsaslanan tibb və müasir klinik tövsiyələrə uyğun aparılır." },
  { icon: "hospital", title: "Müasir avadanlıq", text: "Ekspert səviyyəli MRT, KT və rəqəmsal laboratoriya bir binada." },
  { icon: "wallet", title: "Şəffaf qiymətlər", text: "Bütün xidmətlərin qiyməti əvvəlcədən bəllidir — gizli ödəniş yoxdur." },
  { icon: "shield", title: "Tibbi sığorta", text: "Aparıcı sığorta şirkətlərinin polisləri ilə xidmət göstəririk." },
];

export const steps = [
  { title: "Yazılın", text: "Sayt, telefon və ya WhatsApp vasitəsilə rahat vaxtı seçin." },
  { title: "Müayinə olun", text: "Həkim sizi tələsmədən dinləyir və lazımi müayinələri təyin edir." },
  { title: "Nəticəni alın", text: "Diaqnoz və müalicə planı onlayn kabinetinizdə saxlanılır." },
];

export const doctors = [
  {
    name: "Dr. Elçin Məmmədov",
    role: "Kardioloq",
    experience: "18 il təcrübə",
    image: "/team/elchin.webp",
    bio: "Ürək çatışmazlığı və aritmiyaların müalicəsi üzrə mütəxəssis.",
  },
  {
    name: "Dr. Leyla Hüseynova",
    role: "Terapevt, baş həkim",
    experience: "12 il təcrübə",
    image: "/team/leyla.webp",
    bio: "Ailə təbabəti və profilaktik check-up proqramlarına rəhbərlik edir.",
  },
  {
    name: "Dr. Nərmin Əliyeva",
    role: "Pediatr",
    experience: "9 il təcrübə",
    image: "/team/nermin.webp",
    bio: "Körpələrin inkişafı və uşaq allergologiyası üzrə ixtisaslaşıb.",
  },
];

export const faqs = [
  {
    q: "Qəbula necə yazıla bilərəm?",
    a: "Saytdakı formu doldurun, zəng edin və ya WhatsApp-a yazın. Operatorumuz 15 dəqiqə ərzində sizinlə əlaqə saxlayıb uyğun vaxtı təsdiqləyəcək.",
  },
  {
    q: "Tibbi sığorta ilə xidmət göstərirsiniz?",
    a: "Bəli. Aparıcı sığorta şirkətlərinin polisləri qəbul olunur. Qəbuldan əvvəl polisinizin nömrəsini bildirsəniz, əhatə dairəsini əvvəlcədən yoxlayarıq.",
  },
  {
    q: "Analiz nəticələrini nə vaxt ala bilərəm?",
    a: "Əksər analizlərin nəticəsi həmin gün hazır olur və SMS ilə göndərilən keçid vasitəsilə onlayn kabinetdə görünür.",
  },
  {
    q: "Uşaqlar üçün ayrıca qəbul var?",
    a: "Bəli, pediatriya şöbəmiz ayrıca mərtəbədədir: uşaqlar üçün oyun guşəsi və ayrıca gözləmə zalı var.",
  },
  {
    q: "Təcili vəziyyətdə nə etməliyəm?",
    a: "Həyati təhlükə olduqda dərhal 103 nömrəsinə zəng edin. Təcili olmayan, lakin gecikdirilməməli hallarda 24/7 xəttimiz sizə yönləndirmə edəcək.",
  },
];
