import { motion } from "framer-motion";
import MarqueeTicker from "../components/MarqueeTicker";
import MagneticButton from "../components/MagneticButton";
import { crew, pillars, stats } from "../utils/data.tsx";

const About = () => {
  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
        <div className="absolute -left-24 top-0 w-[420px] h-[420px] bg-neonPink/25 blur-[160px]" />
        <div className="absolute right-0 bottom-[-120px] w-[520px] h-[520px] bg-neonCyan/20 blur-[200px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-20 grid lg:grid-cols-[1.2fr,0.9fr] gap-12 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-display uppercase text-xs tracking-[0.35em] text-neonYellow">
              About // Neon Riot
              <span className="h-2 w-2 rounded-full bg-neonPink animate-ping" />
            </p>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-display font-black leading-tight drop-shadow-xl"
            >
              We’re the noise between
              <br />
              city lights & subway bass.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-white/75 max-w-2xl text-lg"
            >
              Born in late-night cyphers and warehouse raves, Neon Riot builds
              street uniforms that glow under UV, bend with every pop-and-lock,
              and hold up to rain-soaked rooftops. Limited, loud, unapologetic.
            </motion.p>

            <div className="flex flex-wrap gap-3 pt-2">
              <MagneticButton className="px-8 py-3 text-sm text-black bg-white/10">
                View drops
              </MagneticButton>
              <MagneticButton className="px-8 py-3 text-sm text-white bg-black/60 border border-white/20">
                Book styling
              </MagneticButton>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-xl border border-white/10 p-4 text-center"
                >
                  <p className="text-2xl font-display text-neonYellow">
                    {item.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-neonYellow/30 blur-3xl" />
            <div className="absolute right-0 bottom-4 h-28 w-28 rounded-full bg-neonPink/25 blur-3xl" />
            <motion.div
              initial={{ scale: 0.92, rotate: -4, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-neonPink/20"
            >
              <img
                src="/urban_hoodie.png"
                alt="Crew energy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-display text-lg">Night Shift Set</span>
                <span className="font-display text-neonYellow">
                  UV Reactive
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <MarqueeTicker
        text="WE DESIGN FOR THE CYPHER • WE DESIGN FOR THE CYPHER • WE DESIGN FOR THE CYPHER"
        bgColor="bg-black"
        textColor="text-neonYellow"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-white/60">
              Codes
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-black">
              Our DNA
            </h2>
          </div>
          <MagneticButton className="px-8 py-3 text-sm text-white bg-white/10">
            Collab with us
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card rounded-xl border border-white/10 p-6 relative overflow-hidden"
            >
              <div
                className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/5 blur-lg"
                aria-hidden
              />
              <h3 className="font-display text-xl text-neonCyan">
                {pillar.title}
              </h3>
              <p className="text-white/70 mt-3 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-black border-y border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-neonPink" />
                <p className="uppercase tracking-[0.4em] text-xs text-white/60">
                  Crew
                </p>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
                MEET THE SQUAD
              </h2>
            </div>
            <p className="text-white/50 text-sm max-w-xs text-right hidden md:block">
              The architects, designers, and movement specialists behind Neon Riot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {crew.map((member, idx) => {
              const styles = [
                { border: 'group-hover:border-neonPink', glow: 'bg-neonPink/20', text: 'group-hover:text-neonPink' },
                { border: 'group-hover:border-neonCyan', glow: 'bg-neonCyan/20', text: 'group-hover:text-neonCyan' },
                { border: 'group-hover:border-neonYellow', glow: 'bg-neonYellow/20', text: 'group-hover:text-neonYellow' },
                { border: 'group-hover:border-neonPurple', glow: 'bg-neonPurple/20', text: 'group-hover:text-neonPurple' },
              ][idx % 4];

              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8 }}
                  className="group relative glass-card rounded-2xl border border-white/5 p-6 flex flex-col gap-6 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]"
                >
                  {/* Tech Avatar */}
                  <div className="relative h-32 w-32 mx-auto mt-4">
                    {/* Background Glow */}
                    <div className={`absolute -inset-4 ${styles.glow} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full`} />
                    
                    {/* Rotating rings */}
                    <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-500" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15 + idx * 2, repeat: Infinity, ease: "linear" }}
                      className={`absolute inset-2 rounded-full border border-dashed border-white/20 ${styles.border} transition-colors duration-500`}
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25 - idx, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[3px] rounded-full border border-white/5"
                    />
                    
                    {/* Center Core */}
                    <div className="absolute inset-4 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center overflow-hidden z-10">
                      <div className={`absolute inset-0 ${styles.glow} blur-md opacity-30 group-hover:opacity-80 transition-opacity duration-300`} />
                      <span className="font-display font-black text-4xl text-white mix-blend-overlay group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                        {member.name.charAt(0)}
                      </span>
                    </div>

                    {/* Tech details */}
                    <div className="absolute top-[10%] right-[15%] w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                    <div className="absolute bottom-[15%] left-[10%] w-2 h-2 rounded-sm border border-white/30" />
                  </div>

                  <div className="text-center space-y-3 relative z-10 w-full">
                    <h3 className={`font-display text-2xl text-white font-bold transition-colors duration-300 ${styles.text}`}>
                      {member.name}
                    </h3>
                    
                    <div className="inline-block px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/80 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                      {member.role}
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 mt-2">
                      <p className="text-white/40 text-xs tracking-[0.15em] uppercase font-mono">
                        // {member.tag}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl md:text-5xl font-display font-black">
            Timeline
          </h2>
          <p className="text-white/60 max-w-xl">
            From garage screen-print runs to UV-reactive micro-collections and
            festival stage uniforms.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 glass-card">
          <MarqueeTicker
            text="2019 Garage drops • 2021 First UV inks • 2023 Warehouse shows • 2024 Global collabs • 2025 Night Ops drop • 2026 Street Ops live"
            bgColor="bg-black"
            textColor="text-white"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
