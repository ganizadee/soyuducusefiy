# Nəbz Klinikası — tibbi landinq səhifəsi

Next.js 16 (App Router) ilə hazırlanmış, Azərbaycan dilində tibb mərkəzi saytı.
Videolar kadrlara bölünüb və aşağı sürüşdürdükcə `<canvas>` üzərində kadr-kadr
oynadılır (Apple məhsul səhifələrindəki kimi scroll animasiyası).

## İşə salmaq

```bash
cd medical-website
npm install
npm run dev        # http://localhost:3000
```

Production: `npm run build && npm start`.

## Səhifənin quruluşu

| Bölmə | Video (kadrlar) | Məzmun |
| --- | --- | --- |
| Giriş | Steteskoplu həkim — `public/frames/hero` (208 kadr) | Əsas başlıq, 3 mərhələli mətn |
| Xidmətlər | Təqdimat jesti — `public/frames/services` (96) | Həkim əli ilə xidmətləri “təqdim edir” |
| Onlayn | Planşetli həkim — `public/frames/digital` (96) | Rəqəmsal xidmətlər |
| Həkimlər | Üç həkim — `public/frames/team` (96) | Həkimlərin üzərində ad etiketləri |
| Dəvət | Başı ilə təsdiqləyən həkim — `public/frames/cta` (96) | Qəbula çağırış |

Aralarda adi bölmələr var: rəqəmlər, 12 şöbə, “Niyə biz”, həkim kartları,
onlayn qeydiyyat formu, tez-tez verilən suallar və footer.

## Scroll animasiyası necə işləyir

`components/ScrollSequence.tsx`:

- **`ScrollSequence`** — hündür bölmə (`length` × ekran hündürlüyü) və onun içində
  `sticky` canvas. Scroll irəlilədikcə uyğun kadr çəkilir; keçid yumşaldılır.
- Kadrlar bölməyə 2 ekran qalmış mərhələlərlə yüklənir (əvvəl hər 16-cı, sonra 8-ci…),
  ona görə animasiya bütün kadrlar gəlməmiş də işləyir.
- **`Beat`** — `from`/`to` (0–1) aralığında görünən mətn bloku.
- **`Anchor`** — videodakı konkret nöqtəyə “yapışan” etiket (məs. həkimin adı).
- `focus` — dar (telefon) ekranlarda kadrın hansı hissəsinin mərkəzdə qalacağı.

## Kadrları yenidən yaratmaq

`ffmpeg` lazımdır. Videoları bir qovluğa qoyun və:

```bash
npm run frames -- /videolarin/qovlugu
```

Skript (`scripts/extract-frames.sh`) kadrları 1600px WebP formatında
`public/frames/*` qovluqlarına, həkim portretlərini isə `public/team/` qovluğuna yazır.
Kadr sayı dəyişərsə, `app/page.tsx`-də uyğun `frames={…}` dəyərini yeniləyin.

## Məzmunu dəyişmək

Bütün mətnlər, telefon, ünvan, iş saatları, şöbələr, həkimlər və suallar
`lib/site.ts` faylındadır. **Klinikanın adı, əlaqə məlumatları, həkim adları və
rəqəmlər nümunədir** — öz məlumatlarınızla əvəz edin.

## Qeydiyyat formu

Form `POST /api/appointment` ünvanına göndərilir (`app/api/appointment/route.ts`).
Route məlumatları yoxlayır, lakin heç yerdə saxlamır — müraciətləri almaq üçün
oraya CRM, e-poçt və ya Telegram inteqrasiyası əlavə edin.

## Deploy

Vercel-də layihəni import edərkən **Root Directory** olaraq `medical-website`
seçin. Sosial şəbəkə önizləmələri üçün `NEXT_PUBLIC_SITE_URL` mühit dəyişənini
saytın ünvanına bərabər edin.
