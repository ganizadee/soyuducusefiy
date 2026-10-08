"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { departments } from "@/lib/site";

const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

type Status = { state: "idle" | "sending" } | { state: "done"; name: string } | { state: "error"; message: string };

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });
    try {
      if (STATIC_EXPORT) {
        // Statik versiya: müraciət Netlify Forms-a gedir (public/__forms.html)
        const res = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ "form-name": "qebul", ...data }).toString(),
        });
        if (!res.ok) throw new Error("Müraciət göndərilmədi. Zəhmət olmasa, telefonla əlaqə saxlayın.");
      } else {
        const res = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const body = (await res.json()) as { ok: boolean; message?: string };
        if (!res.ok || !body.ok) throw new Error(body.message ?? "Xəta baş verdi");
      }
      setStatus({ state: "done", name: data.name.split(" ")[0] });
      form.reset();
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Xəta baş verdi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.",
      });
    }
  }

  if (status.state === "done") {
    return (
      <div className="form-card form-card--done" role="status">
        <CheckCircle2 size={48} strokeWidth={1.6} aria-hidden="true" />
        <h3>Təşəkkür edirik, {status.name}!</h3>
        <p>Müraciətiniz qəbul olundu. Operatorumuz 15 dəqiqə ərzində sizinlə əlaqə saxlayıb vaxtı təsdiqləyəcək.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus({ state: "idle" })}>
          Yeni müraciət
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Ad, soyad</label>
        <input id="name" name="name" required minLength={3} autoComplete="name" placeholder="Məsələn, Aysel Quliyeva" />
      </div>
      <div className="field">
        <label htmlFor="phone">Telefon</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="^\+?[0-9\s\-()]{9,18}$"
          placeholder="+994 50 000 00 00"
        />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="department">Şöbə</label>
          <select id="department" name="department" defaultValue="">
            <option value="">Bilmirəm — məsləhət lazımdır</option>
            {departments.map((d) => (
              <option key={d.title} value={d.title}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="date">İstədiyiniz tarix</label>
          <input id="date" name="date" type="date" min={today()} suppressHydrationWarning />
        </div>
      </div>
      <div className="field">
        <label htmlFor="note">Şikayətiniz (istəyə görə)</label>
        <textarea id="note" name="note" rows={3} maxLength={600} placeholder="Qısaca yazın — həkim əvvəlcədən hazırlaşsın" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>Şəxsi məlumatlarımın qəbulun təşkili üçün emal olunmasına razıyam.</span>
      </label>
      {status.state === "error" && (
        <p className="form-error" role="alert">
          {status.message}
        </p>
      )}
      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={sending}>
        {sending ? <LoaderCircle className="spin" size={20} aria-hidden="true" /> : null}
        {sending ? "Göndərilir…" : "Müraciəti göndər"}
      </button>
    </form>
  );
}
