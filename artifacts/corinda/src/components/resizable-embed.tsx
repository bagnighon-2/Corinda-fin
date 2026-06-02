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
    width: initialWidth ?? 100,
    height: initialHeight,
  });

  const isResizing = useRef(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const startWidth = useRef(0);
  const startHeight = useRef(0);

  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing.current = true;

      startX.current = e.clientX;
      startY.current = e.clientY;

      startWidth.current =
        containerRef.current?.offsetWidth ?? 300;

      startHeight.current = size.height;
    },
    [size.height]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;

      setSize({
        width: Math.max(260, startWidth.current + dx),
        height: Math.max(180, startHeight.current + dy),
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
      className="relative overflow-visible rounded-xl w-full"
      style={{
        height: `${size.height}px`,
        minHeight: 180,
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden border border-white/10 bg-black"
        style={{
          width: `${size.width}%`,
          minWidth: 260,
          transition: isResizing.current ? "none" : "width 0.12s ease",
        }}
      >
        <iframe
          src={src}
          title={title}
          className="block w-full"
          style={{
            height: `${size.height}px`,
            border: "none",
            background: "#000",
          }}
          loading="lazy"
          sandbox={sandbox}
        />

        <div
          className="absolute bottom-0 right-0 z-50 w-8 h-8 flex items-end justify-end cursor-se-resize"
          onMouseDown={onResizeMouseDown}
        >
          <div className="mb-1 mr-1 rounded-md bg-black/70 border border-white/10 p-1 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <RiDraggable className="rotate-45 text-[13px] text-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}