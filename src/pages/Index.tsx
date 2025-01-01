import { CaseCard } from "@/components/CaseCard";
import { Sidebar } from "@/components/Sidebar";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockCases = [
  {
    title: "قضية سميث ضد شركة جونسون",
    caseNumber: "2024-0123",
    status: "active" as const,
    lastUpdated: "2024-02-20",
    description: "طلب راندي مني إرسال المستندات المحدثة بالبريد الإلكتروني. يرجى الاطلاع على المرفقات وإخبارنا إذا كان لديك أي أسئلة بخصوص قضية حقوق الملكية الفكرية.",
  },
  {
    title: "تركة وليامز",
    caseNumber: "2024-0124",
    status: "pending" as const,
    lastUpdated: "2024-02-19",
    description: "طلبت جين آخر التحديثات على وثائق تخطيط العقارات. تتطلب قضية تنفيذ الوصية اهتماماً فورياً.",
  },
  {
    title: "صندوق عائلة براون",
    caseNumber: "2024-0125",
    status: "closed" as const,
    lastUpdated: "2024-02-18",
    description: "تم الانتهاء من قرار التوزيع النهائي. تمت معالجة جميع وثائق إدارة الصندوق الائتماني وأرشفتها.",
  },
];

const Index = () => {
  return (
    <div className="flex h-screen bg-[#111]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-white">القضايا الحديثة</h1>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء قضية
              </Button>
            </div>
            <div className="relative w-72">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في القضايا..."
                className="pr-8 bg-[#222] border-gray-700 text-gray-200 placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            {mockCases.map((caseItem, index) => (
              <div
                key={caseItem.caseNumber}
                className="transform hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CaseCard {...caseItem} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;