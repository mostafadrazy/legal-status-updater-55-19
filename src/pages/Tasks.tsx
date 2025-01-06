import { useState } from "react";
import { ListCheck, Share2, Bell, Plus, Calendar, Trash2, Search, UserPlus } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ar } from "date-fns/locale";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Session {
  id: string;
  session_date: string;
  case_id: string;
  procedure_type: string | null;
  room_number: string | null;
}

export default function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("weekly");
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  // Fetch all sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      console.log('Fetching sessions...');
      const { data, error } = await supabase
        .from('case_sessions')
        .select('*')
        .order('session_date', { ascending: true });
      
      if (error) {
        console.error('Error fetching sessions:', error);
        throw error;
      }
      
      console.log('Sessions fetched:', data);
      return data as Session[];
    }
  });

  // Group sessions by date
  const sessionsByDate = sessions.reduce((acc: Record<string, Session[]>, session) => {
    const date = format(new Date(session.session_date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {});

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('ar-EG', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(currentDate);

  // Custom day content for the calendar
  const dayContent = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const daysSessions = sessionsByDate[dateStr] || [];
    
    if (daysSessions.length > 0) {
      return (
        <div className="relative w-full h-full">
          <div>{format(day, 'd')}</div>
          <Badge 
            variant="secondary" 
            className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-[#4CD6B4] text-xs"
          >
            {daysSessions.length}
          </Badge>
        </div>
      );
    }
    
    return <div>{format(day, 'd')}</div>;
  };

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
                <p className="text-gray-400">{formattedDate}</p>
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
            {isLoading ? (
              <div className="text-white/70 text-center py-8">جاري التحميل...</div>
            ) : (
              <CalendarComponent
                mode="single"
                locale={ar}
                showOutsideDays={true}
                components={{
                  DayContent: ({ date }) => dayContent(date)
                }}
                className="w-full text-white"
                classNames={{
                  months: "w-full",
                  month: "w-full",
                  table: "w-full",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center flex-1",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative h-9 w-9 flex-1 flex items-center justify-center",
                  day: "h-9 w-9 p-0 font-normal hover:bg-white/10 rounded-md transition-colors",
                  day_selected: "bg-[#4CD6B4] text-black hover:bg-[#4CD6B4]/90",
                  day_today: "bg-white/5 text-white",
                }}
              />
            )}
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}