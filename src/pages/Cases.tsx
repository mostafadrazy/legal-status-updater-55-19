import React, { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { CaseCard } from "@/components/CaseCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NewCaseForm from "@/components/NewCaseForm";
import { useIsMobile } from '@/hooks/use-mobile';
import { SearchBar } from '@/components/cases/SearchBar';
import { CasesList } from '@/components/cases/CasesList';

const Cases = () => {
  const { session } = useAuth();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return null;
      
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .or(`case_code.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%,client.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) {
        toast.error('حدث خطأ أثناء البحث');
        throw error;
      }

      return data;
    },
    enabled: searchQuery.length > 0
  });

  if (error) {
    console.error('Query error:', error);
  }

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A] overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20"
          style={{ transform: `translate(-50%, ${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10"
          style={{ transform: `translate(0, ${scrollY * -0.1}px)` }}
        />
      </div>

      <main className={`flex-1 ${isMobile ? 'px-4 pb-safe' : 'pr-64'} overflow-auto relative z-10`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto safe-area-inset-bottom">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="glass-button mb-4 !p-3 !min-w-0"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="w-full md:w-auto relative group">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-[#4CD6B4] to-white bg-clip-text text-transparent pb-2 animate-fade-in">
                القضايا
              </h1>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#4CD6B4]/50 via-white/50 to-[#4CD6B4]/50 transition-all duration-700 absolute bottom-0 left-0 rounded-full"></div>
            </div>
            <Button 
              className="glass-button w-full md:w-auto px-6 py-5 md:px-8 md:py-6 rounded-full text-base"
              onClick={() => setIsNewCaseDialogOpen(true)}
            >
              <Plus className="w-5 h-5 ml-2" />
              إنشاء قضية
            </Button>
          </div>

          <div className="safe-area-inset-left safe-area-inset-right">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {searchQuery ? (
              <CasesList 
                cases={searchResults || []} 
                scrollY={scrollY} 
                isSearchResults={true} 
              />
            ) : (
              <CasesList cases={cases || []} scrollY={scrollY} />
            )}
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      
      <NewCaseForm 
        open={isNewCaseDialogOpen} 
        onOpenChange={setIsNewCaseDialogOpen}
      />
    </div>
  );
};

export default Cases;