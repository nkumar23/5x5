import React from "react";
import Image from "next/image";

interface GalleryContentCardProps {
  artistName: string;
  workName: string;
  bio: string;
  images: string[];
  onClose?: () => void;
  isExpanded?: boolean;
}

const palette = {
  background: "#0A0A23",
  card: "#FFFFFF",
  accent: "#D1B464",
  text: "#22223B",
  border: "#E9E9F3",
};

export const GalleryContentCard: React.FC<GalleryContentCardProps> = ({
  artistName,
  workName,
  bio,
  images,
  onClose,
  isExpanded = true,
}) => {
  return (
    <div
      className={`relative w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-[${palette.border}] bg-[${palette.card}] p-6 flex flex-col gap-4 transition-all duration-300 ${
        isExpanded ? "scale-100 opacity-100" : "scale-95 opacity-70"
      }`}
      style={{ zIndex: 40 }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      )}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold text-center" style={{ color: palette.text }}>
          {workName}
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-500">
          {artistName}
        </h3>
      </div>
      <div className="flex flex-row gap-2 justify-center">
        {images.map((src, i) => (
          <div key={src} className="relative w-28 h-28 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <Image
              src={src}
              alt={`${artistName} - ${workName} image ${i + 1}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="112px"
              placeholder="empty"
            />
          </div>
        ))}
      </div>
      <p className="text-base text-center text-gray-700" style={{ color: palette.text }}>
        {bio}
      </p>
    </div>
  );
};

export default GalleryContentCard;
