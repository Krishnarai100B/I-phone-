
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ScrollToRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ScrollToReveal: React.FC<ScrollToRevealProps> = ({
  children,
  className,
  threshold = 0.3,
  delay = 0,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    const currentElement = document.getElementById('scroll-reveal-element');
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, delay, hasAnimated]);

  const getTransformValue = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translateY(0)' : 'translateY(50px)';
      case 'down':
        return isVisible ? 'translateY(0)' : 'translateY(-50px)';
      case 'left':
        return isVisible ? 'translateX(0)' : 'translateX(50px)';
      case 'right':
        return isVisible ? 'translateX(0)' : 'translateX(-50px)';
      default:
        return isVisible ? 'translateY(0)' : 'translateY(50px)';
    }
  };

  return (
    <div
      id="scroll-reveal-element"
      className={cn(className)}
      style={{
        transform: getTransformValue(),
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.8s ease-out, opacity 0.8s ease-out`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollToReveal;
