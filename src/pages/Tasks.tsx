import { ListCheck, Menu, Share2, Bell, Plus, Calendar, Trash2 } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("weekly");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]" dir="rtl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <main className={`flex-1 ${isMobile ? 'px-4' : 'pr-64'} overflow-auto`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {isMobile && (
            <Button
              variant="ghost"
              className="glass-button text-white self-start p-2 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 mb-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <ListCheck className="w-6 h-6 md:w-8 md:h-8 text-[#4CD6B4]" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">المهام</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button className="glass-button">
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
              <Button className="glass-button">
                <Bell className="w-4 h-4 ml-2" />
                تنبيهات
              </Button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Tabs defaultValue="weekly" className="w-full md:w-auto">
                <TabsList className="bg-white/5">
                  <TabsTrigger 
                    value="weekly"
                    onClick={() => setActiveView("weekly")}
                    className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
                  >
                    أسبوعي
                  </TabsTrigger>
                  <TabsTrigger 
                    value="monthly"
                    onClick={() => setActiveView("monthly")}
                    className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
                  >
                    شهري
                  </TabsTrigger>
                  <TabsTrigger 
                    value="yearly"
                    onClick={() => setActiveView("yearly")}
                    className="data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
                  >
                    سنوي
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" className="glass-button">
                  <Trash2 className="w-4 h-4 ml-2" />
                  المهام المحذوفة
                </Button>
                <Button className="glass-button">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مهمة
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="البحث عن مهمة..."
                  className="glass-input w-full pl-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar className="w-5 h-5" />
                </span>
              </div>
              <Button className="glass-button px-6">
                إنشاء جدول
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="glass-card p-6 rounded-xl">
            <div className="text-white/70 text-center">
              قريباً - عرض التقويم قيد التطوير
            </div>
          </div>
        </div>
      </main>
      
      {(isSidebarOpen || !isMobile) && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}