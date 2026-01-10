import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/**
 * Sticky Photo Portal Component
 * A circular sticky element with hover effects containing user's photo
 * Eyes follow the cursor movement
 */
export function StickyPhotoPortal() {
  const [isHovered, setIsHovered] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!photoRef.current) return;

      const rect = photoRef.current.getBoundingClientRect();
      const photoCenterX = rect.left + rect.width / 2;
      const photoCenterY = rect.top + rect.height / 2;

      // Calculate distance and angle from photo center to cursor
      const deltaX = e.clientX - photoCenterX;
      const deltaY = e.clientY - photoCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Limit the movement range (max 15px in any direction)
      const maxMove = 15;
      const moveRatio = Math.min(distance / 300, 1); // Normalize distance

      const moveX = (deltaX / distance) * maxMove * moveRatio;
      const moveY = (deltaY / distance) * maxMove * moveRatio;

      setEyePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed left-[130px] top-[230px] z-40 -translate-y-1/2
        pointer-events-auto"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div
        ref={photoRef}
        className="relative h-[120px] w-[120px] overflow-hidden
          rounded-full border-4 border-orange-200 shadow-2xl shadow-orange-500/50
          transition-all duration-300"
        style={{
          transformOrigin: 'top right',
          transform: isHovered ? 'scale(1.67)' : 'scale(1)',
        }}
      >
        {/* Photo - stays still */}
        <img
          src="/vsevolod-photo.jpeg"
          alt="Vsevolod Berdutin"
          className="h-full w-full object-cover"
   
        />

       

      </motion.div>

    
    </motion.div>
  );
}
