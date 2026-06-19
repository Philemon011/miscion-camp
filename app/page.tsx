"use client";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Vision from "@/components/sections/Vision";
import Theme from "@/components/sections/Theme";
import Programme from "@/components/sections/Programme";
import Orateurs from "@/components/sections/Orateurs";
import InfosPratiques from "@/components/sections/InfosPratiques";
import Inscription from "@/components/sections/Inscription";
import Temoignages from "@/components/sections/Temoignages";
import Galerie from "@/components/sections/Galerie";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); // laisse le temps à la page de se monter
    }
  }, []);
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Countdown />
      <Vision />
      <Theme />
      <Programme />
      <Orateurs />
      <InfosPratiques />
      <Inscription />
      <Temoignages/>
      <Galerie />
      <FAQ />
      <Footer />
    </main>
  );
}