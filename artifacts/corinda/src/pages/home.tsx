import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { books } from "@/lib/data";
import { RiBookOpenLine, RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: "easeOut" },
  }),
};

function BookCard({ book, index }: { book: typeof books[0]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="relative group rounded-2xl p-[1px] overflow-hidden cursor-pointer"
      style={{ background: `linear-gradient(135deg, ${book.glow}, transparent 70%)` }}
    >
      <div className="relative bg-[#08080e] rounded-[15px] p-6 h-full flex flex-col overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-300">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: book.glow }} />
        <div className="absolute inset-2 rounded-xl border border-white/0 group-hover:border-white/[0.06] transition-all duration-500 pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-widest ${book.tagColor}`}>
            {book.tag}
          </span>
          <span className="text-[10px] text-white/20 font-mono">#{book.id}</span>
        </div>

        <h3 className={`text-base font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r ${book.color} leading-snug`}>
          {book.title}
        </h3>
        <p className="text-xs text-white/35 uppercase tracking-widest mb-3">{book.author}</p>
        <p className="text-sm text-white/50 leading-relaxed flex-1">{book.description}</p>

        <div className="mt-5 flex items-center gap-3">
          <a href={`/books#book-${book.id}`}>
            <span className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${book.color} hover:opacity-80 transition-opacity`}>
              <RiBookOpenLine className="text-white/40 shrink-0" />
              Read PDF
            </span>
          </a>
          <RiArrowRightLine className="text-white/15 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex-1 w-full">
      {/* ── HERO ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/25 mb-5">Curated Archive</p>
          <h1 className="text-6xl md:text-9xl font-serif italic tracking-tighter mb-5 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
            The Complete Directory
          </h1>
          <p className="text-sm md:text-base text-white/35 tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed">
            Mentalism · Influence · Illusions · Rapport · Body Language
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-white/15 text-xs tracking-widest uppercase">{books.length} volumes</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </motion.div>
      </div>

      {/* ── BOOKS CATALOG ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-xs text-white/25 uppercase tracking-[0.4em]">The Collection</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link href="/books">
            <motion.span
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.07] transition-all duration-300 text-sm uppercase tracking-widest cursor-pointer"
            >
              <RiBookOpenLine />
              Open Full Library with PDF Embeds
              <RiArrowRightLine />
            </motion.span>
          </Link>
        </motion.div>
      </section>

      {/* ── THIRTEEN STEPS TEASER ───────────────────────────── */}
      <section className="border-t border-white/5 bg-[#040409] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-purple-400/50 mb-4">Tony Corinda</p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400 mb-4">
              Thirteen Steps to Mentalism
            </h2>
            <p className="text-white/30 text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Each of the thirteen chapters has its own dedicated site — visit, preview inline, or access emergency mirrors.
            </p>
            <div className="w-20 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <Link href="/mentalism">
              <motion.span
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 hover:text-white hover:border-purple-400/50 hover:bg-purple-900/40 transition-all duration-300 text-sm uppercase tracking-widest cursor-pointer"
              >
                View All 13 Chapters
                <RiArrowRightUpLine />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
