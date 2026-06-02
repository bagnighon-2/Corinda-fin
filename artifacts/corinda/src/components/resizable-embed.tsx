import { useState, useRef, useEffect, useCallback } from "react";
import { RiExpandVerticalLine, RiExpandLeftRightLine } from "react-icons/ri";

interface ResizableEmbedProps {
  src: string;
  title: string;
  initialHeight?: number;
  sandbox?: string;
}

export function ResizableEmbed({
  src,
  title,
  initialHeight = 360,
  sandbox,
}: ResizableEmbedProps) {
  const [height, setHeight] = useState(initialHeight);
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingH = useRef(false);
  const isDraggingW = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const startHeight = useRef(initialHeight);
  const startWidth = useRef(0);

  const onHeightMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingH.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    e.preventDefault();
  }, [height]);

  const onWidthMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingW.current = true;
    startX.current = e.clientX;
    startWidth.current = width ?? (containerRef.current?.offsetWidth ?? 400);
    e.preventDefault();
  }, [width]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDraggingH.current) {
        const delta = e.clientY - startY.current;
        setHeight(Math.max(180, startHeight.current + delta));
      }
      if (isDraggingW.current) {
        const delta = e.clientX - startX.current;
        const parentWidth = containerRef.current?.parentElement?.offsetWidth ?? 800;
        setWidth(Math.min(parentWidth, Math.max(240, startWidth.current + delta)));
      }
    };
    const onUp = () => {
      isDraggingH.current = false;
      isDraggingW.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ width: width ? `${width}px` : "100%", minWidth: 240 }}
    >
      <iframe
        src={src}
        title={title}
        className="w-full block"
        style={{ height, border: "none" }}
        loading="lazy"
        sandbox={sandbox}
      />

      <div
        className="w-full flex items-center justify-center gap-1 py-1.5 cursor-ns-resize select-none bg-white/5 hover:bg-white/12 transition-colors"
        onMouseDown={onHeightMouseDown}
      >
        <RiExpandVerticalLine className="text-[10px] text-white/30" />
        <span className="text-[10px] text-white/25 uppercase tracking-wider">drag height</span>
      </div>

      <div
        className="absolute top-0 right-0 h-[calc(100%-28px)] w-3 cursor-ew-resize flex items-center justify-center group"
        onMouseDown={onWidthMouseDown}
      >
        <div className="w-0.5 h-8 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
        <RiExpandLeftRightLine className="absolute text-[9px] text-white/0 group-hover:text-white/30 transition-colors" />
      </div>
    </div>
  );
}
