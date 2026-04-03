import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Ruler, RotateCcw, Check, AlertTriangle } from "lucide-react";
import MarqueeTicker from "../components/MarqueeTicker";
import MagneticButton from "../components/MagneticButton";

const sizeCharts = {
  tops: {
    name: "Tops & Outerwear",
    note: "Oversized fit. Size down for a fitted look.",
    headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
    rows: [
      ["XS", "36-38", "27", "17"],
      ["S", "38-40", "28", "18"],
      ["M", "40-42", "29", "19"],
      ["L", "42-44", "30", "20"],
      ["XL", "44-46", "31", "21"],
      ["2XL", "46-48", "32", "22"],
    ],
  },
  bottoms: {
    name: "Bottoms & Cargos",
    note: "Regular fit with 4-way stretch. True to size.",
    headers: ["Size", "Waist (in)", "Inseam (in)", "Hip (in)"],
    rows: [
      ["XS", "26-28", "30", "38"],
      ["S", "28-30", "31", "40"],
      ["M", "30-32", "32", "42"],
      ["L", "32-34", "32", "44"],
      ["XL", "34-36", "33", "46"],
      ["2XL", "36-38", "33", "48"],
    ],
  },
  footwear: {
    name: "Footwear",
    note: "True to EU sizing. US = EU - 32.",
    headers: ["US", "EU", "UK", "CM"],
    rows: [
      ["7", "40", "6", "25"],
      ["8", "41", "7", "26"],
      ["9", "42", "8", "27"],
      ["10", "43", "9", "28"],
      ["11", "44", "10", "29"],
      ["12", "45", "11", "30"],
    ],
  },
};

const measuringGuides = [
  {
    title: "Chest / Bust",
    description:
      "Wrap the tape around the fullest part of your chest, keeping it parallel to the floor.",
    tip: "Keep the tape snug but not tight — you should be able to breathe comfortably.",
  },
  {
    title: "Waist",
    description:
      "Measure around your natural waistline, which is the narrowest part of your torso.",
    tip: "Don't hold your breath or suck in. Relax and measure at your true waist.",
  },
  {
    title: "Hip",
    description:
      "Measure around the fullest part of your hips and buttocks, about 8 inches below your waist.",
    tip: "Stand with feet together and keep the tape level all the way around.",
  },
  {
    title: "Inseam",
    description:
      "Measure from the crotch seam to the bottom of the leg opening along the inner seam.",
    tip: "For best results, measure a pair of pants that fits you well.",
  },
];

const SizeGuide = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeTab, setActiveTab] = useState<keyof typeof sizeCharts>("tops");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const activeChart = sizeCharts[activeTab];

  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
          <div className="absolute -left-32 top-0 w-[500px] h-[500px] bg-neonYellow/15 blur-[160px] rounded-full" />
          <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-neonCyan/15 blur-[180px] rounded-full" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full">
          <div className="flex items-center gap-3 mb-6">
            <Ruler size={20} className="text-neonYellow" />
            <p className="font-display uppercase tracking-[0.35em] text-xs text-neonYellow">
              Fit Guide
            </p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-display font-black leading-tight mb-4"
          >
            Size Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl"
          >
            Find your fit. All measurements are in inches unless noted. Our tops are oversized — size down if you want it fitted.
          </motion.p>
        </motion.div>
      </section>

      <MarqueeTicker text="MEASURE TWICE • CUT ONCE • MEASURE TWICE • CUT ONCE • MEASURE TWICE • CUT ONCE" />

      {/* Size Charts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">
          {/* Tabs */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-black mb-6">
                Choose your category
              </h2>
              <div className="space-y-3">
                {(Object.keys(sizeCharts) as Array<keyof typeof sizeCharts>).map(
                  (key) => (
                    <motion.button
                      key={key}
                      onClick={() => {
                        setActiveTab(key);
                        setSelectedSize(null);
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-6 py-4 rounded-xl border font-display text-sm uppercase tracking-[0.2em] transition-all ${
                        activeTab === key
                          ? "bg-neonYellow text-black border-neonYellow"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {sizeCharts[key].name}
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl border border-white/10 p-5 space-y-3"
            >
              <div className="flex items-center gap-2 text-neonCyan">
                <AlertTriangle size={16} />
                <p className="font-display text-xs uppercase tracking-[0.25em]">
                  Fit Note
                </p>
              </div>
              <p className="text-white/60 text-sm">{activeChart.note}</p>
            </motion.div>

            {/* Reset */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <MagneticButton
                onClick={() => setSelectedSize(null)}
                className="px-6 py-3 text-sm text-white bg-black/60 border border-white/20 w-full justify-center"
              >
                <RotateCcw size={16} className="mr-2" />
                Reset selection
              </MagneticButton>
            </motion.div>
          </div>

          {/* Chart */}
          <div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid bg-white/5 border-b border-white/10">
                {activeChart.headers.map((header, idx) => (
                  <div
                    key={header}
                    className={`px-4 py-3 text-xs font-display uppercase tracking-[0.25em] text-white/50 ${
                      idx === 0 ? "text-left" : "text-center"
                    }`}
                  >
                    {header}
                  </div>
                ))}
              </div>

              {/* Table Rows */}
              {activeChart.rows.map((row, rowIdx) => (
                <motion.div
                  key={row[0]}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIdx * 0.05 }}
                  onClick={() => setSelectedSize(row[0])}
                  className={`grid cursor-pointer transition-all border-b border-white/5 ${
                    selectedSize === row[0]
                      ? "bg-neonYellow/20 border-l-2 border-l-neonYellow"
                      : "hover:bg-white/5"
                  }`}
                >
                  {row.map((cell, cellIdx) => (
                    <div
                      key={cellIdx}
                      className={`px-4 py-4 font-display text-sm ${
                        cellIdx === 0
                          ? "text-white font-bold"
                          : "text-white/70 text-center"
                      } ${
                        selectedSize === row[0] && cellIdx === 0
                          ? "text-neonYellow"
                          : ""
                      }`}
                    >
                      {cell}
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            {/* Selected Size Summary */}
            {selectedSize && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 glass-card rounded-xl border border-neonYellow/30 bg-neonYellow/5 p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-neonYellow/20 border border-neonYellow/40 flex items-center justify-center">
                  <Check size={20} className="text-neonYellow" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-display uppercase tracking-[0.25em]">
                    Your size
                  </p>
                  <p className="font-display text-2xl text-neonYellow">
                    {selectedSize}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Measuring Guide */}
      <section className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/50 font-display uppercase tracking-[0.4em] text-xs mb-4">
              How to measure
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-black">
              Get accurate numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {measuringGuides.map((guide, idx) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-xl border border-white/10 p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neonCyan/20 border border-neonCyan/30 flex items-center justify-center">
                    <Ruler size={18} className="text-neonCyan" />
                  </div>
                  <h3 className="font-display text-xl text-white font-bold">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {guide.description}
                </p>
                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <Check size={14} className="text-neonYellow mt-0.5 flex-shrink-0" />
                  <p className="text-white/50 text-xs italic">{guide.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchanges Banner */}
      <section className="py-16 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card rounded-2xl border border-white/10 p-10 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-neonPink/20 blur-[100px]" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-neonCyan/20 blur-[100px]" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-display font-black text-white">
              Wrong size? No stress.
            </h3>
            <p className="text-white/60 max-w-xl mx-auto mt-3">
              We offer free exchanges within 30 days on all orders. Size doesn't fit?
              We'll send you the right one at no extra cost.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <MagneticButton className="px-8 py-3 text-sm text-black bg-white/10">
                Start exchange
              </MagneticButton>
              <MagneticButton className="px-8 py-3 text-sm text-white bg-black/60 border border-white/20">
                Contact support
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </section>

      <MarqueeTicker text="FREE EXCHANGES • 30 DAY RETURNS • FREE EXCHANGES • 30 DAY RETURNS" />
    </div>
  );
};

export default SizeGuide;
