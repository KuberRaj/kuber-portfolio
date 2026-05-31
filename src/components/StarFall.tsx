"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Dust {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function StarFall() {
  // const [dust, setDust] = useState<Dust[]>([]);

  const [dust] = useState<Dust[]>(() =>
    Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2.8 + 0.8,
      duration: Math.random() * 16 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05,
    })),
  );

  // useEffect(() => {
  //   const arr = Array.from({ length: 90 }).map((_, i) => ({
  //     id: i,
  //     x: Math.random() * 100,
  //     size: Math.random() * 2.8 + 0.8,
  //     duration: Math.random() * 16 + 10,
  //     delay: Math.random() * 5,
  //     opacity: Math.random() * 0.15 + 0.05,
  //   }));

  //   setDust(arr);
  // }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {dust.map((d) => (
        <motion.div
          key={d.id}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh", opacity: d.opacity }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${d.x}vw`,
            width: d.size,
            height: d.size,
            background: "white",
            filter: "blur(1px)",
            borderRadius: "50%",
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
}
