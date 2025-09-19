import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import ContactCTA from "./ContactCTA";
import WhatWeDo from "./WhatWeDo";
import LegalAI from "./LegalAI";
import Footer from "../Footer";

export const LandingContent = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-[#8E9196]/10 backdrop-blur-xl border border-white/10 p-6 md:p-16 space-y-12 md:space-y-16">
          <WhatWeDo />
          <LegalAI />
          <Services />
          <Testimonials />
          <FAQ />
          <ContactCTA />
        </div>
      </div>
      <Footer />
    </div>
  );
};