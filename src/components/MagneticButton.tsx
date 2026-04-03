import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const MagneticButton = ({ children, className = "", href, onClick, type = "button" }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.3 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-display uppercase tracking-widest ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-neonPink via-neonCyan to-neonYellow opacity-70 blur" />
      <span className="absolute inset-0 bg-white/15" />
      <span className="relative z-10 mix-blend-screen">{children}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return <button type={type} onClick={onClick} className="inline-block">{content}</button>;
};

export default MagneticButton;
