"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { MessageCircle, CheckCircle2 } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const colors = [
  { id: "noir", label: "Noir", image: "/images/tshirt/tshirt-noir.png", hex: "#1A1A1A" },
  { id: "beige", label: "Beige", image: "/images/tshirt/tshirt-beige.png", hex: "#D4B896" },
  { id: "turquoise", label: "Vert Turquoise", image: "/images/tshirt/tshirt-turquoise.png", hex: "#2ABFBF" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const WHATSAPP_NUMBER = "22953877004";

export default function Tshirt() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const buildWhatsAppLink = () => {
    const message = selectedSize
      ? `Bonjour, je voudrais commander un T-shirt MISCION CAMP 2026 en couleur *${selectedColor.label}*, taille *${selectedSize}*. Merci de me confirmer la disponibilité et les modalités de paiement.`
      : `Bonjour, je suis intéressé par les T-shirts MISCION CAMP 2026. Pouvez-vous m'informer sur les couleurs et tailles disponibles ?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="tshirt" className="bg-cream px-6 py-20 md:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p variants={item} className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">
            Collection officielle
          </motion.p>
          <motion.h2 variants={item} className="font-display uppercase text-dark text-3xl md:text-5xl mt-3">
            T-shirt MISCION CAMP 2026
          </motion.h2>
          <motion.p variants={item} className="font-body text-dark/60 text-base mt-4 max-w-md mx-auto">
            Porte les couleurs du camp avant, pendant et après. Choisis ta couleur et ta taille, on s'occupe du reste sur WhatsApp.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Aperçu T-shirt */}
          <motion.div variants={item} className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={selectedColor.image}
              alt={`T-shirt MISCION ${selectedColor.label}`}
              fill
              className="object-contain p-8 transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Sélecteurs + CTA */}
          <motion.div variants={item} className="flex flex-col gap-8">

            {/* Choix couleur */}
            <div>
              <p className="font-body text-dark/50 text-xs uppercase tracking-widest mb-4">
                Couleur — <span className="text-dark font-semibold">{selectedColor.label}</span>
              </p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 ${
                      selectedColor.id === color.id
                        ? "ring-2 ring-offset-2 ring-dark scale-110"
                        : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Couleur ${color.label}`}
                  >
                    {selectedColor.id === color.id && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2
                          className="w-5 h-5"
                          style={{ color: color.id === "beige" ? "#301D0F" : "#FFFBD5" }}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Choix taille */}
            <div>
              <p className="font-body text-dark/50 text-xs uppercase tracking-widest mb-4">
                Taille{selectedSize ? ` — ${selectedSize}` : ""}
              </p>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-dark text-cream scale-105"
                        : "bg-white text-dark hover:bg-dark/5"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Note taille */}
            <p className="font-body text-dark/40 text-xs -mt-4">
              Tu n'es pas sûr de ta taille ? Précise-le dans le message, le support t'aidera.
            </p>

            {/* CTA WhatsApp */}
            <div className="flex flex-col gap-3">
              <motion.a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(255,189,63,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3 bg-cta text-dark font-body font-semibold px-6 py-4 rounded-full"
              >
                <MessageCircle className="w-5 h-5" />
                {selectedSize
                  ? `Commander — ${selectedColor.label} / ${selectedSize}`
                  : "Commander via WhatsApp"
                }
              </motion.a>

              <p className="font-body text-dark/40 text-xs text-center">
                Redirigé vers WhatsApp · Confirmation et paiement avec le support
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}