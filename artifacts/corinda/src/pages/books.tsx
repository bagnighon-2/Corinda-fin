import { motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  RiSearchLine,
  RiBookOpenLine,
  RiFullscreenLine,
  RiMoonClearLine,
} from "react-icons/ri";

import { books } from "@/lib/data";
import { ResizableEmbed } from "@/components/ResizableEmbed";

export default function Books() {
  const [query, setQuery] = useState("");

  const [readerMode, setReaderMode] = useState<
    "embedded" | "focus"
  >("embedded");

  const [darkReader, setDarkReader] = useState(true);

  const scrollToHash = useCallback(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const el = document.getElementById(
      hash.replace("#", "")
    );

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  useEffect(() => {
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
  }, [scrollToHash]);

  const filteredBooks = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return books;

    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.tag.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div
      className={`
        flex-1
        w-full
        transition-colors
        duration-300
        ${
          darkReader
            ? "bg-[#020203]"
            : "bg-[#f5f5f7]"
        }
      `}
    >
      <div className="w-full max-w-7xl mx-auto px-4 py-20">

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-20"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-1.5
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/5
              text-cyan-300
              text-xs
              uppercase
              tracking-[0.25em]
              mb-6
            "
          >
            <RiBookOpenLine />
            Cognitive Archive
          </div>

          <h1
            className={`
              text-5xl
              md:text-7xl
              font-serif
              tracking-tight
              ${
                darkReader
                  ? "text-white/95"
                  : "text-black/90"
              }
            `}
          >
            The Library
          </h1>

          <p
            className={`
              text-sm
              mt-5
              uppercase
              tracking-[0.35em]
              ${
                darkReader
                  ? "text-white/35"
                  : "text-black/40"
              }
            `}
          >
            {filteredBooks.length} volumes
          </p>
        </motion.div>

        {/* CONTROLS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="
            sticky
            top-4
            z-50
            mb-16
          "
        >
          <div
            className={`
              rounded-3xl
              border
              backdrop-blur-2xl
              shadow-2xl
              p-4
              ${
                darkReader
                  ? `
                    bg-black/50
                    border-white/10
                  `
                  : `
                    bg-white/70
                    border-black/10
                  `
              }
            `}
          >
            <div
              className="
                flex
                flex-col
                lg:flex-row
                gap-4
                lg:items-center
                lg:justify-between
              "
            >
              {/* SEARCH */}

              <div className="relative flex-1 max-w-2xl">
                <RiSearchLine
                  className={`
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-lg
                    ${
                      darkReader
                        ? "text-white/30"
                        : "text-black/30"
                    }
                  `}
                />

                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search books, authors, psychology, hypnosis, persuasion..."
                  className={`
                    w-full
                    rounded-2xl
                    border
                    px-12
                    py-4
                    outline-none
                    transition-all
                    ${
                      darkReader
                        ? `
                          bg-white/5
                          border-white/10
                          text-white
                          placeholder:text-white/25
                          focus:border-cyan-400/40
                          focus:bg-white/10
                        `
                        : `
                          bg-black/[0.03]
                          border-black/10
                          text-black
                          placeholder:text-black/30
                          focus:border-cyan-500/40
                          focus:bg-black/[0.05]
                        `
                    }
                  `}
                />
              </div>

              {/* TOGGLES */}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    setReaderMode((prev) =>
                      prev === "embedded"
                        ? "focus"
                        : "embedded"
                    )
                  }
                  className={`
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    rounded-2xl
                    border
                    transition-all
                    ${
                      darkReader
                        ? `
                          bg-white/5
                          border-white/10
                          text-white/80
                          hover:bg-white/10
                        `
                        : `
                          bg-black/[0.03]
                          border-black/10
                          text-black/70
                          hover:bg-black/[0.06]
                        `
                    }
                  `}
                >
                  <RiFullscreenLine />
                  {readerMode === "embedded"
                    ? "Focus Reader"
                    : "Compact Reader"}
                </button>

                <button
                  onClick={() =>
                    setDarkReader((prev) => !prev)
                  }
                  className={`
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    rounded-2xl
                    border
                    transition-all
                    ${
                      darkReader
                        ? `
                          bg-white/5
                          border-white/10
                          text-white/80
                          hover:bg-white/10
                        `
                        : `
                          bg-black/[0.03]
                          border-black/10
                          text-black/70
                          hover:bg-black/[0.06]
                        `
                    }
                  `}
                >
                  <RiMoonClearLine />
                  {darkReader
                    ? "Light"
                    : "Dark"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOOKS */}

        <div className="space-y-32">
          {filteredBooks.map((book, index) => (
            <motion.section
              key={book.id}
              id={`book-${book.id}`}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-120px",
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.02,
              }}
              className="
                relative
                scroll-mt-32
              "
            >
              {/* GLOW */}

              <div
                className="
                  absolute
                  inset-0
                  opacity-40
                  blur-[120px]
                  pointer-events-none
                "
                style={{
                  background: book.glow,
                }}
              />

              {/* BORDER */}

              <div
                className={`
                  relative
                  rounded-[32px]
                  p-[1px]
                  bg-gradient-to-r
                  ${book.color}
                `}
              >
                {/* CARD */}

                <div
                  className={`
                    relative
                    overflow-hidden
                    rounded-[31px]
                    border
                    ${
                      darkReader
                        ? `
                          bg-[#050507]
                          border-white/10
                        `
                        : `
                          bg-white
                          border-black/10
                        `
                    }
                  `}
                >
                  {/* GRID */}

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-[0.03]
                      pointer-events-none
                    "
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          rgba(255,255,255,0.08) 1px,
                          transparent 1px
                        ),
                        linear-gradient(
                          90deg,
                          rgba(255,255,255,0.08) 1px,
                          transparent 1px
                        )
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* CONTENT */}

                  <div className="relative p-8 md:p-10">

                    {/* TOP */}

                    <div
                      className="
                        flex
                        flex-col
                        xl:flex-row
                        gap-8
                        justify-between
                        mb-10
                      "
                    >
                      {/* LEFT */}

                      <div className="max-w-4xl">
                        <div
                          className="
                            flex
                            items-start
                            gap-4
                            mb-5
                          "
                        >
                          {/* NUMBER */}

                          <div
                            className={`
                              shrink-0
                              w-14
                              h-14
                              rounded-2xl
                              flex
                              items-center
                              justify-center
                              font-bold
                              text-white
                              bg-gradient-to-br
                              ${book.color}
                              shadow-2xl
                            `}
                          >
                            {book.id}
                          </div>

                          {/* TITLES */}

                          <div>
                            <h2
                              className={`
                                text-3xl
                                md:text-4xl
                                font-serif
                                leading-tight
                                bg-clip-text
                                text-transparent
                                bg-gradient-to-r
                                ${book.color}
                              `}
                            >
                              {book.title}
                            </h2>

                            <p
                              className={`
                                mt-2
                                text-sm
                                uppercase
                                tracking-[0.25em]
                                ${
                                  darkReader
                                    ? "text-white/40"
                                    : "text-black/40"
                                }
                              `}
                            >
                              {book.author}
                            </p>
                          </div>
                        </div>

                        {/* TAGS */}

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-2
                            mb-5
                          "
                        >
                          <span
                            className={`
                              px-3
                              py-1.5
                              rounded-full
                              border
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              ${book.tagColor}
                            `}
                          >
                            {book.tag}
                          </span>

                          {book.hasChapters && (
                            <span
                              className="
                                px-3
                                py-1.5
                                rounded-full
                                border
                                border-cyan-400/20
                                bg-cyan-400/10
                                text-cyan-300
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                              "
                            >
                              Chapter System
                            </span>
                          )}
                        </div>

                        {/* DESCRIPTION */}

                        <p
                          className={`
                            max-w-3xl
                            text-[15px]
                            leading-[1.9]
                            ${
                              darkReader
                                ? "text-white/65"
                                : "text-black/70"
                            }
                          `}
                        >
                          {book.description}
                        </p>
                      </div>

                      {/* RIGHT */}

                      <div
                        className="
                          flex
                          flex-col
                          gap-3
                          min-w-[240px]
                        "
                      >
                        <a
                          href={book.pdf.replace(
                            "/preview",
                            "/view"
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            group
                            rounded-2xl
                            px-5
                            py-4
                            text-center
                            transition-all
                            border
                            ${
                              darkReader
                                ? `
                                  bg-white/5
                                  border-white/10
                                  text-white/85
                                  hover:bg-white/10
                                `
                                : `
                                  bg-black/[0.03]
                                  border-black/10
                                  text-black/80
                                  hover:bg-black/[0.05]
                                `
                            }
                          `}
                        >
                          <div className="font-medium">
                            Open PDF
                          </div>

                          <div
                            className={`
                              text-xs
                              mt-1
                              ${
                                darkReader
                                  ? "text-white/40"
                                  : "text-black/40"
                              }
                            `}
                          >
                            New tab / download
                          </div>
                        </a>

                        <div
                          className={`
                            rounded-2xl
                            border
                            p-4
                            ${
                              darkReader
                                ? `
                                  bg-white/[0.03]
                                  border-white/10
                                `
                                : `
                                  bg-black/[0.02]
                                  border-black/10
                                `
                            }
                          `}
                        >
                          <div
                            className={`
                              text-[10px]
                              uppercase
                              tracking-[0.25em]
                              mb-2
                              ${
                                darkReader
                                  ? "text-white/35"
                                  : "text-black/35"
                              }
                            `}
                          >
                            Reader Status
                          </div>

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-cyan-300
                            "
                          >
                            <div
                              className="
                                w-2
                                h-2
                                rounded-full
                                bg-cyan-400
                                animate-pulse
                              "
                            />

                            Alexandria Compatible
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PDF READER */}

                    <motion.div
                      layout
                      transition={{
                        duration: 0.25,
                      }}
                      className="
                        relative
                        rounded-[28px]
                        overflow-hidden
                      "
                    >
                      <div
                        className={`
                          absolute
                          inset-0
                          opacity-30
                          blur-[90px]
                          pointer-events-none
                        `}
                        style={{
                          background: book.glow,
                        }}
                      />

                      <div
                        className={`
                          relative
                          rounded-[28px]
                          border
                          overflow-hidden
                          ${
                            darkReader
                              ? `
                                bg-black/60
                                border-white/10
                              `
                              : `
                                bg-white
                                border-black/10
                              `
                          }
                        `}
                      >
                        <ResizableEmbed
                          src={book.pdf}
                          title={book.title}
                          initialHeight={
                            readerMode === "focus"
                              ? 1000
                              : 720
                          }
                          initialWidth={
                            readerMode === "focus"
                              ? 1400
                              : 920
                          }
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* EMPTY */}

        {filteredBooks.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              text-center
              py-32
            "
          >
            <div
              className={`
                text-2xl
                font-serif
                mb-4
                ${
                  darkReader
                    ? "text-white/70"
                    : "text-black/70"
                }
              `}
            >
              No matching volumes found
            </div>

            <p
              className={`
                ${
                  darkReader
                    ? "text-white/35"
                    : "text-black/35"
                }
              `}
            >
              Try searching by author, topic, or title.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}