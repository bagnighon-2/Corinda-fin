import { motion } from "framer-motion";

const driveLinks = [
  "https://drive.google.com/file/d/13VMpCcqzLiERziklNJdbKZfngmwO8pe2/preview",
  "https://drive.google.com/file/d/16-M4iMzG3wpTM5YHOhN6ij_7wO0EKd8h/preview",
  "https://drive.google.com/file/d/1662TrO57SuR3H5KA_8kPSbDkJGVMJxNg/preview",
  "https://drive.google.com/file/d/16_V6aUthrv9zuHhFcso5iW1zSm_aEVwd/preview",
  "https://drive.google.com/file/d/19I9M4fjmmXpWZ2NQwQMESmwGb2iA1SvG/preview",
  "https://drive.google.com/file/d/1B8wQYDgR7Cr8KNU-HJE14ymY5EHz2Xe1/preview",
  "https://drive.google.com/file/d/1BmVeUuMLCYy0cBtaNSkGZQYDRBt6_fWj/preview",
  "https://drive.google.com/file/d/1GolcvPMOZlV5ThRZ6IepPcrqiMZjTMYN/preview",
  "https://drive.google.com/file/d/1OlUWs0nHtOAfcNMwhcW2c4jgEtlIkXVS/preview",
  "https://drive.google.com/file/d/1Pflqr0mSFit2-DBzYb2Qu3T7GfrmDzTz/preview",
  "https://drive.google.com/file/d/1Qh-tnEarL5xqnn0-5--1WvNxiNvMMX5J/preview",
  "https://drive.google.com/file/d/1VPtDApBs3AXG0SraNdouHzDUCwKytBeN/preview",
  "https://drive.google.com/file/d/1WD4rgrtR1-x-jKZ31ZXbzv1Vewk7rvKI/preview",
  "https://drive.google.com/file/d/1_vq4ZXO3mBjn63T9n-15TKpAdn0-Qlgz/preview",
  "https://drive.google.com/file/d/1aOm38QVlOZHVtNWYGRLO0GtYeL8Dl0JS/preview",
  "https://drive.google.com/file/d/1cZ3YohPWnUQd_6GuWsOwCl6TcNExwz-v/preview",
  "https://drive.google.com/file/d/1dMoseEcEABR8-f5xlFq0KrSR_Dp8JAOM/preview",
  "https://drive.google.com/file/d/1f1yIpyUJHadjReNR-cFXWSpuZ99oFzpQ/preview",
  "https://drive.google.com/file/d/1fdPmS1-LFvOhCpEkc46uTMCc0Ten_WV9/preview",
  "https://drive.google.com/file/d/1ixvHcQJdMKu6dpv6h-3Zz-qLrd72f0mN/preview",
  "https://drive.google.com/file/d/1j9Vp1MhI2G5CqRIK1knIt3Qe0FwL9ioj/preview",
  "https://drive.google.com/file/d/1kdaycJrpDkfi3vddqQCoYVUjS7raSZq1/preview",
  "https://drive.google.com/file/d/1l_eaxZalMImrpKVVvWj2VwO9ZIaKaUUT/preview",
  "https://drive.google.com/file/d/1lxac0if2AFCtUdK8Kbe_b9aR0W33VzHm/preview",
  "https://drive.google.com/file/d/1lxe-wH_zxWA4Fw9xXU7cT8mU4CIIRJSM/preview",
  "https://drive.google.com/file/d/1orX_4KlTy_HFgrdz5DyHYaq51qfag69O/preview",
  "https://drive.google.com/file/d/1outED5qsvgNJoGBXnNO-ixbU37-IFig4/preview",
  "https://drive.google.com/file/d/1sa9i0U3fQOmwQG8-6G4QKnleTqm6l-s9/preview",
  "https://drive.google.com/file/d/1tu0npBzuoc2Br6E6YmK_RYHh1PrtLmqL/preview",
  "https://drive.google.com/file/d/1ulLj4atH5ATpbBj_EjqJuueSHX9cURuQ/preview",
  "https://drive.google.com/file/d/1yp72GlTzU46n_o_wfn-uFp5EyKxCoCu2/preview"
];

const books = [
  {
    id: 1,
    title: "The Big Con",
    author: "David W. Maurer",
    description:
      "Study of confidence tricks and con artist psychology in early America.",
    pdf: driveLinks[0],
    color: "from-purple-500 to-indigo-700",
    glow: "rgba(139,92,246,0.45)"
  },
  {
    id: 2,
    title: "The Definitive Book of Body Language",
    author: "Allan & Barbara Pease",
    description:
      "Nonverbal communication decoding system covering gestures, posture, micro-signals.",
    pdf: driveLinks[1],
    color: "from-fuchsia-500 to-pink-600",
    glow: "rgba(232,121,249,0.45)"
  },
  {
    id: 3,
    title: "The Confidence Game",
    author: "Maria Konnikova",
    description:
      "Why intelligent people fall for scams and manipulation structures.",
    pdf: driveLinks[2],
    color: "from-rose-400 to-red-600",
    glow: "rgba(251,113,133,0.45)"
  },
  {
    id: 4,
    title: "Mastermind: Sherlock Thinking",
    author: "Maria Konnikova",
    description:
      "Cognitive control, attention training, reasoning discipline.",
    pdf: driveLinks[3],
    color: "from-cyan-400 to-blue-600",
    glow: "rgba(34,211,238,0.45)"
  },
  {
    id: 5,
    title: "The Like Switch",
    author: "Jack Schafer",
    description:
      "FBI rapport-building and social influence mechanics.",
    pdf: driveLinks[4],
    color: "from-sky-400 to-blue-600",
    glow: "rgba(56,189,248,0.45)"
  },
  {
    id: 6,
    title: "Practical Mental Magic",
    author: "Theodore Annemann",
    description:
      "Foundational mentalism methods and psychological illusions.",
    pdf: driveLinks[5],
    color: "from-cyan-400 to-indigo-600",
    glow: "rgba(34,211,238,0.45)"
  },
  {
    id: 7,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    description:
      "Core interpersonal influence and communication frameworks.",
    pdf: driveLinks[6],
    color: "from-yellow-400 to-amber-600",
    glow: "rgba(250,204,21,0.45)"
  },
  {
    id: 8,
    title: "Moonwalking with Einstein",
    author: "Joshua Foer",
    description:
      "Memory palace systems and elite memorization training.",
    pdf: driveLinks[7],
    color: "from-green-400 to-emerald-600",
    glow: "rgba(74,222,128,0.45)"
  },
  {
    id: 9,
    title: "Trance-Formations",
    author: "Bandler & Grinder",
    description:
      "NLP language patterns, hypnosis, behavioral modeling.",
    pdf: driveLinks[8],
    color: "from-indigo-400 to-purple-600",
    glow: "rgba(99,102,241,0.45)"
  },
  {
    id: 10,
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    description:
      "Deep behavioral archetypes and ego-driven patterns.",
    pdf: driveLinks[9],
    color: "from-stone-400 to-zinc-600",
    glow: "rgba(161,161,170,0.45)"
  },
  {
    id: 11,
    title: "Telling Lies",
    author: "Paul Ekman",
    description:
      "Micro-expression detection and deception science.",
    pdf: driveLinks[10],
    color: "from-rose-400 to-red-600",
    glow: "rgba(251,113,133,0.45)"
  },
  {
    id: 12,
    title: "You Can Have an Amazing Memory",
    author: "Dominic O’Brien",
    description:
      "Advanced mnemonic systems and visualization memory design.",
    pdf: driveLinks[11],
    color: "from-emerald-400 to-teal-600",
    glow: "rgba(52,211,153,0.45)"
  },
  {
    id: 13,
    title: "Never Split the Difference",
    author: "Chris Voss",
    description:
      "Hostage negotiation tactics and tactical empathy.",
    pdf: driveLinks[12],
    color: "from-orange-400 to-red-600",
    glow: "rgba(251,146,60,0.45)"
  },
  {
    id: 14,
    title: "Thirteen Steps to Mentalism",
    author: "Tony Corinda",
    description:
      "Structured mentalism system covering all performance branches.",
    pdf: driveLinks[13],
    color: "from-purple-500 to-indigo-700",
    glow: "rgba(139,92,246,0.45)"
  },
  {
    id: 15,
    title: "Pre-Suasion",
    author: "Robert Cialdini",
    description:
      "Attention priming before persuasion occurs.",
    pdf: driveLinks[14],
    color: "from-yellow-400 to-amber-600",
    glow: "rgba(250,204,21,0.45)"
  },
  {
    id: 16,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    description:
      "Strategic dominance and social hierarchy control systems.",
    pdf: driveLinks[15],
    color: "from-stone-500 to-black",
    glow: "rgba(0,0,0,0.45)"
  },
  {
    id: 17,
    title: "Psychology of Intelligence Analysis",
    author: "Heuer Jr.",
    description:
      "Bias correction in intelligence reasoning systems.",
    pdf: driveLinks[16],
    color: "from-blue-400 to-indigo-600",
    glow: "rgba(59,130,246,0.45)"
  },
  {
    id: 18,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description:
      "Dual-system cognition and decision bias analysis.",
    pdf: driveLinks[17],
    color: "from-amber-400 to-yellow-600",
    glow: "rgba(250,204,21,0.45)"
  },
  {
    id: 19,
    title: "Designing Miracles",
    author: "Darwin Ortiz",
    description:
      "Advanced deception architecture in magic performance.",
    pdf: driveLinks[18],
    color: "from-violet-400 to-fuchsia-600",
    glow: "rgba(192,132,252,0.45)"
  },
  {
    id: 20,
    title: "The Ellipsis Manual",
    author: "Chase Hughes",
    description:
      "Real-time behavioral analysis framework.",
    pdf: driveLinks[19],
    color: "from-teal-400 to-cyan-600",
    glow: "rgba(45,212,191,0.45)"
  },
  {
    id: 21,
    title: "Games People Play",
    author: "Eric Berne",
    description:
      "Transactional psychology and social “game” systems.",
    pdf: driveLinks[20],
    color: "from-pink-400 to-rose-600",
    glow: "rgba(244,114,182,0.45)"
  },
  {
    id: 22,
    title: "What Every Body Is Saying",
    author: "Joe Navarro",
    description:
      "Nonverbal behavior decoding and intent detection.",
    pdf: driveLinks[21],
    color: "from-green-400 to-emerald-600",
    glow: "rgba(74,222,128,0.45)"
  },
  {
    id: 23,
    title: "Deception & Self-Deception",
    author: "Richard Wiseman",
    description:
      "Psychological blind spots in belief and deception.",
    pdf: driveLinks[22],
    color: "from-gray-400 to-slate-600",
    glow: "rgba(148,163,184,0.45)"
  },
  {
    id: 24,
    title: "Impro: Improvisation and the Theatre",
    author: "Keith Johnstone",
    description:
      "Spontaneity, creativity, and social improvisation systems.",
    pdf: driveLinks[23],
    color: "from-orange-400 to-amber-600",
    glow: "rgba(251,146,60,0.45)"
  },
  {
    id: 25,
    title: "Strong Magic",
    author: "Darwin Ortiz",
    description:
      "Audience psychology in magic performance design.",
    pdf: driveLinks[24],
    color: "from-indigo-500 to-blue-700",
    glow: "rgba(99,102,241,0.45)"
  },
  {
    id: 26,
    title: "Sleights of Mind",
    author: "Macknik & Martinez-Conde",
    description:
      "Neuroscience of attention and illusion processing.",
    pdf: driveLinks[25],
    color: "from-cyan-400 to-sky-600",
    glow: "rgba(56,189,248,0.45)"
  },
  {
    id: 27,
    title: "Left of Bang",
    author: "Van Horne & Riley",
    description:
      "Pre-incident behavioral threat detection system.",
    pdf: driveLinks[26],
    color: "from-red-400 to-rose-600",
    glow: "rgba(248,113,113,0.45)"
  },
  {
    id: 28,
    title: "Influence",
    author: "Robert Cialdini",
    description:
      "Core persuasion principles in behavioral psychology.",
    pdf: driveLinks[27],
    color: "from-yellow-400 to-amber-600",
    glow: "rgba(250,204,21,0.45)"
  },
  {
    id: 29,
    title: "Big Con (Revisit)",
    author: "Maurer",
    description:
      "Confidence trick structures and scam ecosystems.",
    pdf: driveLinks[28],
    color: "from-purple-500 to-indigo-700",
    glow: "rgba(139,92,246,0.45)"
  },
  {
    id: 30,
    title: "Body Language (Revisit)",
    author: "Pease & Pease",
    description:
      "Nonverbal communication system reinforcement.",
    pdf: driveLinks[29],
    color: "from-fuchsia-500 to-pink-600",
    glow: "rgba(232,121,249,0.45)"
  },
  {
    id: 31,
    title: "Confidence Game (Revisit)",
    author: "Konnikova",
    description:
      "Manipulation psychology and trust exploitation systems.",
    pdf: driveLinks[30],
    color: "from-rose-400 to-red-600",
    glow: "rgba(251,113,133,0.45)"
  }
];

export default function Books() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-20">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-serif text-white/90">The Library</h1>
      </motion.div>

      <div className="space-y-28">
        {books.map((book) => (
          <motion.div key={book.id} className="relative">

            {/* OUTER COLOR FRAME */}
            <div className={`p-[2px] rounded-3xl bg-gradient-to-r ${book.color}`}>
              <div className="rounded-3xl bg-[#07070c] p-6 relative overflow-hidden">

                {/* GLOW LAYER */}
                <div
                  className="absolute -top-10 -left-10 w-72 h-72 blur-[90px] opacity-30"
                  style={{ background: book.glow }}
                />

                {/* HEADER BOX */}
                <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${book.color}`}>
                        {book.id}
                      </div>

                      <h2 className={`text-2xl font-serif bg-clip-text text-transparent bg-gradient-to-r ${book.color}`}>
                        {book.title}
                      </h2>
                    </div>

                    <p className="text-white/40 text-sm uppercase tracking-widest">
                      {book.author}
                    </p>

                    <p className="text-white/60 text-sm mt-3 max-w-2xl leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* ACTION PANEL */}
                  <div className="flex flex-col gap-2 min-w-[180px]">

                    <a
                      href={book.pdf.replace("/preview", "/view")}
                      target="_blank"
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs text-center"
                    >
                      Open in New Tab
                    </a>

                    <a
                      href={book.pdf.replace("/preview", "/export?format=pdf")}
                      target="_blank"
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 text-xs text-center"
                    >
                      Download PDF
                    </a>

                    <div className="px-3 py-2 rounded-lg bg-white/5 text-white/50 text-xs text-center">
                      Book #{book.id}
                    </div>
                  </div>
                </div>

                {/* INNER NESTED FRAME */}
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