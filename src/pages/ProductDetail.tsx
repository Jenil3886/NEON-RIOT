import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { products } from "../data/products";
import MagneticButton from "../components/MagneticButton";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [size, setSize] = useState(product?.sizes?.[0]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-white">
        <p className="text-2xl font-display">Product not found.</p>
        <Link to="/shop" className="text-neonCyan underline mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />
      <section className="relative min-h-[80vh] py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
        <div className="absolute top-0 left-10 w-72 h-72 bg-neonPink/20 blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-neonCyan/20 blur-[160px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 grid lg:grid-cols-[1.1fr,1fr] gap-10 items-start">
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/70 hover:text-neonCyan"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-neonPink/20 aspect-[4/5]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-neonYellow text-black font-display text-xs px-3 py-1 uppercase tracking-[0.2em]">
                  New Drop
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent" />
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-[0.35em]">
              <Sparkles size={16} className="text-neonPink" />{" "}
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-white/70 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3">
              <p className="font-display text-3xl text-neonYellow">
                ${product.price}
              </p>
              {product.isNew && (
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[0.25em] text-white/80">
                  Limited
                </span>
              )}
            </div>

            {product.colors && (
              <div>
                <p className="text-white/60 text-sm uppercase tracking-[0.25em] mb-2">
                  Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="space-y-2">
                <p className="text-white/60 text-sm uppercase tracking-[0.25em]">
                  Select size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 rounded-full border text-sm font-display uppercase tracking-[0.2em] ${
                        size === s
                          ? "border-neonYellow text-black bg-neonYellow"
                          : "border-white/20 text-white/80 hover:border-white/60"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.features && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <div
                    key={f}
                    className="glass-card rounded-xl border border-white/10 px-3 py-2 text-white/70 text-sm"
                  >
                    {f}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <MagneticButton
                className="px-10 py-4 text-sm text-white bg-white/10"
                onClick={() => addItem(product, size)}
              >
                Add to bag
              </MagneticButton>
              <Link to="/quick-add">
                <MagneticButton className="px-10 py-4 text-sm text-white bg-black/60 border border-white/20">
                  Go to bag
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
