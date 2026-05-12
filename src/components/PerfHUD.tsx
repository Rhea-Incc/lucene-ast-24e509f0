import { useEffect, useRef, useState } from "react";

/**
 * Lightweight performance HUD.
 * Toggle: append `?perf=1` to URL, or press Alt+P.
 * Reports:
 *  - LCP (Largest Contentful Paint, ms)
 *  - Scroll FPS (rolling, sampled while scrolling)
 *  - Worst frame during scroll (ms)
 *  - Media load times (image/video resources, slowest 3)
 */
const PerfHUD = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("perf") === "1";
  });
  const [lcp, setLcp] = useState<number | null>(null);
  const [fps, setFps] = useState<number | null>(null);
  const [worstFrame, setWorstFrame] = useState<number | null>(null);
  const [media, setMedia] = useState<{ name: string; ms: number }[]>([]);

  // Hotkey toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "p" || e.key === "P")) setVisible((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // LCP observer
  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;
    try {
      const obs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        if (last) setLcp(Math.round(last.startTime));
      });
      obs.observe({ type: "largest-contentful-paint", buffered: true });
      return () => obs.disconnect();
    } catch {
      /* unsupported */
    }
  }, []);

  // Media resource timings
  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;
    const collect = (entries: PerformanceResourceTiming[]) => {
      const filtered = entries.filter((e) => {
        const t = e.initiatorType;
        return t === "img" || t === "video" || /\.(mp4|webm|jpg|jpeg|png|webp|avif)(\?|$)/i.test(e.name);
      });
      if (!filtered.length) return;
      setMedia((prev) => {
        const merged = [...prev];
        for (const e of filtered) {
          const ms = Math.round(e.responseEnd - e.startTime);
          if (!ms) continue;
          const name = e.name.split("/").pop()?.split("?")[0] ?? e.name;
          if (!merged.find((m) => m.name === name)) merged.push({ name, ms });
        }
        return merged.sort((a, b) => b.ms - a.ms).slice(0, 5);
      });
    };
    try {
      const obs = new PerformanceObserver((list) => collect(list.getEntries() as PerformanceResourceTiming[]));
      obs.observe({ type: "resource", buffered: true });
      return () => obs.disconnect();
    } catch {
      /* unsupported */
    }
  }, []);

  // Scroll FPS / worst-frame sampler
  const rafState = useRef<{ raf: number | null; last: number; frames: number; start: number; worst: number; idleTimer: number | null }>({
    raf: null,
    last: 0,
    frames: 0,
    start: 0,
    worst: 0,
    idleTimer: null,
  });

  useEffect(() => {
    const s = rafState.current;

    const tick = (now: number) => {
      if (s.last) {
        const delta = now - s.last;
        if (delta > s.worst) s.worst = delta;
        s.frames += 1;
      }
      s.last = now;
      s.raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (s.raf != null) cancelAnimationFrame(s.raf);
      s.raf = null;
      const elapsed = performance.now() - s.start;
      if (elapsed > 100 && s.frames > 0) {
        setFps(Math.round((s.frames / elapsed) * 1000));
        setWorstFrame(Math.round(s.worst));
      }
      s.last = 0;
      s.frames = 0;
      s.worst = 0;
    };

    const onScroll = () => {
      if (s.raf == null) {
        s.start = performance.now();
        s.raf = requestAnimationFrame(tick);
      }
      if (s.idleTimer) window.clearTimeout(s.idleTimer);
      s.idleTimer = window.setTimeout(stop, 250);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (s.raf != null) cancelAnimationFrame(s.raf);
      if (s.idleTimer) window.clearTimeout(s.idleTimer);
    };
  }, []);

  if (!visible) return null;

  const fmt = (n: number | null) => (n == null ? "—" : `${n}`);
  const lcpColor = lcp == null ? "" : lcp < 2500 ? "text-emerald-400" : lcp < 4000 ? "text-amber-400" : "text-red-400";
  const fpsColor = fps == null ? "" : fps >= 55 ? "text-emerald-400" : fps >= 40 ? "text-amber-400" : "text-red-400";

  return (
    <div
      className="fixed bottom-6 left-6 z-[60] w-[260px] rounded-xl border border-[hsl(var(--surface-glass-border))] bg-[hsl(var(--surface-glass)/0.85)] backdrop-blur-[var(--glass-blur)] px-3 py-2.5 font-mono text-[11px] text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      role="status"
      aria-live="polite"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-display text-[10px] tracking-[0.2em] text-[hsl(var(--glow-primary))]">PERF HUD</span>
        <button
          onClick={() => setVisible(false)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Hide perf HUD"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        <span className="text-muted-foreground">LCP</span>
        <span className={`text-right ${lcpColor}`}>{fmt(lcp)} ms</span>
        <span className="text-muted-foreground">Scroll FPS</span>
        <span className={`text-right ${fpsColor}`}>{fmt(fps)}</span>
        <span className="text-muted-foreground">Worst frame</span>
        <span className="text-right">{fmt(worstFrame)} ms</span>
      </div>
      <div className="mt-2 border-t border-[hsl(var(--surface-glass-border))] pt-1.5">
        <div className="mb-1 text-[10px] tracking-[0.15em] text-muted-foreground">SLOWEST MEDIA</div>
        {media.length === 0 ? (
          <div className="text-muted-foreground/70">—</div>
        ) : (
          <ul className="space-y-0.5">
            {media.map((m) => (
              <li key={m.name} className="flex justify-between gap-2">
                <span className="truncate" title={m.name}>{m.name}</span>
                <span className={m.ms > 1000 ? "text-amber-400" : "text-emerald-400"}>{m.ms}ms</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-2 text-[9px] tracking-wider text-muted-foreground/70">ALT+P TO TOGGLE</div>
    </div>
  );
};

export default PerfHUD;
