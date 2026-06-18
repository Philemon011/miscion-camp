"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Wallet, Bed, Users, MessageCircle, CheckCircle2 } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item:Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const infos = [
  { icon: MapPin, label: "Lieu", value: "Centre MISCION, Route de Calavi, Cotonou" },
  { icon: Wallet, label: "Tarif", value: "15 000 FCFA — hébergement, repas et kit du camp inclus" },
  { icon: Bed, label: "Hébergement", value: "Dortoirs collectifs sur le site" },
  { icon: Users, label: "Âge requis", value: "15 à 30 ans" },
];

const packingList = [
  "Bible et carnet de notes",
  "Natte ou matelas léger + draps",
  "Vêtements pour 6 jours",
  "Nécessaire de toilette",
  "Gourde réutilisable",
];

export default function InfosPratiques() {
  return (
    <section id="infos" className="bg-cream px-6 py-20 md:py-28">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-4xl mx-auto">
        <div className="text-center">
          <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">Infos pratiques</motion.p>
          <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">Tout savoir avant de t'inscrire</motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {infos.map(({ icon: Icon, label, value }) => (
            <motion.div key={label} variants={item} className="bg-white rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-dark" />
              </div>
              <div>
                <p className="font-body text-dark/50 text-xs uppercase tracking-wide">{label}</p>
                <p className="font-body text-dark text-sm md:text-base mt-1">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="bg-white rounded-2xl p-6 md:p-8 mt-5">
          <p className="font-body text-dark/50 text-xs uppercase tracking-wide">À emporter</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {packingList.map((p) => (
              <li key={p} className="flex items-center gap-2 font-body text-dark text-sm">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-center gap-2 mt-8">
          <MessageCircle className="w-4 h-4 text-dark/50" />
          <a href="https://wa.me/22900000000" className="font-body text-dark/70 text-sm underline">
            Une question ? Écris-nous sur WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}