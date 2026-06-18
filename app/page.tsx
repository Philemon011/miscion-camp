import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Vision from "@/components/sections/Vision";
import Theme from "@/components/sections/Theme";
import Programme from "@/components/sections/Programme";
import Orateurs from "@/components/sections/Orateurs";
import InfosPratiques from "@/components/sections/InfosPratiques";
import Inscription from "@/components/sections/Inscription";
import Temoignages from "@/components/sections/Temoignages";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <Vision />
      <Theme />
      <Programme />
      <Orateurs />
      <InfosPratiques />
      <Inscription />
      <Temoignages/>
    </main>
  );
}