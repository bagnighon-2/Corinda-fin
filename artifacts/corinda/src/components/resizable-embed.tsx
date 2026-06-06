return (
  <section
    className="overflow-visible py-3"
    aria-label={title}
  >
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
        "
        style={{
          border: "none",
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