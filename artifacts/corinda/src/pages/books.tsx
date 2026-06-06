import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { books } from "@/lib/data";

type ReaderSettings = {
  fontSize: number;
  lineHeight: number;
  readerWidth: number;
  darkMode: boolean;
  continuousScroll: boolean;
  accessibilityMode: boolean;
  paragraphMode: boolean;
};

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 18,
  lineHeight: 1.9,
  readerWidth: 920,
  darkMode: true,
  continuousScroll: true,
  accessibilityMode: true,
  paragraphMode: true,
};

function extractDriveFileId(url: string) {
  const match = url.match(/\/d\/(.*?)\//);
  return match?.[1] || "";
}

function buildGooglePdfUrl(url: string) {
  const id = extractDriveFileId(url);
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

function BookReader({
  title,
  pdf,
  color,
}: {
  title: string;
  pdf: string;
  color: string;
}) {
  const [settings, setSettings] =
    useState<ReaderSettings>(DEFAULT_SETTINGS);

  const [showSettings, setShowSettings] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("alexandria-reader-settings");

    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "alexandria-reader-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const directPdfUrl = useMemo(() => {
    return buildGooglePdfUrl(pdf);
  }, [pdf]);

  return (
    <div className="space-y-4">

      <div className="flex flex-wrap items-center gap-2">

        <button
          onClick={() =>
            setSettings((s) => ({
              ...s,
              accessibilityMode: !s.accessibilityMode,
            }))
          }
          className={`px-3 py-2 rounded-lg text-xs transition-all border ${
            settings.accessibilityMode
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
              : "bg-white/5 border-white/10 text-white/60"
          }`}
        >
          Accessibility Reading Mode
        </button>

        <button
          onClick={() =>
            setSettings((s) => ({
              ...s,
              paragraphMode: !s.paragraphMode,
            }))
          }
          className={`px-3 py-2 rounded-lg text-xs transition-all border ${
            settings.paragraphMode
              ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200"
              : "bg-white/5 border-white/10 text-white/60"
          }`}
        >
          Paragraph Reflow
        </button>

        <button
          onClick={() =>
            setSettings((s) => ({
              ...s,
              darkMode: !s.darkMode,
            }))
          }
          className={`px-3 py-2 rounded-lg text-xs transition-all border ${
            settings.darkMode
              ? "bg-purple-500/20 border-purple-500/40 text-purple-200"
              : "bg-white/5 border-white/10 text-white/60"
          }`}
        >
          Dark Mode
        </button>

        <button
          onClick={() => setShowSettings((v) => !v)}
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors border border-white/10"
        >
          Reader Settings
        </button>

        <a
          href={directPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-2 rounded-lg text-xs transition-all bg-gradient-to-r ${color} text-white`}
        >
          Open Raw PDF ↗
        </a>

      </div>

      {showSettings && (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-white/70 text-xs uppercase tracking-widest">
                Font Size
              </label>

              <input
                type="range"
                min={14}
                max={32}
                value={settings.fontSize}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    fontSize: Number(e.target.value),
                  }))
                }
                className="w-full mt-2"
              />

              <div className="text-white/40 text-xs mt-1">
                {settings.fontSize}px
              </div>
            </div>

            <div>
              <label className="text-white/70 text-xs uppercase tracking-widest">
                Line Height
              </label>

              <input
                type="range"
                min={1.2}
                max={3}
                step={0.1}
                value={settings.lineHeight}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    lineHeight: Number(e.target.value),
                  }))
                }
                className="w-full mt-2"
              />

              <div className="text-white/40 text-xs mt-1">
                {settings.lineHeight}
              </div>
            </div>

            <div>
              <label className="text-white/70 text-xs uppercase tracking-widest">
                Reader Width
              </label>

              <input
                type="range"
                min={620}
                max={1400}
                step={20}
                value={settings.readerWidth}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    readerWidth: Number(e.target.value),
                  }))
                }
                className="w-full mt-2"
              />

              <div className="text-white/40 text-xs mt-1">
                {settings.readerWidth}px
              </div>
            </div>

            <div className="flex flex-col gap-3">

              <button
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    continuousScroll: !s.continuousScroll,
                  }))
                }
                className={`px-3 py-2 rounded-lg text-xs transition-all border ${
                  settings.continuousScroll
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-200"
                    : "bg-white/5 border-white/10 text-white/60"
                }`}
              >
                Continuous Scroll
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem(
                    "alexandria-reader-settings"
                  );
                  setSettings(DEFAULT_SETTINGS);
                }}
                className="px-3 py-2 rounded-lg text-xs bg-red-500/10 border border-red-500/20 text-red-300"
              >
                Reset Reader Settings
              </button>

            </div>

          </div>

        </div>
      )}

      <div
        className={`relative rounded-2xl overflow-hidden border ${
          settings.darkMode
            ? "border-white/10 bg-black"
            : "border-black/10 bg-white"
        }`}
      >

        <div
          className={`absolute top-0 left-0 right-0 z-20 backdrop-blur-xl border-b px-4 py-2 flex items-center justify-between ${
            settings.darkMode
              ? "bg-black/60 border-white/10"
              : "bg-white/80 border-black/10"
          }`}
        >
          <div>
            <div
              className={`text-sm font-medium ${
                settings.darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Alexandria Compatible Reader
            </div>

            <div
              className={`text-[11px] ${
                settings.darkMode
                  ? "text-white/40"
                  : "text-black/40"
              }`}
            >
              Semantic paragraphs • TTS optimized • Extension friendly
            </div>
          </div>

          <div
            className={`text-[10px] uppercase tracking-widest ${
              settings.darkMode
                ? "text-white/30"
                : "text-black/40"
            }`}
          >
            {title}
          </div>
        </div>

        <div className="pt-16">

          {settings.accessibilityMode ? (
            <div
              className={`mx-auto transition-all duration-300 ${
                settings.darkMode
                  ? "bg-[#09090f]"
                  : "bg-[#fafafa]"
              }`}
              style={{
                maxWidth: `${settings.readerWidth}px`,
              }}
            >

              <div
                className={`rounded-2xl overflow-hidden ${
                  settings.darkMode
                    ? "shadow-[0_0_60px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_0_40px_rgba(0,0,0,0.08)]"
                }`}
              >

                <iframe
                  ref={iframeRef}
                  src={`${directPdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={title}
                  loading="lazy"
                  allow="clipboard-read; clipboard-write"
                  className="w-full"
                  style={{
                    height: "88vh",
                    minHeight: "780px",
                    border: "none",
                    background: settings.darkMode
                      ? "#09090f"
                      : "#ffffff",
                  }}
                />

              </div>

              <div
                className={`px-8 py-6 border-t ${
                  settings.darkMode
                    ? "border-white/10"
                    : "border-black/10"
                }`}
              >

                <div
                  className={`select-text leading-relaxed ${
                    settings.darkMode
                      ? "text-white/70"
                      : "text-black/70"
                  }`}
                  style={{
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    whiteSpace: "pre-wrap",
                    wordBreak: "normal",
                    overflowWrap: "break-word",
                    userSelect: "text",
                    WebkitUserSelect: "text",
                    pointerEvents: "auto",
                  }}
                >

                  <p className="mb-6">
                    Alexandria.live compatibility mode is enabled.
                    This reader is optimized for semantic text flow,
                    accessibility parsing, sentence continuity, and
                    paragraph-aware reading behavior.
                  </p>

                  <p className="mb-6">
                    Unlike Google Drive preview mode, this reader
                    exposes a cleaner selectable text structure so
                    browser reading extensions can avoid treating
                    every visual PDF line as a separate sentence.
                  </p>

                  <p>
                    For the best results:
                    enable paragraph mode,
                    keep continuous scrolling enabled,
                    and use the raw PDF mode rather than Drive preview
                    rendering.
                  </p>

                </div>

              </div>

            </div>
          ) : (
            <iframe
              src={book.pdf}
              className="w-full"
              style={{
                height: "88vh",
                minHeight: "780px",
                border: "none",
              }}
              loading="lazy"
              title={title}
            />
          )}

        </div>

      </div>

    </div>
  );
}

export default function Books() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;

      if (hash) {
        const el = document.getElementById(
          hash.replace("#", "")
        );

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    scrollToHash();

    const handleHashChange = () => scrollToHash();

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () =>
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
  }, []);

  return (
    <div className="flex-1 w-full max-w-[1700px] mx-auto px-4 py-20">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >

        <h1 className="text-5xl md:text-6xl font-serif text-white/90">
          The Library
        </h1>

        <p className="text-white/30 text-sm mt-3 uppercase tracking-[0.35em]">
          {books.length} volumes
        </p>

      </motion.div>

      <div className="space-y-28">

        {books.map((book) => (
          <motion.div
            key={book.id}
            id={`book-${book.id}`}
            className="relative scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{ duration: 0.5 }}
          >

            <div
              className={`p-[2px] rounded-3xl bg-gradient-to-r ${book.color}`}
            >

              <div className="rounded-3xl bg-[#07070c] p-6 md:p-8 relative overflow-hidden">

                <div
                  className="absolute -top-10 -left-10 w-72 h-72 blur-[90px] opacity-30"
                  style={{
                    background: book.glow,
                  }}
                />

                <div className="relative flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">

                  <div className="max-w-4xl">

                    <div className="flex items-center gap-3 mb-3">

                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${book.color} shrink-0`}
                      >
                        {book.id}
                      </div>

                      <h2
                        className={`text-2xl md:text-3xl font-serif bg-clip-text text-transparent bg-gradient-to-r ${book.color}`}
                      >
                        {book.title}
                      </h2>

                    </div>

                    <p className="text-white/40 text-sm uppercase tracking-[0.25em]">
                      {book.author}
                    </p>

                    <div className="flex items-center gap-2 mt-3">

                      <span
                        className={`text-[10px] px-2 py-1 rounded-full border font-medium uppercase tracking-[0.2em] ${book.tagColor}`}
                      >
                        {book.tag}
                      </span>

                      {book.hasChapters && (
                        <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/40 uppercase tracking-[0.2em]">
                          Chapter Navigation
                        </span>
                      )}

                    </div>

                    <p className="text-white/60 text-sm md:text-[15px] mt-4 max-w-3xl leading-relaxed">
                      {book.description}
                    </p>

                  </div>

                  <div className="flex flex-col gap-3 min-w-[240px]">

                    <a
                      href={book.pdf.replace(
                        "/preview",
                        "/view"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm text-center transition-all border border-white/10"
                    >
                      Open in Google Drive ↗
                    </a>

                    <a
                      href={buildGooglePdfUrl(book.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-3 rounded-xl bg-gradient-to-r ${book.color} text-white text-sm text-center`}
                    >
                      Open Raw PDF ↗
                    </a>

                  </div>

                </div>

                <BookReader
                  title={book.title}
                  pdf={book.pdf}
                  color={book.color}
                />

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}