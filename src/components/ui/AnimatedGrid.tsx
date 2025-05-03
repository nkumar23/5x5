'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] });

// Define the grid content
type ContentKey =
  | 'About' | 'Companies' | 'Residency' | 'Grants' | 'Contributors'
  | 'Quarantine Dreams' | 'Dancing Monkey' | 'Power to the People' | 'Experiments in Reincarnation' | 'Made You Think'
  | 'BGM' | 'Awaken' | 'Ikenga Wines' | 'Kira' | 'Mount Lawrence'
  | 'Fullstack Human' | 'Black Brick Project' | 'Double Zero' | 'Telepath'
  | 'Ship By Friday' | 'Etched' | 'Bot or Not' | 'Onwards And Beyond' | 'Original music';

const gridContent: ContentKey[][] = [
  ['About', 'Companies', 'Residency', 'Grants', 'Contributors'],
  ['Quarantine Dreams', 'Dancing Monkey', 'Power to the People', 'Experiments in Reincarnation', 'Made You Think'],
  ['BGM', 'Awaken', 'Ikenga Wines', 'Kira', 'Mount Lawrence'],
  ['Fullstack Human', 'Black Brick Project', 'Double Zero', 'Telepath', 'Bot or Not'],
  ['Ship By Friday', 'Etched', 'Onwards And Beyond', 'Original music', 'Bot or Not'],
];

const placeholderContent: Record<ContentKey, { text: string; link: string }> = {
  // Row 1 - Navigation
  'About': {
    text: 'We are a collective of builders, artists, and investors working to shape the future of technology and culture.',
    link: 'about'
  },
  'Companies': {
    text: 'We invest in early-stage companies building the future of technology, art, and culture.',
    link: 'investments'
  },
  'Residency': {
    text: 'Join our community of creators and innovators in our residency program.',
    link: 'residencies'
  },
  'Grants': {
    text: 'We provide grants to support innovative projects at the intersection of technology and art.',
    link: 'grants'
  },
  'Contributors': {
    text: 'Learn how you can contribute to our community and mission.',
    link: 'contributing'
  },

  // Row 2 - Team
  'Quarantine Dreams': {
    text: 'A Pandemic-era fever dream music video with both music and visuals created by Nikhil Kumar using a variety of technologies, instruments, and recording techniques to present a disorienting glimpse into the mundanity of lockdown',
    link: 'https://www.youtube.com/watch?v=I5AjdG9m8bk'
  },
  'Dancing Monkey': {
    text: 'The Dancing Monkey is a new film adapted from Eugene O\'Neill\'s classic groundbreaking play, \'The Hairy Ape.\' Set in the present, the film follows Wayne, a factory worker with an important decision to make. After being compared to a dancing monkey by one of the factory owners, Wayne sets out to find an answer to a question that will decide his fate and those around him.',
    link: 'https://www.thedancingmonkeyfilm.com/'
  },
  'Power to the People': {
    text: 'There\'s a systems design term and web-era phrase — graceful degradation — that suddenly feels like an important core ethic for civilization. In Europe and USA, we\'re being presented with two divergent visions of how society navigates technology… Read more.',
    link: 'https://x.com/hv23/status/1918141243395019036'
  },
  'Experiments in Reincarnation': {
    text: 'Experiments in Reincarnation is a sculptural exploration of transformation -- of bodies, of attachments, of scale. It began with a fascination: how do we define who we are over time?… See more.',
    link: 'https://vimeo.com/558070075'
  },
  'Made You Think': {
    text: 'Join Nat, Neil, and Adil as they examine ideas that – as the name suggests – make you think. Episodes will explore books, essays, podcasts, and anything else that warrants further discussion, teaches something useful, or at the very least, exercises our brain muscles.',
    link: 'https://www.madeyouthinkpodcast.com/'
  },

  // Row 3 - Projects
  'BGM': {
    text: 'The first flour mill to open in Brooklyn since the 1800s, featuring a new American-made stone mill and all locally sourced grains from Northeastern farmers',
    link: 'https://brooklyngranaryandmill.com/'
  },
  'Awaken': {
    text: 'The best crypto tax software for the Solana ecosystem and beyond',
    link: 'https://awaken.tax/'
  },
  'Ikenga Wines': {
    text: 'The first biodesigned palm wine, made in America without any palm. Ikenga is bringing the varied flavors of Nigerian palm wine to the US using sophisticated fermentation techniques that produce the familiar flavors of palm wine in environmentally sustainable ways… Learn more.',
    link: 'https://ikengawines.com/'
  },
  'Kira': {
    text: 'Kira is helping real estate agents do more for their customers with the power of AI in their palms.',
    link: 'https://withkira.com/'
  },

  // Row 4 - Portfolio
  'Mount Lawrence': {
    text: 'Mount Lawrence follows filmmaker Chandler Wild\'s 6,700 mile bicycle ride from New York City to the end of the road in Alaska to reconnect with his adventure loving father, a victim of suicide.',
    link: 'https://www.amazon.com/Mount-Lawrence-Chandler-Wild/dp/B09RFT4JP9'
  },
  'Fullstack Human': {
    text: 'Advanced AI communication platform for seamless human-machine interaction.',
    link: 'portfolio/telepath'
  },
  'Black Brick Project': {
    text: 'Exploring the boundaries between human and AI-generated content.',
    link: 'portfolio/bot-or-not'
  },
  'Double Zero': {
    text: 'Your AI-powered personal assistant for creative work.',
    link: 'portfolio/sidekick'
  },
  'Telepath': {
    text: 'Revolutionary tools for automated transcript editing and enhancement.',
    link: 'portfolio/transcript-editing'
  },

  // Row 5 - Recommendations
  'Ship By Friday': {
    text: 'Curated recommendations for unique dining experiences around the world.',
    link: 'recommendations/food'
  },
  'Etched': {
    text: 'Our favorite films that inspire creativity and innovation.',
    link: 'recommendations/films'
  },
  'Bot or Not': {
    text: 'Essential readings on technology, art, and culture.',
    link: 'https://botornot.is/'
  },
  'Onwards And Beyond': {
    text: 'Nikhil blogged his backpacking trip in 2012 and sporadically updated it until 2015. Take a trip in the Time Machine here.',
    link: 'https://onwardsandbeyond-blog.tumblr.com/'
  },
  'Original music': {
    text: 'Some music made by Nikhil over the years',
    link: 'https://soundcloud.com/nkumar23'
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
  'About': 'perceptualViolet',
  'Companies': 'celestialBlue',
  'Residency': 'infraPink',
  'Grants': 'midnightIndigo',
  'Contributors': 'horizonPeach',
  'Quarantine Dreams': 'luminalAmber',
  'Dancing Monkey': 'perceptualViolet',
  'Power to the People': 'celestialBlue',
  'Experiments in Reincarnation': 'infraPink',
  'Made You Think': 'midnightIndigo',
  'BGM': 'horizonPeach',
  'Awaken': 'luminalAmber',
  'Ikenga Wines': 'perceptualViolet',
  'Kira': 'celestialBlue',
  'Mount Lawrence': 'infraPink',
  'Fullstack Human': 'midnightIndigo',
  'Black Brick Project': 'horizonPeach',
  'Double Zero': 'luminalAmber',
  'Telepath': 'perceptualViolet',
  'Ship By Friday': 'celestialBlue',
  'Etched': 'infraPink',
  'Bot or Not': 'midnightIndigo',
  'Onwards And Beyond': 'horizonPeach',
  'Original music': 'luminalAmber',
};

// Dot Component
interface DotProps {
  content: string;
  position: string;
  isHovered: boolean;
  isRippling: boolean;
  isRandomlySelected: boolean;
  isSelected: boolean;
  isClickedDot: boolean;
  shouldHide: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  selectedPosition?: { row: number; col: number };
  currentPosition: { row: number; col: number };
}

const Dot: React.FC<DotProps> = ({
  content,
  position,
  isHovered,
  isRippling,
  isRandomlySelected,
  isSelected,
  isClickedDot,
  shouldHide,
  onMouseEnter,
  onMouseLeave,
  onClick,
  selectedPosition,
  currentPosition,
}) => {
  const { row, col } = currentPosition;
  const selectedRow = selectedPosition?.row ?? 0;
  const selectedCol = selectedPosition?.col ?? 0;

  return (
    <motion.div
      initial={{ scale: 1, x: 0, y: 0 }}
      animate={{
        scale: isHovered ? 1.5 : 
               isRippling ? 2 : 
               isRandomlySelected ? 2 : 
               isSelected ? (isClickedDot ? 1.2 : 0) : 1,
        x: isSelected && !isClickedDot ? `calc(${selectedCol - col} * (100% + clamp(0.5rem, 3vmin, 2rem)))` : 0,
        y: isSelected && !isClickedDot ? `calc(${selectedRow - row} * (100% + clamp(0.5rem, 3vmin, 2rem)))` : 0,
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`flex items-center justify-center aspect-square text-[clamp(1rem,5vmin,2.5rem)] select-none
        ${!isSelected && content ? 'cursor-pointer' : 'cursor-default'}`}
      whileHover={!isSelected ? { scale: 1.5 } : {}}
    >
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
        {(isHovered && !isSelected) ? (
          <span className={`${bricolage.className} text-[0.4em] font-medium text-center`}>
            {content}
          </span>
        ) : '●'}
      </motion.div>
    </motion.div>
  );
};

// Content Card Component
interface ContentCardProps {
  content: ContentKey;
  isExpanded: boolean;
  onClose: () => void;
  onDragEnd: (e: any, info: any) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  isExpanded,
  onClose,
  onDragEnd,
}) => {
  return (
    <motion.div
      className="w-full lg:w-[min(90vw,1200px)] lg:h-auto lg:aspect-[16/9] lg:m-8 pointer-events-auto"
      initial={{ y: "100%" }}
      animate={{ 
        y: 0,
        height: isExpanded ? "90vh" : "70vh"
      }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="w-full h-full rounded-t-3xl lg:rounded-2xl overflow-hidden bg-opacity-100"
        style={{
          backgroundColor: colorPalette[contentColorMap[content]],
        }}
      >
        {/* Drag handle - only visible on mobile/tablet */}
        <div className="w-12 h-1 mx-auto mt-3 mb-3 bg-white/30 rounded-full lg:hidden" />

        {/* Content */}
        <div className="px-6 pt-2 pb-8 lg:p-12 h-full overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <h1 
                className="text-3xl lg:text-4xl font-bold leading-relaxed"
                style={{ 
                  color: isDarkColor(colorPalette[contentColorMap[content]]) 
                    ? colorPalette.atmosphericWhite 
                    : colorPalette.midnightIndigo 
                }}
              >
                {content}
              </h1>
              <p className="leading-relaxed" style={{ 
                color: isDarkColor(colorPalette[contentColorMap[content]]) 
                  ? `${colorPalette.atmosphericWhite}CC` 
                  : `${colorPalette.midnightIndigo}CC` 
              }}>
                {placeholderContent[content].text}
              </p>
              <Link 
                href={placeholderContent[content].link}
                className="inline-block px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{ 
                  backgroundColor: colorPalette[complementaryColors[contentColorMap[content]]],
                  color: colorPalette.atmosphericWhite
                }}
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Grid Component
export default function AnimatedGrid() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [rippleDot, setRippleDot] = useState<string | null>(null);
  const [selectedDot, setSelectedDot] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentKey | null>(null);
  const [randomDot, setRandomDot] = useState<string | null>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const rippleInterval = useRef<NodeJS.Timeout | null>(null);
  const randomInterval = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const usedDots = useRef<Set<string>>(new Set());
  const animationCount = useRef(0);
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

  // Handle background click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (selectedContent) {
      setSelectedDot(null);
      setSelectedContent(null);
      setIsContentExpanded(false);
      resetInactivityTimer();
    }
  };

  // Handle dot click
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
            className={`${bricolage.className} absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.65rem] text-white/30 tracking-widest uppercase flex items-center gap-2 pb-2`}
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
                const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
                const shouldHide = isMobileOrTablet && isSelected && !isClickedDot;
                
                return (
                  <Dot
                    key={dotKey}
                    content={content}
                    position={dotKey}
                    isHovered={isHovered}
                    isRippling={isRippling}
                    isRandomlySelected={isRandomlySelected}
                    isSelected={isSelected}
                    isClickedDot={isClickedDot}
                    shouldHide={shouldHide}
                    onMouseEnter={() => !selectedDot && setHoveredDot(dotKey)}
                    onMouseLeave={() => !selectedDot && setHoveredDot(null)}
                    onClick={() => !selectedDot && content && handleDotClick(dotKey, content)}
                    selectedPosition={selectedDot ? {
                      row: parseInt(selectedDot.split('-')[0]),
                      col: parseInt(selectedDot.split('-')[1])
                    } : undefined}
                    currentPosition={{
                      row: rowIndex,
                      col: colIndex
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Content Card Layer */}
      <AnimatePresence>
        {selectedContent && (
          <>
            {/* Background overlay - lower z-index */}
            <motion.div 
              className="fixed inset-0 z-30 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={handleBackgroundClick}
              onClick={(e) => e.preventDefault()}
            />

            {/* Content Card - higher z-index */}
            <div 
              className="fixed inset-0 z-40 h-full flex items-end lg:items-center justify-center pointer-events-none"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ContentCard
                content={selectedContent}
                isExpanded={isContentExpanded}
                onClose={() => {
                  setSelectedDot(null);
                  setSelectedContent(null);
                  setIsContentExpanded(false);
                  resetInactivityTimer();
                }}
                onDragEnd={(e, info) => {
                  if (info.offset.y < -20) {
                    setIsContentExpanded(true);
                  } else if (info.offset.y > 20) {
                    setIsContentExpanded(false);
                  }
                }}
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 