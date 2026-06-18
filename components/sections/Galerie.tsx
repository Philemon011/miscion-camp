"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const row1 = [
  "/images/forma-profil.jpg",
  "/images/forma-profil2.jpg",
  "/images/forma-profil3.jpg",
];
const row2 = [
  "/images/forma-profil.jpg",
  "/images/forma-profil2.jpg",
  "/images/forma-profil3.jpg",
];
const row3 = [
  "/images/forma-profil.jpg",
  "/images/forma-profil2.jpg",
  "/images/forma-profil3.jpg",
];

function MarqueeRow({ images, direction, speed = 40 }: { images: string[]; direction: "left" | "right"; speed?: number }) {
  const anim = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  return (
    <div className="group overflow-hidden">
      <div
        className={`flex gap-4 w-max ${anim} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative h-40 md:h-56 w-64 md:w-80 shrink-0 rounded-xl overflow-hidden">
            <Image src={src} alt="Souvenir MISCION" fill className="object-cover" sizes="320px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Galerie() {
  return (
    <section className="relative bg-cream py-20 md:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center px-6"
      >
        <p className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">Galerie</p>
        <h2 className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">Un avant-goût de l'envol</h2>
      </motion.div>

      <div className="relative mt-14 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <MarqueeRow images={row1} direction="left" speed={35} />
        <MarqueeRow images={row2} direction="right" speed={50} />
        <MarqueeRow images={row3} direction="left" speed={28} />
      </div>
    </section>
  );
}