"use client";

import { motion, Variants } from "framer-motion";
import { Flame, Users, Sparkles } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const pillars = [
  { icon: Flame, title: "Rencontre", text: "Vivre une rencontre authentique avec Dieu, sans filtre ni religiosité forcée." },
  { icon: Users, title: "Connexion", text: "Te retrouver parmi des jeunes qui portent la même quête et le même feu." },
  { icon: Sparkles, title: "Transformation", text: "Repartir différent : la nouvelle saison commence ici, pas après le camp." },
];

export default function Vision() {
  return (
    <section id="vision" className="bg-cream px-6 py-20 md:py-28">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-5xl mx-auto text-center">
        <motion.p variants={item} className="font-body text-secondary text-sm font-semibold tracking-[0.2em] uppercase">
          Notre vision
        </motion.p>
        <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3 max-w-2xl mx-auto">
          Une génération qui s'élève, ensemble
        </motion.h2>
        <motion.p variants={item} className="font-body text-dark/70 text-base md:text-lg max-w-xl mx-auto mt-5">
          MISCION CAMP n'est pas un simple rassemblement. C'est l'endroit où une génération entière prend de la hauteur — spirituellement, personnellement, collectivement.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 text-left">
          {pillars.map(({ icon: Icon, title, text }) => (
            <motion.div key={title} variants={item} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-dark" />
              </div>
              <h3 className="font-display uppercase text-dark text-lg mt-4">{title}</h3>
              <p className="font-body text-dark/70 text-sm mt-2">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}