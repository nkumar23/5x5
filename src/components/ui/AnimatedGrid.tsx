'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Define the grid content
const gridContent = [
  ['About', 'Investments', 'Residencies', 'Grants', 'Contributing'],
  ['Nikhil', 'Jon', 'Harish', 'Adil', 'Chandler'],
  ['BGM', 'Awaken', 'Ikenga', 'Coblocks', 'Ikenga'],
  ['Sculptures', 'Telepath', 'Bot or Not', 'Sidekick', 'Transcript editing'],
  ['Food recs', 'Film recs', 'Writing recs', 'Art recs', 'Music recs'],
];

type ContentKey = 
  | 'About' | 'Investments' | 'Residencies' | 'Grants' | 'Contributing'  // Row 1
  | 'Nikhil' | 'Jon' | 'Harish' | 'Adil' | 'Chandler'                  // Row 2
  | 'BGM' | 'Awaken' | 'Ikenga' | 'Coblocks'                           // Row 3
  | 'Sculptures' | 'Telepath' | 'Bot or Not' | 'Sidekick' | 'Transcript editing'  // Row 4
  | 'Food recs' | 'Film recs' | 'Writing recs' | 'Art recs' | 'Music recs';      // Row 5

const placeholderContent: Record<ContentKey, { text: string; link: string }> = {
  // Row 1 - Navigation
  'About': {
    text: 'We are a collective of builders, artists, and investors working to shape the future of technology and culture.',
    link: 'about'
  },
  'Investments': {
    text: 'We invest in early-stage companies building the future of technology, art, and culture.',
    link: 'investments'
  },
  'Residencies': {
    text: 'Join our community of creators and innovators in our residency program.',
    link: 'residencies'
  },
  'Grants': {
    text: 'We provide grants to support innovative projects at the intersection of technology and art.',
    link: 'grants'
  },
  'Contributing': {
    text: 'Learn how you can contribute to our community and mission.',
    link: 'contributing'
  },

  // Row 2 - Team
  'Nikhil': {
    text: 'Founder and managing partner at 5x5. Previously founded and sold multiple startups in AI and developer tools.',
    link: 'team/nikhil'
  },
  'Jon': {
    text: 'Partner at 5x5, focusing on emerging technologies and creative applications of AI.',
    link: 'team/jon'
  },
  'Harish': {
    text: 'Technical partner specializing in machine learning and computer vision applications.',
    link: 'team/harish'
  },
  'Adil': {
    text: 'Partner leading our art and culture initiatives, bridging technology with creative expression.',
    link: 'team/adil'
  },
  'Chandler': {
    text: 'Partner focusing on community building and ecosystem development.',
    link: 'team/chandler'
  },

  // Row 3 - Projects
  'BGM': {
    text: 'Building the future of background music generation with AI.',
    link: 'projects/bgm'
  },
  'Awaken': {
    text: 'Revolutionizing digital art creation through AI-powered tools.',
    link: 'projects/awaken'
  },
  'Ikenga': {
    text: 'Exploring the intersection of traditional art forms and modern technology.',
    link: 'projects/ikenga'
  },
  'Coblocks': {
    text: 'Creating collaborative building blocks for the future of work.',
    link: 'projects/coblocks'
  },

  // Row 4 - Portfolio
  'Sculptures': {
    text: 'Discover our collection of digital and physical sculptures.',
    link: 'portfolio/sculptures'
  },
  'Telepath': {
    text: 'Advanced AI communication platform for seamless human-machine interaction.',
    link: 'portfolio/telepath'
  },
  'Bot or Not': {
    text: 'Exploring the boundaries between human and AI-generated content.',
    link: 'portfolio/bot-or-not'
  },
  'Sidekick': {
    text: 'Your AI-powered personal assistant for creative work.',
    link: 'portfolio/sidekick'
  },
  'Transcript editing': {
    text: 'Revolutionary tools for automated transcript editing and enhancement.',
    link: 'portfolio/transcript-editing'
  },

  // Row 5 - Recommendations
  'Food recs': {
    text: 'Curated recommendations for unique dining experiences around the world.',
    link: 'recommendations/food'
  },
  'Film recs': {
    text: 'Our favorite films that inspire creativity and innovation.',
    link: 'recommendations/films'
  },
  'Writing recs': {
    text: 'Essential readings on technology, art, and culture.',
    link: 'recommendations/writing'
  },
  'Art recs': {
    text: 'Must-see artworks and exhibitions that push boundaries.',
    link: 'recommendations/art'
  },
  'Music recs': {
    text: 'Cutting-edge music that defines the future of sound.',
    link: 'recommendations/music'
  }
};

// Add cursor animation component
const AnimatedCursor = () => {
  return (
    <div className="relative h-48 sm:h-32 w-full overflow-hidden">
      <motion.div
        initial={{ x: "-25%", y: "100%" }}
        animate={{ x: "25%", y: "0%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
        className="absolute left-1/2 transform -translate-x-1/2"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M4 4L20 20M4 4L12 4M4 4L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl sm:text-3xl font-medium"
      >
        click a dot
      </motion.div>
    </div>
  );
};

export default function AnimatedGrid() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [rippleDot, setRippleDot] = useState<string | null>(null);
  const [selectedDot, setSelectedDot] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentKey | null>(null);
  const [randomDot, setRandomDot] = useState<string | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const rippleInterval = useRef<NodeJS.Timeout | null>(null);
  const randomInterval = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const usedDots = useRef<Set<string>>(new Set());
  const animationCount = useRef(0);

  // Function to get the next dot position for ripple
  const getNextDotPosition = (current: string | null) => {
    if (!current) return '0-0';
    const [row, col] = current.split('-').map(Number);
    if (col === 4) {
      return row === 4 ? null : `${row + 1}-0`;
    }
    return `${row}-${col + 1}`;
  };

  // Function to get a random unused dot
  const getRandomUnusedDot = () => {
    const allDots = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const dot = `${i}-${j}`;
        if (!usedDots.current.has(dot)) {
          allDots.push(dot);
        }
      }
    }
    
    if (allDots.length === 0) {
      // All dots have been used, reset the set
      usedDots.current.clear();
      return getRandomUnusedDot();
    }
    
    const randomIndex = Math.floor(Math.random() * allDots.length);
    const selectedDot = allDots[randomIndex];
    usedDots.current.add(selectedDot);
    return selectedDot;
  };

  // Function to run ripple animation
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
          resetInactivityTimer();
        }
        return next;
      });
    }, 200);
  };

  // Function to run random dot animation
  const runRandomDotAnimation = () => {
    if (isAnimating.current || selectedDot) return;
    isAnimating.current = true;
    animationCount.current = 0;
    
    const nextDot = getRandomUnusedDot();
    setRandomDot(nextDot);
    animationCount.current++;
    
    randomInterval.current = setInterval(() => {
      if (animationCount.current >= 25) {
        if (randomInterval.current) {
          clearInterval(randomInterval.current);
          randomInterval.current = null;
        }
        setRandomDot(null);
        isAnimating.current = false;
        usedDots.current.clear();
        resetInactivityTimer();
        return;
      }

      setRandomDot(null);
      setTimeout(() => {
        const nextDot = getRandomUnusedDot();
        setRandomDot(nextDot);
        animationCount.current++;
      }, 100);
    }, 200);
  };

  // Reset inactivity timer when user interacts
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    if (!isAnimating.current && !selectedDot) {
      inactivityTimer.current = setTimeout(() => {
        // Randomly choose between animations
        Math.random() < 0.5 ? runRippleAnimation() : runRandomDotAnimation();
      }, 5000);
    }
  };

  // Start inactivity timer on mount
  useEffect(() => {
    resetInactivityTimer();
    
    // Cleanup function
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (rippleInterval.current) clearInterval(rippleInterval.current);
      if (randomInterval.current) clearInterval(randomInterval.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDotClick = (dotKey: string, content: string) => {
    // Clear any ongoing animation
    if (rippleInterval.current) {
      clearInterval(rippleInterval.current);
      rippleInterval.current = null;
    }
    if (randomInterval.current) {
      clearInterval(randomInterval.current);
      randomInterval.current = null;
    }
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
    setRippleDot(null);
    setRandomDot(null);
    isAnimating.current = false;

    // Animate to selected state
    setSelectedDot('0-0');
    setSelectedContent(content as ContentKey);
  };

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center">
      {/* Grid Container */}
      <div className="grid grid-cols-5 gap-8 w-full max-w-4xl mx-auto">
        {Array.from({ length: 5 }, (_, row) => (
          Array.from({ length: 5 }, (_, col) => {
            const dotKey = `${row}-${col}`;
            const content = gridContent[row][col];
            const isHovered = hoveredDot === dotKey;
            const isSelected = selectedDot === dotKey;
            const isRippling = rippleDot === dotKey;
            const isRandom = randomDot === dotKey;

            return (
              <motion.div
                key={dotKey}
                className="relative flex items-center justify-center"
                onMouseEnter={() => !selectedDot && setHoveredDot(dotKey)}
                onMouseLeave={() => setHoveredDot(null)}
                onClick={() => handleDotClick(dotKey, content)}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    isSelected ? 'bg-blue-500' : 'bg-white'
                  }`}
                  animate={{
                    scale: isHovered || isSelected || isRippling || isRandom ? 1.5 : 1,
                    opacity: isRippling ? 0.7 : 1
                  }}
                  transition={{ duration: 0.2 }}
                />
                {isHovered && !selectedDot && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 text-white text-sm whitespace-nowrap"
                  >
                    {content}
                  </motion.div>
                )}
              </motion.div>
            );
          })
        ))}
      </div>

      {/* Selected Content Display */}
      <AnimatePresence>
        {selectedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 p-4 z-50"
          >
            <div className="relative max-w-2xl w-full">
              {/* Close Button */}
              <motion.button
                className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-white hover:text-blue-500 transition-colors"
                onClick={() => {
                  setSelectedDot(null);
                  setSelectedContent(null);
                }}
                whileHover={{ scale: 1.1 }}
              >
                ×
              </motion.button>

              {/* Content */}
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  {selectedContent}
                </h2>
                <p className="text-lg text-gray-300">
                  {placeholderContent[selectedContent].text}
                </p>
                <Link 
                  href={placeholderContent[selectedContent].link}
                  className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Learn more →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show cursor animation when no dot is selected */}
      {!selectedDot && <AnimatedCursor />}
    </div>
  );
} 