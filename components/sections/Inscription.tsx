"use client";

import { motion, Variants } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const item : Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function Inscription() {
  return (
    <section id="inscription" className="relative bg-dark px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-viral/10 rounded-full blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" aria-hidden />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative max-w-2xl mx-auto text-center">
        <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">
          Dernière étape
        </motion.p>
        <motion.h2 variants={item} className="font-display uppercase text-cream text-4xl md:text-6xl mt-3">
          Ton envol commence ici
        </motion.h2>
        <motion.p variants={item} className="font-body text-cream/70 text-base md:text-lg mt-5">
          Les places sont limitées. Inscris-toi dès maintenant pour vivre les 6 jours du 03 au 08 août 2026.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="TON_LIEN_GOOGLE_FORM"
            className="bg-cta text-dark font-body font-semibold px-10 py-4 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,189,63,0.5)]">
            Je m'inscris maintenant
          </a>
          <a href="https://wa.me/22900000000"
            className="border-2 border-cream/30 text-cream font-body font-medium px-10 py-4 rounded-full transition-colors duration-300 hover:border-cream">
            Une question ? WhatsApp
          </a>
        </motion.div>

        <motion.p variants={item} className="font-body text-cream/40 text-xs mt-6">
          Inscription via Google Form · Confirmation par WhatsApp sous 24h
        </motion.p>
      </motion.div>
    </section>
  );
}