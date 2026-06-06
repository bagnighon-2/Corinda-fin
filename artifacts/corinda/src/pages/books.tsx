import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { books } from "@/lib/data";

type ReaderSettings = {
  darkMode: boolean;
  readerWidth: number;
};

const DEFAULT_SETTINGS: ReaderSettings = {
  darkMode: true,
  readerWidth: 1200,
};

function getViewUrl(url: string): string {
  if (!url) {
    return "";
  }

  return url.replace("/preview", "/view");
}

type BookReaderProps = {
  title: string;
  pdf: string;
};

function BookReader({
  title,
  pdf,
}: BookReaderProps) {
  const [showSettings, setShowSettings] =
    useState<boolean>(false);

  const [settings, setSettings] =
    useState<ReaderSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(
        "alexandria-reader-settings"
      );

      if (stored) {
        const parsed =
          JSON.parse(stored) as ReaderSettings;

        setSettings(parsed);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        "alexandria-reader-settings",
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error(error);
    }
  }, [settings]);

  return (
    <div className="space-y-4">

      <div className="flex flex-wrap items-center gap-2">

        <button
          type="button"
          onClick={() =>
            setSettings((previous) => ({
              ...previous,
              darkMode: !previous.darkMode,
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
          type="button"
          onClick={() =>
            setShowSettings((previous) => !previous)
          }
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors border border-white/10"
        >
          Reader Settings
        </button>

      </div>

      {showSettings && (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">

          <div>

            <label className="text-white/70 text-xs uppercase tracking-widest">
              Reader Width
            </label>

            <input
              type="range"
              min={700}
              max={1600}
              step={20}
              value={settings.readerWidth}
              onChange={(event) =>
                setSettings((previous) => ({
                  ...previous,
                  readerWidth: Number(
                    event.target.value
                  ),
                }))
              }
              className="w-full mt-2"
            />

          </div>

        </div>
      )}

      <div
        className={`rounded-2xl overflow-hidden border ${
          settings.darkMode
            ? "border-white/10 bg-black"
            : "border-black/10 bg-white"
        }`}
      >

        <div
          className="mx-auto"
          style={{
            maxWidth: `${settings.readerWidth}px`,
          }}
        >

          <iframe
            src={getViewUrl(pdf)}
            title={title}
            loading="lazy"
            className="w-full"
            allow="clipboard-read; clipboard-write"
            referrerPolicy="no-referrer"
            style={{
              height: "85vh",
              minHeight: "800px",
              border: "none",
              background: settings.darkMode
                ? "#09090f"
                : "#ffffff",
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default function Books() {
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") {
        return;
      }

      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      const element = document.getElementById(
        hash.replace("#", "")
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    scrollToHash();

    window.addEventListener(
      "hashchange",
      scrollToHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        scrollToHash
      );
    };
  }, []);

  return (
    <div className="flex-1 w-full max-w-[1700px] mx-auto px-4 py-20">

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
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
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.5,
            }}
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

                    </div>

                    <p className="text-white/60 text-sm md:text-[15px] mt-4 max-w-3xl leading-relaxed">
                      {book.description}
                    </p>

                  </div>

                  <div className="flex flex-col gap-3 min-w-[240px]">

                    <a
                      href={getViewUrl(book.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm text-center transition-all border border-white/10"
                    >
                      Open Fullscreen ↗
                    </a>

                  </div>

                </div>

                <BookReader
                  title={book.title}
                  pdf={book.pdf}
                />

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}