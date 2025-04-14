'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Define the grid content
const gridContent = [
  ['About', 'Investments', 'Residencies', 'Grants', 'Contributing'],
  ['Nikhil', 'Jon', 'Harish', 'Adil', 'Chandler'],
  ['BGM', 'Awaken', 'Ikenga', 'Coblocks', 'Ikenga'],
  ['Sculptures', 'Telepath', 'Bot or Not', 'Sidekick', 'Transcript editing'],
  ['Food recs', 'Film recs', 'Writing recs', 'Art recs', 'Music recs'],
];

export default function AnimatedGrid() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [rippleDot, setRippleDot] = useState<string | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const rippleInterval = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);

  // Function to get the next dot position
  const getNextDotPosition = (current: string | null) => {
    if (!current) return '0-0';
    const [row, col] = current.split('-').map(Number);
    if (col === 4) {
      return row === 4 ? null : `${row + 1}-0`;
    }
    return `${row}-${col + 1}`;
  };

  // Function to run one complete ripple animation
  const runRippleAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setRippleDot('0-0'); // Start at first dot
    
    rippleInterval.current = setInterval(() => {
      setRippleDot(prev => {
        const next = getNextDotPosition(prev);
        if (!next) {
          if (rippleInterval.current) {
            clearInterval(rippleInterval.current);
            rippleInterval.current = null;
          }
          setRippleDot(null);
          isAnimating.current = false;
        }
        return next;
      });
    }, 200); // Speed of the ripple effect
  };

  // Reset inactivity timer when user interacts
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    // Only start a new timer if we're not currently animating
    if (!isAnimating.current) {
      inactivityTimer.current = setTimeout(() => {
        runRippleAnimation();
      }, 5000); // Start animation after 5 seconds of inactivity
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (rippleInterval.current) clearInterval(rippleInterval.current);
    };
  }, []);

  // Start inactivity timer on mount
  useEffect(() => {
    resetInactivityTimer();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      {/* Square container that maintains aspect ratio */}
      <div className="w-[min(90vw,90vh)] aspect-square">
        <div 
          className="grid h-full"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(0.5rem, 3vmin, 2rem)',
            padding: 'clamp(0.5rem, 3vmin, 2rem)',
          }}
        >
          {gridContent.map((row, rowIndex) =>
            row.map((content, colIndex) => {
              const dotKey = `${rowIndex}-${colIndex}`;
              const isRippling = rippleDot === dotKey;
              const isHovered = hoveredDot === dotKey;
              
              return (
                <motion.div
                  key={dotKey}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: isHovered ? 1.5 : isRippling ? 2 : 1,
                    color: isHovered ? '#3B82F6' : '#FFFFFF',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  onMouseEnter={() => {
                    setHoveredDot(dotKey);
                    // Clear any ongoing animation
                    if (rippleInterval.current) {
                      clearInterval(rippleInterval.current);
                      rippleInterval.current = null;
                    }
                    setRippleDot(null);
                    isAnimating.current = false;
                  }}
                  onMouseLeave={() => {
                    setHoveredDot(null);
                    resetInactivityTimer();
                  }}
                  className="flex items-center justify-center aspect-square text-[clamp(1rem,5vmin,2.5rem)] cursor-pointer select-none text-white"
                  whileHover={{ scale: 1.5 }}
                >
                  {isHovered ? (
                    <span className={`${inter.className} text-[0.4em] font-medium text-center`}>
                      {content}
                    </span>
                  ) : '●'}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 