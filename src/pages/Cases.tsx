import React, { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Search as SearchIcon } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { CaseCard } from "@/components/CaseCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NewCaseForm from "@/components/NewCaseForm";

const Cases = () => {
  const { session } = useAuth();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);

  // Handle parallax scroll effect
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

  const renderSearchResults = () => {
    if (!searchQuery) return null;
    if (isSearchLoading) return <div className="text-center text-gray-400">جاري البحث...</div>;
    if (!searchResults?.length) return <div className="text-center text-gray-400">لا توجد نتائج</div>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {searchResults.map((caseItem) => (
          <div
            key={caseItem.id}
            className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
          >
            <CaseCard
              id={caseItem.id}
              caseNumber={caseItem.case_number}
              title={caseItem.title}
              status={caseItem.status}
              nextHearing={caseItem.next_hearing}
              client={caseItem.client}
              caseCode={caseItem.case_code}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A] overflow-hidden">
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

      <main className="flex-1 pr-64 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <div 
            className="flex items-center justify-between mb-8"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                القضايا
              </h1>
              <Button 
                className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsNewCaseDialogOpen(true)}
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء قضية
              </Button>
            </div>
          </div>

          <div 
            className="max-w-2xl mx-auto mb-12"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            <div className="relative">
              <SearchIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث برقم القضية، اسم العميل، أو رقم الكود..."
                className="w-full pl-4 pr-12 py-3 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                dir="rtl"
              />
            </div>
          </div>

          {searchQuery ? (
            renderSearchResults()
          ) : (
            <div 
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              {cases?.map((caseItem, index) => (
                <div
                  key={caseItem.id}
                  className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transform: `translateY(${scrollY * (0.02 + index * 0.005)}px)`
                  }}
                >
                  <CaseCard 
                    id={caseItem.id}
                    caseNumber={caseItem.case_number}
                    title={caseItem.title}
                    status={caseItem.status}
                    nextHearing={caseItem.next_hearing}
                    client={caseItem.client}
                    caseCode={caseItem.case_code}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Sidebar />
      <NewCaseForm 
        open={isNewCaseDialogOpen} 
        onOpenChange={setIsNewCaseDialogOpen}
      />
    </div>
  );
};

export default Cases;