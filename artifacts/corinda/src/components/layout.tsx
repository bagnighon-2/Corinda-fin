import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { RiBook2Line, RiHomeLine, RiAlertFill, RiBrainLine } from "react-icons/ri";
import { FloatingEmojis } from "@/components/floating-emojis";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  if (location === "/emergency" || location === "/vision") {
    return <>{children}</>;
  }

  const emojiSeed = location === "/books" ? 99 : location === "/mentalism" ? 13 : location === "/vision" ? 7 : 42;
  const emojiCount = 20;

  return (
    <div className="min-h-screen bg-[#05050A] text-white selection:bg-fuchsia-500/30 font-sans relative overflow-hidden flex flex-col">
      <FloatingEmojis count={emojiCount} seed={emojiSeed} />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] rounded-full bg-purple-900/12 blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full bg-cyan-900/12 blur-[160px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-fuchsia-900/8 blur-[120px]" />
      </div>

      <nav className="relative z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif italic text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-400 hover:opacity-80 transition-opacity">
            The Complete Directory
          </Link>
          <div className="flex items-center gap-1 md:gap-2">
            <NavLink href="/" icon={<RiHomeLine />} label="Overview" active={location === "/"} />
            <NavLink href="/books" icon={<RiBook2Line />} label="Library" active={location === "/books"} />
            <NavLink href="/mentalism" icon={<RiBrainLine className="text-purple-400" />} label="13 Steps" active={location === "/mentalism"} mentalism />
            <NavLink href="/emergency" icon={<RiAlertFill className="text-green-400" />} label="Emergency" active={location === "/emergency"} emergency />
            <Link href="/vision" className="opacity-0 hover:opacity-100 transition-opacity duration-500 px-2 py-1 text-xs text-white/10 select-none">·</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#030305] py-6 text-center text-xs text-white/20">
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="tracking-widest uppercase">The Complete Directory</span>
          <span className="text-white/10">·</span>
          <span className="text-white/15">Mentalism · Influence · Illusions</span>
          <span className="text-white/10">·</span>
          <Link href="/vision" className="opacity-10 hover:opacity-60 transition-all duration-500 cursor-pointer">
            *
          </Link>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  href, icon, label, active, emergency, mentalism,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active: boolean;
  emergency?: boolean;
  mentalism?: boolean;
}) {
  return (
    <Link href={href}>
      <span className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-xs uppercase tracking-widest transition-all duration-200
        ${active
          ? emergency
            ? "text-green-300 bg-green-950/50 border border-green-700/40 shadow-[0_0_14px_rgba(74,222,128,0.15)]"
            : mentalism
              ? "text-purple-300 bg-purple-950/50 border border-purple-700/40 shadow-[0_0_14px_rgba(167,139,250,0.15)]"
              : "text-white bg-white/8 border border-white/15"
          : emergency
            ? "text-green-500/60 hover:text-green-300 hover:bg-green-950/30 border border-transparent hover:border-green-800/30"
            : mentalism
              ? "text-purple-500/60 hover:text-purple-300 hover:bg-purple-950/30 border border-transparent hover:border-purple-800/30"
              : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"
        }
      `}>
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </span>
    </Link>
  );
}
