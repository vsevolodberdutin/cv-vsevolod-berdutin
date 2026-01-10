import { motion } from 'framer-motion';
import { useRef } from 'react';

/**
 * Sticky Photo Portal Component
 * A circular sticky element with hover effects containing user's photo
 */
export function StickyPhotoPortal() {
  const photoRef = useRef<HTMLDivElement>(null);

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
