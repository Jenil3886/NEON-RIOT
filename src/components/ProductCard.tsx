import { type FC } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 120, damping: 14 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX);
    y.set(relY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.01 }}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group flex flex-col gap-4 relative will-change-transform"
    >
      <Link
        to={`/product/${product.id}`}
        className="block overflow-hidden relative rounded-xl bg-surface border border-white/10 shadow-xl shadow-neonPink/10 aspect-[3/4]"
      >
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-neonYellow text-black font-display font-bold px-3 py-1 uppercase text-xs tracking-wider">
            New Drop
          </div>
        )}
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="bg-white hover:bg-neonCyan text-black font-display font-bold uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg"
          >
            <ShoppingCart size={18} />
            Quick Add
          </button>
        </div>
      </Link>

      <div className="flex justify-between items-start pt-2 border-t border-white/20">
        <div>
          <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-neonPink transition-colors">
            {product.name}
          </h3>
          <p className="text-white/50 text-sm font-sans mt-1">
            {product.category}
          </p>
        </div>
        <span className="font-display font-black text-xl text-neonCyan">
          ${product.price}
        </span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
