import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import MemorialPlus from "@/components/home/MemorialPlus";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Services />
      <MemorialPlus />
      <Contact />
    </main>
  );
}