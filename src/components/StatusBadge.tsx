import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "pending" | "closed";
  className?: string;
}

const statusConfig = {
  active: {
    color: "bg-green-100 text-green-800 hover:bg-green-200",
    label: "Active",
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    label: "Pending",
  },
  closed: {
    color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    label: "Closed",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn(config.color, className)}>
      {config.label}
    </Badge>
  );
}