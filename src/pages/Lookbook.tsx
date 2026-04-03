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
        className="relative min-h-[80vh] overflow-hidden flex items-center"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-background to-background" />
          <div className="absolute -left-40 top-0 w-[600px] h-[600px] bg-neonPurple/25 blur-[180px] rounded-full" />
          <div className="absolute -right-40 bottom-0 w-[500px] h-[500px] bg-neonCyan/20 blur-[200px] rounded-full" />
        </motion.div>

        <motion.div
          style={{ scale: heroScale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full"
        >
          <div className="text-center space-y-6">
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-display uppercase text-xs tracking-[0.35em] text-neonCyan"
            >
              Street Ops — Season 02
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-7xl md:text-[10rem] font-display font-black leading-none tracking-tighter"
            >
              <span className="text-white">LOOK</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan">
                BOOK
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-lg max-w-xl mx-auto"
            >
              Shot across late-night rooftops, underground garages, and
              warehouse stages.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 pt-4"
            >
              <MagneticButton className="px-10 py-4 text-sm text-white bg-white/10">
                Shop the look
              </MagneticButton>
              <Link to="/shop">
                <MagneticButton className="px-10 py-4 text-sm text-white bg-black/60 border border-white/20">
                  Full catalog
                </MagneticButton>
              </Link>
            </motion.div>
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
