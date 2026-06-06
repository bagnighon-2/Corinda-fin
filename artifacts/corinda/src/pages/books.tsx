import { motion } from "framer-motion";
import { useEffect } from "react";
import { books } from "@/lib/data";

function getEmbedUrl(url: string): string {
  if (!url) {
    return "";
  }

  const match = url.match(/\/d\/([^/]+)/);

  if (!match || !match[1]) {
    return url;
  }

  return `https://drive.google.com/file/d/${match[1]}/preview`;
}

function getDownloadUrl(url: string): string {
  if (!url) {
    return "";
  }

  const match = url.match(/\/d\/([^/]+)/);

  if (!match || !match[1]) {
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
  const embedUrl = getEmbedUrl(pdf);
  const downloadUrl = getDownloadUrl(pdf);

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2">

        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 rounded-lg text-xs border border-white/10 bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          Download PDF
        </a>

      </div>

      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">

        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          className="w-full"
          style={{
            height: "88vh",
            minHeight: "900px",
            border: "none",
            background: "#09090f",
          }}
          allow="autoplay"
        />

      </div>

    </div>
  );
}

export default function Books() {
  useEffect(() => {
    const scrollToHash = () => {
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