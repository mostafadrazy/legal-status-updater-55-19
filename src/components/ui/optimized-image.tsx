import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function OptimizedImage({ src, alt, className, ...props }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    setCurrentSrc(null);

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };

    // Cache the image using the Cache API
    if ('caches' in window) {
      caches.open('image-cache').then(cache => {
        cache.add(src).catch(error => {
          console.error('Error caching image:', error);
        });
      });
    }

    return () => {
      img.onload = null;
    };
  }, [src]);

  if (isLoading || !currentSrc) {
    return <Skeleton className={cn("rounded-full", className)} />;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={cn("transition-opacity duration-300", className)}
      {...props}
    />
  );
}