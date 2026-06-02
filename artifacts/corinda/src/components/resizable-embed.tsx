import { useState, useRef, useEffect, useCallback } from "react";
import { RiDraggable } from "react-icons/ri";

interface ResizableEmbedProps {
  src: string;
  title: string;
  initialHeight?: number;
  initialWidth?: number;
  sandbox?: string;
}

export function ResizableEmbed({
  src,
  title,
  initialHeight = 360,
  initialWidth,
  sandbox,
}: ResizableEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({
    width: initialWidth ?? 720,
    height: initialHeight,
  });

  const isResizing = useRef(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const startWidth = useRef(0);
  const startHeight = useRef(0);

  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing.current = true;

      startX.current = e.clientX;
      startY.current = e.clientY;

      startWidth.current =
        containerRef.current?.offsetWidth ?? size.width;

      startHeight.current = size.height;
    },
    [size]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;

      const parentWidth =
        containerRef.current?.parentElement?.offsetWidth ?? window.innerWidth;

      const nextWidth = Math.min(
        parentWidth,
        Math.max(260, startWidth.current + dx)
      );

      const nextHeight = Math.max(
        180,
        startHeight.current + dy
      );

      setSize({
        width: nextWidth,
        height: nextHeight,
      });
    };

    const onUp = () => {
      isResizing.current = false;
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
      className="relative overflow-hidden rounded-xl"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: 260,
        minHeight: 180,
      }}
    >
      <iframe
        src={src}
        title={title}
        className="w-full h-full block"
        style={{
          border: "none",
        }}
        loading="lazy"
        sandbox={sandbox}
      />

      <div
        className="absolute bottom-0 right-0 z-30 w-7 h-7 cursor-se-resize flex items-center justify-center group"
        onMouseDown={onResizeMouseDown}
      >
        <div className="absolute inset-0 rounded-tl-xl bg-white/0 group-hover:bg-white/10 transition-colors duration-150" />

        <RiDraggable
          className="rotate-45 text-[13px] text-white/30 group-hover:text-white/60 transition-colors duration-150"
        />
      </div>
    </div>
  );
}