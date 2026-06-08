"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setProgress(pct);
      spring.set(pct);
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [spring]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px]"
      style={{ background: "transparent" }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: spring,
          background: "linear-gradient(to right, var(--accent), #a78bfa)",
        }}
      />
    </div>
  );
}
