import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <WhoWeHelp />
      <Services />
      <Portfolio />
      <Process />
      <Contact />
      <CtaBanner />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
