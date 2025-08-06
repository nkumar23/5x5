import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GalleryContentCardProps {
  artistName: string;
  workName: string;
  bio: string;
  images: {
    artwork: string[];
    headshots: string[];
  };
  onClose?: () => void;
  isExpanded?: boolean;
  projectDescription?: string;
  price?: string;
  website?: string;
  instagram?: string;
}

// Import color palette from AnimatedGrid
const colorPalette = {
  perceptualViolet: "#7B5EEA",
  celestialBlue: "#7CD7FF",
  infraPink: "#FF69B4",
  midnightIndigo: "#1A1B4B",
  horizonPeach: "#FFDAB9",
  atmosphericWhite: "#FFFFFF",
  luminalAmber: "#FFA500",
  pastelGreen: "#B6F5C9",
};

const complementaryColors: Record<keyof typeof colorPalette, keyof typeof colorPalette> = {
  perceptualViolet: "luminalAmber",
  celestialBlue: "perceptualViolet",
  infraPink: "midnightIndigo",
  midnightIndigo: "celestialBlue",
  horizonPeach: "infraPink",
  atmosphericWhite: "perceptualViolet",
  luminalAmber: "midnightIndigo",
  pastelGreen: "infraPink",
};

export const GalleryContentCard: React.FC<GalleryContentCardProps> = ({
  artistName,
  workName,
  bio,
  images,
  onClose,
  isExpanded = true,
  projectDescription,
  price,
  website,
  instagram,
}) => {
  const getCardBackgroundColor = () => {
    // Use a default color for gallery cards, or could be based on artist
    return colorPalette.perceptualViolet;
  };

  const getCardTextColor = () => {
    return colorPalette.atmosphericWhite;
  };

  return (
    <motion.div
      className="w-full lg:w-[min(90vw,1200px)] lg:h-auto lg:aspect-[16/9] lg:m-8 pointer-events-auto"
      initial={{ y: "100%" }}
      animate={{
        y: 0,
        height: isExpanded ? "90vh" : "70vh",
      }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragEnd={(e, info) => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
          console.log("Drag offset y:", info.offset.y);
          if (info.offset.y > 60) {
            onClose?.();
          }
        }
      }}
    >
      <div
        className="w-full h-full rounded-t-3xl lg:rounded-2xl overflow-hidden bg-opacity-100"
        style={{
          backgroundColor: getCardBackgroundColor(),
        }}
      >
        {/* Drag handle - only visible on mobile/tablet */}
        <div className="w-12 h-1 mx-auto mt-3 mb-3 bg-white/30 rounded-full lg:hidden" />

        {/* Content */}
        <div className="px-6 pt-2 pb-8 lg:p-12 h-full overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              {/* ARTWORK SECTION */}
              <div className="space-y-6">
                <h1
                  className="text-3xl lg:text-4xl font-bold leading-relaxed"
                  style={{
                    color: getCardTextColor(),
                  }}
                >
                  {workName}
                </h1>
                
                {/* Artwork images */}
                {images.artwork && images.artwork.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {images.artwork.map((imageSrc, i) => (
                      <div key={i} className="aspect-square overflow-hidden rounded-lg">
                        <img 
                          src={imageSrc} 
                          alt={`${workName} artwork ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className="aspect-square bg-white/10 rounded-lg flex items-center justify-center"
                      >
                        <span 
                          className="text-sm opacity-60"
                          style={{ color: getCardTextColor() }}
                        >
                          Artwork {i}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {projectDescription && (
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{
                        color: getCardTextColor(),
                      }}
                    >
                      About the Work
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: getCardTextColor(),
                      }}
                    >
                      {projectDescription.split("\n\n").map((para, idx) => (
                        <span
                          key={idx}
                          style={{ display: "block", marginBottom: "1em" }}
                        >
                          {para}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
                
                {price && (
                  <div className="mb-2">
                    <span
                      className="text-sm"
                      style={{
                        color: getCardTextColor(),
                      }}
                    >
                      Price:
                    </span>{" "}
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: getCardTextColor(),
                      }}
                    >
                      {price}
                    </span>
                  </div>
                )}
              </div>

              {/* ARTIST SECTION */}
              <div className="border-t border-white/20 pt-6 space-y-6">
                <h2
                  className="text-xl lg:text-2xl font-medium"
                  style={{
                    color: getCardTextColor(),
                  }}
                >
                  About the Artist: {artistName}
                </h2>
                
                {/* Artist headshot images */}
                {images.headshots && images.headshots.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {images.headshots.map((imageSrc, i) => (
                      <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg">
                        <img 
                          src={imageSrc} 
                          alt={`${artistName} headshot ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div 
                        key={i} 
                        className="aspect-[4/3] bg-white/10 rounded-lg flex items-center justify-center"
                      >
                        <span 
                          className="text-sm opacity-60"
                          style={{ color: getCardTextColor() }}
                        >
                          Artist Photo {i}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <p
                  className="leading-relaxed"
                  style={{
                    color: getCardTextColor(),
                  }}
                >
                  {bio.split("\n\n").map((para, idx) => (
                    <span
                      key={idx}
                      style={{ display: "block", marginBottom: "1em" }}
                    >
                      {para}
                    </span>
                  ))}
                </p>
                
                <div className="flex gap-4">
                  {website && (
                    <Link
                      href={website.startsWith('http') ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: colorPalette.luminalAmber,
                        color: colorPalette.atmosphericWhite,
                      }}
                    >
                      Visit Website →
                    </Link>
                  )}
                  {instagram && (
                    <Link
                      href={`https://instagram.com/${instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: colorPalette.infraPink,
                        color: colorPalette.atmosphericWhite,
                      }}
                    >
                      @{instagram}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryContentCard;
