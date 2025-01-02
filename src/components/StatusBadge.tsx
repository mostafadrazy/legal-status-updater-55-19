interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "جاري":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "معلق":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "مغلق":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusStyles()}`}>
      {status}
    </span>
  );
}