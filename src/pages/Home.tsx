import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MarqueeTicker from "../components/MarqueeTicker";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import MagneticButton from "../components/MagneticButton";
import { ArrowRight, Zap, Shield, Flame, Sparkles } from "lucide-react";

const featuredProducts = products;

// Animated counter component
const AnimatedCounter = ({ target }: { target: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current).toLocaleString());
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
};

// Pre-computed particle positions to avoid Math.random() during render
const PARTICLE_POSITIONS = [
  { x1: 120, y1: 200, x2: 800, y2: 450, dur: 14 },
  { x1: 450, y1: 80, x2: 200, y2: 600, dur: 18 },
  { x1: 900, y1: 300, x2: 100, y2: 700, dur: 22 },
  { x1: 300, y1: 500, x2: 700, y2: 150, dur: 16 },
  { x1: 600, y1: 400, x2: 150, y2: 350, dur: 20 },
  { x1: 150, y1: 650, x2: 850, y2: 250, dur: 15 },
  { x1: 750, y1: 180, x2: 350, y2: 550, dur: 19 },
  { x1: 400, y1: 720, x2: 600, y2: 100, dur: 17 },
  { x1: 850, y1: 480, x2: 200, y2: 300, dur: 21 },
  { x1: 250, y1: 350, x2: 950, y2: 600, dur: 13 },
  { x1: 550, y1: 280, x2: 300, y2: 480, dur: 23 },
  { x1: 100, y1: 150, x2: 700, y2: 750, dur: 18 },
  { x1: 680, y1: 620, x2: 180, y2: 200, dur: 16 },
  { x1: 380, y1: 420, x2: 880, y2: 380, dur: 20 },
  { x1: 520, y1: 180, x2: 420, y2: 680, dur: 15 },
];

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {PARTICLE_POSITIONS.map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-neonCyan/30"
        initial={{ x: pos.x1, y: pos.y1 }}
        animate={{
          x: [pos.x1, pos.x2, pos.x1],
          y: [pos.y1, pos.y2, pos.y1],
          opacity: [0.2, 0.7, 0.2],
          scale: [1, 1.8, 1],
        }}
        transition={{ duration: pos.dur, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </div>
);

// Text reveal animation
const TextReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ y: "100%", opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <div className="w-full relative overflow-hidden">
      <div className="noise-overlay" aria-hidden />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          style={{ y: smoothY, opacity: smoothOpacity, scale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />

          {/* Animated gradient blobs */}
          <motion.div
            className="absolute -top-24 -left-10 w-[500px] h-[500px] bg-neonPink/30 blur-[150px] rounded-full"
            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-20 right-10 w-[600px] h-[600px] bg-neonCyan/25 blur-[180px] rounded-full"
            animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-neonPurple/20 blur-[120px] rounded-full"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </motion.div>

        <FloatingParticles />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full pt-24 lg:pt-16">
          <div className="space-y-8 text-left">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
            >
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-neonPink"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className="font-display uppercase text-xs tracking-[0.4em] text-neonYellow">
                Drop 02 // Live Now
              </span>
              <Sparkles className="text-neonYellow w-4 h-4" />
            </motion.div>

            {/* Main headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-[0.92] text-white"
              >
                <span className="block">
                  <span className="text-neonPink">NEON</span>{" "}
                  <span className="text-neonCyan">RIOT</span>
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="block text-3xl md:text-5xl lg:text-5xl mt-2 text-white/80"
                >
                  Street Ops Uniforms
                </motion.span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-base md:text-xl text-white/70 max-w-2xl font-sans leading-relaxed"
            >
              Hyper-saturated streetwear engineered with{" "}
              <span className="text-neonYellow font-medium">
                heat-reactive inks
              </span>
              ,{" "}
              <span className="text-neonCyan font-medium">
                reflective seams
              </span>
              , and utility builds. For cyphers, alley sets, rooftop nights.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link to="/shop">
                <MagneticButton className="group px-10 py-4 text-sm md:text-base bg-gradient-to-r from-neonPink to-neonPurple text-white relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Shop the Drop
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </span>
                </MagneticButton>
              </Link>
              <Link to="/lookbook">
                <MagneticButton className="px-10 py-4 text-sm md:text-base text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:border-neonCyan/50 transition-colors">
                  View Lookbook
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[
                {
                  icon: <Zap className="w-3 h-3" />,
                  text: "UV-reactive prints",
                  color: "text-neonYellow",
                },
                {
                  icon: <Shield className="w-3 h-3" />,
                  text: "480gsm French terry",
                  color: "text-neonCyan",
                },
                {
                  icon: <Flame className="w-3 h-3" />,
                  text: "Taped waterproof zips",
                  color: "text-neonPink",
                },
                {
                  icon: <Sparkles className="w-3 h-3" />,
                  text: "Limited 300 pcs",
                  color: "text-neonPurple",
                },
              ].map((pill, i) => (
                <motion.span
                  key={pill.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 ${pill.color} hover:border-current transition-colors text-xs md:text-sm`}
                >
                  {pill.icon}
                  {pill.text}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Hero image with effects */}
          <div
            className="relative w-full flex justify-center items-center"
            id="lookbook"
          >
            <motion.div
              className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-neonYellow/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-neonPink/20 blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.div
              className="relative w-[90%] max-w-[480px] aspect-[4/5]"
              initial={{ opacity: 0, scale: 0.8, rotateY: -20, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5,
              }}
              style={{ perspective: 1000 }}
            >
              {/* Glowing border */}
              <motion.div
                className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-neonPink via-neonCyan to-neonYellow opacity-50 blur-sm"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />

              <div className="relative h-full rounded-[24px] border border-white/10 bg-surface shadow-2xl overflow-visible">
                {/* Masked imagery layer keeps rounded corners while badges can overflow */}
                <div className="absolute inset-0 rounded-[24px] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-neonPink/20 via-transparent to-neonCyan/20 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <img
                    src="/urban_hoodie.png"
                    alt="Neon Riot look"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute right-3 top-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  <p className="uppercase tracking-widest text-neonCyan text-xs font-display">
                    Drop 02
                  </p>
                  <p className="text-white text-sm font-sans">
                    Warehouse ready
                  </p>
                </motion.div>

                <motion.div
                  className="absolute left-4 top-4 px-3 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-xs font-display uppercase tracking-[0.2em]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span className="text-neonYellow">300</span>{" "}
                  <span className="text-white/60">pcs only</span>
                </motion.div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-display text-2xl text-white">
                    Night Ops Hoodie
                  </span>
                  <motion.span
                    className="font-display text-2xl text-neonYellow bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    $89
                  </motion.span>
                </div>
              </div>

              {/* Spinning rings */}
              <motion.div
                className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full border border-neonCyan/30"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              />
              <motion.div
                className="absolute -left-8 top-12 h-20 w-20 rounded-full border border-neonPink/20"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/40 text-xs font-display uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            className="w-5 h-10 rounded-full border border-white/20 flex justify-center pt-2"
            animate={{
              borderColor: [
                "rgba(255,255,255,0.2)",
                "rgba(255,255,255,0.6)",
                "rgba(255,255,255,0.2)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-white/60"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker text="🔥 NEW DROPS OUT NOW 🔥 FREE SHIPPING ON ORDERS OVER $100 ✨ LIMITED STOCK" />

      {/* Featured Drops */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="h-1 w-12 bg-gradient-to-r from-neonPink to-neonCyan"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <p className="uppercase tracking-[0.4em] text-xs text-white/50 font-display">
                Featured
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black leading-none">
              <span className="text-neonCyan">LATEST</span>{" "}
              <span className="text-white">DROPS</span>
            </h2>
            <p className="text-white/50 text-xl font-sans mt-5 max-w-md">
              Curated highly-anticipated pieces for those who dare to stand out.
            </p>
          </motion.div>

          <Link
            to="/shop"
            className="group flex items-center gap-3 font-display font-bold uppercase tracking-wider text-neonYellow hover:text-white transition-colors border-b border-neonYellow hover:border-white pb-1"
          >
            View All Products
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 60, rotateX: -10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
              style={{ perspective: 1000 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Hype Billboard */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neonPink/5 via-transparent to-neonCyan/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan opacity-30"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ borderRadius: "24px" }}
          />

          <div className="relative glass-card rounded-3xl p-12 md:p-16 border border-white/10 overflow-hidden">
            <motion.div
              className="absolute -left-32 -top-32 w-80 h-80 rounded-full bg-neonPink/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 8 }}
            />
            <motion.div
              className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-neonCyan/15 blur-3xl"
              animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 10 }}
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-12">
              <div className="flex-1 space-y-6">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="font-display uppercase tracking-[0.4em] text-sm text-neonYellow"
                >
                  Drop Zero One
                </motion.p>

                <TextReveal>
                  <h3 className="text-4xl md:text-6xl font-display font-black leading-tight">
                    Built for{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonCyan">
                      midnight cyphers
                    </span>
                    , warehouse raves, and rooftop takeovers.
                  </h3>
                </TextReveal>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-white/70 text-lg max-w-2xl font-sans leading-relaxed"
                >
                  Every piece carries heat-reactive inks, reflective piping, and
                  utility pockets so you stay loud in daylight and{" "}
                  <span className="text-neonCyan font-medium">
                    louder under streetlights
                  </span>
                  .
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 pt-2"
                >
                  {[
                    "Reflective 3M trims",
                    "Heavyweight 480gsm fleece",
                    "Water-resistant shells",
                    "Ethically cut & sewn",
                  ].map((chip, i) => (
                    <motion.span
                      key={chip}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-sans border border-white/10 hover:border-neonPink/60 hover:text-white transition-all cursor-default"
                    >
                      {chip}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="w-full lg:w-80 h-80 relative"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neonPink/40 via-neonCyan/30 to-neonYellow/20 blur-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />

                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan/20">
                  <img
                    src="/urban_hoodie.png"
                    alt="Hype hoodie"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="font-display text-2xl text-white">
                      Night Ops Hoodie
                    </span>
                    <span className="text-neonYellow font-display text-2xl">
                      $89
                    </span>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-4 -right-4 h-16 w-16 rounded-full border-2 border-neonYellow/40"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="h-1 w-12 bg-neonCyan"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
            />
            <p className="uppercase tracking-[0.4em] text-xs text-white/60 font-display">
              Community
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <TextReveal>
              <h3 className="text-4xl md:text-6xl font-display font-black leading-tight max-w-3xl">
                Street-approved by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonYellow">
                  dancers, DJs, skaters,
                </span>{" "}
                and midnight runners.
              </h3>
            </TextReveal>
            <Link to="/shop">
              <MagneticButton className="px-10 py-4 text-base bg-gradient-to-r from-neonCyan to-neonPurple text-white">
                <span className="flex items-center gap-2">
                  Shop Heat
                  <ArrowRight size={18} />
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              number: "120K+",
              text: "Community strong across socials and block parties.",
              color: "text-neonPink",
              icon: <Zap className="w-6 h-6" />,
            },
            {
              number: "24/7",
              text: "Glow-reactive inks that light up under UV & street lamps.",
              color: "text-neonCyan",
              icon: <Shield className="w-6 h-6" />,
            },
            {
              number: "12oz",
              text: "Heavyweight tees built for repeated washes and wild nights.",
              color: "text-neonYellow",
              icon: <Flame className="w-6 h-6" />,
            },
            {
              number: "4-Way",
              text: "Stretch cargos designed to move when you do.",
              color: "text-neonPurple",
              icon: <Sparkles className="w-6 h-6" />,
            },
          ].map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass-card rounded-2xl p-8 border border-white/10 relative overflow-hidden cursor-default"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.color}`}
              />

              <motion.div
                className="absolute right-4 top-4 h-16 w-16 rounded-full bg-white/5 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + idx,
                  delay: idx * 0.5,
                }}
              />

              <div className={`${item.color} mb-4`}>{item.icon}</div>

              <h4 className="text-5xl font-display font-black text-white mb-3">
                <AnimatedCounter target={item.number} />
              </h4>

              <p className="text-white/60 font-sans text-sm leading-relaxed">
                {item.text}
              </p>

              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-current to-transparent`}
                style={{
                  color:
                    item.color === "text-neonPink"
                      ? "#ff3bec"
                      : item.color === "text-neonCyan"
                        ? "#00eaff"
                        : item.color === "text-neonYellow"
                          ? "#d8ff1f"
                          : "#b026ff",
                }}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Viral Promo / Lookbook Preview */}
      <section
        id="story"
        className="relative py-40 overflow-hidden bg-black border-y border-white/5"
      >
        <motion.div
          className="absolute -left-60 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neonPurple/30 blur-[120px] rounded-full z-0"
          animate={{ x: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute -right-60 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonCyan/20 blur-[150px] rounded-full z-0"
          animate={{ x: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 aspect-square relative"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-neonPink/40 via-neonCyan/20 to-transparent mix-blend-overlay z-10 rounded-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />

              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-neonPink via-neonPurple to-neonCyan opacity-50 blur-sm"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/urban_hoodie.png"
                  alt="Promo collection"
                  className="w-full h-full object-cover grayscale contrast-125 contrast-[1.2]"
                />

                <motion.div
                  className="absolute bottom-8 left-8 z-20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <span className="bg-black/90 text-white font-display font-black text-5xl px-6 py-3 uppercase tracking-wide backdrop-blur-sm border border-white/10">
                    Season 01
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-6 right-6 bg-neonYellow text-black font-display font-bold text-lg px-4 py-2 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  $89
                </motion.div>
              </div>

              <motion.div
                className="absolute -top-6 -left-6 h-20 w-20 border-2 border-neonPink/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <TextReveal delay={0.3}>
                  <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-none">
                    Break
                  </h2>
                </TextReveal>
                <TextReveal delay={0.5}>
                  <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonPurple">
                    The Mould
                  </h2>
                </TextReveal>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-white/70 font-sans text-xl md:text-2xl leading-relaxed"
              >
                We don't follow trends. We make them. With premium materials,
                aggressive silhouettes, and bold statement pieces,{" "}
                <span className="text-white font-medium">
                  Neon Riot is for those who dare to stand out
                </span>
                . Embody the future of hip hop culture.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-4 font-display font-bold uppercase tracking-[0.2em] text-lg text-white hover:text-neonPink border border-white hover:border-neonPink px-10 py-5 transition-all duration-300"
                >
                  Discover Our Story
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={24} />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="flex gap-12 pt-4"
              >
                <div>
                  <p className="text-4xl font-display font-black text-neonCyan">
                    300+
                  </p>
                  <p className="text-white/50 text-sm font-sans">
                    Limited Pieces
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-display font-black text-neonPink">
                    48H
                  </p>
                  <p className="text-white/50 text-sm font-sans">
                    Fast Shipping
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-display font-black text-neonYellow">
                    100%
                  </p>
                  <p className="text-white/50 text-sm font-sans">Authentic</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <MarqueeTicker
        text="JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT"
        bgColor="bg-neonPurple"
        textColor="text-white"
      />

      {/* CTA Section */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-neonPink/20 via-neonCyan/20 to-neonPurple/20 blur-3xl rounded-full"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ repeat: Infinity, duration: 20 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-none mb-8">
            <span className="text-white">Ready to</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan">
              Stand Out?
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-xl md:text-2xl font-sans mb-12 max-w-2xl mx-auto"
          >
            Join the movement. Get early access to drops, exclusive merch, and
            behind-the-scenes content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/shop">
              <MagneticButton className="group px-14 py-6 text-lg bg-white text-white font-display font-bold uppercase tracking-wider hover:bg-neonPink hover:text-white transition-all duration-300">
                <span className="flex items-center gap-3">
                  Shop Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <ArrowRight size={22} />
                  </motion.span>
                </span>
              </MagneticButton>
            </Link>
            <Link to="/lookbook">
              <MagneticButton className="px-14 py-6 text-lg text-white bg-white/10 backdrop-blur-sm border border-white/20 font-display font-bold uppercase tracking-wider hover:bg-white/20 transition-all duration-300">
                View Lookbook
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
