import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const Toast = () => {
  const { toast, clearToast } = useCart();

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[90] flex flex-col gap-2">
      <AnimatePresence>
        {toast && (
          <motion.div
            key="cart-toast"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="pointer-events-auto glass-card rounded-xl border border-white/10 px-4 py-3 flex items-center gap-3 shadow-lg shadow-neonPink/20"
          >
            <div className="h-10 w-10 rounded-full bg-neonYellow text-black flex items-center justify-center drop-shadow-neon">
              <ShoppingBag size={18} />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm text-white">{toast.message}</p>
              <p className="text-xs text-white/60">{toast.subtitle ?? "Added to bag"}</p>
            </div>
            <button
              onClick={clearToast}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <Check size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
