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
  initialHeight = 300,
  initialWidth = 420,
  sandbox,
}: ResizableEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const isResizing = useRef(false);

  const startMouse = useRef({
    x: 0,
    y: 0,
  });

  const startSize = useRef({
    width: initialWidth,
    height: initialHeight,
  });

  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing.current = true;

      startMouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      startSize.current = {
        width: size.width,
        height: size.height,
      };

      document.body.style.userSelect = "none";
      document.body.style.cursor = "se-resize";
    },
    [size]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      const maxWidth = window.innerWidth - 120;
      const maxHeight = window.innerHeight - 160;

      setSize({
        width: Math.min(
          maxWidth,
          Math.max(260, startSize.current.width + dx)
        ),

        height: Math.min(
          maxHeight,
          Math.max(180, startSize.current.height + dy)
        ),
      });
    };

    const onUp = () => {
      isResizing.current = false;

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="overflow-visible py-2">
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          minWidth: "260px",
          minHeight: "180px",
        }}
      >
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          style={{
            border: "none",
            background: "#000",
          }}
          loading="lazy"
          sandbox={sandbox}
        />

        <div
          onMouseDown={onResizeMouseDown}
          className="absolute bottom-0 right-0 z-50 w-10 h-10 cursor-se-resize flex items-end justify-end"
        >
          <div className="m-1 rounded-md bg-black/75 border border-white/10 p-1 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <RiDraggable className="rotate-45 text-sm text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}