import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SubscribeCardProps {
  onClose?: () => void;
  isExpanded?: boolean;
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

export const SubscribeCard: React.FC<SubscribeCardProps> = ({
  onClose,
  isExpanded = true,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const getCardBackgroundColor = () => {
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
    >
      <div
        className="w-full h-full rounded-t-3xl lg:rounded-2xl overflow-hidden bg-opacity-100"
        style={{
          backgroundColor: getCardBackgroundColor(),
        }}
      >
        {/* Drag handle - only visible on mobile/tablet */}
        <motion.div 
          className="w-12 h-1 mx-auto mt-3 mb-3 bg-white/30 rounded-full lg:hidden cursor-grab active:cursor-grabbing"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.5}
          onDragEnd={(e, info) => {
            if (typeof window !== "undefined" && window.innerWidth < 1024) {
              if (info.offset.y > 60) {
                onClose?.();
              }
            }
          }}
        />

        {/* Content - scrollable area */}
        <div 
          className="px-6 pt-2 pb-8 lg:p-12 h-full overflow-y-auto overscroll-y-contain"
          style={{
            touchAction: 'pan-y',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex flex-col items-center justify-center min-h-full space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1
                className="text-4xl lg:text-5xl font-bold leading-relaxed"
                style={{
                  color: getCardTextColor(),
                }}
              >
                Stay Connected
              </h1>
              <p
                className="text-lg lg:text-xl leading-relaxed max-w-2xl"
                style={{
                  color: getCardTextColor(),
                }}
              >
                Join our community to get updates on exhibitions, residencies, and new projects from the 5x5 collective.
              </p>
            </div>

            {/* Email Signup Form */}
            <div className="w-full max-w-md">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      style={{
                        backgroundColor: colorPalette.atmosphericWhite,
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{
                      backgroundColor: colorPalette.luminalAmber,
                      color: colorPalette.atmosphericWhite,
                    }}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div
                    className="text-2xl font-medium"
                    style={{ color: getCardTextColor() }}
                  >
                    ✓ Thank you for subscribing!
                  </div>
                  <p
                    className="text-sm opacity-80"
                    style={{ color: getCardTextColor() }}
                  >
                    We'll keep you updated on our latest projects and exhibitions.
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full max-w-md">
              <div className="flex items-center">
                <div className="flex-1 h-px bg-white/20"></div>
                <span 
                  className="px-4 text-sm font-medium"
                  style={{ color: getCardTextColor() }}
                >
                  Follow Us
                </span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Link
                href="https://instagram.com/5x5collective"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: colorPalette.infraPink,
                  color: colorPalette.atmosphericWhite,
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Link>
              
              <Link
                href="https://5x5collective.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: colorPalette.luminalAmber,
                  color: colorPalette.atmosphericWhite,
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Substack
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscribeCard;
