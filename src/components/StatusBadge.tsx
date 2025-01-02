import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "جاري":
        return "bg-[#9b87f5]/20 text-[#D6BCFA] border-[#9b87f5]/30";
      case "معلق":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "مغلق":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-sm border backdrop-blur-sm",
      "transform transition-all duration-300",
      "hover:scale-105",
      getStatusStyles()
    )}>
      {status}
    </span>
  );
}