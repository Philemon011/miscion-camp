"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item :Variants= { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const faqs = [
  {
    q: "Qui peut participer au MISCION CAMP 2026 ?",
    a: "Tout jeune âgé de 15 à 30 ans, qu'il soit membre de l'église MISCION ou non. Le camp est ouvert à tous ceux qui souhaitent vivre cette expérience.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Après avoir soumis le formulaire d'inscription, tu recevras les instructions de paiement par WhatsApp. Les frais de 15 000 FCFA couvrent l'hébergement, les repas et le kit du camp.",
  },
  {
    q: "Les repas sont-ils inclus ?",
    a: "Oui, les trois repas de la journée sont inclus du jour 1 (dîner) au jour 6 (déjeuner final). Signale toute allergie alimentaire lors de l'inscription.",
  },
  {
    q: "Puis-je venir sans connaître personne ?",
    a: "Absolument. Le camp est conçu pour créer des liens dès le premier soir — la soirée d'ouverture est pensée exprès pour que personne ne reste seul.",
  },
  {
    q: "Y a-t-il un transport organisé ?",
    a: "Des points de rassemblement seront communiqués à Cotonou et Porto-Novo après validation de l'inscription. Précise ta ville dans le formulaire.",
  },
  {
    q: "Puis-je venir pour quelques jours seulement ?",
    a: "Le camp est conçu comme une expérience continue sur 6 jours et nous recommandons de participer à l'intégralité. Si tu as une contrainte particulière, contacte-nous sur WhatsApp.",
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (

    <motion.div variants={item} className="border-b border-dark/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-dark text-sm md:text-base pr-4">{faq.q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-cta flex items-center justify-center transition-transform duration-300">
          {open
            ? <Minus className="w-3.5 h-3.5 text-dark" />
            : <Plus className="w-3.5 h-3.5 text-dark" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-dark/70 text-sm md:text-base pb-5 max-w-xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream px-6 py-20 md:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.p variants={item} className="font-body text-secondary text-sm font-semibold tracking-[0.2em] uppercase">
            FAQ
          </motion.p>
          <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">
            Tu as des questions ?
          </motion.h2>
          <motion.p variants={item} className="font-body text-dark/60 text-sm md:text-base mt-4">
            On a les réponses. Si tu n'en trouves pas une ici, écris-nous sur WhatsApp.
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl px-6 md:px-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.div variants={item} className="text-center mt-8">
          
         <a   href="https://wa.me/22900000000"
            className="inline-flex items-center gap-2 font-body text-dark/60 text-sm underline underline-offset-4 hover:text-dark transition-colors duration-300"
          >
            Une autre question ? Contacte-nous sur WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}