import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

const LazyVideo = ({ src, className, style, poster }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "300px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (isVisible) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isVisible, canPlay]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <video
        ref={ref}
        muted
        loop
        playsInline
        poster={poster}
        className={className}
        style={{
          ...style,
          opacity: canPlay ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        src={isVisible ? src : undefined}
        preload="metadata"
        onCanPlay={() => setCanPlay(true)}
      />
    </div>
  );
};

export default LazyVideo;
