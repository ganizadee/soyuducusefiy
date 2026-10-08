import { NextResponse } from "next/server";

type Payload = {
  name?: unknown;
  phone?: unknown;
  department?: unknown;
  date?: unknown;
  note?: unknown;
  consent?: unknown;
};

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Sorğu düzgün deyil." }, { status: 400 });
  }

  const name = text(body.name, 80);
  const phone = text(body.phone, 20);

  if (name.length < 3) {
    return NextResponse.json({ ok: false, message: "Ad və soyadınızı daxil edin." }, { status: 422 });
  }
  if (!/^\+?[0-9\s\-()]{9,18}$/.test(phone)) {
    return NextResponse.json({ ok: false, message: "Telefon nömrəsi düzgün deyil." }, { status: 422 });
  }
  if (!body.consent) {
    return NextResponse.json({ ok: false, message: "Məlumatların emalına razılıq tələb olunur." }, { status: 422 });
  }

  const appointment = {
    name,
    phone,
    department: text(body.department, 60),
    date: text(body.date, 10),
    note: text(body.note, 600),
  };

  // Müraciət burada CRM-ə, e-poçta və ya Telegram botuna göndərilə bilər.
  void appointment;

  return NextResponse.json({ ok: true });
}
