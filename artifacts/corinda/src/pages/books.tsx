import { motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { books } from "@/lib/data";

type ReaderSettings = {
  darkMode: boolean;
  textMode: boolean;
  showPdf: boolean;
};

const DEFAULT_SETTINGS: ReaderSettings = {
  darkMode: true,
  textMode: true,
  showPdf: true,
};

function getPublicPreviewUrl(url: string): string {
  if (!url) {
    return "";
  }

  /*
    KEEP PREVIEW.
    /view causes Google auth + access walls in iframe.
    /preview is the only stable embeddable mode.
  */

  return url.replace("/view", "/preview");
}

function getDownloadUrl(url: string): string {
  const match = url.match(/\/d\/(.*?)\//);

  if (!match?.[1]) {
    return url;
  }

  return `https://drive.google.com/uc?export=download&id=${match[1]}`;
}

type BookReaderProps = {
  title: string;
  pdf: string;
};

function BookReader({
  title,
  pdf,
}: BookReaderProps) {
  const [settings, setSettings] =
    useState<ReaderSettings>(DEFAULT_SETTINGS);

  const [showSettings, setShowSettings] =
    useState<boolean>(false);

  const [extractedText, setExtractedText] =
    useState<string>("");

  const [loadingText, setLoadingText] =
    useState<boolean>(false);

  const hiddenReaderRef =
    useRef<HTMLDivElement | null>(null);

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

  /*
    Creates readable DOM text for Alexandria.live
    so it can detect continuous paragraphs
    instead of fragmented PDF lines.
  */
  useEffect(() => {
    let cancelled = false;

    async function extractPdfText() {
      try {
        setLoadingText(true);

        const pdfjs = await import(
          "pdfjs-dist/build/pdf"
        );

        const worker = await import(
          "pdfjs-dist/build/pdf.worker.entry"
        );

        pdfjs.GlobalWorkerOptions.workerSrc =
          worker;

        const loadingTask =
          pdfjs.getDocument(
            getDownloadUrl(pdf)
          );

        const document =
          await loadingTask.promise;

        let fullText = "";

        for (
          let pageNumber = 1;
          pageNumber <= document.numPages;
          pageNumber += 1
        ) {
          const page =
            await document.getPage(pageNumber);

          const content =
            await page.getTextContent();

          const pageText = content.items
            .map((item: unknown) => {
              const textItem = item as {
                str?: string;
              };

              return textItem.str ?? "";
            })
            .join(" ");

          /*
            NORMALIZE BROKEN PDF LINES
            so TTS extensions treat them
            as real paragraphs.
          */
          const normalized = pageText
            .replace(/-\s+/g, "")
            .replace(/\s+/g, " ")
            .replace(
              /([a-z]) ([A-Z])/g,
              "$1\n\n$2"
            );

          fullText += `${normalized}\n\n`;
        }

        if (!cancelled) {
          setExtractedText(fullText);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setExtractedText(
            "Text extraction unavailable for this document."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingText(false);
        }
      }
    }

    if (settings.textMode) {
      extractPdfText();
    }

    return () => {
      cancelled = true;
    };
  }, [pdf, settings.textMode]);

  const previewUrl = useMemo(() => {
    return getPublicPreviewUrl(pdf);
  }, [pdf]);

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
            setSettings((previous) => ({
              ...previous,
              textMode: !previous.textMode,
            }))
          }
          className={`px-3 py-2 rounded-lg text-xs transition-all border ${
            settings.textMode
              ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200"
              : "bg-white/5 border-white/10 text-white/60"
          }`}
        >
          Alexandria Text Mode
        </button>

        <button
          type="button"
          onClick={() =>
            setSettings((previous) => ({
              ...previous,
              showPdf: !previous.showPdf,
            }))
          }
          className={`px-3 py-2 rounded-lg text-xs transition-all border ${
            settings.showPdf
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
              : "bg-white/5 border-white/10 text-white/60"
          }`}
        >
          Toggle PDF
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

          <div className="text-white/60 text-sm leading-relaxed space-y-2">

            <p>
              Alexandria mode extracts readable
              paragraph text from PDFs directly
              into the page DOM.
            </p>

            <p>
              This fixes TTS extensions reading
              every visual PDF line as a separate
              sentence.
            </p>

            <p>
              PDF embeds remain enabled while
              normalized text is injected invisibly
              for accessibility readers.
            </p>

          </div>

        </div>
      )}

      {settings.showPdf && (
        <div
          className={`rounded-2xl overflow-hidden border ${
            settings.darkMode
              ? "border-white/10 bg-black"
              : "border-black/10 bg-white"
          }`}
        >

          <iframe
            src={previewUrl}
            title={title}
            loading="lazy"
            className="w-full"
            allow="clipboard-read; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              height: "88vh",
              minHeight: "900px",
              border: "none",
              background: settings.darkMode
                ? "#09090f"
                : "#ffffff",
            }}
          />

        </div>
      )}

      {settings.textMode && (
        <div
          ref={hiddenReaderRef}
          aria-hidden="false"
          className={`rounded-2xl border p-8 ${
            settings.darkMode
              ? "border-white/10 bg-[#0a0a12]"
              : "border-black/10 bg-white"
          }`}
        >

          <div className="mb-6">

            <h3 className="text-xl font-serif text-white/90">
              Accessible Reading Layer
            </h3>

            <p className="text-white/40 text-sm mt-2">
              Optimized for Alexandria.live and
              text-to-speech readers.
            </p>

          </div>

          {loadingText ? (
            <div className="text-white/40 text-sm">
              Extracting readable text...
            </div>
          ) : (
            <article
              className="select-text whitespace-pre-wrap text-[18px] leading-[2.1] text-white/80"
              style={{
                userSelect: "text",
                WebkitUserSelect: "text",
              }}
            >
              {extractedText}
            </article>
          )}

        </div>
      )}

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