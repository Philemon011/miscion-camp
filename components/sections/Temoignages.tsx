"use client";

import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const testimonials = [
  { quote: "Je suis venue sceptique, je suis repartie transformée. J'ai appris à voler au-dessus de mes peurs.", name: "Inès A.", meta: "22 ans · Cotonou", image: "https://placehold.co/300x300/png" },
  { quote: "La meilleure semaine de mon année. L'enseignement sur le thème de l'aigle m'a marqué profondément.", name: "Joël K.", meta: "19 ans · Porto-Novo", image: "https://placehold.co/300x300/png" },
  { quote: "J'ai rencontré des amis pour la vie, et surtout, j'ai rencontré Dieu d'une autre façon.", name: "Sarah M.", meta: "24 ans · Abomey-Calavi", image: "https://placehold.co/300x300/png" },
  { quote: "Je recommande à 100%. On repart vraiment différent.", name: "David T.", meta: "20 ans · Cotonou", image: "https://placehold.co/300x300/png" },
];

export default function Temoignages() {
  return (
    <section id="temoignages" className="bg-cream px-6 py-20 md:py-28">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-5xl mx-auto">
        <div className="text-center">
          <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">Témoignages</motion.p>
          <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">Ils ont vécu cette saison avant toi</motion.h2>
        </div>

        <motion.div variants={item} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory mt-14 pb-2">
          {testimonials.map((t) => (
            <div key={t.name} className="snap-start shrink-0 w-[85%] sm:w-[45%] md:w-[32%] bg-white rounded-2xl p-6 flex flex-col">
              <Quote className="w-6 h-6 text-secondary" />
              <p className="font-body text-dark text-sm md:text-base mt-4 flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 mt-6">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-body text-dark text-sm font-semibold">{t.name}</p>
                  <p className="font-body text-dark/50 text-xs">{t.meta}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}