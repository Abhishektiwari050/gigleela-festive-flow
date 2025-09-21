import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl border border-white/20 bg-black/20 px-4 pb-3 backdrop-blur-md",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          className="relative flex aspect-square w-10 items-center justify-center rounded-full"
          whileHover={{ y: -8, scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: idx * 0.1,
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          <a
            href={item.href}
            className="flex h-full w-full items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {item.icon}
          </a>
          
          {/* Tooltip */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {item.title}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};