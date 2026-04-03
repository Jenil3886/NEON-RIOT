import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import MarqueeTicker from "../components/MarqueeTicker";
import MagneticButton from "../components/MagneticButton";

const drops = [
  {
    id: "drop-01",
    season: "Season 01",
    title: "NEON RIOT",
    subtitle: "The Genesis Drop",
    description:
      "Where it all started. Garage screen prints, UV-reactive inks, and raw underground energy.",
    color: "neonPink",
    image: "/genesis_drop.png",
    tag: "Archive",
    year: "2019",
  },
  {
    id: "drop-02",
    season: "Drop 02",
    title: "STREET OPS",
    subtitle: "Uniforms for the Night",
    description:
      "Reflective seams, 480gsm French terry, utility builds for rooftop runners and warehouse ravers.",
    color: "neonCyan",
    image: "/urban_hoodie.png",
    tag: "Live Now",
    year: "2026",
  },
  {
    id: "drop-03",
    season: "Coming Soon",
    title: "SIGNAL",
    subtitle: "The Frequency Collection",
    description:
      "RFID-blocking cargo pockets, UV-reactive camo patterns, and glow-in-the-dark heel tabs.",
    color: "neonYellow",
    image: "/signal_collection.png",
    tag: "Coming Q3",
    year: "2026",
  },
];

const DropCard = ({
  drop,
  index,
}: {
  drop: (typeof drops)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const colorMap: Record<string, string> = {
    neonPink: "rgba(255,59,236,0.4)",
    neonCyan: "rgba(0,234,255,0.4)",
    neonYellow: "rgba(216,255,31,0.4)",
  };

  const textColorMap: Record<string, string> = {
    neonPink: "#ff3bec",
    neonCyan: "#00eaff",
    neonYellow: "#d8ff1f",
  };

  const shadowColorMap: Record<string, string> = {
    neonPink: "255,59,236,0.25",
    neonCyan: "0,234,255,0.25",
    neonYellow: "216,255,31,0.25",
  };

  return (
    <div ref={cardRef} className="relative">
      {/* Background glow */}
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] opacity-30"
        style={{ background: colorMap[drop.color] }}
      />

      <div
        className={`grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-20 items-center ${
          isEven ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-display uppercase tracking-[0.25em] border ${
                drop.tag === "Live Now"
                  ? "bg-neonPink/20 border-neonPink text-neonPink"
                  : drop.tag === "Archive"
                    ? "bg-white/10 border-white/20 text-white/60"
                    : "bg-neonYellow/20 border-neonYellow text-neonYellow"
              }`}
            >
              {drop.tag}
            </span>
            <span className="text-white/40 text-xs font-display uppercase tracking-[0.25em]">
              {drop.year}
            </span>
          </div>

          <p className="text-white/50 font-display uppercase tracking-[0.3em] text-sm">
            {drop.season}
          </p>

          <h2 className="text-5xl md:text-7xl font-display font-black leading-none">
            {drop.title}
          </h2>

          <p
            className="text-2xl md:text-3xl font-display font-bold"
            style={{ color: textColorMap[drop.color] }}
          >
            {drop.subtitle}
          </p>

          <p className="text-white/60 text-lg max-w-lg leading-relaxed">
            {drop.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/shop">
              <MagneticButton className="px-8 py-3 text-sm text-white bg-white/10">
                Shop this drop
              </MagneticButton>
            </Link>
            <MagneticButton className="px-8 py-3 text-sm text-white bg-black/60 border border-white/20">
              View lookbook
            </MagneticButton>
          </div>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: isEven ? -5 : 5 }}
          animate={
            isInView ? { opacity: 1, scale: 1, rotate: isEven ? -3 : 3 } : {}
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
            delay: 0.15,
          }}
          className={`relative ${!isEven ? "lg:order-1" : ""}`}
        >
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-6 -right-6 h-16 w-16 rounded-full border"
            style={{ borderColor: textColorMap[drop.color] }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border border-white/10"
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          />

          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl"
            style={{
              boxShadow: `0 0 60px rgba(${shadowColorMap[drop.color]})`,
            }}
          >
            <img
              src={drop.image}
              alt={drop.title}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span
                className="font-display text-4xl text-white drop-shadow-lg"
                style={{
                  textShadow: `0 0 20px rgba(${shadowColorMap[drop.color]})`,
                }}
              >
                {drop.year}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Collections = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden"
      >
        <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
          <div className="absolute -left-32 top-0 w-[500px] h-[500px] bg-neonPink/20 blur-[180px] rounded-full" />
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-neonCyan/20 blur-[220px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_80%)]" />
        </motion.div>

        {/* Ambient Hollow Text */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none overflow-hidden"
        >
          <span className="text-[18vw] font-display font-black text-transparent opacity-[0.03]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            ARCHIVE
          </span>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col items-center text-center mt-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative group mb-8">
              <motion.div 
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan opacity-50 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <p className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-6 py-3 font-display uppercase text-xs tracking-[0.4em] text-neonYellow">
                <span className="h-2 w-2 rounded-full bg-neonPink animate-pulse shadow-[0_0_8px_#ff3bec]" />
                Full Archive
              </p>
            </div>

            <div className="relative">
              {/* Corner Accents */}
              <motion.div 
                animate={{ rotate: 90 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -left-10 w-12 h-12 border-t-2 border-l-2 border-neonPink/50 opacity-50 hidden md:block" 
              />
              <motion.div 
                animate={{ rotate: -90 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -right-10 w-12 h-12 border-b-2 border-r-2 border-neonCyan/50 opacity-50 hidden md:block" 
              />
              
              <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-display font-black leading-[0.85] tracking-tighter mix-blend-plus-lighter relative z-10">
                <motion.span 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="block text-white"
                >
                  ALL
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className="block text-transparent bg-clip-text bg-gradient-to-br from-neonPink to-neonCyan drop-shadow-[0_0_30px_rgba(255,59,236,0.4)]"
                >
                  DROPS
                </motion.span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 max-w-2xl mx-auto glass-card border border-white/10 p-6 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neonPink/5 to-neonCyan/5" />
              <p className="text-white/80 text-lg md:text-xl relative z-10">
                Every collection. Every drop. From garage prints to global stages. Explore the legacy.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <MarqueeTicker text="SEASON 01 • STREET OPS • SIGNAL • SEASON 01 • STREET OPS • SIGNAL" />

      {/* Drops Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-32">
        {drops.map((drop, idx) => (
          <DropCard key={drop.id} drop={drop} index={idx} />
        ))}
      </section>

      {/* Season Selector */}
      <section className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <p className="text-white/50 font-display uppercase tracking-[0.4em] text-xs">
              Timeline
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-black">
              Every Drop, Every Year
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026",
              ].map((year, idx) => (
                <motion.button
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-display text-sm uppercase tracking-[0.2em] border transition-all ${
                    year === "2026"
                      ? "bg-neonYellow text-black border-neonYellow"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-neonPink hover:text-neonPink"
                  }`}
                >
                  {year}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker text="MORE DROPS COMING • MORE DROPS COMING • MORE DROPS COMING" />
    </div>
  );
};

export default Collections;
