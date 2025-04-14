'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedGrid() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  
  // Create a 5x5 grid
  const rows = 5;
  const cols = 5;
  const grid = Array(rows).fill('●').map(() => Array(cols).fill('●'));

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      {/* Square container that maintains aspect ratio */}
      <div className="w-[min(90vw,90vh)] aspect-square">
        <div 
          className="grid h-full"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 'clamp(0.5rem, 3vmin, 2rem)',
            padding: 'clamp(0.5rem, 3vmin, 2rem)',
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((dot, colIndex) => {
              const dotKey = `${rowIndex}-${colIndex}`;
              
              return (
                <motion.div
                  key={dotKey}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: hoveredDot === dotKey ? 1.5 : 1,
                    color: hoveredDot === dotKey ? '#3B82F6' : '#FFFFFF',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  onMouseEnter={() => setHoveredDot(dotKey)}
                  onMouseLeave={() => setHoveredDot(null)}
                  className="flex items-center justify-center aspect-square text-[clamp(1rem,5vmin,2.5rem)] cursor-pointer select-none text-white"
                  whileHover={{ scale: 1.5 }}
                >
                  {dot}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 