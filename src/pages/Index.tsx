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
    <div className="min-h-screen bg-gradient-to-b from-legal-100 to-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-legal-900">Case Dashboard</h1>
            <p className="text-legal-500">Track and manage your legal cases</p>
          </div>
          
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {mockCases.map((caseItem) => (
              <CaseCard
                key={caseItem.caseNumber}
                title={caseItem.title}
                caseNumber={caseItem.caseNumber}
                status={caseItem.status}
                lastUpdated={caseItem.lastUpdated}
                description={caseItem.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;