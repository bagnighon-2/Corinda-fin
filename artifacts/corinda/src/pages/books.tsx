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
      "A sociological study of confidence tricks and professional con artists in early 20th-century America, focusing on scam structures and criminal psychology.",
    pdf: driveLinks[0],
    color: "from-purple-500 to-indigo-700",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    id: 2,
    title: "The Definitive Book of Body Language",
    author: "Allan Pease & Barbara Pease",
    description:
      "A comprehensive guide to interpreting nonverbal communication such as gestures, posture, facial expressions, and social signaling.",
    pdf: driveLinks[1],
    color: "from-fuchsia-500 to-pink-600",
    glow: "rgba(232,121,249,0.4)",
  },
  {
    id: 3,
    title: "The Confidence Game",
    author: "Maria Konnikova",
    description:
      "An analysis of why intelligent people fall for scams, focusing on psychological vulnerability and manipulation tactics.",
    pdf: driveLinks[2],
    color: "from-rose-400 to-red-600",
    glow: "rgba(251,113,133,0.4)",
  },
  {
    id: 4,
    title: "Mastermind: How to Think Like Sherlock Holmes",
    author: "Maria Konnikova",
    description:
      "Explores cognitive strategies used by Sherlock Holmes, emphasizing attention, logic, and controlled thinking.",
    pdf: driveLinks[3],
    color: "from-cyan-400 to-blue-600",
    glow: "rgba(34,211,238,0.4)",
  },
  {
    id: 5,
    title: "The Like Switch",
    author: "Jack Schafer & Marvin Karlins",
    description:
      "FBI behavioral analysis techniques for building rapport, trust, and social influence.",
    pdf: driveLinks[4],
    color: "from-sky-400 to-blue-600",
    glow: "rgba(56,189,248,0.4)",
  },
  {
    id: 6,
    title: "Practical Mental Magic",
    author: "Theodore Annemann",
    description:
      "Foundational mentalism techniques including psychological illusions and prediction methods.",
    pdf: driveLinks[5],
    color: "from-cyan-400 to-indigo-600",
    glow: "rgba(34,211,238,0.4)",
  },
  {
    id: 7,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    description:
      "Classic interpersonal communication, persuasion, and social effectiveness principles.",
    pdf: driveLinks[6],
    color: "from-yellow-400 to-amber-600",
    glow: "rgba(250,204,21,0.4)",
  },
  {
    id: 8,
    title: "Moonwalking with Einstein",
    author: "Joshua Foer",
    description:
      "Memory training, mnemonic systems, and competitive memorization techniques.",
    pdf: driveLinks[7],
    color: "from-green-400 to-emerald-600",
    glow: "rgba(74,222,128,0.4)",
  },
  {
    id: 9,
    title: "Trance-Formations",
    author: "Bandler & Grinder",
    description:
      "NLP, hypnosis, and behavioral modeling systems.",
    pdf: driveLinks[8],
    color: "from-indigo-400 to-purple-600",
    glow: "rgba(99,102,241,0.4)",
  },
  {
    id: 10,
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    description:
      "Human behavior patterns, ego systems, and social strategy frameworks.",
    pdf: driveLinks[9],
    color: "from-stone-400 to-zinc-600",
    glow: "rgba(161,161,170,0.4)",
  },
  {
    id: 11,
    title: "Telling Lies",
    author: "Paul Ekman",
    description:
      "Micro-expressions and deception detection science.",
    pdf: driveLinks[10],
    color: "from-rose-400 to-red-600",
    glow: "rgba(251,113,133,0.4)",
  },
  {
    id: 12,
    title: "You Can Have an Amazing Memory",
    author: "Dominic O’Brien",
    description:
      "Advanced memory palace and visualization systems.",
    pdf: driveLinks[11],
    color: "from-emerald-400 to-teal-600",
    glow: "rgba(52,211,153,0.4)",
  },
  {
    id: 13,
    title: "Never Split the Difference",
    author: "Chris Voss",
    description:
      "Negotiation tactics using tactical empathy and psychological calibration.",
    pdf: driveLinks[12],
    color: "from-orange-400 to-red-600",
    glow: "rgba(251,146,60,0.4)",
  },
  {
    id: 14,
    title: "Thirteen Steps to Mentalism",
    author: "Tony Corinda",
    description:
      "Complete structured system of mentalism performance techniques.",
    pdf: driveLinks[13],
    color: "from-purple-500 to-indigo-700",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    id: 15,
    title: "Pre-Suasion",
    author: "Robert Cialdini",
    description:
      "Attention shaping before persuasion occurs.",
    pdf: driveLinks[14],
    color: "from-yellow-400 to-amber-600",
    glow: "rgba(250,204,21,0.4)",
  },
  {
    id: 16,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    description:
      "Power dynamics and strategic social manipulation systems.",
    pdf: driveLinks[15],
    color: "from-stone-500 to-black",
    glow: "rgba(0,0,0,0.4)",
  },
  {
    id: 17,
    title: "Psychology of Intelligence Analysis",
    author: "Heuer Jr.",
    description:
      "Cognitive bias in intelligence reasoning systems.",
    pdf: driveLinks[16],
    color: "from-blue-400 to-indigo-600",
    glow: "rgba(59,130,246,0.4)",
  },
  {
    id: 18,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description:
      "Dual-system cognition and bias analysis.",
    pdf: driveLinks[17],
    color: "from-amber-400 to-yellow-600",
    glow: "rgba(250,204,21,0.4)",
  },
  {
    id: 19,
    title: "Designing Miracles",
    author: "Darwin Ortiz",
    description:
      "Magic deception design theory.",
    pdf: driveLinks[18],
    color: "from-violet-400 to-fuchsia-600",
    glow: "rgba(192,132,252,0.4)",
  },
  {
    id: 20,
    title: "The Ellipsis Manual",
    author: "Chase Hughes",
    description:
      "Real-time behavioral analysis systems.",
    pdf: driveLinks[19],
    color: "from-teal-400 to-cyan-600",
    glow: "rgba(45,212,191,0.4)",
  },
  {
    id: 21,
    title: "Games People Play",
    author: "Eric Berne",
    description:
      "Transactional analysis of social interaction patterns.",
    pdf: driveLinks[20],
    color: "from-pink-400 to-rose-600",
    glow: "rgba(244,114,182,0.4)",
  },
  {
    id: 22,
    title: "What Every Body Is Saying",
    author: "Joe Navarro",
    description:
      "Nonverbal behavioral decoding.",
    pdf: driveLinks[21],
    color: "from-green-400 to-emerald-600",
    glow: "rgba(74,222,128,0.4)",
  },
  {
    id: 23,
    title: "Deception & Self-Deception",
    author: "Richard Wiseman",
    description:
      "Psychological blind spots and deception research.",
    pdf: driveLinks[22],
    color: "from-gray-400 to-slate-600",
    glow: "rgba(148,163,184,0.4)",
  },
  {
    id: 24,
    title: "Impro: Improvisation and the Theatre",
    author: "Keith Johnstone",
    description:
      "Spontaneity and social dynamics through improv.",
    pdf: driveLinks[23],
    color: "from-orange-400 to-amber-600",
    glow: "rgba(251,146,60,0.4)",
  },
  {
    id: 25,
    title: "Strong Magic",
    author: "Darwin Ortiz",
    description:
      "Performance theory in magic deception.",
    pdf: driveLinks[24],
    color: "from-indigo-500 to-blue-700",
    glow: "rgba(99,102,241,0.4)",
  },
  {
    id: 26,
    title: "Sleights of Mind",
    author: "Macknik & others",
    description:
      "Neuroscience of attention and illusion.",
    pdf: driveLinks[25],
    color: "from-cyan-400 to-sky-600",
    glow: "rgba(56,189,248,0.4)",
  },
  {
    id: 27,
    title: "Left of Bang",
    author: "Van Horne & Riley",
    description:
      "Behavioral threat detection system.",
    pdf: driveLinks[26],
    color: "from-red-400 to-rose-600",
    glow: "rgba(248,113,113,0.4)",
  },
  {
    id: 28,
    title: "Influence",
    author: "Robert Cialdini",
    description:
      "Core persuasion principles and behavioral psychology.",
    pdf: driveLinks[27],
    color: "from-yellow-400 to-amber-600",
    glow: "rgba(250,204,21,0.4)",
  },

  // REPEATS (as requested)
  {
    id: 29,
    title: "The Big Con (Revisited)",
    author: "David W. Maurer",
    description:
      "Sociological study of scams and con structures.",
    pdf: driveLinks[28],
    color: "from-purple-500 to-indigo-700",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    id: 30,
    title: "The Definitive Book of Body Language (Revisited)",
    author: "Allan & Barbara Pease",
    description:
      "Nonverbal communication decoding system.",
    pdf: driveLinks[29],
    color: "from-fuchsia-500 to-pink-600",
    glow: "rgba(232,121,249,0.4)",
  },
  {
    id: 31,
    title: "The Confidence Game (Revisited)",
    author: "Maria Konnikova",
    description:
      "Psychology of scams and manipulation.",
    pdf: driveLinks[30],
    color: "from-rose-400 to-red-600",
    glow: "rgba(251,113,133,0.4)",
  },
];

export default function Books() {
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-serif text-white/90">The Library</h1>
      </motion.div>

      <div className="space-y-24">
        {books.map((book) => (
          <motion.div key={book.id}>
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-serif bg-clip-text text-transparent bg-gradient-to-r ${book.color}`}>
                  {book.title}
                </h2>
                <p className="text-white/50 text-sm">{book.author}</p>
                <p className="text-white/60 text-sm mt-2 max-w-2xl">
                  {book.description}
                </p>
              </div>

              <a
                href={book.pdf.replace("/preview", "/view")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-white/70 hover:text-white"
              >
                Open in new tab →
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={book.pdf}
                width="100%"
                height="750px"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}