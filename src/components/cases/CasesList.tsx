import { CaseCard } from "@/components/CaseCard";

interface CasesListProps {
  cases: any[];
  scrollY: number;
  isSearchResults?: boolean;
}

export function CasesList({ cases, scrollY, isSearchResults = false }: CasesListProps) {
  if (!cases?.length) {
    return (
      <div className="text-center text-gray-400">
        {isSearchResults ? "لا توجد نتائج" : "لا توجد قضايا"}
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
      style={!isSearchResults ? { transform: `translateY(${scrollY * 0.02}px)` } : undefined}
    >
      {cases.map((caseItem, index) => (
        <div
          key={caseItem.id}
          className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
          style={!isSearchResults ? { 
            animationDelay: `${index * 150}ms`,
            transform: `translateY(${scrollY * (0.02 + index * 0.005)}px)`
          } : undefined}
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
}