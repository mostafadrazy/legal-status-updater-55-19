import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Share2, Trash2, UserPlus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarControlsProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function CalendarControls({ activeView, onViewChange }: CalendarControlsProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs defaultValue={activeView} className="w-full md:w-auto">
          <TabsList className="bg-white/5 w-full md:w-auto">
            <TabsTrigger 
              value="weekly"
              onClick={() => onViewChange("weekly")}
              className="flex-1 md:flex-none data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
            >
              أسبوعي
            </TabsTrigger>
            <TabsTrigger 
              value="monthly"
              onClick={() => onViewChange("monthly")}
              className="flex-1 md:flex-none data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
            >
              شهري
            </TabsTrigger>
            <TabsTrigger 
              value="yearly"
              onClick={() => onViewChange("yearly")}
              className="flex-1 md:flex-none data-[state=active]:bg-[#4CD6B4] data-[state=active]:text-black"
            >
              سنوي
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
    </>
  );
}