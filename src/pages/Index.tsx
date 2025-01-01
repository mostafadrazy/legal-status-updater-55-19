import { CaseCard } from "@/components/CaseCard";

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
    <div className="min-h-screen bg-gradient-to-br from-legal-100 via-white to-legal-100">
      <div className="container px-4 py-12 mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-legal-900">Legal Case Dashboard</h1>
            <p className="text-legal-500 max-w-2xl mx-auto">Track and manage your legal cases with real-time status updates</p>
          </div>
          
          <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {mockCases.map((caseItem, index) => (
              <div key={caseItem.caseNumber} 
                   className="transform hover:-translate-y-1 transition-all duration-300"
                   style={{ animationDelay: `${index * 150}ms` }}>
                <CaseCard
                  title={caseItem.title}
                  caseNumber={caseItem.caseNumber}
                  status={caseItem.status}
                  lastUpdated={caseItem.lastUpdated}
                  description={caseItem.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;