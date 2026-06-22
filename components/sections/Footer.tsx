"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const navLinks = [
  { label: "Vision", href: "#vision" },
  { label: "Thème", href: "#theme" },
  { label: "Programme", href: "#programme" },
  { label: "Orateurs", href: "#orateurs" },
  { label: "Infos pratiques", href: "#infos" },
  { label: "FAQ", href: "#faq" },
];

type IconProps = { className?: string };

const FacebookIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const socials: { icon: (props: IconProps) => React.ReactElement; href: string; label: string }[] = [
  { icon: InstagramIcon, href: "https://instagram.com/", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com/", label: "Facebook" },
  { icon: WhatsAppIcon, href: "https://wa.me/22900000000", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark px-6 pt-20 pb-10 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-viral/5 rounded-full blur-3xl" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">

          {/* Colonne 1 — Identité */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start gap-4">
            <h2 className="font-display uppercase text-cream text-3xl leading-none">
              MISCION<br />CAMP 2026
            </h2>
            <p className="font-body text-cream/50 text-sm max-w-[220px]">
              Les Aigles de la Nouvelle Saison · 03 – 08 Août 2026 · Cotonou, Bénin
            </p>
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd-bt7jAF14RwhFxicSLv3DWtkAsr9bon0D2qyLP0ZOh6_mUg/viewform?usp=dialog"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(255,189,63,0.5)" }}
              transition={{ duration: 0.3 }}
              className="inline-block bg-cta text-dark font-body font-semibold text-sm px-6 py-3 rounded-full mt-2"
            >
              Je m'inscris
            </motion.a>
          </motion.div>

          {/* Colonne 2 — Navigation */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start gap-3">
            <p className="font-body text-cream/30 text-xs uppercase tracking-widest mb-1">Navigation</p>
            {navLinks.map((link) => (
              
               <a key={link.label}
                href={link.href}
                className="font-body text-cream/70 text-sm hover:text-cream transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Colonne 3 — Contact & réseaux */}
          <motion.div variants={item} className="flex flex-col items-center md:items-start gap-4">
            <p className="font-body text-cream/30 text-xs uppercase tracking-widest mb-1">Contact</p>
            
            <a   href="https://wa.me/22900000000"
              className="font-body text-cream/70 text-sm hover:text-cream transition-colors duration-300"
            >
              +229 00 00 00 00
            </a>
            
             <a  href="mailto:contact@miscion.com"
              className="font-body text-cream/70 text-sm hover:text-cream transition-colors duration-300"
            >
              contact@miscion.com
            </a>
            <div className="flex items-center gap-4 mt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.25 }}
                  className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-cream/60 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 text-cream/70" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Séparateur + copyright */}
        <motion.div
          variants={item}
          className="border-t border-cream/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center"
        >
          <p className="font-body text-cream/30 text-xs">
            © 2026 MISCION · Tous droits réservés
          </p>
          <p className="font-body text-cream/20 text-xs">
            Conçu avec soin par la com MISCION
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}