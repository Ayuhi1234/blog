"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
