import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  title: string;
  caseNumber: string;
  status: "active" | "pending" | "closed";
  lastUpdated: string;
  description: string;
}

const statusColors = {
  active: "bg-green-100 text-green-800 hover:bg-green-200",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  closed: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

export function CaseCard({ title, caseNumber, status, lastUpdated, description }: CaseCardProps) {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fade-in backdrop-blur-sm bg-white/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold text-legal-800">{title}</CardTitle>
        <Badge className={cn("ml-2", statusColors[status])}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="text-sm font-medium text-legal-500">Case #{caseNumber}</div>
          <p className="text-sm text-legal-600">{description}</p>
          <div className="text-xs text-legal-400 mt-2">Last updated: {lastUpdated}</div>
        </div>
      </CardContent>
    </Card>
  );
}