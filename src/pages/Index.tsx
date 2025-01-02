import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import ContactCTA from "@/components/landing/ContactCTA";
import WhatWeDo from "@/components/landing/WhatWeDo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import NewCaseForm from "@/components/NewCaseForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { session } = useAuth();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);

  const { data: cases, error } = useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      console.log('Fetching cases for user:', session?.user?.id);
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching cases:', error);
        throw error;
      }
      
      console.log('Fetched cases:', data);
      return data;
    },
    enabled: !!session
  });

  if (error) {
    console.error('Query error:', error);
  }

  if (session) {
    return (
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
        </div>

        <Sidebar />
        <main className="flex-1 overflow-auto relative">
          <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                  القضايا الحديثة
                </h1>
                <Button 
                  className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsNewCaseDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إنشاء قضية
                </Button>
              </div>
              <div className="w-72">
                <Search />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {cases?.map((caseItem, index) => (
                <div
                  key={caseItem.id}
                  className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CaseCard 
                    id={caseItem.id}
                    caseNumber={caseItem.case_number}
                    title={caseItem.title}
                    status={caseItem.status}
                    nextHearing={caseItem.next_hearing}
                    client={caseItem.client}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
        <NewCaseForm 
          open={isNewCaseDialogOpen} 
          onOpenChange={setIsNewCaseDialogOpen}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 space-y-20">
          <WhatWeDo />
          <Features />
          <Services />
          <Testimonials />
          <FAQ />
          <ContactCTA />
        </div>
      </div>
    </div>
  );
};

export default Index;