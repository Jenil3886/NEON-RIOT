import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Sparkles } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const QuickAdd = () => {
  const { items, subtotal, updateQty, removeItem } = useCart();
  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />
      <section className="relative min-h-[80vh] pb-16 pt-14">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
        <div className="absolute top-0 left-10 w-72 h-72 bg-neonPink/25 blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-neonCyan/25 blur-[160px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-display uppercase text-xs tracking-[0.35em] text-neonYellow">
                Quick Add
                <Sparkles size={14} className="text-neonPink" />
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-black">
                Bag in 30 seconds.
              </h1>
              <p className="text-white/70 max-w-2xl">
                Rapid cart for the hyped drops. Adjust size, quantity, and
                checkout without leaving the flow.
              </p>
            </div>
            <MagneticButton className="px-8 py-4 text-sm text-white bg-white/10">
              Secure checkout
            </MagneticButton>
          </div>

          <div className="grid lg:grid-cols-[1.6fr,0.9fr] gap-8">
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size ?? "default"}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="glass-card rounded-2xl border border-white/10 p-4 flex gap-4 items-center"
                  >
                    <div className="relative w-24 h-28 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-lg text-white">
                            {item.product.name}
                          </p>
                          {item.size && (
                            <p className="text-white/50 text-xs uppercase tracking-[0.25em]">
                              Size {item.size}
                            </p>
                          )}
                          <p className="text-white/40 text-xs uppercase tracking-[0.25em]">
                            {item.product.category}
                          </p>
                        </div>
                        <p className="font-display text-neonYellow">
                          ${item.product.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                          <button
                            onClick={() =>
                              updateQty(
                                item.product.id,
                                item.qty - 1,
                                item.size,
                              )
                            }
                            className="px-3 py-1 text-white hover:text-neonPink"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-white/5 text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(
                                item.product.id,
                                item.qty + 1,
                                item.size,
                              )
                            }
                            className="px-3 py-1 text-white hover:text-neonCyan"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="flex items-center gap-1 text-white/60 hover:text-neonPink"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="glass-card rounded-2xl border border-dashed border-white/20 p-10 text-center space-y-3">
                  <p className="font-display text-2xl text-white">
                    Bag is empty
                  </p>
                  <p className="text-white/60">
                    Add heat from the shop to see it here.
                  </p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-6 self-start sticky top-24">
              <div className="flex items-center gap-2 text-white/80 uppercase tracking-[0.3em] text-xs">
                <ShoppingBag size={16} className="text-neonCyan" />
                Order summary
              </div>
              <div className="space-y-3 text-white/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-display text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>Free over $100</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-white/70">Total</span>
                <span className="font-display text-2xl text-neonYellow">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link to="/checkout" className="block">
                <MagneticButton className="w-full justify-center px-6 py-3 text-sm text-white bg-white/10">
                  Go to checkout
                </MagneticButton>
              </Link>
              <p className="text-white/50 text-xs">
                Secure payments • 30-day exchanges • Worldwide shipping
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuickAdd;
