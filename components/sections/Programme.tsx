"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const program = [
  { day: "Jour 1", date: "Mer. 03/08", label: "Arrivée", items: [
    { time: "14h00", title: "Accueil & installation" },
    { time: "18h00", title: "Dîner de bienvenue" },
    { time: "20h00", title: "Soirée d'ouverture — lancement du thème" },
  ]},
  { day: "Jour 2", date: "Jeu. 04/08", label: "Renouveler ses forces", items: [
    { time: "07h00", title: "Réveil & petit-déjeuner" },
    { time: "09h00", title: "Louange & enseignement" },
    { time: "15h00", title: "Ateliers au choix" },
    { time: "20h00", title: "Soirée de célébration" },
  ]},
  { day: "Jour 3", date: "Ven. 05/08", label: "Voler au-dessus de la tempête", items: [
    { time: "07h00", title: "Réveil & petit-déjeuner" },
    { time: "09h00", title: "Louange & enseignement" },
    { time: "15h00", title: "Sport & détente" },
    { time: "20h00", title: "Soirée témoignages" },
  ]},
  { day: "Jour 4", date: "Sam. 06/08", label: "Une vision plus loin", items: [
    { time: "07h00", title: "Réveil & petit-déjeuner" },
    { time: "09h00", title: "Louange & enseignement" },
    { time: "15h00", title: "Ateliers au choix" },
    { time: "20h00", title: "Nuit de prière" },
  ]},
  { day: "Jour 5", date: "Dim. 07/08", label: "Culte & repos", items: [
    { time: "08h00", title: "Culte du dimanche" },
    { time: "14h00", title: "Temps libre & jeux" },
    { time: "20h00", title: "Grande soirée de feu" },
  ]},
  { day: "Jour 6", date: "Lun. 08/08", label: "Un nouveau territoire", items: [
    { time: "07h00", title: "Réveil & petit-déjeuner" },
    { time: "09h00", title: "Service de clôture" },
    { time: "12h00", title: "Déjeuner final & départs" },
  ]},
];

export default function Programme() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-cream px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="font-body text-secondary text-sm font-semibold tracking-[0.2em] uppercase">Le programme</p>
        <h2 className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">6 jours, une seule direction</h2>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-12 px-1 max-w-3xl mx-auto md:justify-center">
        {program.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setActive(i)}
            className={`shrink-0 px-5 py-2.5 rounded-full font-body text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
              active === i ? "bg-cta text-dark" : "bg-white text-dark/60"
            }`}
          >
            {d.day} · {d.date}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-8 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-2xl p-6 md:p-8"
          >
            <p className="font-display uppercase text-viral text-sm tracking-wide">{program[active].label}</p>
            <ul className="mt-5 space-y-4">
              {program[active].items.map((item) => (
                <li key={item.time} className="flex gap-4 items-start">
                  <span className="font-body text-dark/50 text-sm w-16 shrink-0">{item.time}</span>
                  <span className="font-body text-dark text-sm md:text-base">{item.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}