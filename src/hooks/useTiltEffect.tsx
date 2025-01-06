import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  "max-glare"?: number;
}

export function useTiltEffect(options: TiltOptions = {}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tiltNode = tiltRef.current;
    const defaultOptions = {
      max: 15,
      scale: 1.05,
      speed: 1000,
      glare: true,
      "max-glare": 0.3,
      ...options
    };
    
    if (tiltNode) {
      VanillaTilt.init(tiltNode, defaultOptions);
    }
    
    return () => {
      if (tiltNode) {
        // @ts-ignore - destroy method exists but is not in types
        tiltNode.vanillaTilt?.destroy();
      }
    };
  }, [options]);
  
  return tiltRef;
}