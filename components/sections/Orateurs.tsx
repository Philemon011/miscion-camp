"use client";

import { motion, Variants } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const item:Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const mainSpeaker = {
  name: "Pasteur Paul Houènou",
  role: "Orateur principal",
  bio: "Fondateur du ministère Nouvelle Génération à Cotonou, reconnu pour des messages directs et porteurs de transformation.",
  image: "/images/pasts/past2.png",
};

const speakers = [
  { name: "Pasteur Charles Agossou", role: "Enseignant", bio: "Responsable du département jeunesse de l'église MISCION.", image: "/images/pasts/past3.png" },
];

export default function Orateurs() {
  return (
    <section className="bg-cream px-6 py-20 md:py-28">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-5xl mx-auto">
        <div className="text-center">
          <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">Les orateurs</motion.p>
          <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">Des voix qui vont marquer cette saison</motion.h2>
        </div>

        <motion.div variants={item} className="mt-14 bg-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
          <img src={mainSpeaker.image} alt={mainSpeaker.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shrink-0" />
          <div>
            <p className="font-body text-secondary text-xs font-semibold tracking-[0.15em] uppercase">{mainSpeaker.role}</p>
            <h3 className="font-display uppercase text-dark text-2xl md:text-3xl mt-1">{mainSpeaker.name}</h3>
            <p className="font-body text-dark/70 text-sm md:text-base mt-3 max-w-md">{mainSpeaker.bio}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {speakers.map((s) => (
            <motion.div key={s.name} variants={item} className="bg-white rounded-2xl p-6 text-center group">
              <img src={s.image} alt={s.name} className="w-24 h-24 rounded-full object-cover mx-auto transition-transform duration-300 group-hover:scale-105" />
              <p className="font-body text-secondary text-xs font-semibold tracking-[0.15em] uppercase mt-4">{s.role}</p>
              <h3 className="font-display uppercase text-dark text-base mt-1">{s.name}</h3>
              <p className="font-body text-dark/70 text-sm mt-2">{s.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}