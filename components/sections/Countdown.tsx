"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";

const TARGET_DATE = new Date("2026-08-03T00:00:00");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item :Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <section id="countdown" className="bg-cream px-6 py-20 md:py-28">
    <motion.div variants={item} className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute font-display text-dark text-3xl md:text-4xl"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 font-body text-xs md:text-sm uppercase tracking-widest text-dark">{label}</span>
    </motion.div>
    </section>
  );
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-cream px-6 py-20 md:py-28">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
        <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">
          L'envol approche
        </motion.p>
        <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">
          Le compte à rebours a commencé
        </motion.h2>

        <div className="flex justify-center gap-3 sm:gap-5 md:gap-8 mt-12">
          <CountdownUnit value={time.days} label="Jours" />
          <CountdownUnit value={time.hours} label="Heures" />
          <CountdownUnit value={time.minutes} label="Minutes" />
          <CountdownUnit value={time.seconds} label="Secondes" />
        </div>
      </motion.div>
    </section>
  );
}