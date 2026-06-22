"use client";

import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import ImageCarousel from "../ImageCarousel";
import Link from 'next/link'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative bg-cream overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-viral/20 rounded-full blur-3xl" aria-hidden />
      <div className="absolute bottom-0 -left-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" aria-hidden />

      <motion.div variants={container} initial="hidden" animate="show" className="relative max-w-3xl mx-auto text-center">
        <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">
          Les Aigles de la Nouvelle Saison
        </motion.p>

        <motion.h1 variants={item} className="font-display uppercase text-dark text-[15vw] leading-[0.95] md:text-7xl mt-3">
          MISCION<br />CAMP 2026
        </motion.h1>

        <motion.div variants={item} className="inline-flex bg-cta text-dark text-sm font-body font-medium px-4 py-2 rounded-full mt-6">
          03 – 08 AOÛT 2026 · COTONOU, BÉNIN
        </motion.div>

        <motion.p variants={item} className="font-body text-dark text-base md:text-lg max-w-xl mx-auto mt-6">
          Comme l'aigle qui prend de l'altitude avant la tempête, cette saison est faite pour t'élever au-dessus de tout ce qui t'a retenu.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <motion.a href="https://docs.google.com/forms/d/e/1FAIpQLSd-bt7jAF14RwhFxicSLv3DWtkAsr9bon0D2qyLP0ZOh6_mUg/viewform?usp=dialog"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,189,63,0.6)" }}
            transition={{ duration: 0.3 }}
            className="bg-cta text-dark font-body font-semibold px-8 py-4 rounded-full">
            Je veux m'inscris maintenant !
          </motion.a>
          <motion.a href="/visuel"
            whileHover={{ borderColor: "#301D0F" }}
            transition={{ duration: 0.3 }}
            className="border-2 border-dark/20 text-dark font-body font-medium px-8 py-4 rounded-full">
            Générer mon image
          </motion.a>
          {/* <Link href="/jy-serai">
            <button className="bg-[#FFBD3F] text-[#301D0F] font-bold px-6 py-3 rounded-xl uppercase">
              Générer mon image
            </button>
          </Link> */}
        </motion.div>

        <ImageCarousel
          images={[
            "/images/forma-profil.jpg",
            "/images/tsh.jpg",
            "/images/forma-profil2.jpg",
            "/images/forma-profil3.jpg",
            // "/images/img3.jpg",
            // "/images/img4.jpg",
            // "/images/img5.jpg",
            // "/images/essai.png",
            // "/images/quote-1.jpg",
            // "/images/quote-3.jpg",
            // "/images/pasts/past3.png",
          ]}
          alt="Jeunes au camp MISCION"
        />
      </motion.div>
    </section>
  );
}