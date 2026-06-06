import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";

import { RiDraggable } from "react-icons/ri";

interface ResizableEmbedProps {
  src: string;
  title: string;
  initialHeight?: number;
  initialWidth?: number;
  sandbox?: string;
}

export const ResizableEmbed = memo(function ResizableEmbed({
  src,
  title,
  initialHeight = 700,
  initialWidth = 520,
  sandbox = `
    allow-same-origin
    allow-scripts
    allow-forms
    allow-popups
    allow-downloads
    allow-modals
    allow-presentation
    allow-pointer-lock
  `,
}: ResizableEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const animationFrame = useRef<number | null>(null);

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
      document.body.style.cursor = "nwse-resize";

      document.body.classList.add("resizing-pdf");
    },
    [size]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        const dx = e.clientX - startMouse.current.x;
        const dy = e.clientY - startMouse.current.y;

        const padding = 48;

        const maxWidth = window.innerWidth - padding;
        const maxHeight = window.innerHeight - padding;

        const nextWidth = Math.min(
          maxWidth,
          Math.max(320, startSize.current.width + dx)
        );

        const nextHeight = Math.min(
          maxHeight,
          Math.max(220, startSize.current.height + dy)
        );

        setSize({
          width: nextWidth,
          height: nextHeight,
        });
      });
    };

    const onUp = () => {
      isResizing.current = false;

      document.body.style.userSelect = "";
      document.body.style.cursor = "";

      document.body.classList.remove("resizing-pdf");

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };

    window.addEventListener("mousemove", onMove, {
      passive: true,
    });

    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <section className="overflow-visible py-3">
      <div
        ref={containerRef}
        className="
          relative
          rounded-2xl
          overflow-hidden
          border
          border-white/10
          bg-black
          shadow-[0_0_40px_rgba(0,0,0,0.55)]
          transition-shadow
          duration-200
          focus-within:ring-2
          focus-within:ring-cyan-400/50
        "
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          minWidth: "320px",
          minHeight: "220px",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          loading="lazy"
          sandbox={sandbox}
          allow="
            fullscreen;
            clipboard-read;
            clipboard-write;
            autoplay
          "
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="
            absolute
            inset-0
            w-full
            h-full
            bg-black
            select-text
          "
          style={{
            border: "none",
            userSelect: "text",
            WebkitUserSelect: "text",
            colorScheme: "dark",
            pointerEvents: "auto",
          }}
        />

        <div
          onMouseDown={onResizeMouseDown}
          className="
            absolute
            bottom-0
            right-0
            z-50
            w-14
            h-14
            cursor-nwse-resize
            flex
            items-end
            justify-end
            group
          "
        >
          <div
            className="
              m-2
              rounded-lg
              border
              border-white/10
              bg-black/80
              p-2
              backdrop-blur-md
              transition-all
              duration-150
              group-hover:bg-cyan-500/20
              group-hover:border-cyan-400/30
            "
          >
            <RiDraggable
              className="
                rotate-45
                text-base
                text-white/70
                group-hover:text-cyan-200
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
});