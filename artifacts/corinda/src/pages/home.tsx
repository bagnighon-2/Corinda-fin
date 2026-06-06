import { useState, useCallback, useRef, useEffect } from "react";
import { RiDragMove2Line } from "react-icons/ri";

function ResizableIframe({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [size, setSize] = useState({
    width: 520,
    height: 400,
  });

  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  const startSize = useRef({
    width: 520,
    height: 400,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setIsDragging(true);

      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
      };

      startSize.current = {
        width: size.width,
        height: size.height,
      };
    },
    [size]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setSize({
      width: Math.max(320, startSize.current.width + dx),
      height: Math.max(250, startSize.current.height + dy),
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="relative mx-auto"
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="w-full h-full rounded-lg block"
        style={{
          border: "none",
        }}
      />

      <div
        onMouseDown={handleMouseDown}
        className={`
          absolute
          bottom-0
          right-0
          w-14
          h-14
          flex
          items-end
          justify-end
          cursor-nwse-resize
          select-none
          z-20
          group
        `}
      >
        <div
          className={`
            m-2
            p-2
            rounded-lg
            border
            transition-all
            ${
              isDragging
                ? "bg-white/15 border-white/20"
                : "bg-white/5 border-white/10 group-hover:bg-white/10"
            }
          `}
        >
          <RiDragMove2Line
            className="
              rotate-45
              text-sm
              text-white/40
            "
          />
        </div>
      </div>
    </div>
  );
}