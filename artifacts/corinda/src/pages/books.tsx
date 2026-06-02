import { motion } from "framer-motion";
import { books } from "@/lib/data";

export default function Books() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-20">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-serif text-white/90">The Library</h1>
        <p className="text-white/30 text-sm mt-3 uppercase tracking-widest">{books.length} volumes</p>
      </motion.div>

      <div className="space-y-28">
        {books.map((book) => (
          <motion.div
            key={book.id}
            id={`book-${book.id}`}
            className="relative scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >

            <div className={`p-[2px] rounded-3xl bg-gradient-to-r ${book.color}`}>
              <div className="rounded-3xl bg-[#07070c] p-6 relative overflow-hidden">

                <div
                  className="absolute -top-10 -left-10 w-72 h-72 blur-[90px] opacity-30"
                  style={{ background: book.glow }}
                />

                <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${book.color} shrink-0`}>
                        {book.id}
                      </div>

                      <h2 className={`text-2xl font-serif bg-clip-text text-transparent bg-gradient-to-r ${book.color}`}>
                        {book.title}
                      </h2>
                    </div>

                    <p className="text-white/40 text-sm uppercase tracking-widest">
                      {book.author}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-widest ${book.tagColor}`}>
                        {book.tag}
                      </span>
                    </div>

                    <p className="text-white/60 text-sm mt-3 max-w-2xl leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[180px]">

                    <a
                      href={book.pdf.replace("/preview", "/view")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs text-center transition-colors"
                    >
                      Open in New Tab
                    </a>

                    <a
                      href={book.pdf.replace("/preview", "/export?format=pdf")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 text-xs text-center transition-colors"
                    >
                      Download PDF
                    </a>

                    <div className="px-3 py-2 rounded-lg bg-white/5 text-white/50 text-xs text-center">
                      Book #{book.id}
                    </div>
                  </div>
                </div>

                <div className="p-[1px] rounded-2xl bg-white/10">
                  <div className="rounded-2xl overflow-hidden bg-black/40">

                    <iframe
                      src={book.pdf}
                      className="w-full"
                      style={{
                        height: "80vh",
                        minHeight: "520px",
                        border: "none"
                      }}
                      loading="lazy"
                      title={book.title}
                    />

                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}
