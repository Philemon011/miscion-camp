"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Menu } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Vision", href: "vision" },
  { label: "Thème", href: "theme" },
  { label: "Programme", href: "programme" },
  { label: "Orateurs", href: "orateurs" },
  { label: "Infos", href: "infos" },
  { label: "FAQ", href: "faq" },
];

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const linkVariants : Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const linkItem : Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Logo PNG */}
        <button onClick={() => scrollToSection("hero")} className="relative h-9 w-32">
          <Image
            src="/images/logo.png"
            alt="MISCION Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </button>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-dark/70 text-sm font-medium hover:text-dark transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <motion.a
            href="TON_LIEN_GOOGLE_FORM"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,189,63,0.5)" }}
            transition={{ duration: 0.3 }}
            className="hidden sm:inline-flex bg-cta text-dark font-body font-semibold text-sm px-5 py-2.5 rounded-full"
          >
            Je m'inscris
          </motion.a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-dark/5 hover:bg-dark/10 transition-colors duration-300"
            aria-label="Menu"
          >
            {open
              ? <X className="w-4 h-4 text-dark" />
              : <Menu className="w-4 h-4 text-dark" />
            }
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center"
          >
            <motion.ul
              variants={linkVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center gap-8 text-center"
            >
              {navLinks.map((link) => (
                <motion.li key={link.label} variants={linkItem}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-display uppercase text-dark text-4xl hover:text-viral transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}

              <motion.li variants={linkItem}>
                
                <a  href="TON_LIEN_GOOGLE_FORM"
                  className="inline-flex bg-cta text-dark font-body font-semibold px-8 py-4 rounded-full mt-4"
                >
                  Je m'inscris
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}