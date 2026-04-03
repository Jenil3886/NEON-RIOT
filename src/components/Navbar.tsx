import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Sparkles, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { links } from "../utils/data.tsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const location = useLocation();
  const { count } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="h-[3px] w-full bg-gradient-to-r from-neonPink via-neonCyan to-neonYellow" />
      <div className="backdrop-blur-xl bg-background/85 border-b border-white/5 shadow-[0_6px_28px_-16px_rgba(0,0,0,0.7)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto,1fr,auto] items-center h-16 gap-3">
            {/* Logo left */}
            <div className="flex items-center">
              <Link
                to="/"
                className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-2"
              >
                <Sparkles className="text-neonPink" size={18} />
                <span className="text-neonPink">NEON</span>{" "}
                <span className="text-neonCyan">RIOT</span>
              </Link>
            </div>

            {/* Center Nav */}
            <div className="flex justify-center">
              <div className="hidden md:flex gap-6 font-display uppercase tracking-[0.18em] text-[12px] font-semibold relative">
                {links.map((link) => {
                  const active = location.pathname === link.to;
                  const isHovered = hovered === link.label;
                  return (
                    <div
                      key={link.label}
                      className="relative px-2 py-1"
                      onMouseEnter={() => setHovered(link.label)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <Link
                        to={link.to}
                        className="relative text-white/80 hover:text-white transition-colors z-10"
                      >
                        {link.label}
                      </Link>
                      {(active || isHovered) && (
                        <motion.span
                          layoutId="navGlow"
                          className="absolute left-0 right-0 bottom-[-6px] h-[2px] rounded-full bg-gradient-to-r from-neonPink via-neonCyan to-neonYellow"
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile toggle */}
              <button
                className="text-white hover:text-neonCyan transition-colors md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation"
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Right Nav */}
            <div className="flex-1 flex justify-end items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-display uppercase tracking-[0.18em] text-white/70">
                <Radio size={14} className="text-neonCyan" /> Live drop
              </div>
              <Link
                to="/quick-add"
                className="relative text-white hover:text-neonPurple transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <ShoppingBag size={18} />
                <span className="font-sans text-[11px] font-bold bg-white text-black rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
                <motion.span
                  className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-neonPink"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 space-y-4 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-neonPink/10 via-transparent to-neonCyan/10"
              aria-hidden
            />
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block font-display text-xl text-white hover:text-neonPink"
            >
              Drops
            </Link>
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="block font-display text-xl text-neonYellow hover:text-white"
            >
              Shop All
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block font-display text-xl text-neonCyan hover:text-white"
            >
              About
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
