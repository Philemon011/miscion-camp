"use client";

import { motion, Variants } from "framer-motion";
import { Feather, Wind, Eye, Compass } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const facets = [
  { icon: Feather, title: "Renouveler ses forces", text: "L'aigle qui mue ne recule pas : il se prépare à voler plus haut. Cette saison, certaines choses doivent tomber pour que d'autres puissent pousser." },
  { icon: Wind, title: "Voler au-dessus de la tempête", text: "Contrairement aux autres oiseaux qui se cachent, l'aigle utilise le vent de la tempête pour s'élever encore plus haut." },
  { icon: Eye, title: "Une vision plus loin", text: "L'aigle voit ce que les autres ne voient pas encore. Cette saison veut ouvrir tes yeux sur ton appel." },
  { icon: Compass, title: "Un nouveau territoire", text: "Une nouvelle saison, c'est un nouveau terrain à conquérir — pas juste une année de plus qui passe." },
];

export default function Theme() {
  return (
    <section className="relative bg-cream px-6 py-20 md:py-28 overflow-hidden">
      <Feather className="absolute -top-10 right-0 w-72 h-72 text-dark/5 -rotate-12" aria-hidden />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative max-w-4xl mx-auto text-center">
        <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">
          Le thème 2026
        </motion.p>
        <motion.h2 variants={item} className="font-display uppercase text-dark text-4xl md:text-6xl leading-tight mt-3">
          Les Aigles de<br />la Nouvelle Saison
        </motion.h2>
        <motion.p variants={item} className="font-body text-dark/70 text-base md:text-lg max-w-2xl mx-auto mt-6">
          L'aigle ne fuit jamais la tempête — il s'en sert pour s'élever. C'est l'image de ce que cette saison veut faire en toi : pas t'éviter les épreuves, mais te faire voler au-dessus.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 text-left">
          {facets.map(({ icon: Icon, title, text }) => (
            <motion.div key={title} variants={item} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-viral/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-dark" />
              </div>
              <div>
                <h3 className="font-display uppercase text-dark text-base md:text-lg">{title}</h3>
                <p className="font-body text-dark/70 text-sm mt-2">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}