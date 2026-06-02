import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/lib/data";
import { RiExternalLinkLine, RiAlertLine, RiEyeLine, RiEyeOffLine, RiArrowLeftLine } from "react-icons/ri";

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const [showEmbed, setShowEmbed] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative rounded-2xl p-[1px] overflow-hidden bg-gradient-to-br ${chapter.color}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${chapter.color} opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-700 pointer-events-none`} />
      <div className="relative bg-[#08080D] rounded-[15px] flex flex-col overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-300">
        <div className="absolute inset-2 rounded-xl border border-white/0 group-hover:border-white/[0.07] transition-all duration-500 pointer-events-none" />

        <div className="relative p-5 pb-3">
          <div className="flex justify-between items-start mb-3">
            <span className={`text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-br ${chapter.color} opacity-50`}>
              {chapter.id.toString().padStart(2, "0")}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white tracking-wide mb-2">{chapter.title}</h3>
          <p className="text-xs text-white/45 leading-relaxed">{chapter.description}</p>
        </div>

        <div className="px-5 pb-4 flex flex-wrap gap-2">
          <a href={`https://corinda${chapter.id}.netlify.app`} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium uppercase tracking-wider bg-gradient-to-br ${chapter.color} text-white opacity-85 hover:opacity-100 transition-opacity`}
            onClick={e => e.stopPropagation()}>
            <RiExternalLinkLine className="shrink-0" /> View Site
          </a>
          <a href={`https://${chapter.id}corinda.netlify.app`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium uppercase tracking-wider bg-white/5 border border-white/10 text-white/55 hover:text-white hover:bg-white/10 transition-all"
            onClick={e => e.stopPropagation()}>
            <RiAlertLine className="shrink-0 text-green-400" /> Emergency
          </a>
          <button onClick={() => setShowEmbed(v => !v)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium uppercase tracking-wider bg-white/5 border border-white/10 text-white/40 hover:text-white/70 transition-all ml-auto">
            {showEmbed ? <RiEyeOffLine /> : <RiEyeLine />}
            {showEmbed ? "Hide" : "Preview"}
          </button>
        </div>

        <AnimatePresence>
          {showEmbed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 280, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/8"
            >
              <iframe src={`https://corinda${chapter.id}.netlify.app`}
                title={`Chapter ${chapter.id}: ${chapter.title}`}
                className="w-full h-70" style={{ height: 280 }}
                loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Mentalism() {
  return (
    <div className="flex-1 w-full">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-6">
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest cursor-pointer">
            <RiArrowLeftLine /> Back to Overview
          </span>
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-purple-400/50 mb-4">Tony Corinda</p>
          <h1 className="text-4xl md:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400 mb-4">
            Thirteen Steps to Mentalism
          </h1>
          <p className="text-white/30 text-sm max-w-2xl mx-auto leading-relaxed">
            Each of the thirteen chapters has its own dedicated site. Click to visit the live chapter, preview it inline, or access the emergency mirror if the primary is down.
          </p>
          <div className="w-20 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {chapters.map((chapter, i) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
