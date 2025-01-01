import { CaseCard } from "@/components/CaseCard";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockCases = [
  {
    title: "Smith vs. Johnson Corp",
    caseNumber: "2024-0123",
    status: "active" as const,
    lastUpdated: "2024-02-20",
    description: "Corporate litigation regarding intellectual property rights.",
  },
  {
    title: "Estate of Williams",
    caseNumber: "2024-0124",
    status: "pending" as const,
    lastUpdated: "2024-02-19",
    description: "Estate planning and will execution case.",
  },
  {
    title: "Brown Family Trust",
    caseNumber: "2024-0125",
    status: "closed" as const,
    lastUpdated: "2024-02-18",
    description: "Trust fund management and distribution resolution.",
  },
];

const Index = () => {
  return (
    <div className="flex h-screen bg-[#111]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cases..."
                className="pl-8 bg-[#222] border-gray-700 text-gray-200 placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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