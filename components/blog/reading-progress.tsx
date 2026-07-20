"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-16 z-40 h-[2.5px] origin-left bg-gradient-to-r from-brand-blue via-brand-purple to-brand-emerald"
      style={{ scaleX }}
    />
  );
}
