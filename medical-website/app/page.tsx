import Image from "next/image";
import { ArrowDown, ArrowRight, Check, Clock, Mail, MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Counter } from "@/components/Counter";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Anchor, Beat, ScrollSequence } from "@/components/ScrollSequence";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
  clinic,
  departments,
  digitalFeatures,
  doctors,
  faqs,
  featuredServices,
  nav,
  reasons,
  stats,
  steps,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        {/* 1. Steteskoplu həkim — giriş */}
        <ScrollSequence
          id="ana-sehife"
          name="hero"
          frames={208}
          focus={[
            [0, 0.72],
            [0.6, 0.7],
            [1, 0.6],
          ]}
          priority
          label="Həkim steteskopu taxır və onu sizə doğru uzadır"
          overlay={
            <Beat to={0.06} fade={0.04} className="scroll-hint">
              <span>Aşağı sürüşdürün</span>
              <ArrowDown size={18} aria-hidden="true" />
            </Beat>
          }
        >
          <div className="panel panel--full">
            <div className="seq-copy card card--bare">
              <p className="eyebrow">{clinic.fullName} · Bakı</p>
              <h1 className="display">
                Sağlamlığınızı <span className="hl">dinləyirik</span>
              </h1>
              <p className="lead">
                Hər nəfəs, hər ürək döyüntüsü bizim üçün önəmlidir. Təcrübəli həkimlər və müasir diaqnostika — bir
                ünvanda.
              </p>
              <div className="actions">
                <a className="btn btn--primary btn--lg" href="#qebul">
                  Qəbula yazıl <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="btn btn--ghost btn--lg" href="#xidmetler">
                  Xidmətlər
                </a>
              </div>
            </div>
          </div>

          <div className="panel">
            <Reveal className="seq-copy card">
              <p className="eyebrow">Diqqətli yanaşma</p>
              <h2 className="display display--md">
                Tələsmədən dinləyir, <span className="hl">dəqiq</span> diaqnoz qoyuruq
              </h2>
              <p className="lead">
                Hər qəbula kifayət qədər vaxt ayrılır — şikayətlərinizi ətraflı öyrənir, nəticələri sadə dillə izah
                edirik.
              </p>
            </Reveal>
          </div>

          {/* Son kartı yuxarıda saxlayırıq ki, uzadılmış steteskopu örtməsin */}
          <div className="panel panel--full panel--top">
            <Reveal className="seq-copy card">
              <p className="eyebrow">Sizə bir addım yaxın</p>
              <h2 className="display display--md">
                Sağlamlığınız <span className="hl">etibarlı əllərdə</span>
              </h2>
              <p className="lead">Ailə həkimindən dar ixtisaslı mütəxəssisə qədər 12 şöbə sizin xidmətinizdədir.</p>
              <div className="actions">
                <a className="btn btn--primary btn--lg" href="#qebul">
                  Qəbula yazıl <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="btn btn--ghost btn--lg" href={clinic.phoneHref}>
                  <Phone size={18} aria-hidden="true" /> Zəng et
                </a>
              </div>
            </Reveal>
          </div>
        </ScrollSequence>

        {/* Rəqəmlər */}
        <section className="stats" aria-label="Rəqəmlərlə klinikamız">
          <div className="container stats__grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="stat">
                <strong>
                  <Counter value={s.value} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 2. Həkim xidmətləri təqdim edir */}
        <ScrollSequence id="xidmetler" name="services" frames={96} focus={0.7} label="Həkim əli ilə xidmətləri təqdim edir">
          <div className="panel panel--head">
            <Reveal className="seq-copy card">
              <p className="eyebrow">Xidmətlərimiz</p>
              <h2 className="display display--md">
                Sizə lazım olan hər şey — <span className="hl">bir ünvanda</span>
              </h2>
            </Reveal>
          </div>
          <ul className="card-stack">
            {featuredServices.map((s) => (
              <li key={s.title}>
                <Reveal className="seq-copy mini-card">
                  <span className="mini-card__icon">
                    <Icon name={s.icon} />
                  </span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.text}</small>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="panel panel--tail" aria-hidden="true" />
        </ScrollSequence>

        {/* Bütün şöbələr */}
        <section className="section section--soft" aria-labelledby="sobeler">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Şöbələr</p>
              <h2 id="sobeler" className="title">
                12 ixtisas üzrə peşəkar yardım
              </h2>
              <p className="lead">Müayinədən müalicəyə və reabilitasiyaya qədər — bütün mərhələlərdə yanınızdayıq.</p>
            </Reveal>
            <div className="dept-grid">
              {departments.map((d, i) => (
                <Reveal key={d.title} delay={(i % 4) * 70} className="dept-card">
                  <span className="dept-card__icon">
                    <Icon name={d.icon} size={24} />
                  </span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Planşetli həkim — rəqəmsal xidmətlər */}
        <ScrollSequence
          id="reqemsal"
          name="digital"
          frames={96}
          focus={0.72}
          label="Həkim planşetdə pasiyentin məlumatlarına baxır"
        >
          <div className="panel panel--head">
            <Reveal className="seq-copy card">
              <p className="eyebrow">Rəqəmsal klinika</p>
              <h2 className="display display--md">
                Sağlamlığınız <span className="hl">ovucunuzun içində</span>
              </h2>
            </Reveal>
          </div>
          <ul className="card-stack">
            {digitalFeatures.map((f) => (
              <li key={f.title}>
                <Reveal className="seq-copy mini-card">
                  <span className="mini-card__icon">
                    <Icon name={f.icon} />
                  </span>
                  <span>
                    <strong>{f.title}</strong>
                    <small>{f.text}</small>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="panel panel--tail" aria-hidden="true" />
        </ScrollSequence>

        {/* Niyə biz + necə işləyirik */}
        <section className="section" aria-labelledby="niye-biz">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Niyə {clinic.name}?</p>
              <h2 id="niye-biz" className="title">
                Etibar sadə şeylərdən başlayır
              </h2>
            </Reveal>
            <div className="reason-grid">
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={i * 80} className="reason">
                  <span className="reason__icon">
                    <Icon name={r.icon} size={26} />
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="steps">
              <h3 className="steps__title">Necə işləyirik</h3>
              <ol>
                {steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="steps__num">{String(i + 1).padStart(2, "0")}</span>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* 4. Həkim komandası */}
        <ScrollSequence
          id="hekimler"
          name="team"
          frames={96}
          focus={0.69}
          label="Klinikanın üç həkimi birlikdə"
          overlay={doctors.map((d, i) => (
            <Anchor key={d.name} x={[0.47, 0.69, 0.875][i]} y={0.6} from={0.3 + i * 0.12}>
              <span className="tag">
                <span className="tag__dot" aria-hidden="true" />
                <span>
                  <strong>{d.name}</strong>
                  <small>{d.role}</small>
                </span>
              </span>
            </Anchor>
          ))}
        >
          <div className="panel panel--full">
            <Reveal className="seq-copy seq-copy--narrow card">
              <p className="eyebrow">Həkimlərimiz</p>
              <h2 className="display display--md">
                Peşəkar komanda, <span className="hl">insani yanaşma</span>
              </h2>
              <p className="lead">
                Həkimlərimiz Azərbaycanda və xaricdə təhsil alıb, mütəmadi olaraq beynəlxalq konfranslarda ixtisasını
                artırır.
              </p>
            </Reveal>
          </div>
          <div className="panel" aria-hidden="true" />
        </ScrollSequence>

        <section className="section section--soft" aria-labelledby="hekim-heyeti">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Həkim heyəti</p>
              <h2 id="hekim-heyeti" className="title">
                Sizi tanıyan, sizi dinləyən həkimlər
              </h2>
            </Reveal>
            <div className="doctor-grid">
              {doctors.map((d, i) => (
                <Reveal key={d.name} delay={i * 100} className="doctor-card">
                  <div className="doctor-card__photo">
                    <Image src={d.image} alt={d.name} width={480} height={600} sizes="(max-width: 760px) 90vw, 360px" />
                  </div>
                  <div className="doctor-card__body">
                    <span className="doctor-card__role">{d.role}</span>
                    <h3>{d.name}</h3>
                    <p>{d.bio}</p>
                    <span className="doctor-card__exp">{d.experience}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Başı ilə təsdiqləyən həkim — dəvət */}
        <ScrollSequence id="devet" name="cta" frames={96} focus={0.72} label="Həkim gülümsəyərək başı ilə təsdiq edir">
          <div className="panel panel--full">
            <Reveal className="seq-copy card">
              <p className="eyebrow">Qəbula yazılın</p>
              <h2 className="display display--md">
                Sizi <span className="hl">gözləyirik</span>
              </h2>
              <ul className="check-list">
                {["Təyin olunmuş vaxtda, növbəsiz qəbul", "Qiymətlər əvvəlcədən bəlli", "Pulsuz avtomobil dayanacağı"].map(
                  (item) => (
                    <li key={item}>
                      <Check size={18} aria-hidden="true" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <a className="btn btn--primary btn--lg" href="#qebul">
                Formu doldur <ArrowRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <div className="panel panel--tail" aria-hidden="true" />
        </ScrollSequence>

        {/* Qeydiyyat formu */}
        <section id="qebul" className="section section--soft" aria-labelledby="qebul-title">
          <div className="container booking">
            <Reveal className="booking__intro">
              <p className="eyebrow">Onlayn qeydiyyat</p>
              <h2 id="qebul-title" className="title">
                Rahat vaxtı seçin, qalanını biz həll edək
              </h2>
              <p className="lead">Formu doldurun — operatorumuz 15 dəqiqə ərzində sizinlə əlaqə saxlayacaq.</p>
              <ul className="contact-list">
                <li>
                  <Phone size={20} aria-hidden="true" />
                  <span>
                    <small>Telefon</small>
                    <a href={clinic.phoneHref}>{clinic.phone}</a>
                  </span>
                </li>
                <li>
                  <MessageCircle size={20} aria-hidden="true" />
                  <span>
                    <small>WhatsApp</small>
                    {clinic.whatsapp}
                  </span>
                </li>
                <li>
                  <MapPin size={20} aria-hidden="true" />
                  <span>
                    <small>Ünvan</small>
                    {clinic.address}
                  </span>
                </li>
                <li>
                  <Clock size={20} aria-hidden="true" />
                  <span>
                    <small>İş saatları</small>
                    {clinic.hours.map((h) => (
                      <span key={h.days} className="hours">
                        {h.days}: <b>{h.time}</b>
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <AppointmentForm />
            </Reveal>
          </div>
        </section>

        {/* Suallar */}
        <section id="suallar" className="section" aria-labelledby="faq-title">
          <div className="container faq">
            <Reveal className="section-head">
              <p className="eyebrow">Suallar</p>
              <h2 id="faq-title" className="title">
                Tez-tez verilən suallar
              </h2>
            </Reveal>
            <div className="faq__list">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="faq__item">
                    <summary>
                      {f.q}
                      <Plus size={20} aria-hidden="true" />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="elaqe" className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>{clinic.tagline}. Ailəniz üçün etibarlı tibbi yardım — 15 ildən artıqdır.</p>
          </div>
          <nav aria-label="Alt menyu">
            <h3>Bölmələr</h3>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div>
            <h3>Əlaqə</h3>
            <a href={clinic.phoneHref}>
              <Phone size={16} aria-hidden="true" /> {clinic.phone}
            </a>
            <a href={`mailto:${clinic.email}`}>
              <Mail size={16} aria-hidden="true" /> {clinic.email}
            </a>
            <span>
              <MapPin size={16} aria-hidden="true" /> {clinic.address}
            </span>
          </div>
          <div>
            <h3>İş saatları</h3>
            {clinic.hours.map((h) => (
              <span key={h.days} className="footer__hours">
                {h.days}
                <b>{h.time}</b>
              </span>
            ))}
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} {clinic.fullName}. Bütün hüquqlar qorunur.</span>
          <span>Saytdakı məlumatlar həkim məsləhətini əvəz etmir. Təcili hallarda 103-ə zəng edin.</span>
        </div>
      </footer>
    </>
  );
}
