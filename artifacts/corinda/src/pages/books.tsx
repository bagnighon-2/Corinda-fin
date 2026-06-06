import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { RiSearchLine } from "react-icons/ri";

import { books } from "@/lib/data";
import { ResizableEmbed } from "@/components/ResizableEmbed";

export default function Books() {
  const [query, setQuery] = useState("");

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

    const handleHashChange = () =>
      scrollToHash();

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

  const filteredBooks = books.filter((book) => {
    const q = query.toLowerCase();

    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.tag.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-20">

      {/* HERO */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-[10px] uppercase tracking-[0.3em] mb-6">
          Cognitive Archive
        </div>

        <h1 className="text-5xl md:text-6xl font-serif text-white/95">
          The Library
        </h1>

        <p className="text-white/30 text-sm mt-4 uppercase tracking-[0.3em]">
          {filteredBooks.length} volumes
        </p>
      </motion.div>

      {/* SEARCH */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="sticky top-4 z-50 mb-16"
      >
        <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 shadow-2xl">

          <div className="relative">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg" />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search books, authors, persuasion, hypnosis..."
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-12
                py-4
                text-white
                placeholder:text-white/25
                outline-none
                transition-all
                focus:border-cyan-400/40
                focus:bg-white/10
              "
            />
          </div>
        </div>
      </motion.div>

      {/* BOOKS */}

      <div className="space-y-28">
        {filteredBooks.map((book, index) => (
          <motion.div
            key={book.id}
            id={`book-${book.id}`}
            className="relative scroll-mt-28"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.02,
            }}
          >
            {/* OUTER GLOW */}

            <div
              className="absolute inset-0 blur-[120px] opacity-30 pointer-events-none"
              style={{
                background: book.glow,
              }}
            />

            {/* BORDER */}

            <div
              className={`relative p-[1px] rounded-[32px] bg-gradient-to-r ${book.color}`}
            >
              {/* CARD */}

              <div className="rounded-[31px] bg-[#07070c] border border-white/10 overflow-hidden relative">

                {/* GRID */}

                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* INNER GLOW */}

                <div
                  className="absolute -top-24 -left-24 w-[500px] h-[500px] blur-[120px] opacity-20"
                  style={{
                    background: book.glow,
                  }}
                />

                {/* CONTENT */}

                <div className="relative p-6 md:p-8">

                  {/* TOP */}

                  <div className="flex flex-col xl:flex-row justify-between gap-8 mb-8">

                    {/* LEFT */}

                    <div className="max-w-4xl">

                      <div className="flex items-start gap-4 mb-5">

                        {/* NUMBER */}

                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold bg-gradient-to-br ${book.color} shrink-0 shadow-2xl`}
                        >
                          {book.id}
                        </div>

                        {/* TITLE */}

                        <div>
                          <h2
                            className={`text-3xl md:text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r ${book.color}`}
                          >
                            {book.title}
                          </h2>

                          <p className="text-white/40 text-sm uppercase tracking-[0.25em] mt-2">
                            {book.author}
                          </p>
                        </div>
                      </div>

                      {/* TAGS */}

                      <div className="flex flex-wrap items-center gap-2 mb-5">

                        <span
                          className={`text-[10px] px-3 py-1.5 rounded-full border font-medium uppercase tracking-[0.25em] ${book.tagColor}`}
                        >
                          {book.tag}
                        </span>

                        {book.hasChapters && (
                          <span className="text-[10px] px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 uppercase tracking-[0.25em]">
                            Chapters Included
                          </span>
                        )}
                      </div>

                      {/* DESCRIPTION */}

                      <p className="text-white/65 text-[15px] leading-[1.9] max-w-3xl">
                        {book.description}
                      </p>
                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col gap-3 min-w-[240px]">

                      <a
                        href={book.pdf.replace(
                          "/preview",
                          "/view"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                          hover:bg-white/10
                          transition-all
                          px-5
                          py-4
                          text-center
                          text-white/85
                        "
                      >
                        <div className="font-medium">
                          Open PDF
                        </div>

                        <div className="text-xs text-white/40 mt-1">
                          New tab / download
                        </div>
                      </a>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                        <div className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-2">
                          Reader Status
                        </div>

                        <div className="flex items-center gap-2 text-sm text-cyan-300">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                          Alexandria Compatible
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PDF */}

                  <div className="relative rounded-[28px] overflow-hidden">

                    <div
                      className="absolute inset-0 opacity-20 blur-[80px] pointer-events-none"
                      style={{
                        background: book.glow,
                      }}
                    />

                    <div className="relative rounded-[28px] border border-white/10 bg-black/50 overflow-hidden">

                      <ResizableEmbed
                        src={book.pdf}
                        title={book.title}
                        initialHeight={720}
                        initialWidth={920}
                      />

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EMPTY */}

      {filteredBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32"
        >
          <div className="text-2xl font-serif text-white/70 mb-4">
            No matching volumes found
          </div>

          <p className="text-white/35">
            Try searching by author, topic, or title.
          </p>
        </motion.div>
      )}
    </div>
  );
}