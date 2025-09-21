import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord(prev => {
          const currentIndex = words.indexOf(prev);
          return words[(currentIndex + 1) % words.length];
        });
        setIsVisible(true);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <motion.div
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -10 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.span
        key={currentWord}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {currentWord}
      </motion.span>
    </motion.div>
  );
};