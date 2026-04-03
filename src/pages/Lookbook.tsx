import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import MarqueeTicker from "../components/MarqueeTicker";
import MagneticButton from "../components/MagneticButton";

const looks = [
  {
    id: 1,
    title: "Night Shift",
    items: ["Neon Riot Core Hoodie", "Cybernetic Tech Cargos"],
    image: "/urban_hoodie.png",
    color: "neonPink",
  },
  {
    id: 2,
    title: "Midnight Runner",
    items: ["Oversized Midnight Tee", "Neon Flash Sneakers"],
    image: "/midnight_tee.png",
    color: "neonCyan",
  },
  {
    id: 3,
    title: "Warehouse Cypher",
    items: ["Cybernetic Tech Cargos", "Neon Flash Sneakers"],
    image: "/neon_sneakers.png",
    color: "neonYellow",
  },
  {
    id: 4,
    title: "Rooftop Takeover",
    items: ["Neon Riot Core Hoodie", "Oversized Midnight Tee"],
    image: "/signal_collection.png",
    color: "neonPurple",
  },
  {
    id: 5,
    title: "Bass Drop",
    items: ["Oversized Midnight Tee", "Cybernetic Tech Cargos"],
    image: "/cyber_cargos.png",
    color: "neonPink",
  },
  {
    id: 6,
    title: "Signal Noise",
    items: ["Neon Riot Core Hoodie", "Neon Flash Sneakers"],
    image: "/genesis_drop.png",
    color: "neonCyan",
  },
];

const colorMap: Record<string, string> = {
  neonPink: "255,59,236,0.3)",
  neonCyan: "0,234,255,0.3)",
  neonYellow: "216,255,31,0.3)",
  neonPurple: "138,43,226,0.3)",
};

const LookCard = ({
  look,
  index,
}: {
  look: (typeof looks)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const isWide = index === 0 || index === 5;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative group overflow-hidden rounded-2xl ${
        isWide ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${colorMap[look.color]}, transparent 70%)`,
        }}
      />

      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={look.image}
          alt={look.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-xs font-display uppercase tracking-[0.3em] mb-1"
          >
            Look {look.id.toString().padStart(2, "0")}
          </motion.p>
          <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-2">
            {look.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {look.items.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Hover reveal CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <MagneticButton className="px-6 py-2 text-xs text-white bg-white/10 w-full">
              Shop this look
            </MagneticButton>
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 z-20"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

const BTSCard = ({ src, idx }: { src: string; idx: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
      className="relative aspect-square overflow-hidden rounded-xl border border-white/10"
    >
      <img
        src={src}
        alt={`BTS ${idx + 1}`}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </motion.div>
  );
};

const Lookbook = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />

      {/* Hero with Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] overflow-hidden flex items-center justify-center pt-20"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-background to-background" />
          {/* Enhanced Light sources */}
          <div className="absolute -left-20 top-[10%] w-[500px] h-[500px] bg-neonPurple/30 blur-[150px] rounded-full" />
          <div className="absolute right-[10%] bottom-[20%] w-[400px] h-[400px] bg-neonPink/20 blur-[150px] rounded-full" />
          <div className="absolute left-[30%] bottom-0 w-[600px] h-[600px] bg-neonCyan/10 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        </motion.div>

        <motion.div
          style={{ scale: heroScale }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0"
        >
          {/* Main Text Content */}
          <div className="flex-1 w-full relative z-10 mt-10 md:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 border border-white/20 bg-white/5 backdrop-blur-md rounded-full font-display text-xs uppercase tracking-[0.4em] text-neonCyan mb-6 shadow-[0_0_15px_rgba(0,234,255,0.2)]">
                Vol. 02 — Street Ops
              </span>
              
              <div className="relative">
                <h1 className="text-7xl md:text-[8rem] lg:text-[11rem] font-display font-black leading-[0.8] tracking-tighter uppercase">
                  <motion.div 
                    initial={{ opacity: 0, y: 50, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="text-white drop-shadow-2xl relative inline-block group"
                  >
                    LOOK
                    {/* Glitch pseudo-elements setup (using simple motion for effect) */}
                    <motion.span 
                      animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
                      className="absolute inset-0 text-neonPink -translate-x-1 translate-y-1 block pointer-events-none mix-blend-screen"
                      aria-hidden
                    >
                      LOOK
                    </motion.span>
                  </motion.div>
                  <br />
                  <motion.div 
                    initial={{ opacity: 0, y: 50, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan drop-shadow-[0_0_40px_rgba(255,59,236,0.3)] relative inline-block pl-8 md:pl-16 lg:pl-24"
                  >
                    BOOK
                  </motion.div>
                </h1>
                
                {/* Decorative scanning line */}
                <motion.div 
                  className="absolute left-0 top-0 w-1 bg-gradient-to-b from-transparent via-white/50 to-transparent h-full"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-sans border-l-2 border-neonCyan/50 pl-6"
            >
              Shot across late-night rooftops, underground garages, and warehouse stages. The raw visual aesthetic of Neon Riot.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 md:gap-6"
            >
              <MagneticButton className="px-8 py-4 text-sm text-white font-bold bg-neonCyan hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(0,234,255,0.4)] border-none">
                Shop the look
              </MagneticButton>
              <Link to="/shop">
                <MagneticButton className="px-8 py-4 text-sm text-white bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-colors">
                  Full catalog
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* Floating Visual Element (Polaroids) */}
          <div className="flex-1 w-full mt-16 lg:mt-0 relative md:block">
            <div className="relative w-full aspect-square max-w-[450px] mx-auto">
              {/* Polaroid 1 - Back */}
              <motion.div 
                initial={{ opacity: 0, rotate: -15, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, rotate: -10, x: -20, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                className="absolute top-10 left-0 w-3/4 aspect-[3/4] bg-white p-3 pb-12 rounded-sm shadow-2xl z-0 pointer-events-none"
              >
                <div className="w-full h-full bg-ink overflow-hidden border border-gray-200">
                  <img src="/cyber_cargos.png" alt="Behind the scenes" className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity" />
                </div>
              </motion.div>

              {/* Polaroid 2 - Front */}
              <motion.div 
                initial={{ opacity: 0, rotate: 10, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 5, y: 20, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 2, zIndex: 30 }}
                className="absolute top-0 right-0 w-3/4 aspect-[3/4] bg-[#fdfdfd] p-3 md:p-4 pb-14 md:pb-16 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 cursor-crosshair border border-white/50"
              >
                <div className="w-full h-full bg-ink overflow-hidden relative group">
                  <img src="/urban_hoodie.png" alt="Featured Look" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-neonPink/20 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center px-1">
                  <span className="font-display font-bold text-gray-800 text-lg block tracking-wide uppercase">Night Shift</span>
                  <span className="font-display text-gray-400 text-xs text-right">04/26</span>
                </div>
                {/* Pin tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 shadow-sm rotate-3 backdrop-blur-sm" />
              </motion.div>

              {/* UI Crosshairs */}
              <motion.div 
                animate={{ rotate: 90 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-white/10 border-dashed rounded-full z-0 pointer-events-none hidden md:block"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <MarqueeTicker text="NIGHT SHIFT • MIDNIGHT RUNNER • WAREHOUSE CYPHER • ROOFTOP TAKEOVER • SIGNAL NOISE" />

      {/* Editorial Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {looks.map((look, idx) => (
            <LookCard key={look.id} look={look} index={idx} />
          ))}
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-white/50 font-display uppercase tracking-[0.4em] text-xs mb-4">
              Behind the scenes
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-black">
              Shot on Film
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/genesis_drop.png",
              "/cyber_cargos.png",
              "/midnight_tee.png",
              "/neon_sneakers.png",
            ].map((src, idx) => (
              <BTSCard key={idx} src={src} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      <MarqueeTicker text="STREET OPS • SEASON 02 • LIVE NOW • STREET OPS • SEASON 02 • LIVE NOW" />
    </div>
  );
};

export default Lookbook;
