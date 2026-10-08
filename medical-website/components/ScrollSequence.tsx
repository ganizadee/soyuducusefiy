"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { preload } from "react-dom";

type Listener = (progress: number) => void;

// Kadrın ekrandakı yeri (CSS piksellə) — Anchor komponenti bununla
// videodakı nöqtəyə "yapışır".
export type FrameLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
  viewWidth: number;
  viewHeight: number;
};

type SequenceApi = {
  subscribe: (listener: Listener) => () => void;
  layout: () => FrameLayout;
};

const SequenceContext = createContext<SequenceApi | null>(null);

function useSequence() {
  const api = useContext(SequenceContext);
  if (!api) throw new Error("Beat və Anchor yalnız ScrollSequence daxilində işləyir");
  return api;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const frameSrc = (name: string, index: number) =>
  `/frames/${name}/${String(index + 1).padStart(4, "0")}.webp`;

// Kadrlar mərhələlərlə yüklənir: əvvəl hər 16-cı, sonra hər 8-ci, 4-cü...
// Beləliklə animasiya bütün kadrlar gəlməmiş də işləyir və getdikcə hamarlaşır.
function loadOrder(count: number) {
  const seen = new Uint8Array(count);
  const order: number[] = [];
  const add = (index: number) => {
    if (!seen[index]) {
      seen[index] = 1;
      order.push(index);
    }
  };
  add(0);
  add(count - 1);
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) add(i);
  }
  return order;
}

// Dar (portret) ekranlarda kadr kəsilir; focus kadrın hansı nöqtəsinin
// (0 = sol, 1 = sağ) mərkəzdə qalacağını göstərir. Massiv verilərsə,
// [progress, x] cütləri ilə scroll boyu dəyişir.
export type Focus = number | [progress: number, x: number][];

function focusAt(focus: Focus, progress: number) {
  if (typeof focus === "number") return focus;
  if (progress <= focus[0][0]) return focus[0][1];
  for (let i = 1; i < focus.length; i++) {
    const [p1, x1] = focus[i];
    if (progress <= p1) {
      const [p0, x0] = focus[i - 1];
      return x0 + (x1 - x0) * ((progress - p0) / (p1 - p0 || 1));
    }
  }
  return focus[focus.length - 1][1];
}

// Mətn blokunun görünmə vəziyyəti: [from, to] aralığında tam görünür,
// kənarlarda `fade` uzunluğunda yumşaq keçid edir.
function visibility(progress: number, from: number, to: number, fade: number) {
  if (from > 0 && progress < from) {
    const o = clamp((progress - (from - fade)) / fade);
    return { opacity: o, shift: 1 - o };
  }
  if (to < 1 && progress > to) {
    const o = clamp(1 - (progress - to) / fade);
    return { opacity: o, shift: -(1 - o) };
  }
  return { opacity: 1, shift: 0 };
}

type ScrollSequenceProps = {
  id?: string;
  /** public/frames altındakı qovluq adı */
  name: string;
  frames: number;
  /** Scroll uzunluğu — ekran hündürlüyünün neçə misli */
  length?: number;
  focus?: Focus;
  /** İlk ekrandakı animasiya üçün kadrları dərhal yüklə */
  priority?: boolean;
  /** Ekran oxuyucular üçün təsvir */
  label: string;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
};

export function ScrollSequence({
  id,
  name,
  frames,
  length = 4,
  focus = 0.5,
  priority = false,
  label,
  className,
  overlayClassName,
  children,
}: ScrollSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const focusRef = useRef(focus);

  const [api] = useState(() => {
    const listeners = new Set<Listener>();
    const state = {
      progress: 0,
      layout: { x: 0, y: 0, width: 0, height: 0, viewWidth: 0, viewHeight: 0 } as FrameLayout,
    };
    return {
      listeners,
      state,
      subscribe(listener: Listener) {
        listeners.add(listener);
        listener(state.progress);
        return () => {
          listeners.delete(listener);
        };
      },
      layout: () => state.layout,
    };
  });

  useEffect(() => {
    focusRef.current = focus;
  });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !stage || !ctx) return;

    const images: (HTMLImageElement | undefined)[] = new Array(frames);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let loadingStarted = false;
    let loaded = 0;
    let visible = false;
    let raf = 0;
    let current = -1;
    let drawnIndex = -1;
    let notified = -1;

    const nearestLoaded = (index: number) => {
      for (let d = 0; d < frames; d++) {
        if (images[index - d]) return index - d;
        if (images[index + d]) return index + d;
      }
      return -1;
    };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - stage.clientHeight;
      return scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
    };

    // Kadrı "cover" rejimində çəkir; layout dəyişibsə true qaytarır.
    const draw = (progress: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      const w = Math.round(vw * dpr);
      const h = Math.round(vh * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawnIndex = -1;
      }

      const index = nearestLoaded(Math.round(progress * (frames - 1)));
      const image = index >= 0 ? images[index] : undefined;
      const ratio = image ? image.naturalWidth / image.naturalHeight : 16 / 9;
      let dw = vw;
      let dh = vw / ratio;
      if (dh < vh) {
        dh = vh;
        dw = vh * ratio;
      }
      const fx = focusAt(focusRef.current, progress);
      // Geniş ekranda kadr olduğu kimi qalır, portretdə fokus nöqtəsi mərkəzə çəkilir.
      const screenX = 0.5 + (fx - 0.5) * clamp((vw / vh - 0.8) / 0.6);
      const x = clamp(screenX * vw - fx * dw, vw - dw, 0);
      const y = (vh - dh) * 0.3;

      const prev = api.state.layout;
      const changed =
        prev.x !== x || prev.y !== y || prev.width !== dw || prev.viewWidth !== vw || prev.viewHeight !== vh;
      if (changed) {
        api.state.layout = { x, y, width: dw, height: dh, viewWidth: vw, viewHeight: vh };
      }

      if (image && (index !== drawnIndex || changed)) {
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(image, x * dpr, y * dpr, dw * dpr, dh * dpr);
        drawnIndex = index;
      }
      return changed;
    };

    const tick = () => {
      raf = 0;
      const target = measure();
      if (current < 0 || reduceMotion) current = target;
      else current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0005) current = target;

      const layoutChanged = draw(current);
      if (current !== notified || layoutChanged) {
        notified = current;
        api.state.progress = current;
        api.listeners.forEach((listener) => listener(current));
      }
      if (current !== target && visible) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const startLoading = () => {
      if (loadingStarted) return;
      loadingStarted = true;
      const queue = loadOrder(frames);
      let active = 0;
      const next = () => {
        while (!cancelled && active < 6 && queue.length) {
          const index = queue.shift()!;
          const image = new Image();
          image.decoding = "async";
          if (index === 0) image.fetchPriority = "high";
          image.src = frameSrc(name, index);
          active++;
          image
            .decode()
            .catch(() => undefined)
            .then(() => {
              if (cancelled) return;
              active--;
              loaded++;
              if (image.naturalWidth) images[index] = image;
              if (barRef.current) barRef.current.style.transform = `scaleX(${loaded / frames})`;
              if (loaded === frames) section.dataset.loaded = "true";
              kick();
              next();
            });
        }
      };
      next();
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        startLoading();
        kick();
      }
    });
    visibilityObserver.observe(section);

    // Bölməyə 2 ekran qalmış kadrları əvvəlcədən yükləməyə başla
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoading();
      },
      { rootMargin: "200% 0px" },
    );
    preloadObserver.observe(section);
    if (priority) startLoading();

    const resizeObserver = new ResizeObserver(kick);
    resizeObserver.observe(canvas);
    window.addEventListener("scroll", kick, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      visibilityObserver.disconnect();
      preloadObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", kick);
    };
  }, [api, frames, name, priority]);

  const poster = frameSrc(name, 0);
  if (priority) preload(poster, { as: "image", fetchPriority: "high" });
  const posterX = typeof focus === "number" ? focus : focus[0][1];

  return (
    <SequenceContext.Provider value={api}>
      <section
        ref={sectionRef}
        id={id}
        className={["seq", className].filter(Boolean).join(" ")}
        style={{ "--seq-length": length } as CSSProperties}
      >
        <div
          className="seq__stage"
          // İlk ekranda JS yüklənənə qədər birinci kadr fon şəkli kimi görünür
          style={priority ? { backgroundImage: `url(${poster})`, backgroundPosition: `${posterX * 100}% 30%` } : undefined}
        >
          <canvas ref={canvasRef} className="seq__canvas" role="img" aria-label={label} />
          <div className="seq__fade" aria-hidden="true" />
          <div className={["seq__overlay", overlayClassName].filter(Boolean).join(" ")}>{children}</div>
          <span className="seq__loader" aria-hidden="true">
            <span ref={barRef} />
          </span>
        </div>
      </section>
    </SequenceContext.Provider>
  );
}

type BeatProps = {
  from?: number;
  to?: number;
  fade?: number;
  className?: string;
  children: ReactNode;
};

/** Scroll irəlilədikcə görünən/itən mətn bloku */
export function Beat({ from = 0, to = 1, fade = 0.07, className, children }: BeatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { subscribe } = useSequence();

  useEffect(
    () =>
      subscribe((progress) => {
        const el = ref.current;
        if (!el) return;
        const { opacity, shift } = visibility(progress, from, to, fade);
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${shift * 32}px, 0)`;
        el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      }),
    [subscribe, from, to, fade],
  );

  return (
    <div
      ref={ref}
      className={["beat", className].filter(Boolean).join(" ")}
      style={from > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
    >
      {children}
    </div>
  );
}

type AnchorProps = {
  /** Kadrda nisbi mövqe (0–1) */
  x: number;
  y: number;
  from?: number;
  to?: number;
  className?: string;
  children: ReactNode;
};

/** Videodakı konkret nöqtəyə bağlanan etiket (məs. həkimin üzərində ad) */
export function Anchor({ x, y, from = 0, to = 1, className, children }: AnchorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { subscribe, layout } = useSequence();

  useEffect(() => {
    const el = ref.current;
    const inner = el?.firstElementChild;
    if (!el || !(inner instanceof HTMLElement)) return;
    let half = inner.offsetWidth / 2;
    const resizeObserver = new ResizeObserver(() => {
      half = inner.offsetWidth / 2;
    });
    resizeObserver.observe(inner);

    const unsubscribe = subscribe((progress) => {
      const frame = layout();
      const point = frame.x + x * frame.width;
      const top = frame.y + y * frame.height;
      // Etiket ekrandan çıxmasın — kənarda olan həkimin etiketi içəri sıxılır
      const left = clamp(point, half + 16, frame.viewWidth - half - 16);
      const inView = point > 0 && point < frame.viewWidth;
      const { opacity, shift } = inView ? visibility(progress, from, to, 0.06) : { opacity: 0, shift: 0 };
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(${left}px, ${top + shift * 20}px, 0)`;
      el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
    });

    return () => {
      resizeObserver.disconnect();
      unsubscribe();
    };
  }, [subscribe, layout, x, y, from, to]);

  return (
    <div ref={ref} className={["anchor", className].filter(Boolean).join(" ")} style={{ opacity: 0, visibility: "hidden" }}>
      <div className="anchor__inner">{children}</div>
    </div>
  );
}
