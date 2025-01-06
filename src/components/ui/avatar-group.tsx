import * as React from "react"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: {
    src?: string;
    alt?: string;
    fallback?: string;
  }[];
  max?: number;
}

export function AvatarGroup({ avatars, max = 4, className, ...props }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div
      className={cn("flex -space-x-4 rtl:space-x-reverse", className)}
      {...props}
    >
      {displayAvatars.map((avatar, i) => (
        <Avatar key={i} className="border-2 border-background">
          {/* Add your Avatar content here */}
        </Avatar>
      ))}
      {remaining > 0 && (
        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
          <span className="flex h-full w-full items-center justify-center text-xs">
            +{remaining}
          </span>
        </div>
      )}
    </div>
  )
}