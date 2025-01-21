import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import ContactCTA from "./ContactCTA";
import WhatWeDo from "./WhatWeDo";
import Footer from "../Footer";

export const LandingContent = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-[#8E9196]/10 backdrop-blur-xl border border-white/10 p-4 md:p-12 space-y-12 md:space-y-20">
          <WhatWeDo />
          <Features />
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