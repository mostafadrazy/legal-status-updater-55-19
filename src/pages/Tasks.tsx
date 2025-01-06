import { useState } from "react";
import { ListCheck, Share2, Bell, Plus, Calendar, Trash2, Search, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { addDays, format, startOfWeek } from "date-fns";
import { ar } from "date-fns/locale";

export default function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { session } = useAuth();

  // Calculate the start and end dates for the current week
  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
  const endDate = addDays(startDate, 6);

  // Fetch all sessions with more details
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions', startDate, endDate],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('case_sessions')
          .select(`
            id,
            session_date,
            case_id,
            procedure_type,
            room_number,
            start_time,
            end_time,
            title,
            participants
          `)
          .gte('session_date', format(startDate, 'yyyy-MM-dd'))
          .lte('session_date', format(endDate, 'yyyy-MM-dd'))
          .order('session_date', { ascending: true });
        
        if (error) {
          console.error('Error fetching sessions:', error);
          toast.error('فشل في تحميل الجلسات');
          throw error;
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast.error('فشل في تحميل الجلسات');
        throw error;
      }
    }
  });

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      if (direction === 'prev') {
        return addDays(prev, -7);
      }
      return addDays(prev, 7);
    });
  };

  const formattedDateRange = `${format(startDate, 'd', { locale: ar })} - ${format(endDate, 'd MMMM yyyy', { locale: ar })}`;

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]" dir="rtl">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <main className={`flex-1 ${isMobile ? 'px-4' : 'pr-64'} overflow-auto`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              className="glass-button text-white self-start p-2 rounded-lg mb-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ListCheck className="h-6 w-6" />
            </Button>
          )}

          {/* Header Section */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">التقويم الخاص بي</h1>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigateWeek('prev')}
                    className="hover:bg-white/10"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Button>
                  <p className="text-gray-400">{formattedDateRange}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigateWeek('next')}
                    className="hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="glass-button">
                  <Share2 className="w-4 h-4 ml-2" />
                  تصدير
                </Button>
                <Button variant="outline" className="glass-button">
                  <Trash2 className="w-4 h-4 ml-2" />
                  المحذوفة
                </Button>
                <Button className="glass-button">
                  <UserPlus className="w-4 h-4 ml-2" />
                  دعوة مستخدم
                </Button>
              </div>
            </div>

            {/* Calendar View Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Tabs defaultValue="weekly" className="w-full md:w-auto">
                <TabsList className="bg-white/5 w-full md:w-auto">
                  <TabsTrigger 
                    value="weekly"
                    onClick={() => setActiveView("weekly")}
                    className="flex-1 md:flex-none data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
                  >
                    أسبوعي
                  </TabsTrigger>
                  <TabsTrigger 
                    value="monthly"
                    onClick={() => setActiveView("monthly")}
                    className="flex-1 md:flex-none data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
                  >
                    شهري
                  </TabsTrigger>
                  <TabsTrigger 
                    value="yearly"
                    onClick={() => setActiveView("yearly")}
                    className="flex-1 md:flex-none data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
                  >
                    سنوي
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Search and Create Section */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="البحث عن موعد..."
                  className="glass-input w-full pl-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <Button className="glass-button">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء موعد
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="glass-card p-6 rounded-xl">
            <CalendarGrid 
              sessions={sessions} 
              isLoading={isLoading}
              startDate={startDate}
            />
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}