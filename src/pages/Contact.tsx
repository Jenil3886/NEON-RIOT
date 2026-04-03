import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Send, Camera, AtSign, Video, Mail, MapPin, Phone } from "lucide-react";
import MarqueeTicker from "../components/MarqueeTicker";
import MagneticButton from "../components/MagneticButton";

const Contact = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", type: "general", message: "" });
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      label: "Email us",
      value: "hello@neonriot.studio",
      href: "mailto:hello@neonriot.studio",
      color: "neonPink",
    },
    {
      icon: <Camera size={24} />,
      label: "DM on IG",
      value: "@neonriot",
      href: "https://instagram.com",
      color: "neonCyan",
    },
    {
      icon: <MapPin size={24} />,
      label: "Studio",
      value: "Brooklyn, NYC",
      href: "#",
      color: "neonYellow",
    },
    {
      icon: <Phone size={24} />,
      label: "Text / Call",
      value: "+1 (347) 555-0199",
      href: "tel:+13475550199",
      color: "neonPurple",
    },
  ];

  const collabTypes = [
    "Brand Collaboration",
    "Tour / Event Styling",
    "Dance Crew Sponsorship",
    "Music Video Wardrobe",
    "Press / Editorial",
    "Wholesale / Stockists",
    "General Inquiry",
  ];

  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
          <div className="absolute -left-32 bottom-0 w-[500px] h-[500px] bg-neonPink/20 blur-[180px] rounded-full" />
          <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-neonCyan/15 blur-[200px] rounded-full" />
          {/* Tech Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] z-0" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl flex-1 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-neonYellow/30 bg-neonYellow/5 px-4 py-2 font-display uppercase text-xs tracking-[0.35em] text-neonYellow shadow-[0_0_10px_rgba(216,255,31,0.2)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonYellow opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neonYellow"></span>
                  </span>
                  System Online
                </div>
              </motion.div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] mb-8 uppercase tracking-tighter">
                <motion.span 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="block text-white"
                >
                  Collab
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="block text-white/50"
                >
                  With
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan drop-shadow-[0_0_30px_rgba(255,59,236,0.3)] mt-2"
                >
                  The Noise.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/70 text-lg md:text-xl max-w-xl font-sans leading-relaxed border-l-2 border-neonPink/50 pl-4"
              >
                From dance crews to music videos, warehouse events to global brands — if it moves at night, we want to dress it.
              </motion.p>
            </div>

            {/* Floating Contact Nodes */}
            <div className="flex-1 w-full relative hidden md:block min-h-[400px]">
              {/* Center Globe/Node */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/10 rounded-full border-dashed z-0 opacity-50"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-neonCyan/30 rounded-full z-0 opacity-50"
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neonPink rounded-full z-0 shadow-[0_0_15px_#ff3bec]"
              />
              
              {/* Detail Items */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ 
                  scale: { type: "spring", delay: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
                }}
                className="absolute top-[10%] left-[20%] w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-md border border-neonPink flex items-center justify-center shadow-[0_0_20px_rgba(255,59,236,0.3)] text-neonPink z-10"
              >
                <AtSign size={28} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, 15, 0] }}
                transition={{ 
                  scale: { type: "spring", delay: 0.7 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } 
                }}
                className="absolute bottom-[10%] left-[30%] w-20 h-20 rounded-2xl bg-black/60 backdrop-blur-md border border-neonCyan flex items-center justify-center shadow-[0_0_20px_rgba(0,234,255,0.3)] text-neonCyan z-10"
              >
                <Mail size={32} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                transition={{ 
                  scale: { type: "spring", delay: 0.9 },
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 } 
                }}
                className="absolute top-[40%] right-[10%] w-14 h-14 rounded-2xl bg-black/60 backdrop-blur-md border border-neonYellow flex items-center justify-center shadow-[0_0_20px_rgba(216,255,31,0.3)] text-neonYellow z-10"
              >
                <MapPin size={24} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <MarqueeTicker text="HYPE US OUT • REACH OUT • GET IN TOUCH • HYPE US OUT • REACH OUT • GET IN TOUCH" />

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16">
          {/* Contact Methods */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-black mb-6">
                Get at us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, idx) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass-card rounded-xl border border-white/10 p-5 flex items-start gap-4 group hover:border-white/20 transition-all"
                  >
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        background:
                          method.color === "neonPink"
                            ? "rgba(255,59,236,0.15)"
                            : method.color === "neonCyan"
                              ? "rgba(0,234,255,0.15)"
                              : method.color === "neonYellow"
                                ? "rgba(216,255,31,0.15)"
                                : "rgba(138,43,226,0.15)",
                        color:
                          method.color === "neonPink"
                            ? "#ff3bec"
                            : method.color === "neonCyan"
                              ? "#00eaff"
                              : method.color === "neonYellow"
                                ? "#d8ff1f"
                                : "#8a2be2",
                      }}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-display uppercase tracking-[0.25em] mb-1">
                        {method.label}
                      </p>
                      <p className="text-white font-display text-sm group-hover:text-neonYellow transition-colors">
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-display font-bold text-white/80">
                Follow the movement
              </h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Camera size={20} />,
                    color: "hover:text-neonPink hover:border-neonPink",
                  },
                  {
                    icon: <AtSign size={20} />,
                    color: "hover:text-neonCyan hover:border-neonCyan",
                  },
                  {
                    icon: <Video size={20} />,
                    color: "hover:text-neonYellow hover:border-neonYellow",
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 bg-white/5 transition-all ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ink to-background flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin size={40} className="text-neonPink mx-auto" />
                  <p className="font-display text-white text-lg">
                    Brooklyn, NYC
                  </p>
                  <p className="text-white/50 text-sm">
                    Studio visits by appointment only
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-2xl border border-white/10 p-8 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-display font-black text-white mb-2">
                  Send a message
                </h3>
                <p className="text-white/50 text-sm">
                  We read every DM and reply within 48 hours.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-3"
                >
                  <div className="w-16 h-16 rounded-full bg-neonPink/20 border border-neonPink flex items-center justify-center mx-auto">
                    <Send size={28} className="text-neonPink rotate-45" />
                  </div>
                  <p className="font-display text-2xl text-white">
                    Message sent.
                  </p>
                  <p className="text-white/50">
                    We'll hit you back soon. Keep it street.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white/50 text-xs font-display uppercase tracking-[0.25em]">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-neonPink transition-colors font-sans text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/50 text-xs font-display uppercase tracking-[0.25em]">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-neonCyan transition-colors font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/50 text-xs font-display uppercase tracking-[0.25em]">
                      Inquiry type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {collabTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, type })}
                          className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-[0.15em] border transition-all ${
                            form.type === type
                              ? "bg-neonYellow text-black border-neonYellow"
                              : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/50 text-xs font-display uppercase tracking-[0.25em]">
                      Message
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your project, crew, or vision..."
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-neonPink transition-colors font-sans text-sm resize-none"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-4 text-sm text-white bg-white/10 whitespace-nowrap shrink-0"
                  >
                    {/* <Send size={16} className="mr-2 shrink-0" /> */}
                    Send message
                  </MagneticButton>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-display font-black mb-4">
              Common Questions
            </h2>
          </motion.div>

          {[
            {
              q: "Do you sponsor dance crews?",
              a: "Yes. We partner with b-boy/b-girl crews, contemporary dance groups, and freerun teams globally. Email us with your crew info and performance schedule.",
            },
            {
              q: "Can I use Neon Riot for a music video?",
              a: "Absolutely. We offer wardrobe rentals and direct partnerships for music videos, tour visuals, and stage looks. Reach out with your project details.",
            },
            {
              q: "Do you ship worldwide?",
              a: "Yes. We ship to 40+ countries with DHL Express. Orders over $150 get free worldwide shipping.",
            },
            {
              q: "How do I become a stockist?",
              a: "We work with a curated set of boutiques and concept stores. Email wholesale@neonriot.studio for line sheets and minimum orders.",
            },
          ].map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="glass-card rounded-xl border border-white/10 p-6 space-y-3"
            >
              <h4 className="font-display text-lg text-neonYellow">{faq.q}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <MarqueeTicker text="KEEP IT STREET • KEEP IT LOUD • KEEP IT NEON • KEEP IT STREET • KEEP IT LOUD • KEEP IT NEON" />
    </div>
  );
};

export default Contact;
