interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "جاري":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "معلق":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "مغلق":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border backdrop-blur-sm ${getStatusStyles()}`}>
      {status}
    </span>
  );
}