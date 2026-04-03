import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imagesToPreload = [
  "/urban_hoodie.png",
  "/cyber_cargos.png",
  "/midnight_tee.png",
  "/neon_sneakers.png",
  "/signal_collection.png",
  "/genesis_drop.png",
];

const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let imagesLoaded = 0;
    // Simulate a minimum time for the preloader to show (e.g., 2.5 seconds)
    // combined with actual image loading.
    const startTime = Date.now();
    const minDuration = 2500; 

    // Fake progress increment for visual effect
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Never organically go past 90% via interval alone
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    // Preload actual images
    Promise.all(
      imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        }).then(() => {
          imagesLoaded++;
          // We can optionally tie progress strictly to images, but the interval is smoother.
        });
      })
    ).then(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);
      
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          if (onComplete) {
            setTimeout(onComplete, 800);
          }
        }, 500); // give it a moment to show 100%
      }, remainingTime);
    });

    // Cleanup interval if unmounted
    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neonPink/20 rounded-full blur-[150px]" />
             <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neonCyan/20 rounded-full blur-[150px]" />
             <div className="noise-overlay opacity-50" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
             <div className="overflow-hidden mb-6">
               <motion.div
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="text-6xl md:text-8xl font-black font-display tracking-tighter"
               >
                 <span className="text-neonPink tracking-wider">NEON</span>
                 <span className="text-neonCyan tracking-wider">RIOT</span>
               </motion.div>
             </div>
             
             <div className="flex flex-col items-center gap-4">
               <div className="text-neonYellow font-display text-5xl md:text-7xl font-bold w-32 text-center select-none">
                  {progress}%
               </div>
               
               {/* Techy loading bar */}
               <div className="w-64 h-[2px] bg-white/20 overflow-hidden relative">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan"
                   animate={{ width: `${progress}%` }}
                   transition={{ ease: "linear" }}
                 />
               </div>
               <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-display mt-2 animate-pulse">
                 Initiating Sequence
               </p>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
