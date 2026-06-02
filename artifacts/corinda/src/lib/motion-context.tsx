import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface MotionContextType {
  reducedMotion: boolean;
  toggleMotion: () => void;
}

const MotionCtx = createContext<MotionContextType>({
  reducedMotion: false,
  toggleMotion: () => {},
});

export function useMotionPreference() {
  return useContext(MotionCtx);
}

function getInitialReduced(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("no-motion");
  if (saved !== null) return saved === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(getInitialReduced);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("no-motion");
    } else {
      document.documentElement.classList.remove("no-motion");
    }
    localStorage.setItem("no-motion", String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("no-motion");
      if (saved === null) setReducedMotion(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <MotionCtx.Provider value={{ reducedMotion, toggleMotion: () => setReducedMotion(v => !v) }}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </MotionCtx.Provider>
  );
}
