import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Mic, StickyNote } from "lucide-react";

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

const statusLabels = {
  active: "نشط",
  pending: "معلق",
  closed: "مغلق",
};

export function CaseCard({ title, caseNumber, status, lastUpdated, description }: CaseCardProps) {
  return (
    <Card className="bg-[#222] border-gray-800 hover:bg-[#2a2a2a] transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-gray-200 truncate">{title}</h3>
                <Badge className={cn("text-xs font-medium border", statusColors[status])}>
                  {statusLabels[status]}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">{lastUpdated}</span>
            </div>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{description}</p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
              >
                <FileText className="w-4 h-4 ml-1" />
                الملفات
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Mic className="w-4 h-4 ml-1" />
                تسجيل
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-green-500/10 hover:bg-green-500/20 text-green-400"
              >
                <StickyNote className="w-4 h-4 ml-1" />
                ملاحظة
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}