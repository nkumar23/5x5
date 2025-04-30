'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

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

// Define color palette
const colorPalette = {
  'perceptualViolet': '#7B5EEA',
  'celestialBlue': '#7CD7FF',
  'infraPink': '#FF69B4',
  'midnightIndigo': '#1A1B4B',
  'horizonPeach': '#FFDAB9',
  'atmosphericWhite': '#FFFFFF',
  'luminalAmber': '#FFA500'
};

// Define complementary colors for buttons
const complementaryColors: Record<keyof typeof colorPalette, keyof typeof colorPalette> = {
  'perceptualViolet': 'luminalAmber',
  'celestialBlue': 'perceptualViolet',
  'infraPink': 'midnightIndigo',
  'midnightIndigo': 'celestialBlue',
  'horizonPeach': 'infraPink',
  'atmosphericWhite': 'perceptualViolet',
  'luminalAmber': 'midnightIndigo'
};

// Function to determine if a background color is dark
const isDarkColor = (color: string) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

// Map content to colors
const contentColorMap: Record<ContentKey, keyof typeof colorPalette> = {
  // Row 1 - Navigation
  'About': 'perceptualViolet',
  'Investments': 'celestialBlue',
  'Residencies': 'infraPink',
  'Grants': 'midnightIndigo',
  'Contributing': 'horizonPeach',

  // Row 2 - Team
  'Nikhil': 'luminalAmber',
  'Jon': 'perceptualViolet',
  'Harish': 'celestialBlue',
  'Adil': 'infraPink',
  'Chandler': 'midnightIndigo',

  // Row 3 - Projects
  'BGM': 'horizonPeach',
  'Awaken': 'luminalAmber',
  'Ikenga': 'perceptualViolet',
  'Coblocks': 'celestialBlue',

  // Row 4 - Portfolio
  'Sculptures': 'infraPink',
  'Telepath': 'celestialBlue',
  'Bot or Not': 'horizonPeach',
  'Sidekick': 'luminalAmber',
  'Transcript editing': 'perceptualViolet',

  // Row 5 - Recommendations
  'Food recs': 'celestialBlue',
  'Film recs': 'infraPink',
  'Writing recs': 'midnightIndigo',
  'Art recs': 'horizonPeach',
  'Music recs': 'luminalAmber'
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
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedContent) {
        const contentBox = document.querySelector('.content-box');
        const mobileContentBox = document.querySelector('.mobile-content-box');
        // Check both mobile and desktop content boxes
        const isClickInsideContent = 
          (contentBox && contentBox.contains(event.target as Node)) ||
          (mobileContentBox && mobileContentBox.contains(event.target as Node));
        const isClickInsideGrid = gridRef.current?.contains(event.target as Node);
        
        // If click is outside both content box and grid
        if (!isClickInsideContent && !isClickInsideGrid) {
          setSelectedDot(null);
          setSelectedContent(null);
          setIsContentExpanded(false);
          resetInactivityTimer();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as any);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [selectedContent]); // eslint-disable-line react-hooks/exhaustive-deps

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

    // Animate to selected state using the clicked dot position
    setSelectedDot(dotKey);
    setSelectedContent(content as ContentKey);
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-black overflow-hidden relative">
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%',
          transform: 'scale(1.2)'
        }}
      />
      
      {/* Grid Container */}
      <div className="w-full h-[50dvh] lg:min-h-[100dvh] relative flex items-center justify-center">
        <div className="w-[min(90vw,90vh)] aspect-square relative" ref={gridRef}>
          {/* Technical annotation */}
          <motion.div 
            className={`${jetbrainsMono.className} absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.65rem] text-white/30 tracking-widest uppercase flex items-center gap-2 pb-2`}
            animate={{
              opacity: selectedContent ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-light">EST</span>
            <span className="font-medium">5.5.25</span>
          </motion.div>

          <div 
            className="grid h-full relative"
            style={{
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 'clamp(0.25rem, 2vmin, 2rem)',
              padding: 'clamp(0.25rem, 2vmin, 2rem)',
            }}
          >
            {gridContent.map((row, rowIndex) =>
              row.map((content, colIndex) => {
                const dotKey = `${rowIndex}-${colIndex}`;
                const isRippling = rippleDot === dotKey;
                const isRandomlySelected = randomDot === dotKey;
                const isHovered = hoveredDot === dotKey;
                const isSelected = selectedDot !== null;
                const isClickedDot = dotKey === selectedDot;
                const [selectedRow, selectedCol] = selectedDot ? selectedDot.split('-').map(Number) : [0, 0];
                
                // Hide non-selected dots on mobile/tablet when a dot is selected
                const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
                const shouldHide = isMobileOrTablet && isSelected && !isClickedDot;
                
                return (
                  <motion.div
                    key={dotKey}
                    initial={{ scale: 1, x: 0, y: 0 }}
                    animate={{
                      scale: isHovered ? 1.5 : 
                             isRippling ? 2 : 
                             isRandomlySelected ? 2 : 
                             isSelected ? (isClickedDot ? 1.2 : 0) : 1,
                      x: isSelected && !isClickedDot ? `calc(${selectedCol - colIndex} * (100% + clamp(0.5rem, 3vmin, 2rem)))` : 0,
                      y: isSelected && !isClickedDot ? `calc(${selectedRow - rowIndex} * (100% + clamp(0.5rem, 3vmin, 2rem)))` : 0,
                      opacity: shouldHide ? 0 : isSelected ? (isClickedDot ? 1 : 0) : 1,
                      color: content ? (
                        isHovered || (isSelected && isClickedDot) ? 
                          colorPalette[complementaryColors[contentColorMap[content as ContentKey]]] : 
                          colorPalette.atmosphericWhite
                      ) : colorPalette.atmosphericWhite,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      duration: 0.3
                    }}
                    onMouseEnter={() => !selectedDot && setHoveredDot(dotKey)}
                    onMouseLeave={() => !selectedDot && setHoveredDot(null)}
                    onClick={() => !selectedDot && content && handleDotClick(dotKey, content)}
                    className={`flex items-center justify-center aspect-square text-[clamp(1rem,5vmin,2.5rem)] select-none
                      ${!selectedDot && content ? 'cursor-pointer' : 'cursor-default'}`}
                    whileHover={!selectedDot ? { scale: 1.5 } : {}}
                  >
                    {/* Add pulsing animation as a separate motion component */}
                    <motion.div
                      animate={{ scale: [0.6, 1.3] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {(isHovered && !selectedDot) ? (
                        <span className={`${inter.className} text-[0.4em] font-medium text-center`}>
                          {content}
                        </span>
                      ) : '●'}
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Content Box - Responsive for all screen sizes */}
      <AnimatePresence>
        {selectedContent && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => {
                setSelectedDot(null);
                setSelectedContent(null);
                setIsContentExpanded(false);
                resetInactivityTimer();
              }}
            />

            {/* Mobile/Tablet View */}
            <motion.div
              className="content-box fixed bottom-0 left-0 right-0 overflow-hidden touch-none lg:hidden"
              style={{
                backgroundColor: selectedContent ? colorPalette[contentColorMap[selectedContent]] : 'rgb(17, 24, 39)',
                borderTopLeftRadius: '1.5rem',
                borderTopRightRadius: '1.5rem'
              }}
              initial={{ y: "50%" }}
              animate={{ 
                y: isContentExpanded ? "10%" : "35%",
                height: isContentExpanded ? "90vh" : "65vh"
              }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y < -20) {
                  setIsContentExpanded(true);
                } else if (info.offset.y > 20) {
                  setIsContentExpanded(false);
                }
              }}
            >
              {/* Handle for dragging */}
              <div className="w-12 h-1 mx-auto mt-4 mb-2" style={{ backgroundColor: colorPalette.atmosphericWhite }} />
              
              {/* Close button */}
              <motion.button
                className="absolute top-2 right-4 text-3xl z-50 hover:opacity-80 transition-opacity"
                style={{ color: colorPalette.atmosphericWhite }}
                onClick={() => {
                  setSelectedDot(null);
                  setSelectedContent(null);
                  setIsContentExpanded(false);
                  resetInactivityTimer();
                }}
              >
                ×
              </motion.button>

              {/* Content */}
              <div className="p-6 overflow-y-auto h-full">
                <h1 
                  className="text-3xl font-bold mb-4"
                  style={{ 
                    color: selectedContent && isDarkColor(colorPalette[contentColorMap[selectedContent]]) 
                      ? colorPalette.atmosphericWhite 
                      : colorPalette.midnightIndigo 
                  }}
                >
                  {selectedContent}
                </h1>
                <div className="flex flex-col gap-6">
                  <p style={{ 
                    color: selectedContent && isDarkColor(colorPalette[contentColorMap[selectedContent]]) 
                      ? `${colorPalette.atmosphericWhite}CC` 
                      : `${colorPalette.midnightIndigo}CC` 
                  }}>
                    {placeholderContent[selectedContent].text}
                  </p>
                  {/* Image Placeholder */}
                  <div 
                    className="w-full aspect-video rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: selectedContent ? colorPalette[complementaryColors[contentColorMap[selectedContent]]] : 'rgb(31, 41, 55)',
                      color: colorPalette.atmosphericWhite
                    }}
                  >
                    <span>Image Placeholder</span>
                  </div>
                  <Link 
                    href={placeholderContent[selectedContent].link}
                    className="inline-block px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                    style={{ 
                      backgroundColor: selectedContent ? colorPalette[complementaryColors[contentColorMap[selectedContent]]] : 'rgb(59, 130, 246)',
                      color: colorPalette.atmosphericWhite
                    }}
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Desktop View */}
            <motion.div
              className="content-box fixed inset-0 hidden lg:flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div 
                className="relative max-w-6xl w-full mx-auto rounded-2xl p-8"
                style={{
                  backgroundColor: selectedContent ? colorPalette[contentColorMap[selectedContent]] : 'rgb(17, 24, 39)'
                }}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-4xl hover:opacity-80 transition-opacity"
                  style={{ color: colorPalette.atmosphericWhite }}
                  onClick={() => {
                    setSelectedDot(null);
                    setSelectedContent(null);
                    resetInactivityTimer();
                  }}
                >
                  ×
                </motion.button>

                {/* Content */}
                <div className="flex flex-row gap-8 items-start pt-8">
                  <div className="flex-1 space-y-6">
                    <h1 
                      className="text-4xl font-bold"
                      style={{ 
                        color: selectedContent && isDarkColor(colorPalette[contentColorMap[selectedContent]]) 
                          ? colorPalette.atmosphericWhite 
                          : colorPalette.midnightIndigo 
                      }}
                    >
                      {selectedContent}
                    </h1>
                    <p style={{ 
                      color: selectedContent && isDarkColor(colorPalette[contentColorMap[selectedContent]]) 
                        ? `${colorPalette.atmosphericWhite}CC` 
                        : `${colorPalette.midnightIndigo}CC` 
                    }}>
                      {placeholderContent[selectedContent].text}
                    </p>
                    <Link 
                      href={placeholderContent[selectedContent].link}
                      className="inline-block mt-6 px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                      style={{ 
                        backgroundColor: selectedContent ? colorPalette[complementaryColors[contentColorMap[selectedContent]]] : 'rgb(59, 130, 246)',
                        color: colorPalette.atmosphericWhite
                      }}
                    >
                      Learn more →
                    </Link>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div 
                    className="w-[400px] h-[300px] rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: selectedContent ? colorPalette[complementaryColors[contentColorMap[selectedContent]]] : 'rgb(31, 41, 55)',
                      color: colorPalette.atmosphericWhite
                    }}
                  >
                    <span>Image Placeholder</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 