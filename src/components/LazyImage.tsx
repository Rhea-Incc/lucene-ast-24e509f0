import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

const LazyImage = ({
  src,
  alt,
  className,
  priority = false,
  sizes,
  srcSet,
  width,
  height,
}: LazyImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      {/* Shimmer placeholder with glass tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: loaded ? 0 : 1,
          background:
            "linear-gradient(110deg, hsl(var(--surface-glass) / 0.6) 8%, hsl(var(--surface-glass-border) / 0.5) 18%, hsl(var(--surface-glass) / 0.6) 33%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.6s linear infinite",
          backdropFilter: "blur(var(--glass-blur))",
        }}
      />
      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          // @ts-expect-error fetchpriority is valid HTML
          fetchpriority={priority ? "high" : "auto"}
          sizes={sizes}
          srcSet={srcSet}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease, filter 0.6s ease",
            filter: loaded ? "blur(0px)" : "blur(12px)",
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
