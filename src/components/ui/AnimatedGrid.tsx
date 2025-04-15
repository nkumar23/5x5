'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

// Define the grid content
const gridContent = [
  ['About', 'Investments', 'Residencies', 'Grants', 'Contributing'],
  ['Nikhil', 'Jon', 'Harish', 'Adil', 'Chandler'],
  ['BGM', 'Awaken', 'Ikenga', 'Coblocks', 'Ikenga'],
  ['Sculptures', 'Telepath', 'Bot or Not', 'Sidekick', 'Transcript editing'],
  ['Food recs', 'Film recs', 'Writing recs', 'Art recs', 'Music recs'],
];

type ContentKey = 'About' | 'Investments' | 'Residencies' | 'Grants' | 'Contributing';

const placeholderContent: Record<ContentKey, { text: string; link: string }> = {
  'About': {
    text: 'We are a collective of builders, artists, and investors working to shape the future of technology and culture.',
    link: '/about'
  },
  'Investments': {
    text: 'We invest in early-stage companies building the future of technology, art, and culture.',
    link: '/investments'
  },
  'Residencies': {
    text: 'Join our community of creators and innovators in our residency program.',
    link: '/residencies'
  },
  'Grants': {
    text: 'We provide grants to support innovative projects at the intersection of technology and art.',
    link: '/grants'
  },
  'Contributing': {
    text: 'Learn how you can contribute to our community and mission.',
    link: '/contributing'
  }
};

export default function AnimatedGrid() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [rippleDot, setRippleDot] = useState<string | null>(null);
  const [selectedDot, setSelectedDot] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentKey | null>(null);
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
    if (isAnimating.current || selectedDot) return;
    isAnimating.current = true;
    setRippleDot('0-0');
    
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
    }, 200);
  };

  // Reset inactivity timer when user interacts
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    if (!isAnimating.current && !selectedDot) {
      inactivityTimer.current = setTimeout(() => {
        runRippleAnimation();
      }, 5000);
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

  const handleDotClick = (dotKey: string, content: string) => {
    setSelectedDot('0-0');
    setSelectedContent(content as ContentKey);
    // Clear any ongoing animation
    if (rippleInterval.current) {
      clearInterval(rippleInterval.current);
      rippleInterval.current = null;
    }
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
    setRippleDot(null);
    isAnimating.current = false;
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-[min(90vw,90vh)] aspect-square relative">
        <AnimatePresence>
          {selectedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute inset-0 flex flex-col items-start justify-start p-8 text-white"
              style={{ marginTop: '100px' }}
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="text-2xl font-medium mb-4"
              >
                {selectedContent}
              </motion.div>
              <p className="text-xl mb-6 max-w-[600px]">
                {placeholderContent[selectedContent]?.text}
              </p>
              <Link 
                href={placeholderContent[selectedContent]?.link || '#'} 
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Learn more →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        
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
              const isSelected = selectedDot !== null;
              const isMainDot = dotKey === '0-0';
              const distance = Math.sqrt(rowIndex * rowIndex + colIndex * colIndex);
              
              return (
                <motion.div
                  key={dotKey}
                  initial={{ scale: 1, x: 0, y: 0 }}
                  animate={{
                    scale: isHovered ? 1.5 : isRippling ? 2 : isSelected ? (isMainDot ? 1.2 : 0) : 1,
                    x: isSelected && !isMainDot ? `calc(-${colIndex} * (100% + clamp(0.5rem, 3vmin, 2rem)))` : 0,
                    y: isSelected && !isMainDot ? `calc(-${rowIndex} * (100% + clamp(0.5rem, 3vmin, 2rem)))` : 0,
                    opacity: isSelected ? (isMainDot ? 1 : 0) : 1,
                    color: isHovered ? '#3B82F6' : '#FFFFFF',
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      delay: isSelected ? distance * 0.05 : 0,
                      opacity: { delay: isSelected ? distance * 0.05 + 0.2 : 0 }
                    }
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                  onMouseEnter={() => {
                    if (!selectedDot) {
                      setHoveredDot(dotKey);
                      if (rippleInterval.current) {
                        clearInterval(rippleInterval.current);
                        rippleInterval.current = null;
                      }
                      setRippleDot(null);
                      isAnimating.current = false;
                    }
                  }}
                  onMouseLeave={() => {
                    if (!selectedDot) {
                      setHoveredDot(null);
                      resetInactivityTimer();
                    }
                  }}
                  onClick={() => {
                    if (!selectedDot && rowIndex === 0) {
                      handleDotClick(dotKey, content);
                    }
                  }}
                  className={`flex items-center justify-center aspect-square text-[clamp(1rem,5vmin,2.5rem)] select-none text-white
                    ${!selectedDot && rowIndex === 0 ? 'cursor-pointer' : 'cursor-default'}`}
                  whileHover={!selectedDot && rowIndex === 0 ? { scale: 1.5 } : {}}
                >
                  {(isHovered || (isMainDot && selectedDot)) ? (
                    <span className={`${inter.className} text-[0.4em] font-medium text-center`}>
                      {selectedDot && isMainDot ? selectedContent : content}
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