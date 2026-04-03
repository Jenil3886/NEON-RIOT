import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const assets = [
  "/urban_hoodie.png",
  "/cyber_cargos.png",
  "/midnight_tee.png",
  "/neon_sneakers.png",
  "/signal_collection.png",
  "/genesis_drop.png",
];

const stages = [
  { label: "Spooling raw thread", pct: 15 },
  { label: "Weaving fabric rolls", pct: 35 },
  { label: "Dye & cure neon inks", pct: 55 },
  { label: "Cut / stitch panels", pct: 75 },
  { label: "Press / pack drop", pct: 95 },
];

const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(1);



  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const start = Date.now();
    const minTime = 2500;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 92 ? p : p + Math.floor(Math.random() * 4) + 2));
    }, 100);

    Promise.all(
      assets.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    ).then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minTime - elapsed);
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          onComplete && setTimeout(onComplete, 500);
        }, 420);
      }, remaining);
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  const stageIndex =
    stages.findIndex((s) => progress < s.pct) === -1
      ? stages.length - 1
      : stages.findIndex((s) => progress < s.pct);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden"
        >
          {/* Background Digital Noise */}
          <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,236,0.05)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,rgba(0,234,255,0.05)_0%,transparent_50%)]" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
              }}
            />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12 border-[10px] md:border-[20px] border-white/[0.02]">
            {/* Top HUD */}
            <div className="flex justify-between items-start font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em] relative z-20">
              <div className="space-y-1">
                <p>SYS.BOOT // V2.04</p>
                <p>STATUS: <span className="text-neonCyan animate-pulse">WEAVING_PROTOCOLS</span></p>
              </div>
              <div className="text-right space-y-1 hidden sm:block">
                <p>DATA_STREAM: {(progress * 1.84).toFixed(2)} GB/s</p>
                <p>N_RIOT GLOBAL CLUSTER</p>
              </div>
            </div>

            {/* The Digital Loom Centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                {/* Stage 1: The Weaving Grid Engine (0-75%) */}
                <AnimatePresence>
                  {progress < 80 && (
                    <motion.div 
                       exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                       transition={{ duration: 0.6, ease: "anticipate" }}
                       className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,59,236,0.05)] border border-white/5"
                    >
                      {/* Grid Scale down effect */}
                      <motion.div 
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1 - (progress/250), opacity: 1 }}
                        className="absolute inset-0 overflow-hidden rounded-full"
                      >
                         {/* Horizontal Weave Lines */}
                         {Array.from({length: 30}).map((_, i) => (
                           <motion.div
                             key={`h-${i}`}
                             className="absolute left-0 right-0 h-[2px] bg-neonPink opacity-40 shadow-[0_0_8px_#ff3bec]"
                             style={{ top: `${(i / 30) * 100}%` }}
                             initial={{ scaleX: 0, x: i % 2 === 0 ? '-100%' : '100%' }}
                             animate={{ scaleX: progress > i * 2 ? 1 : 0, x: 0 }}
                             transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                           />
                         ))}
                         {/* Vertical Weave Lines */}
                         {Array.from({length: 30}).map((_, i) => (
                           <motion.div
                             key={`v-${i}`}
                             className="absolute top-0 bottom-0 w-[2px] bg-neonCyan opacity-40 shadow-[0_0_8px_#00eaff]"
                             style={{ left: `${(i / 30) * 100}%` }}
                             initial={{ scaleY: 0, y: i % 2 === 0 ? '-100%' : '100%' }}
                             animate={{ scaleY: progress > i * 2 ? 1 : 0, y: 0 }}
                             transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                           />
                         ))}
                      </motion.div>

                      {/* Center Core Processing */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute inset-10 border-t border-r border-dashed border-neonCyan/40 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="absolute inset-14 border-b border-l border-dashed border-neonPink/30 rounded-full"
                      />
                      <div className="absolute font-display font-black text-6xl md:text-8xl text-white select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                         {progress}<span className="text-3xl md:text-5xl text-neonCyan">%</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stage 2: The Garment Manifestation (80-100%) */}
                <AnimatePresence>
                   {progress >= 80 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 1.5, filter: "blur(30px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center mix-blend-screen"
                      >
                         <svg viewBox="0 0 400 400" className="w-[85vw] max-w-[600px] drop-shadow-[0_0_40px_rgba(0,234,255,0.4)]">
                           <defs>
                              <clipPath id="hoodie-clip">
                                 {/* Abstract Hoodie Silhouette Pattern */}
                                 <path d="M 150 50 Q 200 70, 250 50 L 320 80 L 360 160 L 320 180 L 300 130 L 300 350 L 100 350 L 100 130 L 80 180 L 40 160 L 80 80 Z" />
                              </clipPath>
                           </defs>
                           
                           {/* Backing Flash */}
                           <motion.rect
                              width="400" height="400" fill="#00eaff"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0.2] }}
                              transition={{ duration: 0.5 }}
                              clipPath="url(#hoodie-clip)"
                           />
                           
                           {/* Real image rapid flashback into the fabric cutout */}
                           <motion.image 
                              href={assets[Math.floor(progress % assets.length)]} 
                              width="400" height="400" 
                              clipPath="url(#hoodie-clip)" 
                              preserveAspectRatio="xMidYMid slice"
                              initial={{ filter: "brightness(2) contrast(1.5) grayscale(1)" }}
                              animate={{ filter: progress >= 95 ? "brightness(1) contrast(1.1) grayscale(0)" : "brightness(2) contrast(1.5) grayscale(1)" }}
                              transition={{ duration: 0.5 }}
                           />

                           {/* Wireframe overlay */}
                           <path d="M 150 50 Q 200 70, 250 50 L 320 80 L 360 160 L 320 180 L 300 130 L 300 350 L 100 350 L 100 130 L 80 180 L 40 160 L 80 80 Z" fill="none" stroke="rgba(0,234,255,0.8)" strokeWidth="4" />
                         </svg>
                      </motion.div>
                   )}
                </AnimatePresence>
            </div>

            {/* Bottom HUD Log */}
            <div className="relative z-20 w-full max-w-lg mb-4">
                <div className="font-mono text-[10px] md:text-xs tracking-wider space-y-2 h-[80px] flex flex-col justify-end whitespace-nowrap overflow-hidden">
                   {stages.slice(Math.max(0, stageIndex - 2), stageIndex + 1).map((s, idx, arr) => {
                      const isCurrent = idx === arr.length - 1;
                      return (
                        <motion.div 
                          key={s.label} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }}
                          className={isCurrent ? "text-neonYellow" : "text-white/30"}
                        >
                           <span className="opacity-50 mr-2">{isCurrent ? ">>" : "--"}</span>
                           {s.label} ... {isCurrent ? "IN_PROGRESS" : "OK"}
                        </motion.div>
                      );
                   })}
                </div>
                <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full">
                    <motion.div 
                       className="h-full bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan"
                       animate={{ width: `${progress}%` }}
                       transition={{ ease: "linear" }}
                    />
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
