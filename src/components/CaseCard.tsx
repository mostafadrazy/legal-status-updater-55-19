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
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function CaseCard({ title, caseNumber, status, lastUpdated, description }: CaseCardProps) {
  return (
    <Card className="bg-[#222] border-gray-800 hover:bg-[#2a2a2a] transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-gray-200">{title}</CardTitle>
        <Badge className={cn("font-medium border", statusColors[status])}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-400">
            Case #{caseNumber}
          </div>
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
          <div className="text-xs text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-600 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}